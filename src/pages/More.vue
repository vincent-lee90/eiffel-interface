<template>
    <div class="px-2 pt-[60px] pb-[62px]">
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
            <van-button class="w-full" plain @click="copyInviteUrl" id="copyToClipboard">
                <div class="flex justify-center items-center bg-transparent"><span class="mr-4">邀请好友</span>
                    <IconCopy class="w-[30px] h-[30px] fill-white" />
                </div>
            </van-button>
        </div>
        <div class="mt-16">
            <div class="mt-4 flex justify-between items-center">
                <div>所属团队</div>
                <div>{{ top.substring(0, 3) + '...' + top.substring(top.length - 4,
                    top.length) }}</div>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <div>我的邀请者（直接上级）</div>
                <div v-if="inviter">{{ inviter.substring(0, 3) + '...' + inviter.substring(inviter.length - 4,
                    inviter.length) }}</div>
            </div>
            <div class="mt-4">
                <div class="flex items-center justify-between">
                    <div>我的受邀者（直推）总人数</div>
                    <div><span>{{ invitees.length }}</span></div>
                </div>
                <div class="py-8">
                    <div class="text-right mb-2" v-for="(invitee, index) in invitees" :key="index">{{ invitee.substring(0,
                        3) + '...' + invitee.substring(invitee.length - 4, invitee.length) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/avatar.vue"
import { IconMint, IconCard, IconHashrate, IconReward, IconCopy } from "@/icons"
import { useRouter } from "vue-router"
import { store, useCloseLoading, useShowLoading } from "@/hooks/store"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import ClipboardJS from 'clipboard'
import { showSuccessToast, showFailToast } from 'vant';
import { useMemberInfo } from "@/hooks/useApi"


const router = useRouter()
const goTo = (n: string) => {
    router.push({ name: n })
}
let clipboard: any = null
const inviteUrl = computed(() => {
    return `${window.location.origin}${window.location.pathname}?inviter=${store.account}`
})
const copyInviteUrl = () => {
    clipboard && clipboard.destroy()
    clipboard = new ClipboardJS('#copyToClipboard', {
        text: () => { return inviteUrl.value }
    })
    clipboard.on('success', () => {
        showSuccessToast(`邀请链接已生成`);
    })
    clipboard.on('error', () => {
        showFailToast('链接生成失败');
    })
}
onBeforeUnmount(() => {
    // 销毁 ClipboardJS
    clipboard && clipboard.destroy()
})
const inviter = ref("")
const invitees = ref<any[]>([])
const top = ref("")
const getMemberInfo = async () => {
    try {
        useShowLoading()
        const res = await useMemberInfo(store.account)
        if (res.isSuccessful) {
            if (res.data.member.inviter) {
                inviter.value = res.data.member.inviter
            }
            if (res.data.member.invitees) {
                console.log(res.data.member.invitees)
                invitees.value = res.data.member.invitees.split(",")
            }
            top.value = res.data.member.top
        } else {
            showFailToast(res.message);
        }
        useCloseLoading()
    } catch (e) {
        console.log(e)
        useCloseLoading()
        showFailToast('获取用户信息失败');
    }

}
onMounted(() => {
    getMemberInfo()
})
</script>
<style scoped>
.icon {
    @apply w-[30px] h-[30px] fill-white;
}
</style>