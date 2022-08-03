import { Box, Divider, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function NFT({user}){
    const {getNFTBalances, data}=useNFTBalances()
    useEffect( () =>{
        getNFTBalances({
            chain: "bsc testnet",
            address: user.get('ethAddress')
        })
    },[])
    return(
        <CustomContainer>
            <Text><b> My NFTs</b> </Text>
            <Divider/>
            {data && 
                data.result.map(nft =>(
                  <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token_url}>
                    🖼{nft.image && <Image src={nft.image}/>}
                 </Box>      
             ))}
            
        </CustomContainer>
    )
}