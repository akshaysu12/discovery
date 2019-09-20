import { TrackData } from '../trackData';

// tslint:disable: no-string-literal

// use map
export const parseTopTracks = (tracks: object[]): TrackData => {
  // tslint:disable-next-line: prefer-const
  let ids = [];
  // tslint:disable-next-line: prefer-const
  let names = [];

  for (const track of tracks) {
    ids.push(track['id']);
    names.push(track['name']);
  }
  return {
    ids,
    titles: names,
  };
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

export const convertData = (dimensions: number[][]): any => {
  const res = dimensions.map((arr: number[]) => {
    return {x: arr[0], y: arr[1]};
  });
  return res;
};
