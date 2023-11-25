<template>
    <div>
        <div class="py-4">
            <div>当前算力</div>
            <div class="text-right"><van-rolling-text :start-num="0.00" :target-num="hashrate"></van-rolling-text></div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>总释放</div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="mintTotalAmount"></van-rolling-text>
            </div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>当前释放</div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="availableAmount"></van-rolling-text>
            </div>
        </div>
        <van-divider />
        <div class="text-center mt-8">
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
    hashrate.value = parseInt(data.hashrate)
    availableAmount.value = parseInt(data.availableAmount)
    mintTotalAmount.value = parseInt(data.mintTotalAmount)

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