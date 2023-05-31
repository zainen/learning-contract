import { Dispatch, SetStateAction } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { MainState } from "../types";


export const AvailableEntrypoints = ({className, entrypointsList, setState}: {className?: string; entrypointsList: string[][]; state: MainState; setState: Dispatch<SetStateAction<MainState>>}) => {

  return (
    <Card className={`ml-4 p-4 ${className}`}>
      {/* listing entrypoints stored in contract abstraction */}
      <h2 className="text-2xl font-bold">Available Entrypoints</h2>
      {/* TODO: implement display of contract entrypoints */}
      {entrypointsList.map(([name, ...params]: string[], index: number) => {
        const onClick = () => {
          // TODO: use setState to set the name of the selected entrypoint and the entrypointParams
          setState((prev: MainState) => ({...prev, selectedEntrypoint: name, entrypointParams: params}));
        }
        return (
          // <Button key={index} className="border-2 p-2 rounded-md border-green-600 flex flex-col my-2" onClick={() => alert("Set entrypoint to setSelectedEntrypoint")}>
          <Button key={index} className="border-2 p-2 rounded-md border-green-600 flex flex-col my-2" onClick={onClick}>
            <p className='font-bold'>name: {name}</p>
          </Button>
        )
      })}
    </Card>
  )
}