import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Profile({ user }) {
  const [input, setInput] = useState("");
  const {setUserData,isUserUpdating}=useMoralis()
  return (
    <CustomContainer>
      <Text>
        <b>🙂 Username: </b>
        {user.getUsername()}
      </Text>
      <Text>
        <b>💲 Wallet address: </b>
        {user.get("ethAddress")}
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() !== "") {
             setUserData({
                username: input
             })
          }
        }}
      >
        <FormControl mt="6" mb="6">
          <FormLabel htmlFor="username">Set a new username</FormLabel>
          <Input
            id="username"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ex. theJohns"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" disable={isUserUpdating}>
          ✅&nbsp; Change Username
        </Button> 
        {/*nbsp is a space char */}
      </form>
    </CustomContainer>
  );
}
