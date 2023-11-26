<template>
    <div id="countUp"></div>
</template>
<script setup lang="ts">
import { CountUp } from 'countup.js';
import { onMounted } from 'vue'

onMounted(() => {
    const el: any = document.getElementById("countUp")
    const countUp = new CountUp(el, 555.12, { decimalPlaces: 2 });
    countUp.start()
})
</script>