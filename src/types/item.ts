export interface IBanner {
  banner: string
}

export interface IArtists {
  name: string
  playlistId: string | number
}

export interface ILyricWord {
  data: string
  endTime: number
  startTime: number
}

export interface ILyric {
  words: ILyricWord[]
}

export interface IPlayList {
  thumbnailM?: string
  thumbnail?: string
  title?: string
  artists?: IArtists[]
  song?: ISongList
  sortDescription?: string
}

export interface ISong {
  title: string
  thumbnailM: string
  artists: IArtists[]
  duration: number
  encodeId: string
}

export interface ISongList {
  total?: string
  totalDuration?: number
  items?: ISong[]
}

export interface IPath {
  hash?: string
  key?: string
  pathname?: string
  search?: string
}

export interface ISongInfo {
  artists?: IArtists[]
  artistsNames?: string
  duration?: number
  thumbnailM?: string
  title?: string
}

export interface ISongMP3 {
  128?: string
  320?: string
}
