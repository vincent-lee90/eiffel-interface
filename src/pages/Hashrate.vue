<template>
    <div class="px-2 pt-[60px] pb-[62px]">
        <div class="py-4">
            <div>当前算力</div>
            <div class="text-right">{{ hashrate }}</div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>总释放</div>
            <div class="text-right">
                {{ mintTotalAmount }}
            </div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>当前释放</div>
            <div class="text-right">
                {{ availableAmount }}
            </div>
        </div>
        <div class="text-center mt-16">
            <van-button type="primary" square class="w-1/3">领取释放</van-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { store } from "@/hooks/store";
import { useHashrateInfo } from "@/hooks/useApi"
const hashrate = ref(0)
const availableAmount = ref(0)
const mintTotalAmount = ref(0)
const getHashrateInfo = async () => {
    const res = await useHashrateInfo(store.account)
    const data = res.data
    hashrate.value = data.hashrate
    availableAmount.value = data.availableAmount
    mintTotalAmount.value = data.mintTotalAmount

}
onMounted(() => {
    getHashrateInfo()
})
</script>
<style scoped>
.van-rolling-text {
    color: white;
    font-size: 16px;
}
</style>