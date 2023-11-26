<template>
    <div class="myCards-contrainer">
        <van-list class="grid grid-cols-2 gap-x-2 gap-y-4" v-model:loading="isLoading" :finished="isLastPage"
            finished-text="没有更多了" @load="getMyCards">
            <van-cell v-for="card in cards" class="bg-white pb-4 pt-2 rounded-md" @click="selectCard(card)">
                <div class="flex justify-between items-center mb-2 px-2">
                    <div class="text-slate-400">#{{ card.cardId }}</div>
                    <div class="flex justify-end items-center">
                        <IconUSDT class="w-[14px] h-[14px]" /><span class="ml-1 text-black">{{ card.worth }}U</span>
                    </div>
                    <IconChecked class="w-[14px] h-[14px] fill-green-500" v-show="selectedCard == card.cardId" />
                </div>
                <img :src="card.imgUrl" class="w-full" />
            </van-cell>
        </van-list>
    </div>
</template>
<script setup lang="ts">
import { IconUSDT, IconChecked } from "@/icons"
import { ref, onMounted } from "vue"
import { useGetCards } from "@/hooks/useApi"
import { store } from "@/hooks/store";
const emits = defineEmits(["onSelectCard"])
const cards = ref<any[]>([])
const isLoading = ref(false)
const isLastPage = ref(true)
const getMyCards = async () => {
    isLoading.value = true
    const res = await useGetCards(store.account)
    const _cards = res.data.cards
    _cards.map((card: any) => {
        cards.value.push(card)
    })
    isLoading.value = false
}
const selectedCard = ref('')
const selectCard = (card: any) => {
    const cardId = card.cardId
    if (cardId == selectedCard.value) {
        selectedCard.value = ''
        emits("onSelectCard", null)
    } else {
        selectedCard.value = card.cardId
        emits("onSelectCard", card)
    }

}
const init = () => {
    cards.value = []
    getMyCards()
}
onMounted(() => {
    init()
})
defineExpose({ init })
</script>
<style scoped>
.van-cell {
    @apply px-0;
}
</style>