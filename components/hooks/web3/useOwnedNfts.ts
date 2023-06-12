import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";
import { Nft } from "@_types/nft";
import { ethers } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<void>}

 type OwnedNftsHookFactory = CryptoHookFactory<any, UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useOwnedNfts" : null,
    async () => {
      const nfts = [] as Nft[];
     const coreNfts = await contract!.getOwnedNfts();

     for (let i = 0; i < coreNfts.length; i++) {
      const item = coreNfts[i];
      const tokenURI = await contract!.tokenURI(item.tokenId);
      const metaRes = await fetch(tokenURI);
      const meta = await metaRes.json();

      nfts.push({
        price: parseFloat(ethers.utils.formatEther(item.price)),
        tokenId: item.tokenId.toNumber(),
        creator: item.creator,
        isListed: item.isListed,
        meta
      })
    }
    
      return nfts;
    }
  )

  //Function to list your nfts on sale from your owned nfts (from profile)
  //useCallBack so it can enter only one time for better perfomance
  const _contract = contract;
  const listNft = useCallback( async (tokenId: number, price: number) => {
    try {
      const result = await _contract!.placeNftOnSale(
        tokenId,  
        ethers.utils.parseEther(price.toString()),
        {
          value: ethers.utils.parseEther(0.025.toString())
        }
      )

      
      await  toast.promise(
        result!.wait(),{
          pending: "Processing Transaction .",
          success:"Item has been listed succesfully",
          error : "Error!"
        }
      )


    } catch (e: any) {
      console.error(e.message);
    }
  },[_contract])

  return {
    ...swr,
    listNft,
    data: data || [],
  };
}