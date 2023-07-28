export interface IBanner {
  banner: string;
  type: number;
}

export interface IUserData {
  name?: string;
  email?: string;
  picture?: string;
}

export interface IArtists {
  id: string;
  name: string;
  playlistId: string | number;
  thumbnailM: string;
  totalFollow: number;
  alias: string;
}
export interface IArtistInfo {
  biography?: string;
  realname?: string;
  birthday?: string;
  national?: string;
  sections?: IPlayListArr[];
  thumbnailM?: string;
  name?: string;
  song?: ISongList;
  playListInfo?: IPlayList;
}

export interface IPlayListArr {
  items: IPlayListItem[];
  sectionType?: string;
}

export interface ILyricWord {
  data: string;
  endTime: number;
  startTime: number;
}

export interface ILyric {
  words: ILyricWord[];
}

export interface ISearchRs {
  songs?: ISong[];
  playlists?: IPlayList[];
  artists?: IArtists[];
}

export interface IPlayList {
  thumbnailM?: string;
  thumbnail?: string;
  title?: string;
  artists?: IArtists[];
  song?: ISongList;
  sortDescription?: string;
  sectionType?: string;
  encodeId?: string;
}

export interface IPlayListItem {
  thumbnailM: string;
  title: string;
  artists: IArtists[];
  encodeId: string;
}

export interface ISong {
  title: string;
  thumbnailM: string;
  artists: IArtists[];
  duration: number;
  encodeId: string;
  artistsNames?: string;
}

export interface ISongInfo {
  artists?: IArtists[];
  artist?: IArtists;
  artistsNames?: string;
  duration?: number;
  thumbnailM?: string;
  title?: string;
  encodeId?: string;
}

export interface ISongList {
  total?: string;
  totalDuration?: number;
  items?: ISong[];
}

export interface IPath {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
}

export interface ISongMP3 {
  128?: string;
  320?: string;
}
