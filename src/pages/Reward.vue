<template>
    <div>
        <div class="py-4">
            <div>开公司流水奖励（总团队）</div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="teamCoRewardAmount"></van-rolling-text>
            </div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>商群扶持（总团队）</div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="teamGroupRewardAmount"></van-rolling-text>
            </div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>
                今日流水(我的团队)
            </div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="exAmount"></van-rolling-text>
            </div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>
                可领取代币
            </div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="myCoRewardAmount + myGroupRewardAmount"></van-rolling-text>
            </div>
            <div class="text-center mt-16">
                <van-button type="primary" class="w-1/3" square>领取奖励</van-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRewardInfo } from "@/hooks/useApi"
import { store } from "@/hooks/store";
const exAmount = ref(0)
const myCoRewardAmount = ref(0)
const myGroupRewardAmount = ref(0)
const teamCoRewardAmount = ref(0)
const teamGroupRewardAmount = ref(0)
const getRewardInfo = async () => {
    const res = await useRewardInfo(store.account)
    if (res.isSuccessful) {

        exAmount.value = parseInt(res.data.exAmount)
        myCoRewardAmount.value = parseInt(res.data.myCoRewardAmount)
        myGroupRewardAmount.value = parseInt(res.data.myGroupRewardAmount)
        teamCoRewardAmount.value = parseInt(res.data.teamCoRewardAmount)
        teamGroupRewardAmount.value = parseInt(res.data.teamGroupRewardAmount)
    }
}
onMounted(() => {
    getRewardInfo()
})
</script>
<style scoped>
.van-rolling-text {
    color: white;
    font-size: 16px;
}
</style>