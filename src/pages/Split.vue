<template>
    <div>
        <div class="text-xl py-4">我的卡牌</div>
        <div class="w-full h-[62vh] overflow-y-auto border border-color2nd border-solid py-2 px-2 rounded-2xl">
            <CardsList @on-select-card="handleSelectCard" ref="cardsListRef" />
        </div>
        <div class="mt-12 text-center">
            <van-button type="primary" square class="w-[200px]" @click="split">拆分选中</van-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import CardsList from "@/components/cards-list.vue"
import { store } from "@/hooks/store";
import { useSplit } from "@/hooks/useApi"
import { showNotify } from "vant"
import { ref } from "vue"
let selectCard: any = null
const handleSelectCard = (card: any) => {
    selectCard = card
}
const cardsListRef = ref<any>()
const split = async () => {
    try {
        store.isLoading = true
        const res = await useSplit(store.account, selectCard.cardId)
        if (res.isSuccessful) {
            cardsListRef.value.init()
            showNotify({ type: "success", message: "拆分成功" })
        } else {
            showNotify({ type: "danger", message: res.message })
        }
        store.isLoading = false
    } catch (e) {
        showNotify({ type: "danger", message: "未知错误" })
        store.isLoading = false
        console.log(e)
    }

}
</script>