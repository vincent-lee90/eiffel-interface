<template>
    <div class="pt-[60px] pb-[62px] px-2">
        <div class="text-xl py-4">我的卡牌</div>
        <div class="w-full h-[62vh] overflow-y-auto border border-color2nd border-solid py-2 px-2 rounded-2xl">
            <CardsList @on-select-card="handleSelectCard" ref="cardsListRef" />
        </div>
        <div class="mt-12 text-center">
            <van-button type="primary" square class="w-[200px]" @click="confirmSplit">拆分选中</van-button>
        </div>
        <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="split">
            <div class="py-8 px-4">
                <div class="mb-4">确定拆分？</div>
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
import CardsList from "@/components/cards-list.vue"
import { store } from "@/hooks/store";
import { useSplit } from "@/hooks/useApi"
import { showNotify } from "vant"
import { ref } from "vue"
import { IconUSDT } from "@/icons";
const isShowConfirm = ref(false)
const confirmSplit = () => {
    if (selectCard) {
        isShowConfirm.value = true
    }
}
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