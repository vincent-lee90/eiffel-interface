import { reactive } from "vue"
export const store = reactive(<{ account: string, inviter: string, currentChainId: string, isLoading: boolean, loadingText: string, signHash: string }>{
    account: "",
    inviter: "",
    signHash: "",
    currentChainId: "",
    isLoading: false,
    loadingText: "加载中"
})
export const useShowLoading = () => {
    store.isLoading = true
    store.loadingText = "加载中"
}
export const useCloseLoading = () => {
    store.isLoading = false
    store.loadingText = "加载中"
}