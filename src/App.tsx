import { useEffect, useState } from "react";
import { Account } from "./components/Account";
import { Card } from "./components/Card";
import { AvailableEntrypoints } from "./components/AvailableEntrypoints";
import { StorageContainer } from "./components/StorageContainer";
import "./index.css";
import { MainState, Storage } from "./types";
import { ContractAbstraction, TezosToolkit, Wallet } from "@taquito/taquito";
import { EntrypointCard } from "./components/EntrypointCard";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-types";

function App() {
  // TODO Contract Abstraction: add your contract address
  const contractAddress = "";
  // default storage and main helper state
  const [storage, setStorage] = useState<Storage>();
  const [state, setState] = useState<MainState>({
    isLoading: false,
    error: "",
    walletConnected: false,
    selectedEntrypoint: undefined,
    entrypointParams: [],
  });

  // TODO Connecting your wallet: initialize Tezos toolkit with your chosen rpc
  const [Tezos] = useState(new TezosToolkit(""));

  // TODO Connecting your wallet: initialize wallet with name for your dApp and which network to connect to
  const [wallet] = useState(new BeaconWallet({ name: "Replace me" }));

  const [entrypointsList, setEntrypointsList] = useState<string[][]>([]);
  const [contract, setContract] = useState<ContractAbstraction<Wallet>>();

  // TODO Connecting your wallet: Connect wallet on refresh and set pkh and balance
  useEffect(() => {
    (async () => {
      // check if active account exists (found in browser application local storage)

      // if no active account, return

      // set Tezos wallet provider to BeaconWallet

      // grab pkh and balance from Tezos with newly connected wallet and set state for balance, pkh and walletConnected

    })();
  }, [Tezos, wallet]);

  // TODO Contract Abstraction: get and set a ContractAbstraction, Fetch storage, andd setEntrypointsList
  useEffect(() => {
    (async () => {
      try {
        if (!contractAddress) return;
        // get contract instance and setContract

        // get contractStorage and setStorage

        // get entrypoints and setEntrypointsList


      } catch (err) {
        console.log(err);
        setState((prev) => ({ ...prev, error: JSON.stringify(err) }));
      }
    })();
  }, [Tezos.contract, Tezos.rpc, Tezos.wallet]);

  return (
    <div className="bg-slate-600 flex h-full w-full overflow-auto justify-between">
      <div className="flex justify-between">
        <div className="h-fit">
          <StorageContainer className="mb-4" storage={storage} />
          <AvailableEntrypoints
            entrypointsList={entrypointsList}
            state={state}
            setState={setState}
          />
        </div>
      </div>
      <div className="w-fit flex flex-col justify-between ">
        <Card className="p-4 m-4 h-fit">
          <h2>My Contract dApp</h2>
        </Card>
        <EntrypointCard state={state} setState={setState} Tezos={Tezos} contract={contract} setStorage={setStorage}/>
        <div></div>
      </div>
      <div className="w-fit">
        <Account
          Tezos={Tezos}
          state={state}
          setState={setState}
          wallet={wallet}
        />
      </div>
    </div>
  );
}

export default App;
