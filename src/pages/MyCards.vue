<template>
    <div>
        <div class="py-4 flex items-center justify-end">
            <div class="px-2 cus-tab" :class="{ 'active': activeTab == 'myCards' }" @click="tabToggle('myCards')">我的卡牌</div>
            <div class="px-2 cus-tab" :class="{ 'active': activeTab != 'myCards' }" @click="tabToggle('mySaleList')">售卖中
            </div>
        </div>
        <div class="w-full h-[62vh] overflow-y-auto border border-color2nd border-solid py-2 px-2 rounded-2xl">
            <div v-if="activeTab == 'myCards'">
                <CardList @on-select-card="handleSelectCard" ref="cardListRef" />
            </div>
            <div v-else>
                <ExCardsList />
            </div>
        </div>

        <div class="mt-12 text-center" v-if="activeTab == 'myCards'">
            <van-button type="primary" square class="w-[200px]" @click="sellCard">出售选中</van-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import CardList from "@/components/cards-list.vue"
import ExCardsList from "@/components/ex-cards-list.vue";
import { ref } from "vue"
import { useSell } from "@/hooks/useApi";
import { store } from "@/hooks/store"
import { showNotify } from "vant"
const activeTab = ref("myCards")
const tabToggle = (tab: string) => {
    activeTab.value = tab
}
const selectCard = ref<any>()
const handleSelectCard = (card: any) => {
    selectCard.value = card
}
const cardListRef = ref<any>()
const sellCard = async () => {
    try {
        store.isLoading = true
        const res = await useSell(store.account, selectCard.value.cardId)
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