<template>
    <div>
        <div class="px-2 pt-[60px] pb-[62px]">
            <div class="py-4">
                <div>开公司流水奖励（总团队)</div>
                <div class="text-right">
                    {{ parseFloat(teamCoRewardAmount).toFixed(2) }}<span class="ml-2">Eiffel</span>
                </div>
            </div>
            <van-divider />
            <div class="py-4">
                <div>商群扶持（总团队）</div>
                <div class="text-right">
                    {{ parseFloat(teamGroupRewardAmount).toFixed(2) }}<span class="ml-2">Eiffel</span>
                </div>
            </div>
            <van-divider />
            <div class="py-4">
                <div>
                    今日流水(我的团队)
                </div>
                <div class="text-right">
                    {{ parseFloat(exAmount).toFixed(2) }}<span class="ml-2">USDT</span>
                </div>
            </div>
            <van-divider />
            <div class="py-4">
                <div>
                    今日我的开公司奖励
                </div>
                <div class="text-right">
                    {{ parseFloat(myCoRewardAmount).toFixed(2) }}<span class="ml-2">Eiffel</span>
                </div>
            </div>
            <van-divider />
            <div class="py-4">
                <div>
                    今日我的商群奖励
                </div>
                <div class="text-right">
                    {{ parseFloat(myGroupRewardAmount).toFixed(2) }}<span class="ml-2">Eiffel</span>
                </div>
            </div>
            <van-divider />
            <div class="py-4">
                <div>
                    可领取代币
                </div>
                <div class="text-right">
                    {{ (parseFloat(myCoRewardAmount) + parseFloat(myGroupRewardAmount)).toFixed(2) }}<span
                        class="ml-2">Eiffel</span>
                </div>
                <div class="text-center mt-16">
                    <van-button type="primary" class="w-1/3" square @click="toConfirmClaim">领取奖励</van-button>
                </div>
            </div>
        </div>
        <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="claimTeamReward">
            <div class="py-8 px-4">
                <div class="mb-4">确定领取？</div>
                <div>
                    注意：点击<span class="text-red-500">确认</span>后，可领取的代币数量会重置为0
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useClaimTeamReward, useRewardInfo } from "@/hooks/useApi"
import { store, useCloseLoading, useShowLoading } from "@/hooks/store";
import { showNotify, showToast } from "vant";
import { useClaim } from "@/hooks/useEiffelCore";
const exAmount = ref('0')
const myCoRewardAmount = ref('0')
const myGroupRewardAmount = ref('0')
const teamCoRewardAmount = ref('0')
const teamGroupRewardAmount = ref('0')
const getRewardInfo = async () => {
    const res = await useRewardInfo(store.account)
    if (res.isSuccessful) {
        exAmount.value = res.data.exAmount
        myCoRewardAmount.value = res.data.myCoRewardAmount
        myGroupRewardAmount.value = res.data.myGroupRewardAmount
        teamCoRewardAmount.value = res.data.teamCoRewardAmount
        teamGroupRewardAmount.value = res.data.teamGroupRewardAmount
    }
}

const isShowConfirm = ref(false)
const toConfirmClaim = () => {
    if (parseFloat(myCoRewardAmount.value) + parseFloat(myGroupRewardAmount.value) > 0) {
        isShowConfirm.value = true
    } else {
        showNotify({ type: "danger", message: "当前释放Eiffel为0" })
    }
}
const claimTeamReward = async () => {
    useShowLoading()
    try {
        const res = await useClaimTeamReward(store.account)
        if (res.isSuccessful) {
            const { receiver, amount, message, seed, signature } = res.data
            store.loadingText = "矿工费支付中"
            const tx = await useClaim(receiver, amount, message, seed, signature)
            await tx.wait()
            showToast("领取成功")
            useCloseLoading()

        } else {
            useCloseLoading()
            showNotify({ type: "danger", message: res.message })
        }
    } catch (e) {
        console.log(e)
        useCloseLoading()
        showNotify({ type: "danger", message: "领取失败" })
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