import { Dispatch, SetStateAction } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { MainState } from "../types";


export const AvailableEntrypoints = ({className, entrypointsList, setState}: {className?: string; entrypointsList: string[][]; state: MainState; setState: Dispatch<SetStateAction<MainState>>}) => {

  return (
    <Card className={`ml-4 p-4 ${className}`}>
      {/* listing entrypoints stored in contract abstraction */}
      <h2 className="text-2xl font-bold">Available Entrypoints</h2>
      {/* TODO Selecting entrypoints: map over entrypointLists to display of contract entrypoints entrypoints = [entrypointName, ...params] */}
      {entrypointsList.map((entrypoint: string[], index: number) => {
        // TODO Selecting entrypoints: using Button setState to set the name of the selected entrypoint and the entrypointParams
        return <></>})
      }
    </Card>
  )
}