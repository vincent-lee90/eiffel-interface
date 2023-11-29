<template>
    <div class="exchange-container px-2 pt-[60px] pb-[62px]">
        <div class="py-4">
            交易所
        </div>
        <div class="h-[75vh] overflow-y-auto">
            <van-list class="grid grid-cols-2 gap-x-4 gap-y-8" finished-text="已经到底了" :finished="isLastPage"
                @load="getExchangeList">
                <van-cell class="relative" v-for="item in exCards">

                    <div class=" flex justify-between items-center bg-white/10 backdrop-blur py-2 px-2 rounded-full">
                        <div class="text-left">#{{ item.cardId }}</div>
                        <div class="flex justify-end items-center">
                            <IconUSDT class="w-[14px] h-[14px]" /><span class="ml-1 text-slate-600">{{ item.worth }}U</span>
                        </div>
                    </div>
                    <div>
                        <img :src="item.imgUrl" class="w-full" />
                    </div>
                    <div class="bg-white text-black  py-4 px-2">
                        <div class="flex justify-between items-center mb-2">
                            <div class="text-gray-500 text-xs mb-1">卖家</div>
                            <div class="text-gray-700 break-all ml-4">
                                {{ item.seller.substring(0, 3) + '...' + item.seller.substring(item.seller.length - 4,
                                    item.seller.length) }}
                            </div>
                        </div>
                        <div class="text-right">
                            <van-button type="primary" class="w-1/2" square size="small" @click="toConfirmBuy(item)">
                                购买
                            </van-button>
                        </div>
                    </div>
                </van-cell>
            </van-list>
        </div>
        <van-dialog v-model:show="isShowConfirm" :showConfirmButton="false">
            <div v-if="isShowConfirm">
                <div class="py-8 px-4">
                    <div class="mb-4">确认购买？</div>
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-gray-400">
                            #{{ selectExchangeCard.cardId }}
                        </div>
                        <div class="flex items-center justify-end">
                            <div class="text-gray-400 mr-2">当前价值</div>
                            <IconUSDT class="w-[20px] h-[20px]" />
                            <div class="ml-4">
                                {{ selectExchangeCard.worth }}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center border-solid border-[1px] border-color2nd rounded-xl">
                        <div class="w-[240px] h-[240px]">
                            <img :src="selectExchangeCard.imgUrl" class="w-full h-full" />
                        </div>
                    </div>
                </div>
                <div
                    class="flex items-center justify-center text-center border-solid border-0 border-t-[1px] border-indigo-500">
                    <div class="w-1/2 h-[48px] leading-[48px]" @click="cancelConfirm">
                        取消
                    </div>
                    <div class="w-1/2 h-[48px] leading-[48px] text-blue-600">
                        <div class="w-full h-full" v-if="isShowApproveButton" @click="approveUSDT">授权USDT</div>
                        <div class="w-full h-full" v-else @click="payForBuy">确定</div>

                    </div>
                </div>
            </div>
        </van-dialog>

    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { IconUSDT } from "@/icons"
import { useExchangeList, useBuy, usePreBuy } from "@/hooks/useApi"
import { store, useCloseLoading, useShowLoading } from "@/hooks/store";
import { showNotify, showToast } from "vant"
import { usePayForBuy } from "@/hooks/useEiffelCore";
import { EiffelCore, USDT, maximumAllowance } from "@/presets/constants";
import { useApprove, useCheckAllowance } from "@/hooks/useERC20";
const exCards = ref<any[]>([])
let pageIndex = 1
const pageSize = 10
const isLastPage = ref<boolean>(false)
const getExchangeList = async () => {
    if (isLastPage.value) {
        return
    }
    const res = await useExchangeList(pageIndex, pageSize)
    isLastPage.value = res.data.isLastPage
    const cards = res.data.cards
    cards.map((card: any) => {
        exCards.value.push(card)
    })
    pageIndex++
}

let selectExchangeCard: any = null
const isShowConfirm = ref(false)
const isShowApproveButton = ref(false)
const toConfirmBuy = (exchangeCard: any) => {
    if (exchangeCard) {
        selectExchangeCard = exchangeCard
        isShowConfirm.value = true
    }

}
const payForBuy = async () => {
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
                cancelConfirm()
                useCloseLoading()
                showToast("购买成功")
            } else {
                cancelConfirm()
                useCloseLoading()
                showNotify({ type: "danger", message: "购买失败" })
            }
        } else {
            useCloseLoading()
            showNotify({ type: "danger", message: res.message })
        }

    } catch (e) {
        console.log(e)
        useCloseLoading()
    }


}
const approveUSDT = async () => {
    useShowLoading()
    try {
        const tx = await useApprove(USDT, EiffelCore, maximumAllowance)
        await tx.wait()
        showToast('授权成功');
        isShowApproveButton.value = false
        useCloseLoading()
    } catch (e) {
        console.log(e)
        showToast('授权失败');
        isShowApproveButton.value = false
        useCloseLoading()
    }

}
const cancelConfirm = () => {
    selectExchangeCard = null
    isShowConfirm.value = false
}
/* onMounted(() => {
    getExchangeList()
}) */
</script>
<style scoped>
.van-cell {
    @apply p-0;
}
</style>