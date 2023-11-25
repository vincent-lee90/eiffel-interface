import { reactive } from "vue"
export const store = reactive(<{ account: string, inviter: string, currentChainId: string, isLoading: boolean, signHash: string }>{
    account: "",
    inviter: "",
    signHash: "",
    currentChainId: "",
    isLoading: false
})