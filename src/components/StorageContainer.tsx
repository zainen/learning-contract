import { Card } from "./Card";
import { Storage } from "../types";
import { StorageItem } from "./StorageItem";



export const StorageContainer = ({ className, storage}: {className: string, storage?: Storage}) => {

  return (
    <Card className={`w-fit mt-4 ml-4 p-4 max-w-sm ${className}`}>
      <h2 className="text-2xl font-bold">Storage</h2>
      {/* use Object.entries of storage and map over each item grabbing [key, value] and returning a StorageItem Component */}
      {Object.entries(storage ?? {}).map(([key, value]) => {
      // TODO: pass storageKey and value to StorageItem

        return <StorageItem key={key} storageKey={key} value={value} />
      })}
    </Card>
  )
}