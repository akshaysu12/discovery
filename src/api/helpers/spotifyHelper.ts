import { TrackData } from '../trackData';

export const parseTopTracks = (tracks: any[]): TrackData => {
  const trackData: TrackData = {
    titles: [],
    ids: [],
  };

  // remove duplicates and parse
  const parsedTracks = tracks.reduce((accum, track) => {
      if (!accum.titles.includes(track.name)) {
        accum.titles.push(track.name);
        accum.ids.push(track.id);
      }
    return accum;
  }, trackData);

  return parsedTracks;
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
