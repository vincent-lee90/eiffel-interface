<template>
    <van-button type="primary" square @click="approve">授权{{ name }}</van-button>
</template>
<script setup lang="ts">
import { maximumAllowance } from '@/presets/constants'
import { useApprove } from '@/hooks/useERC20';
import { showNotify } from "vant"
import { computed } from 'vue'
import { store } from '@/hooks/store';
const props = defineProps(["tokenAddress", "name", "spender"])
const emits = defineEmits(["approved"])
const name = computed(() => {
    return props.name
})
const approve = async () => {
    try {
        store.isLoading = true
        const tx = await useApprove(props.tokenAddress, props.spender, maximumAllowance)
        await tx.wait()
        emits("approved")
        showNotify({ type: "success", message: `授权成功,${tx.hash}` })
        store.isLoading = false
    } catch (e) {
        store.isLoading = false
        showNotify({ type: "danger", message: "授权失败" })
    }
}
</script>