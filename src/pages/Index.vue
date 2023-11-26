<template>
    <div class="pt-[60px] ">
        <div class="text-center text-[50px] pt-32 px-4  first">
            <div>
                <div>探索</div>
                <div>购买或出售</div>
                <div class="default-gradient">Best NFTs!</div>
            </div>
            <div class="mt-8 flex flex-col items-center">
                <div class="w-[160px]">
                    <van-button type="primary" block square @click="goTo('exchange')">探索</van-button>
                </div>
                <div class="w-[160px] mt-4">
                    <van-button plain block square @click="goTo('mint')">铸造</van-button>
                </div>

            </div>
            <div>
                <div class="pb-32 mt-16 w-[256px] mx-auto shadow-lg">
                    <img src="/nfts/nft-example.png" class="w-[256px] h-[256px]" />
                    <div class="bg-white text-black text-xl p-4 flex items-center justify-center">
                        拥有者：@Eiffel
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4 introduce-section">
            <div class=" px-2 min-h-[400px] rounded-xl pt-48 pb-16">
                <div class="text-[25px] default-gradient mb-4">巴黎数藏</div>
                <div class="mb-4">
                    代币（EF） → 平台→ NFT（卡牌）
                </div>
                <div class="pb-16">
                    巴黎数藏+NFT生态强势登陆 值得期待
                    巴黎数藏 赋能
                    web3.0,去中心化、点对点交易、分布式管理、平台无任何沉淀资金,基础上开创创新，并赋能全球八亿中
                    小微企业与个人，资产管理，解决负债，数字化转型，买数据，卖数据，实体数据确权，数字版权，商群扶持、数据托底，链接实体，协同合作(防中小微企业与个体亏损)机制等等!
                    解决了历史玩法诸多弊端痛点，注定成为数字化转型领域的常青树🌲
                </div>
                <div class="backdrop-blur bg-white/20 p-4 rounded-md">
                    发行量:1亿枚
                    底 池:500万枚
                    （底池锁死，丢权限）
                    早期空投:500万枚（剩余全部销毁）
                    生 态:9千万枚
                    买 卖: 5%
                    LP分红: 2%
                    市场奖励: 1%
                    联 创: 2%
                </div>
            </div>
        </div>
        <div class="px-4">
            <div class="spilit-section px-2 min-h-[400px] mt-8 rounded-xl">
                <div class="text-center text-[30px] pt-12 flex items-center justify-center  leading-[40px]">
                    <IconSplit class="w-[40px] h-[40px] fill-white" />
                    <span class="ml-2">卡牌</span>
                    <span class="default-gradient">拆分</span>
                </div>
                <div class="px-8 text-center mt-12">
                    拆分规则
                </div>
                <div class="px-8 mt-4 text-center break-all text-gray-300">
                    <div>拥有卡牌</div>
                    <div>卡牌价值大于1000USDT</div>
                    <div>24小时拆分一次</div>
                </div>
                <div class="text-center mt-8">
                    <van-button round plain class="w-[180px]" @click="goTo('split')">立刻拆分</van-button>
                </div>
                <div class="relative mt-12 h-[200px]">
                    <img src="/nfts/nft-example.png"
                        class="absolute left-[calc(50%-50px)] top-[40px] w-[100px] h-[100px] split-img" />
                    <img src="/nfts/nft-example.png"
                        class="absolute left-[calc(50%-50px)] top-[40px]  w-[100px] h-[100px] split-img" />
                    <img src="/nfts/nft-example.png"
                        class="absolute left-[calc(50%-50px)] top-[40px] w-[100px] h-[100px] split-img" />
                </div>
            </div>
        </div>
        <div class="px-4">
            <div class="game-section px-2  mt-8 rounded-xl">
                <div class="text-center text-[30px] pt-12 flex items-center justify-center leading-[40px]">
                    <IconGame class="w-[40px] h-[40px] fill-white " />
                    <span class="ml-2">盲盒</span>
                    <span class="default-gradient">游戏</span>
                </div>
                <div class="px-8 text-center mt-12 text-[20px]">
                    一玩币赚
                </div>
                <div class="px-8 mt-4 text-center break-all text-gray-300">
                    <div>持有卡牌</div>
                    <div>卡牌价值大于500USDT</div>
                </div>
                <div class="text-center mt-8">
                    <van-button round plain class="w-[180px]" @click="goTo('game')">开始游戏</van-button>
                </div>
                <div class="relative w-full h-[120px] text-center  mt-8 overflow-hidden">
                    <div
                        class="absolute top-[30px] left-[50px] w-[100px] h-[120px] p-4 border-solid border-b-0 rounded-md border border-gray-500 break-all game-reward">
                        获得1.5-5倍算力
                    </div>
                    <div
                        class="absolute top-[30px] right-[50px] w-[100px] h-[120px] p-4 border-solid border-b-0 rounded-md border  border-gray-500 break-all game-reward ">
                        卡牌翻倍
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-[#251928] px-2 pt-16 mt-16 pb-[62px]">
            <div class="text-[30px]  py-8">Eiffel</div>
            <div class="text-slate-400">
                <div class="py-2">关于我们</div>
                <div class="py-2">Live</div>
                <div class="py-2">Autions</div>
                <div class="py-2">活动</div>
            </div>
            <van-divider />
            <div class="text-center py-8">all rights reserved@2023</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { IconSplit, IconGame } from '@/icons';
import { useRouter } from 'vue-router';
const router=useRouter()
const goTo=(_n:string)=>{
    router.push({name:_n})
}
</script>
<style scoped>
.default-gradient {
    background: linear-gradient(to right, #FFCE4E, rgb(85, 161, 255));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.first {
    background-image: url("/bg/Patern.png");
    background-size: cover;
}

.introduce-section {
    background: url("/bg/introduce.png") no-repeat;
    background-size: 100% 100%;
}

.spilit-section {
    background: radial-gradient(120% 180% at 50% 200%, rgba(255, 0, 165, .7), rgba(0, 0, 0, .4));
}

.game-section {
    background: radial-gradient(120% 180% at 50% 200%, rgba(0, 132, 248, .7), rgba(0, 0, 0, .4));
}


.split-img {
    opacity: 0;
}

.split-img:nth-child(1) {
    animation: pulse 6s linear infinite;
}

.split-img:nth-child(2) {
    animation: translateLeft 6s linear infinite;
}

.split-img:nth-child(3) {
    animation: translateRight 6s linear infinite;
}

@keyframes translateLeft {
    0% {
        opacity: 0;
        transform: translateX(0);
    }

    20% {
        opacity: 1;
    }

    50% {
        transform: translateX(-100px);
        opacity: 1;
    }

    100% {
        transform: translateX(-100px);
        opacity: 1;
    }
}

@keyframes translateRight {
    0% {
        opacity: 0;
        transform: translateX(0);
    }

    20% {
        opacity: 1;
    }

    50% {
        transform: translateX(100px);
        opacity: 1;
    }

    100% {
        transform: translateX(100px);
        opacity: 1;
    }
}

@keyframes pulse {

    0%,
    80%,
    100% {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }
}

.game-reward:nth-child(1) {
    animation: gameBounce 3s infinite;
}

.game-reward:nth-child(2) {
    animation: gameBounce 3s infinite;
    animation-delay: 500ms;
}

@keyframes gameBounce {

    0%,
    100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: none;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}
</style>