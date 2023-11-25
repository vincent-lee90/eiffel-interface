<template>
    <div class="exchange-container">
        <div class="py-4">
            Live Auctions
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
                            <van-button type="primary" class="w-1/2" square size="small" @click="buy(item)">
                                购买
                            </van-button>
                        </div>
                    </div>
                </van-cell>
            </van-list>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { IconUSDT } from "@/icons"
import { useExchangeList, useBuy } from "@/hooks/useApi"
import { store } from "@/hooks/store";
import { showNotify } from "vant"
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
const buy = async (exchangeCard: any) => {
    try {
        store.isLoading = true
        const res = await useBuy(store.account, exchangeCard.cardId)
        if (res.isSuccessful) {
            showNotify({ type: "success", message: "购买成功" })
            const cardId = res.data
            exCards.value.filter((card) => {
                return card.cardId != cardId
            })
        } else {
            showNotify({ type: "danger", message: res.message })
        }
        store.isLoading = false
    } catch (e) {
        store.isLoading = false
    }

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