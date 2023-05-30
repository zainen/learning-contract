import { Card } from "./Card";
import { Storage } from "../types";
import { StorageItem } from "./StorageItem";



export const StorageContainer = ({ className, storage}: {className: string, storage?: Storage}) => {

  return (
    <Card className={`w-fit mt-4 ml-4 p-4 max-w-sm ${className}`}>
      <h2 className="text-2xl font-bold">Storage</h2>
      {/* current storage of the contract should be fetched after each entrypoints success call  */}
      {/* TODO MAP OVER STORAGE */}
      {Object.entries(storage ?? {}).map(([key, value]) => {
        return <StorageItem key={key} storageKey={key} value={value} />
      })}
    </Card>
  )
}