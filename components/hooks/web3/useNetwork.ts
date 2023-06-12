




import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS: {[k: string]: string} = { //Mapping of Networks
    1:"Ethereum MainNetwork",
    1337:"Ganache TestNetwork",
    5:"Goerli TestNetwork",
    11155111:"Sepolia TestNetwork",
    591401:"Linea TestNetwork",
}

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string;// Takes info from.env.develpment for the target netwrok i have provided as 
const targetNetwork = NETWORKS[targetId];

type UseNetworkResponse = {
    isLoading: boolean;
    isSupported: boolean; //Tell us if the network we are connecte is supported
    targetNetwork: string; //It tells me What is the correct network so i can communicate with the smart
    isConnectedToNetwork: boolean;
  }

  type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

  export type UseNetworkHook = ReturnType<NetworkHookFactory>
  



  export const hookFactory: NetworkHookFactory = ({provider, isLoading}) => () => {
    const {data, isValidating, ...swr} = useSWR(
      provider ? "web3/useNetwork" : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId; //Function to see which network we are connected (! we are sure it is not undifined)

        if (!chainId) {
            throw "Cannot retreive network. Please, refresh browser or connect to other one."
          }
    
          return NETWORKS[chainId];
        }, {
          revalidateOnFocus: false
        }
      )
      const isSupported = data === targetNetwork;

     return {
        ...swr,
        data,
         isValidating,
         targetNetwork,
          isSupported,
          isConnectedToNetwork: !isLoading && isSupported,
           isLoading: isLoading as boolean,
  };
}