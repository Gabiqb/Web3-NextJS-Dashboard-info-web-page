import { Divider, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Transactions({user}){

    const Web3Api=useMoralisWeb3Api()
    const BASE_URL="https://testnet.bscscan.com/tx/"
    const [transactions, setTransactions] = useState('')
    const fetchTransactions = async () =>{
        const data =await Web3Api.account.getTransactions({
            chain: "bsc testnet",
            address: user.get('ethAddress'),
            limit:5
        })
        if(data){
            setTransactions(data.result)
        }
    }
    useEffect(()=>{
        fetchTransactions()
    },[])
    return(
        <CustomContainer>
            <Text fontSize="xl" mb="6" fontWeight="bold"> <b> My latest 5 transactions</b></Text>
            <Divider />
            {transactions && transactions.map(transaction=>(
                <div key={transaction.hash}>
                    <Link href={`${BASE_URL}${transaction.hash}`}>➡&nbsp; {transaction.hash}</Link> 
                </div>
            ))}
        </CustomContainer>
    )
}