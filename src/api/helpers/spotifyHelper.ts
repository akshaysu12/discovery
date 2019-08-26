// tslint:disable: no-string-literal

// use map
export const parseTopTracks = (data: object): string[] => {
  const res = [];
  const tracks: object[] = data['items'];
  for (const track of tracks) {
    res.push(track['id']);
  }
  return res;
};