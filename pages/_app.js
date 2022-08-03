import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MoralisProvider
        serverUrl="https://rjsaakmvc3go.usemoralis.com:2053"
        appId="gREqw7haLHJtwNaBDkMRgIaUUSCAg3zdhyZTmAU5"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
