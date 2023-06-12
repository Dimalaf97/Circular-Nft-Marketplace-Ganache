import { web3Dependencies } from "@_types/hooks";
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork";
import { hookFactory as createListedNftsHook, UseListedNftsHook } from "./useListedNfts";
import { hookFactory as createOwnedNftsHook, UseOwnedNftsHook } from "./useOwnedNfts";

export type Web3Hooks ={
    useAccount: UseAccountHook;
    useNetwork : UseNetworkHook;
    useListedNfts: UseListedNftsHook;
    useOwnedNfts: UseOwnedNftsHook;

}

export type SetupHooks = {
    (d:web3Dependencies): Web3Hooks
}

export const SetupHooks:SetupHooks=(deps) =>{ //SetupHooks is a function that accept Dependencies(ethereum,provider,contract) and creates Hook functions

    return{
        useAccount: createAccountHook(deps),
        useNetwork: createNetworkHook(deps),
        useListedNfts: createListedNftsHook(deps),
        useOwnedNfts: createOwnedNftsHook(deps)
    }
}