<template>
    <div class="text-center">
        <div id="avatar">
            <img class="w-[100px] h-[100px] rounded-full" :src="imgUrl">
            <div class="mt-8">{{ store.account.substring(0, 7) + '...' + store.account.substring(store.account.length - 5,
                store.account.length) }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { store } from "@/hooks/store"
//@ts-ignore
import Identicon from 'identicon.js';
const imgUrl = ref(``)
const initAvatar = () => {
    const data = new Identicon(store.account, 100).toString();
    imgUrl.value = `data:image/png;base64,${data}`
}
onMounted(() => {
    if (store.account) {
        initAvatar()
    }
})
watch(() => {
    return store.account
}, (newVal) => {
    if (newVal) {
        initAvatar()
    }
})

</script>