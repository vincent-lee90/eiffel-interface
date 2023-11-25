import { createRouter, createWebHashHistory } from "vue-router"
import Index from "@/pages/Index.vue"
import Exchange from "@/pages/Exchange.vue"
import Split from "@/pages/Split.vue"
import Mint from "@/pages/Mint.vue"
import Game from "@/pages/Game.vue"
import More from "@/pages/More.vue"
import MyCards from "@/pages/MyCards.vue"
import Reward from "@/pages/Reward.vue"
import Hashrate from "@/pages/Hashrate.vue"
const routes = [
    {
        path: "/", redirect: { name: 'index' }
    }, {
        path: "/index", component: Index, name: "index"
    }, {
        path: "/exchange", component: Exchange, name: "exchange"
    }, {
        path: "/split", component: Split, name: "split"
    }, {
        path: "/mint", component: Mint, name: "mint"
    }, {
        path: "/game", component: Game, name: "game"
    }, {
        path: "/more", component: More, name: "more"
    }, {
        path: "/my-cards", component: MyCards, name: "myCards"
    }, {
        path: "/reward", component: Reward, name: "reward"
    }, {
        path: "/hashrate", component: Hashrate, name: "hashrate"
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})