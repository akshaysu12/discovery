// tslint:disable: no-string-literal

// use map
export const parseTopTracks = (tracks: object[]): string[] => {
  // tslint:disable-next-line: prefer-const
  let res = [];

  console.log(tracks);
  for (const track of tracks) {
    res.push(track['id']);
  }
  return res;
};

export const parseAudioFeatures = (features: object[]): number[][] => {
  const res = [];
  const audio_features = [
    'danceability',
    'energy',
    'key',
    'loudness',
    'mode',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence',
    'tempo',
  ];

  for (const track of features) {
    const dimensions = [];
    for (const key in track) {
      if (track.hasOwnProperty(key)) {
        if (audio_features.includes(key)) {
          dimensions.push(track[key]);
        }
      }
    }
    res.push(dimensions);
  }
  return res;
};