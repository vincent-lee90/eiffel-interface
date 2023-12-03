<template>
    <div class="px-2 pt-[60px] pb-[62px]">
        <div class="py-4 flex items-center justify-end">
            <div class="px-2 cus-tab" :class="{ 'active': activeTab == 'myCards' }" @click="tabToggle('myCards')">
                我的卡牌
            </div>
            <div class="px-2 cus-tab" :class="{ 'active': activeTab == 'mySaleList' }" @click="tabToggle('mySaleList')">
                售卖中
            </div>
            <div class="px-2 cus-tab" :class="{ 'active': activeTab == 'myBuyingList' }" @click="tabToggle('myBuyingList')">
                购买中
            </div>
        </div>
        <div class="w-full h-[62vh] overflow-y-auto border border-color2nd border-solid py-2 px-2 rounded-2xl">
            <div v-if="activeTab == 'myCards'">
                <CardList @on-select-card="handleSelectCard" ref="cardListRef" />
            </div>
            <div v-else-if="activeTab == 'mySaleList'">
                <ExCardsList />
            </div>
            <div v-else="activeTab == 'myBuyingList'">
                <BuyingCardList />
            </div>
        </div>

        <div class="mt-12 text-center" v-if="activeTab == 'myCards'">
            <div class="mb-4 w-[200px] mx-auto" v-if="isShowApproveButton">
                <ApproveButton class="w-full" :token-address="Eiffel" :spender="EiffelCore" :name="'Eiffel'"
                    @approved="isShowApproveButton = false" />
            </div>
            <div v-else>
                <van-button type="primary" square class="w-[200px]" @click="confirmSellCard">出售选中</van-button>
            </div>
        </div>
    </div>
    <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="payForSell">
        <div class="py-8 px-4">
            <div class="mb-4">确认售出？</div>
            <div class="flex justify-between items-center mb-4">
                <div class="text-gray-400">
                    #{{ selectCard.cardId }}
                </div>
                <div class="flex items-center justify-end">
                    <div class="text-gray-400 mr-2">当前价值</div>
                    <IconUSDT class="w-[20px] h-[20px]" />
                    <div class="ml-4">
                        {{ selectCard.worth }}
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center border-solid border-[1px] border-color2nd rounded-xl">
                <div class="w-[240px] h-[240px]">
                    <img :src="selectCard.imgUrl" class="w-full h-full" />
                </div>
            </div>
        </div>
    </van-dialog>
</template>
<script setup lang="ts">
import CardList from "@/components/cards-list.vue"
import ExCardsList from "@/components/ex-cards-list.vue";
import { ref } from "vue"
import { usePreSell, useSell } from "@/hooks/useApi";
import { useCheckAllowance } from "@/hooks/useErc20"
import { store, useCloseLoading, useShowLoading } from "@/hooks/store"
import { showNotify } from "vant"
import { IconUSDT } from "@/icons";
import ApproveButton from "@/components/approve-button.vue";
import { Eiffel, EiffelCore } from "@/presets/constants";
import { usePayForSell } from "@/hooks/useEiffelCore";
import { ZeroAddress } from "ethers";
import BuyingCardList from "@/components/buying-card-list.vue";
const isShowApproveButton = ref(false)
const activeTab = ref("myCards")
const tabToggle = (tab: string) => {
    activeTab.value = tab
}
let selectCard: any = null
const handleSelectCard = (card: any) => {
    selectCard = card
}
const isShowConfirm = ref(false)
const confirmSellCard = () => {
    if (selectCard) {
        isShowConfirm.value = true
    }
}
const payForSell = async () => {
    useShowLoading()
    try {
        const res = await usePreSell(store.account, selectCard.cardId)
        if (!res.isSuccessful) {
            res.message && showNotify({ type: "danger", message: res.message })
            return useCloseLoading()
        }
        if (res.isSuccessful) {
            let { seller, cardId, totalFeeAmount, message, seed, signature, inviter } = res.data
            const hasApproved = await useCheckAllowance(totalFeeAmount, Eiffel, store.account, EiffelCore)
            if (!hasApproved) {
                showNotify({ type: "warning", message: "请先授权" })
                isShowApproveButton.value = true
                useCloseLoading()
                return
            }
            const feeTo = EiffelCore
            inviter = inviter ? inviter : ZeroAddress
            store.loadingText = "支付中"
            const tx = await usePayForSell(seller, cardId, inviter, totalFeeAmount, feeTo, message, seed, signature)
            store.loadingText = "正在确认交易，请勿关闭"
            await tx.wait()
            store.loadingText = "正在售出，请勿关闭"
            await sellCard()
        } else {
            showNotify({ type: "danger", message: res.message })
            useCloseLoading()
        }
    } catch (e) {
        console.log(e)
        useCloseLoading()
    }

}
const cardListRef = ref<any>()
const sellCard = async () => {
    try {
        store.isLoading = true
        const res = await useSell(store.account, selectCard.cardId)
        if (res.isSuccessful) {
            showNotify({ type: "success", message: "挂卖成功" })
            cardListRef.value.init()
        } else {
            showNotify({ type: "danger", message: res.message })
        }
        store.isLoading = false
    } catch (e) {
        store.isLoading = false
        showNotify({ type: "danger", message: "未知错误" })
        console.log(e)
    }
}
</script>
<style scoped>
.cus-tab.active {
    @apply text-sky-400
}
</style>