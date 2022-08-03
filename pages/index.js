import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Balance from "../components/Balance";
import Header from "../components/Header";
import NFT from "../components/NFT";
import Profile from "../components/Profile";
import SendBNB from "../components/SendBNB";
import Transactions from "../components/Transactions";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title> Login page</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-br,teal.400,purple.300)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="whiteAlpha.900">
            Dashboard login
          </Text>
          <Button
            colorScheme="facebook"
            onClick={() =>
              authenticate({
                signingMessage: "Sign in to dashboard",
              })
            }
          >
            Login
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} header={isLoggingOut} />
        <Box flex="1" bg="blue.200" px="44" py="20">
          <Tabs
            size="lg"
            colorScheme="purple"
            align="center"
            variant="enclosed"
          >
            <TabList>
              <Tab fontWeight="bold"> Profile </Tab>
              <Tab fontWeight="bold"> Balance </Tab>
              <Tab fontWeight="bold"> Transactions </Tab>
              <Tab fontWeight="bold"> NFTs </Tab>
              <Tab fontWeight="bold"> Send BNB </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              <TabPanel>
                <Balance user={user} />
              </TabPanel>
              <TabPanel>
                <Transactions user={user}/>  
              </TabPanel>
              <TabPanel>
                <NFT user={user}/>
              </TabPanel>
              <TabPanel>
                <SendBNB user={user}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  );
}
