

<template>
    <div>
        <van-overlay :show="store.isLoading" z-index="10000">
            <div class="flex items-center justify-center h-full" @click.stop>
                <div class="text-center">
                    <div class="mb-2">{{ store.loadingText }}</div>
                    <van-loading></van-loading>
                </div>

            </div>
        </van-overlay>
        <div>
            <NavTop v-show="isShowNavTop" />
        </div>
        <div class="">
            <router-view></router-view>
        </div>
        <div>
            <MainMenu />
        </div>
    </div>
</template>
<script setup lang="ts">
import NavTop from "@/components/nav-top.vue";
import MainMenu from "@/components/main-menu.vue"
import { useRoute } from "vue-router"
import { useRegister } from "./hooks/useApi"
import { useResolveSearchParams } from "@/hooks/useUtils"
import { watch, computed } from "vue";
import { store } from "@/hooks/store"
import { useSign } from "./hooks/useEiffelCore";
const isShowNavTop = computed(() => {
    const name = useRoute().name
    const includeNames = ["index", "exchange", "split", "mint", "game", "hashrate", "myCards"]
    return includeNames.indexOf((name as string)) > -1
})
const register = () => {
    const params = useResolveSearchParams()
    if (params.inviter) {
        store.inviter = params.inviter
    }
    useRegister(store.account, store.inviter, store.signHash)
}
const sign = async () => {
    const hash = await useSign(store.account)
    store.signHash = hash
    register()
}
watch(() => {
    return store.account
}, (newVal) => {
    if (newVal) {
        sign()
    }
})
</script>
<style scoped></style>