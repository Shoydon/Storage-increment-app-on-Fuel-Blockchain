import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import contractData from './contract.json'

function App() {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert('Please install MetaMask to use this feature.');
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const userAddress = accounts[0];
      setAccount(userAddress);
      console.log(account);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Create a new Web3 instance using the injected provider (MetaMask)
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request access to user's MetaMask wallet
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the deployed contract instance
          // const networkId = await web3Instance.eth.net.getId();
          // const deployedNetwork = 123
          const instance = new web3Instance.eth.Contract(contractData.abi, contractData.address);
          setContract(instance);
          console.log(contract);

          // Get the initial value from the contract
          const value = await instance.methods.retrieve().call();
          setCurrentValue(Number(value));
        } else {
          console.error('MetaMask is not installed or not enabled.');
        }
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    };

    initWeb3();
  },[])

  
  const handleNewValue = (event) => {
    setNewValue(event.target.value);
  };

  const storeValue = async () => {
    console.log("store val func");
    try {
      setLoading(true);
      await contract.methods.store(newValue).send({ from: (await web3.eth.getAccounts())[0] });
      const value = await contract.methods.retrieve().call();
      setLoading(false);
      setCurrentValue(Number(value));
    } catch (error) {
      console.error('Error storing value:', error);
    }
  };

  const retrieveValue = async () => {
    console.log("retr val func");
    try {
      setLoading(true)
      const value = await contract.methods.retrieve().call();
      setLoading(false)
      setCurrentValue(Number(value));
    } catch (error) {
      console.error('Error retrieving value:', error);
    }
  };


  return (
    <div className="App">
      <button onClick={connectWallet}>Connect</button>
      <p>Current value: {currentValue}</p>
      <input type="text" value={newValue} onChange={handleNewValue} />
      <button onClick={storeValue}>Store Value</button>
      <button onClick={retrieveValue}>Retrieve Value</button>
      {loading && <>loading...</>}
    </div>
  );
}

export default App;
