import React, { Fragment, useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI from "./contractJson/elearn.json";
import appContext from './context/appContext'
import Router from './router/Router'

function App() {
  const navInitialState = {
    dashboard: true,
    transaction: false,
    history: false
  };

  const initialState = {
    WindowEthereum: false,
    // ContractAddress: "0xaAE04Cd5c6ed58B1448C359F78f6AF9A3A117812",
    ContractAddress: "0x410d2d92ACb49588c5465cAe149999d438d76f24",
    WalletAddress: null,
    ContractAbi: ABI.abi,
    Provider: null,
    Signer: null,
    ReadContract: null,
    WriteContract: null,
    isAdmin: false,
    isLogin: false,
    userName: null
  };
  const [State, setState] = useState(initialState);
  const [navState, setNavState] = useState(navInitialState);

  useEffect(() => {
    getStateParameters();
  }, []);


  const getStateParameters = async () => {
    if (window.ethereum) {
      setState(prevState => ({
        ...prevState,
        WindowEthereum: true
      }));

      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      await Provider.send("eth_requestAccounts", []);
      const Signer = await Provider.getSigner();
      const WalletAddress = await Signer.getAddress();

      setState(prevState => ({
        ...prevState,
        WalletAddress,
        Provider,
        Signer
      }));

      const ReadContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        Provider
      );
      const WriteContract = new ethers.Contract(
        State.ContractAddress,
        State.ContractAbi,
        Signer
      );

      setState(prevState => ({
        ...prevState,
        ReadContract,
        WriteContract
      }));

      const isAdmin = await ReadContract.checkAdmin({ from: WalletAddress });
      setState(prevState => ({
        ...prevState,
        isAdmin
      }));

      const isLogin = await ReadContract.Login({ from: WalletAddress })
      setState(prevState => ({
        ...prevState,
        isLogin
      }));
      const user = await ReadContract.displayUserProfile({ from: WalletAddress })
      setState(prevState => ({
        ...prevState,
        userName: user[0]
      }));

    } else {
      console.log("Metamask Not Found");
    }
  };

  const context = {
    State,
    setState,
    getStateParameters,
    navState,
    setNavState
  }

  return (
    <Fragment>
      <appContext.Provider value={context}>
        <Router />
      </appContext.Provider>
    </Fragment>
  )
}

export default App