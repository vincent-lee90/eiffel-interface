<template>
    <div class="text-center">
        <div id="avatar"></div>
        <div class="mt-8">{{  store.account.substring(0, 7) + '...' + store.account.substring(store.account.length - 5, store.account.length) }}</div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { store } from "@/hooks/store"
const Jazzicon = require('jazzicon');
const diameter = 100

const initAvatar = () => {
    const seed = parseInt(store.account.slice(2, 10), 16)
    const _avatar = Jazzicon(diameter, seed)
    const container = document.querySelector("#avatar") as Element
    const firstChild = container.firstChild
    firstChild && container.removeChild(firstChild)
    container.appendChild(_avatar)
}
onMounted(() => {
    initAvatar()
})
watch(() => {
    return store.account
}, (newVal) => {
    if (newVal) {
        initAvatar()
    }
})

</script>