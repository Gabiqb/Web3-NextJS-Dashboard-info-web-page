import { Divider, Text } from "@chakra-ui/react";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Balance({user}){
     // using the web3moralis api for fetching address data}
    const Web3Api = useMoralisWeb3Api()
    // already defined fetchERC20Balances from Moralis
    const {fetchERC20Balances, data} = useERC20Balances()
    //store the balance on local storage
    const [ethBalance, setEthBalance] = useState(0)
    const fetchNativeBalance = async () =>{
        const result = await Web3Api.account.getNativeBalance({
            chain: "bsc testnet",
            address: user.get('ethAddress')
        }).catch(e=> console.log(e))
        if(result.balance){
            setEthBalance(Moralis.Units.FromWei(result.balance))
        }
    }
    useEffect(()=>{
        fetchNativeBalance()
        //fetch all token balances from the user address
        fetchERC20Balances({
            params: {
                chain: "bsc testnet",
                address: user.get('ethAddress')
            }
        })
    },[])
 
    return(
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold"> My BNB Balance</Text>
            {ethBalance && <Text>💰&nbsp; {ethBalance} <b> BNB </b></Text>}
            <Divider />
            <h1> <b>Token Balances</b></h1>
          
            {data && data.map(token=>(
                <div key={token.symbol}>
                    <Text>💰&nbsp; 
                           {Moralis.Units.FromWei(token.balance)}  
                                                      <b> {token.symbol} </b></Text>
                </div>
            ))}
        </CustomContainer>    
        
    )
}