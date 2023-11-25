<template>
    <div class="fixed left-0 bottom-0 text-white flex justify-around w-full items-center fill-white bg-black/40 backdrop-blur py-4  rounded-full">
        <div @click="goTo('index')" :class="{ 'active': activeRouteName == 'index' }">
            <IconHome class="w-[25px] h-[25px] " />
        </div>
        <div @click="goTo('exchange')" :class="{ 'active': activeRouteName == 'exchange' }">
            <IconNFT class="w-[25px] h-[25px]" />
        </div>
        <div @click="goTo('split')" :class="{ 'active': activeRouteName == 'split' }">
            <IconSplit class="w-[25px] h-[25px]" />
        </div>
        <div @click="goTo('game')" :class="{ 'active': activeRouteName == 'game' }">
            <IconGame class="w-[25px] h-[25px]" />
        </div>
        <div @click="goTo('more')" :class="{ 'active': activeRouteName == 'more' }">
            <IconMore class="w-[25px] h-[25px]" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { IconHome, IconNFT, IconSplit, IconGame, IconMore } from '@/icons';
import { useRoute, useRouter } from 'vue-router';
import { computed } from "vue"
const router = useRouter()
const route = useRoute()
const goTo = (_name: string) => {
    router.push({ name: _name })
}
const activeRouteName = computed(() => {
    return route.name
})
</script>
<style scoped>
.active {
    @apply fill-blue-500;
}
</style>
