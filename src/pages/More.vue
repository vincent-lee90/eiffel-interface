<template>
    <div>
        <div class="h-[30vh] flex justify-center items-center">
            <div>
                <Avatar />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-8">
            <div class="bg-color2nd py-8 px-4 rounded-xl flex justify-between items-center" @click="goTo('hashrate')">
                算力
                <IconHashrate class="icon" />
            </div>
            <div class="bg-color2nd py-8 px-4 rounded-xl flex justify-between items-center" @click="goTo('myCards')">
                我的卡牌
                <IconCard class="icon" />
            </div>
            <div class="bg-color2nd py-8 px-4 rounded-xl flex justify-between items-center" @click="goTo('reward')">
                我的奖励
                <IconReward class="icon" />
            </div>
            <div class="bg-color2nd py-8 px-4 rounded-xl flex justify-between items-center" @click="goTo('mint')">
                铸造卡牌
                <IconMint class="icon" />
            </div>
        </div>
        <div class="mt-16">
            <van-button class="w-full" plain>
                <div class="flex justify-center items-center bg-transparent"><span class="mr-4">邀请好友</span>
                    <IconCopy class="w-[30px] h-[30px] fill-white" />
                </div>
            </van-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/avatar.vue"
import { IconMint, IconCard, IconHashrate, IconReward, IconCopy } from "@/icons"
import { useRouter } from "vue-router"
const router = useRouter()
const goTo = (n: string) => {
    router.push({ name: n })
}
</script>
<style scoped>
.icon {
    @apply w-[30px] h-[30px] fill-white;
}
</style>