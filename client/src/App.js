import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {ethers} from 'ethers';
import FileUpload from "./componets/FileUpload";
import { useEffect, useState } from "react";
import './App.css'
import Display from "./componets/Display";

function App() {
  const [account,setAccount]=useState("");
  const [contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);
  const [modal,setModalOpen]=useState(null);
  
  useEffect(()=>{
    const provider =new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider=async()=>{
      if(provider){
        // await provider.send("eth_requestAccounts",[]);
        if(provider){
          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          })
        
          window.ethereum.on("accountsChanged",()=>{
            window.location.reload();
          })
        }

        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress  = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(contractAddress,Upload.abi,signer);
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else{
        console.log("meta musk is not installed")
      }
    }
    provider && loadProvider();
  },[])
  return (
    <div className="App">
      <h1 style={{color:'white'}}>GDrive</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <p style={{color:'white'}}>
        Account:{account ? account : 'Not Account'}
      </p>
      <FileUpload account={account} provider={provider} contract={contract}/> 
      <Display account={account} provider={provider}></Display>
    </div>
  );
}

export default App;
