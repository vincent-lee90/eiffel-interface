<template>
    <span v-if="!store.account">连接钱包</span><span v-else>{{
        store.account.substring(0, 3) + '...' + store.account.substring(store.account.length - 4, store.account.length)
    }}</span>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { store } from "@/hooks/store";
const connectWallet = async () => {
    //@ts-ignore
    let { ethereum } = window
    const enable = await ethereum.enable()
    if (!enable) {
        return console.log('unconnected')
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts.length > 0) {
        store.account = accounts[0]
        console.log(store.account)
    }
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    store.currentChainId = parseInt(chainId, 16).toString()
    ethereum.on('chainChanged', (hexChainId: any) => {
        store.currentChainId = parseInt(hexChainId, 16).toString()
    });
    ethereum.on('accountsChanged', function (accounts: any) {
        console.log(accounts[0])
        store.account = accounts[0]
    })
    /*    let { ethereum } = window
       const enable = await ethereum.enable()
       if (!enable) {
           return console.log('unconnected')
       }
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
       if (accounts.length > 0) {
           store.currentAddress = accounts[0]
           console.log(store.currentAddress)
       }
       ethereum.on('accountsChanged', function (accounts) {
           store.currentAddress = accounts[0]
       })
       const chainId = await window.ethereum.request({ method: 'eth_chainId' });
       store.chainId = parseInt(chainId, 16)
       window.ethereum.on('chainChanged', (hexChainId) => {
           store.chainId = parseInt(hexChainId, 16)
           console.log(store.chainId)
       }); */

}
onMounted(() => {
    connectWallet()
})

</script>