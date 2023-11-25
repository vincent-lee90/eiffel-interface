

<template>
    <div>
        <van-overlay :show="store.isLoading">
            <div class="flex items-center justify-center h-full" @click.stop>
                <van-loading></van-loading>
            </div>
        </van-overlay>
        <div>
            <NavTop v-show="isShowNavTop" />
        </div>
        <div class="px-2 pt-[60px] pb-[62px]">
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
import { useSign } from "./hooks/useEiffel";
import { useRegister } from "./hooks/useApi"
import { watch, computed } from "vue";
import { store } from "@/hooks/store"
const isShowNavTop = computed(() => {
    const name = useRoute().name
    const includeNames = ["index", "exchange", "split", "mint", "game","hashrate"]
    return includeNames.indexOf((name as string)) > -1
})
const register = () => {
    useRegister(store.account, store.inviter)
}
const sign = async () => {
    const hash = await useSign(store.account)
    store.signHash = hash
    console.log(hash)
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
<style scoped>

</style>
