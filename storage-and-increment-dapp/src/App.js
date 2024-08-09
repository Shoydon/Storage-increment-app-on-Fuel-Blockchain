import {
  useAccounts,
  useConnectUI,
  useDisconnect,
  useFuel,
  useIsConnected,
  useWallet,
} from '@fuels/react';
import { Contract } from 'fuels';
import './App.css';
import { useEffect, useState } from 'react';
import contractData from './contract.json'

function App() {
  const { connect, error, isError, theme, isConnecting } = useConnectUI();

  const { fuel } = useFuel();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const { accounts } = useAccounts();

  const [loading, setLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');

  fuel.on(fuel.events.connectors, (connectors) => {
      console.log("available connectors", connectors);
  });

  const handleNewValue = (event) => {
      if(event.target.value >= 0){
        setNewValue(event.target.value);
      } else {
        alert("Please enter a non-negative number");
      }
  };

  const storeValue = async () => {
      try {
          setLoading(true);
          // const id: IdentityInput = { Address: wallet };
          const contractInst = new Contract(contractData.address, contractData.abi, wallet);
          const { transactionId, waitForResult } = await contractInst.functions.set_value(newValue).call();
          const { value } = await waitForResult();
          setLoading(false);
          setCurrentValue(Number(value));
          retrieveValue();
      } catch (error) {
          console.error('Error storing value:', error);
          setLoading(false);
      }
  };

  const incrementValue = async () => {
      try {
          setLoading(true);
          const contractInst = new Contract(contractData.address, contractData.abi, wallet);
          const { transactionId, waitForResult } = await contractInst.functions.increment_value().call();
          const { value } = await waitForResult();
          setLoading(false);
          setCurrentValue(Number(value));
          retrieveValue();
      } catch (error) {
          console.error('Error storing value:', error);
          setLoading(false);
      }
  };

  const retrieveValue = async () => {
      try {
          setLoading(true)
          const contractInst = new Contract(contractData.address, contractData.abi, wallet);
          const { value } = await contractInst.functions.get_value().get();
          setLoading(false)
          setCurrentValue(Number(value));
      } catch (error) {
          console.error('Error retrieving value:', error);
          setLoading(false);
      }
  };

  useEffect(() => {
      retrieveValue();
  }, [])

  return (
      <div className="App" data-theme={theme}>
          <div className="Actions">
              {!isConnected && <button
                  type="button"
                  onClick={() => {
                      console.log('connect');
                      connect();
                  }}
              >
                  {isConnecting ? 'Connecting' : 'Connect'}
              </button>}
              {isConnected && (
                  <button type="button" onClick={() => disconnect()}>
                      Disconnect
                  </button>
              )}
          </div>
          {isError && <p className="Error">{error?.message}</p>}
          {isConnected && (
              <div className="Accounts">
                  <h3>Connected account: {accounts[0]} </h3>
                  {loading ? (<>loading...</>) : (<>Current value: {currentValue}</>)}<br/>
                  <input type="text" value={newValue} onChange={handleNewValue}/>
                  <button onClick={storeValue}>Store Value</button><br/>
                  <button onClick={incrementValue}>Increment Value</button>
                  <button onClick={retrieveValue}>Retrieve Value</button>
              </div>
          )}
      </div>
  );
}

export default App;