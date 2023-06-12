import { useHooks } from "@providers/web3"

export const useAccount = () => {

    const hooks = useHooks();
    const swRes = hooks.useAccount();
    return{
        account: swRes
    }

}

export const useNetwork =() =>{
    const hooks = useHooks();
    const swRes = hooks.useNetwork();

    return {
        network: swRes
    }}

    export const useListedNfts = () => {
        const hooks = useHooks();
        const swrRes = hooks.useListedNfts();
      
        return {
          nfts: swrRes
        }
      }

      export const useOwnedNfts = () => {
        const hooks = useHooks();
        const swrRes = hooks.useOwnedNfts();
      
        return {
          nfts: swrRes
        }
      }
