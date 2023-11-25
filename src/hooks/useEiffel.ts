export const useSign = async (account: string) => {
    const _window = window as any
    if (!_window.ethereum) {
        return
    }
    const ethereum = _window.ethereum
    const signHash = await ethereum.request({ method: "personal_sign", params: [account, "0x4c6f67696e20696e2045696666656c"] })
    return signHash
}