import { useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { MainState } from "../types";
import { ContractAbstraction, TezosToolkit, TransactionWalletOperation, Wallet } from "@taquito/taquito";

export const EntrypointCard = ({state: {walletConnected, selectedEntrypoint, isLoading, entrypointParams}, Tezos, contract}: {state: MainState, Tezos: TezosToolkit, contract?: ContractAbstraction<Wallet>}) => {
  const [value, setValue] = useState<string>("")
  const [dataType, setDataType] = useState<'string' | 'array' | 'object'>('string')
  console.log(dataType)
  console.log("disable", contract === undefined || dataType === undefined, contract, dataType)

  const handleSend = async () => {
    if (!contract || !selectedEntrypoint) return
    let op: TransactionWalletOperation;
    try {
      setValue(value.replaceAll(/'/g, '"'));
      let entrypointParams;
      const checkComma = value.includes(",")
      if (dataType === 'object') {
        entrypointParams = JSON.parse(value)
        console.log(entrypointParams)
        op = await contract.methods[selectedEntrypoint](entrypointParams).send()
      } else if (checkComma) {
        entrypointParams = dataType === 'array' ? [JSON.parse(value)] : value.split(",")

        op = await contract.methods[selectedEntrypoint](...entrypointParams).send()
      } else {
        entrypointParams = value;
        op = await contract.methods[selectedEntrypoint](entrypointParams).send()
      }

      await op.confirmation()
      console.log(`Hash: ${op.opHash}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
  <Card className='p-4 w-fit flex flex-col'>
    {!walletConnected ? 
      <h2 className="text-xl">Please connect your wallet</h2>
      :
      <>
        <p>Selected Entrypoint: {selectedEntrypoint ?? "pick one"}</p>
        {/* <p className="mb-2">Entrypoint Params: TODO</p> */}

        <label className="mb-2 flex">Entrypoint Params: {entrypointParams.map((item, index) => {
          const translateEntrypointParam = typeof item === 'object' ? 
            "int[]"
            :
            item
          console.log(item)
          return <p className="pl-1" key={index}>{translateEntrypointParam}</p>
        })
        }</label>    
        <div className="mb-2">
          <form>
            <div>
              <input type="radio" checked={dataType === 'string'} onChange={() => setDataType('string')} />
              <label className="px-2">String</label>
            </div>
            <div>
              <input type="radio" checked={dataType === 'array'} onChange={() => setDataType('array')}/>
              <label className="px-2">Array</label>
            </div>
            <div>
              <input type="radio" checked={dataType === 'object'} onChange={() => setDataType('object')} />
              <label className="px-2">Object</label>
            </div>
          </form>
        </div>
        <input autoFocus type="text" name="input"  className="rounded-md w-96 mb-4 p-1" defaultValue={value} onChange={(e) => (setValue(e.target.value))}/>
        {/* <Button className="border-2 p-2 rounded-md border-green-600" isLoading={isLoading} onClick={() => alert("TODO implement me")}> */}
        <Button className="border-2 p-2 rounded-md border-green-600" isLoading={isLoading} onClick={handleSend} disable={contract === undefined || dataType === undefined}>
          <p>Send</p>
        </Button>
      </>
    }

  </Card>
  )
}