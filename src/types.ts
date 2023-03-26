export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface FishInstance {
  active: boolean;
  count: number;
  description: string;
  expRewarded: number;
  fishId: number;
  lengthRangeInCm: number[];
  maxLength: number;
  name: string;
  pondUserId: number;
  rarity: string;
  secondsFishable: number;
}

export interface PondUser {
  id: number;
  username: string;
  location: string;
  exp: number;
}