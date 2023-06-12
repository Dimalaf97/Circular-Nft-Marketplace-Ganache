

//So whenever we're be able to call  useAccount, you call this function this will call that internally
//use swr and this will return your whatever data you are returning in the return here.


import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse> // specifying the data that return at the end return.


export type UseAccountHook = ReturnType<AccountHookFactory>

// Const hookFactory is responsible for creating our hooks  ||()=> () => function that returns function
// the second () is providing the hook itself
//dependencies and data from web3State -> deps-> provider, ethereum, contract (web3State)

export const hookFactory: AccountHookFactory = ({provider, ethereum,isLoading}) => () => {
  const {data, mutate,isValidating, ...swr} = useSWR( //We are calling isValidating and its true whenever we aretrieving new data from the hook functions
    provider ? "web3/useAccount" : null,
    async () => { // gets List of the accounts(String) of the wallet you are connected to
      const accounts = await provider!.listAccounts(); // ListcAcounts is a promise 
      const account = accounts[0];
      //Re-validate itself to change the address if the account changes
    
      

      if (!account) {
        throw "Cannot retreive account! Please, connect to web3 wallet."
      }

      return account;
    }, {
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  )
//When Change accounts While connected with a web3 wallet
  useEffect(() => {
    ethereum?.on("accountsChanged",handleAccountsChanged);
    return () => {
        ethereum?.removeListener("accountsChanged",handleAccountsChanged);
        
        

       
    }
  }
  )
// args is used to note that you can have any type of parameters there (when you don`t know the type of the parameters)
const handleAccountsChanged = (...args: unknown[]) => {
  const accounts = args[0] as string[];
  if (accounts.length === 0) {
    console.error("Please, connect to Web3 wallet");
  } else if (accounts[0] !== data) {
    mutate(accounts[0]);
  }
}

  const connect = async () => {
    try {
      ethereum?.request({method: "eth_requestAccounts"});
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swr,
    data,
    isValidating,
    isLoading: isLoading as boolean, //we are getting as depedencies from up, as boolean (bypass the undefined  error) 
    isInstalled: ethereum?.isMetaMask || false, //Ismetamask tells us if there is metamask installed in our browser(default as false)
    mutate,
    connect
  };
}