<template>
    <div class="myCards-contrainer">
        <van-list class="grid grid-cols-2 gap-x-2 gap-y-4" v-model:loading="isLoading" :finished="isLastPage"
            finished-text="没有更多了" @load="getMyCards">
            <van-cell v-for="card in cards" class="bg-white pb-4 pt-2 rounded-md">

                <div class="flex justify-between items-center mb-2 px-2">
                    <div class="text-slate-400">#{{ card.cardId }}</div>
                    <div class="flex justify-end items-center">
                        <IconUSDT class="w-[14px] h-[14px]" /><span class="ml-1 text-black">{{ card.worth }}U</span>
                    </div>
                </div>
                <img :src="card.imgUrl" class="w-full" />
                <div class="p-4 text-center">
                    <van-button v-if="!isShowApproveButton" type="primary" square @click="payForBuy(card)">
                        立即支付
                    </van-button>
                    <ApproveButton :token-address="USDT" :spender="EiffelCore" :name="'USDT'" class="block" v-else />
                </div>
            </van-cell>
        </van-list>
    </div>
</template>
<script setup lang="ts">
import { IconUSDT } from "@/icons"
import { ref, onMounted } from "vue"
import { useBuy, useMyBuyingList, usePreBuy } from "@/hooks/useApi"
import { store, useCloseLoading, useShowLoading } from "@/hooks/store";
import ApproveButton from "./approve-button.vue";
import { EiffelCore, USDT } from "@/presets/constants";
import { showNotify, showToast } from "vant";
import { useCheckAllowance } from "@/hooks/useErc20";
import { usePayForBuy } from "@/hooks/useEiffelCore";
const emits = defineEmits(["onSelectCard"])
const cards = ref<any[]>([])
const isLoading = ref(false)
const isLastPage = ref(true)
const isShowApproveButton = ref(false)
const getMyCards = async () => {
    isLoading.value = true
    const res = await useMyBuyingList(store.account)
    const _cards = res.data.cards
    _cards.map((card: any) => {
        cards.value.push(card)
    })
    isLoading.value = false
}
const init = () => {
    cards.value = []
    getMyCards()
}
const payForBuy = async (selectExchangeCard: any) => {
    useShowLoading()
    try {
        const hasApproved = await useCheckAllowance(selectExchangeCard.worthUint, USDT, store.account, EiffelCore)
        if (!hasApproved) {
            isShowApproveButton.value = true
            showToast('请先授权');
            useCloseLoading()
            return
        }
        const res = await usePreBuy(store.account, selectExchangeCard.cardId)
        if (res.isSuccessful) {
            const { seller, buyer, cardId, price, message, seed, signature } = res.data
            store.loadingText = "支付中"
            const tx = await usePayForBuy(seller, buyer, cardId, price, message, seed, signature)
            store.loadingText = "等待确认，请勿关闭"
            await tx.wait()
            store.loadingText = "正在购买，请勿关闭"
            const buyRes = await useBuy(store.account, selectExchangeCard.cardId)
            if (buyRes.isSuccessful) {
                useCloseLoading()
                cards.value = []
                await getMyCards()
                showToast("购买成功")
            } else {
                useCloseLoading()
                showNotify({ type: "danger", message: "购买失败" })
            }
        } else {
            useCloseLoading()
            showNotify({ type: "danger", message: res.message })
        }

    } catch (e) {
        console.log(e)
        showNotify({ type: "danger", message: "购买失败" })
        useCloseLoading()
    }
}
onMounted(() => {
    init()
})
</script>
<style scoped>
.van-cell {
    @apply px-0;
}
</style>