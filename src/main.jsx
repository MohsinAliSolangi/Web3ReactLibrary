import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import './index.css'


function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
    </Web3ReactProvider>
    </React.StrictMode>
)
