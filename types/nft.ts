
export type Trait = "Location" | "Type" |"Size" | "Material" | "Purpose";

export type NftAttribute = {
  trait_type: Trait;
  value: string;
}

export type NftMeta = {
  name: string;
  description: string;
  image: string;
  attributes: NftAttribute[];
}
export type NftCore = {
  tokenId: number;
  price: number;
  creator: string;
  isListed: boolean
}

export type Nft = {
  meta: NftMeta
} & NftCore

export type FileReq = {
  bytes: Uint8Array;
  contentType: string;
  fileName : string;
}

export type pinataRes = {
  IpfsHash: string;
  TimeStamp:string;
  isDuplicate:boolean;
}