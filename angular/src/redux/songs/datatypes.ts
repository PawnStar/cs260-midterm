export interface Loop {
  start: number,
  end: number,
  name: string
}

export interface Song {
  name: string,
  src: string[]
  uuid: string,
  loops: Loop[]
}


export interface SongsState {
  [uuid: string]: Song
}