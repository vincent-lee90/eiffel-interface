<template>
    <div class="pt-32 px-2 pt-[60px] pb-[62px]">
        <div>
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
            <van-button type="primary" class="w-[200px]" square block @click="toConfirmMint">开始铸造</van-button>
        </div>
        <van-dialog v-model:show="isShowConfirm" show-cancel-button @confirm="mint">
            <div class="py-8 px-4">是否确定铸造？</div>
        </van-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { IconUSDT } from "@/icons";
import { showNotify } from "vant"
import { useMintStatics, useMint } from "@/hooks/useApi";
import { store } from "@/hooks/store";
const isShowConfirm = ref(false)
const selectType = ref('1')
const type1Amount = ref(0)
const type2Amount = ref(0)
const type3Amount = ref(0)
const type4Amount = ref(0)
const getMintStatics = async () => {
    const res = await useMintStatics()
    type1Amount.value = res.data.first
    type2Amount.value = res.data.second
    type3Amount.value = res.data.third
    type4Amount.value = res.data.fourth
}
const toConfirmMint = () => {
    isShowConfirm.value = true
}
const mint = async () => {
    try {
        store.isLoading = true
        const res = await useMint(store.account, parseInt(selectType.value))
        if (res.isSuccessful) {
            showNotify({ type: "success", message: "铸造成功" })
        } else {
            showNotify({ type: "danger", message: "铸造失败" })
        }
        await getMintStatics()
        store.isLoading = false

    } catch (e) {
        store.isLoading = false
        showNotify({ type: "danger", message: "铸造失败" })
        console.log(e)
    }
}
onMounted(() => {
    getMintStatics()
})
</script>