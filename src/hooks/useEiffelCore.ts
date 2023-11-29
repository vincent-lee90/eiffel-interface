import { EiffelCore } from "@/presets/constants"
import EiffelCoreABI from "@/presets/abis/eiffelCore.json"
import { ethers } from "ethers"
export const useSign = async (account: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const ethereum = _window.ethereum
    const signHash = await ethereum.request({ method: "personal_sign", params: [account, "0x4c6f67696e20696e2045696666656c"] })
    return signHash
}
export const usePayForMint = async (mintType: string, cardId: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const provider = new ethers.BrowserProvider(_window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(EiffelCore, EiffelCoreABI, signer)
    const tx = await contract.mint(mintType, cardId)
    return tx
}
export const usePayForBuy = async (seller: string, buyer: string, cardId: number | string, price: string, message: string, seed: string, signature: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const provider = new ethers.BrowserProvider(_window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(EiffelCore, EiffelCoreABI, signer)
    const tx = await contract.buy(seller, buyer, cardId, price, message, seed, signature)
    return tx
}
export const usePayForSell = async (seller: string, cardId: string | number, inviter: string, totalFeeAmount: string, feeTo: string, message: string, seed: string, signature: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const provider = new ethers.BrowserProvider(_window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(EiffelCore, EiffelCoreABI, signer)
    const tx = await contract.sell(seller, cardId, inviter, totalFeeAmount, feeTo, message, seed, signature)
    return tx
}
export const useClaim = async (receiver: string, amount: string, message: string, seed: string, signature: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const provider = new ethers.BrowserProvider(_window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(EiffelCore, EiffelCoreABI, signer)
    const tx = await contract.claimEiffel(receiver, amount, message, seed, signature)
    return tx
}
export const usePriceOfMint = async (mintType: number | string) => {
    /* const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const ethereum = _window.ethereum
    const contract = new ethers.Contract(EiffelCore, EiffelCoreABI, ethereum) */
    if (mintType == 1) {
        return "100000000000000000000"
    } else if (mintType == 2) {
        return "200000000000000000000"
    } else if (mintType == 3) {
        return "500000000000000000000"
    }
    else if (mintType == 4) {
        return "1000000000000000000000"
    }
    return "0"
}