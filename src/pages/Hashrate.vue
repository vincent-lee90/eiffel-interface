<template>
    <div>
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
                <van-button type="primary" square class="w-1/3" @click="toConfirmClaim">领取释放</van-button>
            </div>
        </div>
        <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="claimHashrateReward">
            <div class="py-8 px-4">
                <div class="mb-4">确定领取？</div>
                <div>
                    注意：点击<span class="text-red-500">确认</span>后，当前释放的数量会重置为0
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { store, useCloseLoading, useShowLoading } from "@/hooks/store";
import { useHashrateInfo, useClaimHashrateReward } from "@/hooks/useApi"
import { showNotify, showToast } from "vant";
import { useClaim } from "@/hooks/useEiffelCore";
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
const isShowConfirm = ref(false)
const toConfirmClaim = () => {
    if (availableAmount.value > 0) {
        isShowConfirm.value = true
    } else {
        showNotify({ type: "danger", message: "当前释放Eiffel为0" })
    }
}
const claimHashrateReward = async () => {
    useShowLoading()
    try {
        const res = await useClaimHashrateReward(store.account)
        if (res.isSuccessful) {
            const { receiver, amount, message, seed, signature } = res.data
            const tx = await useClaim(receiver, amount, message, seed, signature)
            await tx.wait()
            showToast("领取成功")
            useCloseLoading()
        } else {
            showNotify({ type: "danger", message: res.message })
            useCloseLoading()
        }
    } catch (e) {
        console.log(e)
        showNotify({ type: "danger", message: "领取失败" })
        useCloseLoading()
    }

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