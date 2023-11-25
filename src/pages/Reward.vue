<template>
    <div>
        <div class="py-4">
            <div>开公司流水奖励</div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="999"></van-rolling-text>
            </div>
        </div>
        <van-divider />
        <div class="py-4">
            <div>商群扶持</div>
            <div class="text-right">
                <van-rolling-text :start-num="0" :target-num="999"></van-rolling-text>
            </div>
        </div>
        <van-divider />
    </div>
    <div>
        <div>
            今日流水
        </div>
        <div class="text-right">
            <van-rolling-text :start-num="0" :target-num="30000"></van-rolling-text>
        </div>
    </div>
    <van-divider />
    <div>
        <div class="text-center">我的团队(直推)</div>
        <div class="py-4">
            <div class="flex justify-between items-center">
                <div class="w-1/2 text-center">地址</div>
                <div class="w-1/2 text-center">流水</div>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="w-1/2 text-center">0x2222222222222222222</div>
                <div class="w-1/2 text-center">888</div>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="w-1/2 text-center">0x2222222222222222222</div>
                <div class="w-1/2 text-center">888</div>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="w-1/2 text-center">0x2222222222222222222</div>
                <div class="w-1/2 text-center">888</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.van-rolling-text {
    color: white;
    font-size: 16px;
}
</style>