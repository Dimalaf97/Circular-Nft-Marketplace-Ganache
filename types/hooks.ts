import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers"
import {SWRResponse} from "swr"
import { NftMarketContract } from "./nftMarketContract";

export type web3Dependencies = {
    provider: providers.Web3Provider;
    contract: NftMarketContract;
    ethereum: MetaMaskInpageProvider;
    isLoading: boolean;
}
// We have to specify every Dynamic Parameter
export type CryptoHookFactory<D=any,R = any, P =any> = { //R for Response  D for Data , P for Parameters
    (d:Partial <web3Dependencies>): CryptoHandlerHook<D,R,P>  //Return Value is the function provided at /components/hooks/web3/useAccounts
}

export type CryptoHandlerHook<D=any,R =any, P =any> = (params?: P) =>CryptoSWRResponse<D,R> //params? makes them optional


export type CryptoSWRResponse<D = any, R =any>=SWRResponse<D> & R;

/*export type CryptoHookFactory<D= any, P=any> = { // D for Data , P for Parameters
   ( d: Partial<web3Dependencies>): (params : P) => SWRResponse<D>
}*/



