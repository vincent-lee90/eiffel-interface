<template>
    <div class="px-2 pt-[60px] pb-[62px]">
        <div class="game-container"><van-notice-bar left-icon="volume-o" :scrollable="false">
                <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
                    <van-swipe-item>0x4f4548...eB8 获得1.5倍算力</van-swipe-item>
                    <van-swipe-item>0x4f4548...eB8 获得2.5倍算力</van-swipe-item>
                    <van-swipe-item>0x4f4548...eB8 获得3.5倍算力</van-swipe-item>
                </van-swipe>
            </van-notice-bar></div>
        <div class="text-xl py-4">我的卡牌</div>
        <div class="w-full h-[62vh] overflow-y-auto border border-color2nd border-solid py-2 px-2 rounded-2xl">
            <CardList @on-select-card="handleSelectCard" ref="cardListRef" />
        </div>
        <div class="mt-12 text-center">
            <van-button type="primary" square class="w-[200px]" @click="confirmPlay">抽奖</van-button>
        </div>
        <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="play">
            <div class="py-8 px-4">
                <div class="mb-4">开始游戏</div>
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
    </div>
</template>
<script setup lang="ts">
import CardList from "@/components/cards-list.vue"
import { usePlay } from "@/hooks/useApi";
import { store } from "@/hooks/store"
import { showNotify } from "vant"
import { ref } from "vue"
import { IconUSDT } from "@/icons";
const isShowConfirm = ref(false)
let selectCard: any = null
const handleSelectCard = (card: any) => {
    console.log(card)
    selectCard = card
}
const cardListRef: any = ref();
const confirmPlay = () => {
    if (selectCard) {
        isShowConfirm.value = true
    }

}
const play = async () => {
    try {
        store.isLoading = true
        const res = await usePlay(store.account, selectCard.cardId)
        if (res.isSuccessful) {
            cardListRef.value.init()
            showNotify({ type: "success", message: res.message })
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
<style scoped>
.game-container .van-notice-bar {
    background-color: transparent;
}
</style>