import { Button, Divider, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from "@chakra-ui/react";
import Moralis from "moralis";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function SendBNB(){
    const [amount, setAmount] = useState(0)
    const [receiver, setReceiver] = useState("")
    const handleChange = function (value) { setAmount(value)}
    const toast = useToast()
    const {fetch, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(parseFloat(amount)) ,
        receiver: receiver,
        type: 'native'
    })
    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">SEND BNB </Text>
            <Divider />
            <form onSubmit={async e =>{
                e.preventDefault()
                await Moralis.enableWeb3()
                fetch({
                    onSuccess: () => {
                       toast({
                         title: 'BNB successfully sent!',
                         description: 'The receiver will get the BNB soon.',
                         duration: 9000,
                         isClosable: true
                       })
                    },
                    onError: ()=>{
                        toast({
                            title: 'Error',
                            description: 'receiver is required',
                            status: 'error',
                            duration: 2000,
                            isClosable: true
                        })
                    }
                })
                }
            }>
                <FormControl mt="4" >
                    <FormLabel htmlFor="amount">
                         Amount of BNB: 
                    </FormLabel>
                    <NumberInput step={0.1} min={0.0001}>
                        <NumberInputField id="amount" value={amount} onChange={handleChange} placeholder="ex 0.01"/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <FormLabel mt="4" htmlFor="receiver">
                         Send To: 
                    </FormLabel>
                    <Input id="receiver"  value={receiver} placeholder="address" onChange={e=> setReceiver(e.target.value)}  />
                </FormControl>
                <Button mt="4" type="submit" colorScheme="purple" disable={isFetching}>
                     Send BNB
                </Button>
            </form>
        </CustomContainer>
    )
}