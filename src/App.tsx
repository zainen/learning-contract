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
  // TODO: add your contract address
  const contractAddress = "KT1RNYRNUM1Tk5J4iXHKN51TeXteNYKhPzZC";
  // default storage and main helper state
  const [storage, setStorage] = useState<Storage>();
  const [state, setState] = useState<MainState>({
    isLoading: false,
    error: "",
    walletConnected: false,
    selectedEntrypoint: undefined, // TODO: refactor to accept undefined
    entrypointParams: [],
  });

  // TODO: initialize Tezos toolkit
  const [Tezos] = useState(new TezosToolkit("http://localhost:20000"));

  // TODO: initialize wallet
  const [wallet] = useState(() => {
    const wallet = new BeaconWallet({
      name: "My First Actual dApp",
      preferredNetwork: NetworkType.CUSTOM,
    });
    const activeWallet = wallet.client.getActiveAccount();
    if (!activeWallet) {
      setState((prev: MainState) => ({ ...prev, walletConnected: false }));
    }
    return wallet;
  });
  const [entrypointsList, setEntrypointsList] = useState<string[][]>([]);
  const [contract, setContract] = useState<ContractAbstraction<Wallet>>();

  // TODO: Connect wallet on refresh
  useEffect(() => {
    (async () => {
      const accountIdentifier = (await wallet.client.getActiveAccount())
        ?.accountIdentifier;
      if (!accountIdentifier) return;

      Tezos.setWalletProvider(wallet);
      setState((prev: MainState) => ({ ...prev, walletConnected: true }));
    })();
  }, [Tezos, wallet]);

  // TODO: Fetch storage, entrypoints, balance, and pkh
  useEffect(() => {
    (async () => {
      try {
        if (!contractAddress) return;
        // get contract instance and setContract
        const contract = await Tezos.wallet.at(contractAddress);
        setContract(contract);
        // get contractStorage and setStorage
        const contractStorage = await contract.storage<Storage>();
        setStorage(contractStorage);
        // get entrypoints and setEntrypointsList
        const contractEntrypoints =
          await contract.parameterSchema.ExtractSignatures();
        setEntrypointsList(contractEntrypoints);
        // get balance and pkh and setState
        const pkh = await Tezos.wallet.pkh();
        const balance = await Tezos.rpc.getBalance(pkh);
        setState((prev) => ({...prev, balance: balance.toString(), pkh: pkh}));

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
