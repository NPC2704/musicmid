export const createPlayListHref = (playlistId: string | number) => {
  return `/playlistmusic/?id=${playlistId}`;
};

export const createPlayerHref = (
  songID: string,
  playlistId: string | number
) => {
  return `/playlist/?id=${playlistId}/?idmusic=${songID}`;
};
