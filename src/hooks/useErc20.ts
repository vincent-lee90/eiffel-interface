import ERC20ABI from "@/presets/abis/erc20.json"
import { rpc } from "@/presets/constants"
import { ethers } from "ethers"
export const useApprove = async (tokenAddress: string, spender: string, amount: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const provider = new ethers.BrowserProvider(_window.ethereum)
    const signer = await provider.getSigner()
    const erc20 = new ethers.Contract(tokenAddress, ERC20ABI, signer)
    const tx = await erc20.approve(spender, amount)
    return tx
}
export const useBalance = async (account: string, token: string) => {
    const provider = new ethers.JsonRpcProvider(rpc)
    const erc20 = new ethers.Contract(token, ERC20ABI, provider)
    const balanceUint = await erc20.balanceOf(account)
    const balance = ethers.formatEther(balanceUint)
    return parseFloat(balance).toFixed(4);
}
export const useAllowance = async (tokenAddress: string, owner: string, spender: string) => {
    const provider = new ethers.JsonRpcProvider(rpc)
    const erc20 = new ethers.Contract(tokenAddress, ERC20ABI, provider)
    const allowanceUint = await erc20.allowance(owner, spender)
    return allowanceUint
}
export const useCheckAllowance = async (target: string, tokenAddress: string, owner: string, spender: string) => {
    const allowance = await useAllowance(tokenAddress, owner, spender)
    return BigInt(allowance) > BigInt(target)

}