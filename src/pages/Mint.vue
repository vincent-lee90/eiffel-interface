<template>
    <div class="px-2 pt-[60px] pb-[62px]">
        <div class="pt-[80px]">
            <van-radio-group class="flex flex-col gap-4 items-center" v-model="selectType">
                <van-radio name="1">
                    <div class="flex justify-start items-center w-[300px]">
                        <IconUSDT class="w-[20px] h-[20px]" />
                        <span class="ml-2 text-xl text-white">100 usdt<span>(剩余：{{ type1Amount }})</span></span>
                    </div>
                </van-radio>
                <van-radio name="2">
                    <div class="flex justify-start items-center w-[300px]">
                        <IconUSDT class="w-[20px] h-[20px]" />
                        <span class="ml-2 text-xl text-white">200 usdt<span>(剩余：{{ type2Amount }})</span></span>
                    </div>
                </van-radio>
                <van-radio name="3">
                    <div class="flex justify-start items-center w-[300px]">
                        <IconUSDT class="w-[20px] h-[20px]" />
                        <span class="ml-2 text-xl text-white">500 usdt<span>(剩余：{{ type3Amount }})</span></span>
                    </div>
                </van-radio>
                <van-radio name="4">
                    <div class="flex justify-start items-center w-[300px]">
                        <IconUSDT class="w-[20px] h-[20px]" />
                        <span class="ml-2 text-xl text-white">1000 usdt<span>(剩余：{{ type4Amount }})</span></span>
                    </div>
                </van-radio>
            </van-radio-group>
        </div>
        <div class="mt-16 text-center">
            <div class="mb-4" v-if="isShowApproveButton">
                <ApproveButton type="primary" class=" w-[200px]" square block @approved="isShowApproveButton = false"
                    :name="'usdt'" :token-address="USDT" :spender="EiffelCore">
                    授权</ApproveButton>
            </div>
            <div v-else>
                <van-button type="primary" class="w-[200px]" square block @click="toConfirmMint">开始铸造</van-button>
            </div>

        </div>
        <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="payForMint">
            <div class="py-8 px-4">是否确定铸造？</div>
        </van-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { IconUSDT } from "@/icons";
import { showNotify } from "vant"
import { useCheckAllowance } from "@/hooks/useErc20";
import { useMintStatics, useMint, usePreMint } from "@/hooks/useApi";
import { store, useShowLoading, useCloseLoading } from "@/hooks/store";
import { EiffelCore, USDT } from "@/presets/constants";
import { usePriceOfMint, usePayForMint } from "@/hooks/useEiffelCore"
import ApproveButton from "@/components/approve-button.vue";
const isShowConfirm = ref(false)
const selectType = ref('1')
const type1Amount = ref(0)
const type2Amount = ref(0)
const type3Amount = ref(0)
const type4Amount = ref(0)
const isShowApproveButton = ref(false)
const getMintStatics = async () => {
    useShowLoading()
    const res = await useMintStatics()
    type1Amount.value = res.data.first
    type2Amount.value = res.data.second
    type3Amount.value = res.data.third
    type4Amount.value = res.data.fourth
    useCloseLoading()
}
const toConfirmMint = () => {
    isShowConfirm.value = true
}
const payForMint = async () => {
    useShowLoading()
    const priceOfMintUint = await usePriceOfMint(selectType.value)
    const hasApproved = await useCheckAllowance(priceOfMintUint, USDT, store.account, EiffelCore)
    if (!hasApproved) {
        isShowApproveButton.value = true
        useCloseLoading()
        return showNotify({ type: "warning", message: "请先授权" })
    }
    const res = await usePreMint(store.account, priceOfMintUint)
    let cardId: string;
    if (res.isSuccessful) {
        cardId = res.data.card.cardId
        mint(cardId)
    } else {
        useCloseLoading()
        showNotify({ type: "danger", message: res.message })
    }

}
const mint = async (cardId: string) => {
    try {
        useShowLoading()
        store.loadingText = "支付中"
        const tx = await usePayForMint(selectType.value, cardId)
        store.loadingText = "请勿关闭，否则会失败"
        await tx.wait()
        const res = await useMint(cardId)
        if (res.isSuccessful) {
            showNotify({ type: "success", message: "铸造成功" })
        } else {
            showNotify({ type: "danger", message: "铸造失败" })
        }
        await getMintStatics()
        store.isLoading = false

    } catch (e) {
        useCloseLoading()
        showNotify({ type: "danger", message: "铸造失败" })
        console.log(e)
    }
}
onMounted(() => {
    getMintStatics()
})
</script>