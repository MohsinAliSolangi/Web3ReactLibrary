import { useState } from 'react'
import './App.css'
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'





function App() {

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();
  const { library } = useWeb3React();


  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x1",
                rpcUrls: ["https://eth.drpc.org"],
                chainName: "Harmony Mainnet",
                nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
                blockExplorerUrls: ["https://explorer.harmony.one"],
                iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
              }
            ],
          });
        } catch (error) {
           console.error(error)
        }
      }
    }
  };

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://eth.drpc.org`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 5],
   });
   
   const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://eth.drpc.org`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
   });
   
   const Injected = new InjectedConnector({
    supportedChainIds: [1, 5]
   });


  return (
    <>
       <div>Connection Status: {active}</div>
    <div>Account: {account}</div>
    <div>Network ID: {chainId}</div>
      <div>
      <button onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
<button onClick={() => { activate(WalletConnect) }}>Wallet Connect</button>
<button onClick={() => { activate(Injected) }}>Metamask</button>

<button onClick={deactivate}>Disconnect</button>
      </div>
    </>
  )
}

export default App
