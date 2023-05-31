import { Storage } from '../types';
export const StorageItem = ({storageKey, value}: {storageKey: string, value: Storage[keyof Storage]}) => {
  if (typeof value === 'object') {
    return (
      <div key={storageKey}>
        <p>{storageKey}: {JSON.stringify(value)}</p>
      </div>
    )
  } else {

    return (
      <div key={storageKey}>
        <p>{storageKey}: {value}</p>
      </div>
    )
  }
}