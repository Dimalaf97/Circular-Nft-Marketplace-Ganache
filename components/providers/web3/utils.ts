import { web3Dependencies } from "@_types/hooks";
import { SetupHooks, Web3Hooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers"; //ethers v 5.6.4 

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

// Nullable !! adds | null value to each type
   //type web3Dependencies = {
  //provider: providers.Web3Provider; |null
  //contract: Contract; |null
  //ethereum: MetaMaskInpageProvider; |null



//export type Web3Params = {
   // ethereum: MetaMaskInpageProvider |null; //Now ethereum can be MetaMaskInPageProvider or potentionally  null
  //  provider: providers.Web3Provider | null;
    //contract: Contract |null;
  //}


  export type Web3State = {
    isLoading: boolean; // true while loading web3State
    hooks: Web3Hooks; //Defined and exported at /components/hooks/web3/setupHooks
  } & Nullable<web3Dependencies>

  export const createDefaultState = () =>{
return{

    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true, // Is true by default from above
    hooks:SetupHooks({isLoading:true}as any)

 }

  }
  export const createWeb3State = ({
    ethereum, provider, contract, isLoading
  }: web3Dependencies ) => {
    return {
      ethereum,
      provider,
      contract,
      isLoading,
      hooks: SetupHooks({ethereum, provider, contract,isLoading})
    }
  }
  // We are checking the contract NftMarket.sol For Networks section for ID,ADDRESS

  const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

  export const loadContract = async (
    name: string,  // NftMarket
    provider: providers.Web3Provider
  ): Promise<Contract> => {

    if(!NETWORK_ID){
      return Promise.reject("Network ID is not defined")
    }
    

    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();
    
    if (Artifact.networks[NETWORK_ID].address) {
      const contract = new ethers.Contract(
        Artifact.networks[NETWORK_ID].address,
        Artifact.abi,
        provider
      )
      return contract;
    } else {
      return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
  


  }