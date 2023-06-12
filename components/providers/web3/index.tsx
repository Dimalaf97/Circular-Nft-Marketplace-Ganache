

//Provider's CreationS

import { createContext, FunctionComponent, useContext, useEffect, useState } from "react"
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NftMarketContract } from "@_types/nftMarketContract";

function pageReload(){
  window.location.reload(); //Function so the network can change without Reloading
}

const handleAccount = (ethereum:MetaMaskInpageProvider) => async() =>{ //Function that returns function to * ->
 const isLocked = !(await ethereum._metamask.isUnlocked());

}

 //We call 2 events
  //One is the global one handling the case only when the user isLocked in Metamask to reload the page.
  //  Another one is to change the user reactively with mutate, which is available only in the hook.


const setGlobalListeners = (ethereum:MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged",handleAccount(ethereum)); // * He ->re and doesn`t returns Void && we can pass along the depedencies
}

const removeGlobalListeners= (ethereum:MetaMaskInpageProvider) =>{
  ethereum?.removeListener("chainChanged",pageReload); //ethereum? Maybe ethereum is undefined (bypass error when a browser doesn`t have a web3Wallet)
  ethereum?.on("accountsChanged",handleAccount(ethereum));
}


// Creating the context
const Web3Context = createContext<Web3State>(createDefaultState()); //Initial Data to be injected to Components

// Creating the Provider
const Web3Provider: FunctionComponent = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);// Assign as any type so i can push it ot provider 
        const contract =  await loadContract("NftMarket", provider); //Await because it is async function.

        const signer = provider.getSigner(); //We need to sign to make a transcaction
        const signedContract = contract.connect(signer);
       //Small delay
        setTimeout(() => setGlobalListeners(window.ethereum), 500);
 
        setWeb3Api(createWeb3State({ //Give us access to window etherum throughout the server
          ethereum: window.ethereum,
          provider,
          contract: signedContract as unknown as NftMarketContract,
          isLoading: false
        }))
      } catch(e: any) {
        console.error("Please, install a web3 wallet(Example:Metamask)");
                                             //We call this function to iniatilize the hook function
        setWeb3Api((api) => createWeb3State({ //Providing the callback Function as a step through API.//Callback Function params gets previous data fron an API.
          ...api as any,
          isLoading: false,
        }))
      }
    }

    initWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, [])
 
 
  return ( // Wrapping all the children Like Navigation Bar, All pages, Etc.
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider> // Value is the data provided to all chlidren!
  )
}

export function useWeb3() {
  return useContext(Web3Context); // We need to use the context so the Data above to be provided.
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;