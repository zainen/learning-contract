import { TezosToolkit } from "@taquito/taquito";

// Contract types

export type full_name = [string, string]; // first name last name

export type Person = {
  age: number; 
  full_name: full_name;
  is_cool?: boolean;
  nationality?: string;
};
export type Storage = {
  int: number;
  nat: number;
  string: string;
  list: number[];
  map: Record<string, number>[];
  set: Set<number>;
  bool: boolean; 
  full_name: full_name;
  person?: Person
};

// App state types

// entrypoints to implement

export interface AppState {
  storage?: Storage,
  loading: boolean,
  isError: boolean,
  walletConnected: boolean,
  Tezos: TezosToolkit
  selectedEntrypoint: string
}

export type Action = {type: string, sk?: string } & Partial<AppState> | null;

export interface MainState {
  isLoading: boolean, 
  error: string, 
  walletConnected: boolean, 
  selectedEntrypoint?: string
  entrypointParams: string[]
  pkh?: string;
  balance?: string;
}