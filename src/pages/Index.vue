<template>
    <div class="mx-[-0.5rem]">
        <div class="text-center text-[50px] pt-32 first ">
            <div>
                Explore,Buy and Sell the <span class="default-gradient">Best NFTs!</span>
            </div>
            <div class="mt-8 flex flex-col items-center">
                <div class="w-[160px]">
                    <van-button type="primary" block square>Explore</van-button>
                </div>
                <div class="w-[160px] mt-4">
                    <van-button plain block square>Mint</van-button>
                </div>

            </div>
            <div>
                <div class="pb-32 mt-16 w-[256px] mx-auto">
                    <img src="/nfts/nft-example.png" class="w-[256px] h-[256px]" />
                    <div class="bg-white p-4 flex items-center justify-center">
                        <van-button type="primary" square class="w-1/2">购买卡牌</van-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-64 text-center text-[45px]">
            NFT拆分
        </div>
        <div class="py-64 text-center text-[45px]">
            游戏
        </div>
        <div class="bg-[#251928] px-2 pt-16">
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
</style>