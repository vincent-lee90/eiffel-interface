import axios from "@/axios"
import Urls from "@/presets/urls"
import { ethers } from "ethers"
interface ApiResponse {
    isSuccessful: boolean
    data: any
    message: any
}
export const useRegister = async (address: string, inviter: string | null): Promise<ApiResponse> => {
    const res = await axios.post(Urls.register, {
        address, inviter
    })
    return (res as unknown as ApiResponse)
}
export const useMintStatics = async (): Promise<ApiResponse> => {
    const res = await axios.get(Urls.mintStatic)
    return res as unknown as ApiResponse
}
export const useMint = async (address: string, mintType: number): Promise<ApiResponse> => {
    const res = await axios.post(Urls.mint, { address, mintType })
    return res as unknown as ApiResponse
}
export const useGetCards = async (address: string): Promise<ApiResponse> => {
    const res = await axios.get(Urls.myCards, { params: { address } })
    res.data.cards = res.data.cards.map((card: any) => {
        card.worth = ethers.formatEther(card.worth)
        return card
    })
    return res as unknown as ApiResponse
}
export const useSplit = async (address: string, cardId: string): Promise<ApiResponse> => {
    const res = await axios.post(Urls.split, { address, cardId })
    return res as unknown as ApiResponse
}
export const usePlay = async (address: string, cardId: string): Promise<ApiResponse> => {
    const res = await axios.post(Urls.playGame, { address, cardId })
    return res as unknown as ApiResponse
}
export const useExchangeList = async (pageIndex: number, pageSize: number): Promise<ApiResponse> => {
    const res = await axios.get(Urls.exchangeList, { params: { pageIndex, pageSize } })
    res.data.cards = res.data.cards.map((el: any) => {
        el.worth = ethers.formatEther(el.worth)
        return el
    })
    return res as unknown as ApiResponse
}
export const useSellInfo = async (): Promise<ApiResponse> => {

}
export const useSell = async (seller: string, cardId: number): Promise<ApiResponse> => {
    const res = await axios.post(Urls.sell, { seller, cardId })
    return res as unknown as ApiResponse
}
export const useBuyInfo = async (): Promise<ApiResponse> => {

}
export const useBuy = async (buyer: string, cardId: number): Promise<ApiResponse> => {
    const res = await axios.post(Urls.buy, { buyer, cardId })
    return res as unknown as ApiResponse
}
export const useHashrateInfo = async (address: string): Promise<ApiResponse> => {
    const res = await axios.get(Urls.hashrateInfo, { params: { address } })
    let { hashrate, availableAmount, mintTotalAmount } = res.data
    hashrate = ethers.formatEther(hashrate)
    availableAmount = ethers.formatEther(availableAmount)
    mintTotalAmount = ethers.formatEther(mintTotalAmount)
    res.data = { hashrate, availableAmount, mintTotalAmount }
    return res as unknown as ApiResponse
}
export const useRewardInfo = async (address: string): Promise<ApiResponse> => {
    const res = await axios.get(Urls.rewardInfo, { params: { address } })
    return res as unknown as ApiResponse
}