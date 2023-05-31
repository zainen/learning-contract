import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { MainState, Storage } from "../types";
import { ContractAbstraction, TezosToolkit, TransactionWalletOperation, Wallet } from "@taquito/taquito";

export const EntrypointCard = ({state: {walletConnected, selectedEntrypoint, isLoading, entrypointParams, error}, setState, Tezos, contract, setStorage}: {state: MainState, setState: Dispatch<SetStateAction<MainState>>, Tezos: TezosToolkit, contract?: ContractAbstraction<Wallet>, setStorage: Dispatch<SetStateAction<Storage | undefined>>}) => {
  const [value, setValue] = useState<string>("")
  const [dataType, setDataType] = useState<'string' | 'list' | 'multi-value' >('string')
  console.log("disable", contract === undefined || dataType === undefined, contract, dataType)

  const handleSend = async () => {
    if (!contract || !selectedEntrypoint) return alert("missing either contract or entrypoint")
    // TODO Sending contract method transactions: implement sending transaction\
    return alert("TODO implement me")
    // remove the following when removing the return above
    // eslint-disable-next-line no-unreachable 
    let op: TransactionWalletOperation;
    // setState loading true
    setState(prev => ({...prev, isLoading: true}));
    try {
      // try to send transaction
      // use selectedEntrypoint as contract.methods[selectedEntrypoint] to avoid having to make multiple handlers for each entrypoint
      let entrypointParams; // use as a way to modify the state value to use as the params for your method call

      if (dataType === 'multi-value') {
        // setFullName is the only multi-value entrypoint
        // setFullName("John", "Doe") // this works
        // the entrypoint method params can be spread within to pass multiple values
        
        // modify your entrypoint params

        
        // create your operation and send it


      } else {
        // handle dataType === 'string' || 'list'
        // replaceList requires a list which is an array of ints
        // replaceList([1,2,3]) // this works
        // the remaining take a single string | int | nat depending on the entrypoint params
        // int && nat are both integers that can be passed as type 'number' || 'string' floats are not supported

        // modify your entrypoint params depending on if dataType is list or string


        // create your operation and send it

      }
      // await your confirmation here


      // refetch and set storage


      //  refetch and set balance

      
      // log in console for convenience of viewing in browser
      console.log(`Hash: ${op.opHash}`)
    } catch (err) {
      console.log(err)
      setState(prev => ({...prev, error: JSON.stringify(err)}))
    }
    setState(prev => ({...prev, isLoading: false}));
  }

  return (
  <Card className='p-4 w-fit flex flex-col'>
    {!walletConnected ? 
      <h2 className="text-xl">Please connect your wallet</h2>
      :
      <>
        <p>Selected Entrypoint: {selectedEntrypoint ?? "pick one"}</p>
        {/* <label className="mb-2">Entrypoint Params: ADD entryPoint params here</label> */}

        <label className="mb-2 flex">Entrypoint Params: {JSON.stringify(entrypointParams)}</label>    
        <div className="mb-2">
          <form>
            <div>
              <input type="radio" checked={dataType === 'string'} onChange={() => setDataType('string')} />
              <label className="px-2">String</label>
            </div>
            <div>
              <input type="radio" checked={dataType === 'list'} onChange={() => setDataType('list')}/>
              <label className="px-2">List</label>
            </div>
            <div>
              <input type="radio" checked={dataType === 'multi-value'} onChange={() => setDataType('multi-value')}/>
              <label className="px-2">Multiple Values</label>
            </div>
          </form>
        </div>
        <input autoFocus type="text" name="input"  className="rounded-md w-96 mb-4 p-1" defaultValue={value} onChange={(e) => (setValue(e.target.value))}/>
        {error ? 
          <Button className="border-2 p-2 rounded-md border-red-600" onClick={() => setState(prev => ({...prev, error: ""}))}>
            Reset Error
          </Button> 
          : 
          <Button className="border-2 p-2 rounded-md border-green-600" isLoading={isLoading} onClick={handleSend} disable={contract === undefined || dataType === undefined}>
            <p>Send</p>
          </Button>
        }
      </>
    }

  </Card>
  )
}