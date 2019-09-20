import TSNE from 'tsne-js';
import { parseAudioFeatures } from './spotifyHelper';

export const createVisualization = (features: any) => {

  const data = parseAudioFeatures(features.audio_features);
  const model = new TSNE({
    dim: 2,
    perplexity: 30.0,
    earlyExaggeration: 4.0,
    learningRate: 100.0,
    nIter: 100,
    metric: 'euclidean',
  });

  // inputData is a nested array which can be converted into an ndarray
  // alternatively, it can be an array of coordinates (second argument should be specified as 'sparse')
  model.init({
    data,
    type: 'dense',
  });

  // `error`,  `iter`: final error and iteration number
  // note: computation-heavy action happens here
  const [error, iter] = model.run();

  if (error) {
    console.log(`error on iteration ${iter}: ${error}`);
  }

  // rerun without re-calculating pairwise distances, etc.
  // const [error, iter] = model.rerun();

  // `output` is unpacked ndarray (regular nested javascript array)
  return model.getOutput();

  // `outputScaled` is `output` scaled to a range of [-1, 1]
  // const outputScaled = model.getOutputScaled();
};

// const features = {
//   audio_features: [
//       {
//           danceability: 0.452,
//           energy: 0.527,
//           key: 2,
//           loudness: -8.478,
//           mode: 1,
//           speechiness: 0.0375,
//           acousticness: 0.29,
//           instrumentalness: 0.00214,
//           liveness: 0.102,
//           valence: 0.363,
//           tempo: 115.052,
//           type: 'audio_features',
//           id: '0Cf8Juik1Rp1J7iFqxTUGK',
//           uri: 'spotify:track:0Cf8Juik1Rp1J7iFqxTUGK',
//           track_href: 'https://api.spotify.com/v1/tracks/0Cf8Juik1Rp1J7iFqxTUGK',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0Cf8Juik1Rp1J7iFqxTUGK',
//           duration_ms: 166795,
//           time_signature: 5,
//       },
//       {
//           danceability: 0.467,
//           energy: 0.566,
//           key: 9,
//           loudness: -8.273,
//           mode: 1,
//           speechiness: 0.0376,
//           acousticness: 0.65,
//           instrumentalness: 0.933,
//           liveness: 0.153,
//           valence: 0.114,
//           tempo: 155.091,
//           type: 'audio_features',
//           id: '3427pTE7qC2GzplghWAmD9',
//           uri: 'spotify:track:3427pTE7qC2GzplghWAmD9',
//           track_href: 'https://api.spotify.com/v1/tracks/3427pTE7qC2GzplghWAmD9',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3427pTE7qC2GzplghWAmD9',
//           duration_ms: 241547,
//           time_signature: 3,
//       },
//       {
//           danceability: 0.754,
//           energy: 0.338,
//           key: 5,
//           loudness: -12.836,
//           mode: 1,
//           speechiness: 0.0289,
//           acousticness: 0.712,
//           instrumentalness: 0.0769,
//           liveness: 0.121,
//           valence: 0.545,
//           tempo: 98.034,
//           type: 'audio_features',
//           id: '0MKkySA0UuMPpyOoEPJORC',
//           uri: 'spotify:track:0MKkySA0UuMPpyOoEPJORC',
//           track_href: 'https://api.spotify.com/v1/tracks/0MKkySA0UuMPpyOoEPJORC',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0MKkySA0UuMPpyOoEPJORC',
//           duration_ms: 220280,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.834,
//           energy: 0.73,
//           key: 8,
//           loudness: -3.714,
//           mode: 1,
//           speechiness: 0.222,
//           acousticness: 0.00513,
//           instrumentalness: 0,
//           liveness: 0.124,
//           valence: 0.446,
//           tempo: 155.008,
//           type: 'audio_features',
//           id: '2xLMifQCjDGFmkHkpNLD9h',
//           uri: 'spotify:track:2xLMifQCjDGFmkHkpNLD9h',
//           track_href: 'https://api.spotify.com/v1/tracks/2xLMifQCjDGFmkHkpNLD9h',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2xLMifQCjDGFmkHkpNLD9h',
//           duration_ms: 312820,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.543,
//           energy: 0.907,
//           key: 6,
//           loudness: -6.698,
//           mode: 0,
//           speechiness: 0.0427,
//           acousticness: 0.36,
//           instrumentalness: 0.622,
//           liveness: 0.0689,
//           valence: 0.616,
//           tempo: 80.5,
//           type: 'audio_features',
//           id: '1bqrRn1pJWowNLA5N9L6uW',
//           uri: 'spotify:track:1bqrRn1pJWowNLA5N9L6uW',
//           track_href: 'https://api.spotify.com/v1/tracks/1bqrRn1pJWowNLA5N9L6uW',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/1bqrRn1pJWowNLA5N9L6uW',
//           duration_ms: 262213,
//           time_signature: 1,
//       },
//       {
//           danceability: 0.701,
//           energy: 0.529,
//           key: 7,
//           loudness: -12.242,
//           mode: 0,
//           speechiness: 0.147,
//           acousticness: 0.82,
//           instrumentalness: 0.00113,
//           liveness: 0.249,
//           valence: 0.577,
//           tempo: 138.216,
//           type: 'audio_features',
//           id: '297rZsBEjFw9d0Gl3iBLnd',
//           uri: 'spotify:track:297rZsBEjFw9d0Gl3iBLnd',
//           track_href: 'https://api.spotify.com/v1/tracks/297rZsBEjFw9d0Gl3iBLnd',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/297rZsBEjFw9d0Gl3iBLnd',
//           duration_ms: 146390,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.795,
//           energy: 0.709,
//           key: 2,
//           loudness: -5.928,
//           mode: 1,
//           speechiness: 0.0499,
//           acousticness: 0.0108,
//           instrumentalness: 0.695,
//           liveness: 0.105,
//           valence: 0.279,
//           tempo: 100.492,
//           type: 'audio_features',
//           id: '5tIhRlNkApQJoDA8zhOBUY',
//           uri: 'spotify:track:5tIhRlNkApQJoDA8zhOBUY',
//           track_href: 'https://api.spotify.com/v1/tracks/5tIhRlNkApQJoDA8zhOBUY',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/5tIhRlNkApQJoDA8zhOBUY',
//           duration_ms: 351019,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.591,
//           energy: 0.874,
//           key: 6,
//           loudness: -4.224,
//           mode: 0,
//           speechiness: 0.0562,
//           acousticness: 0.00153,
//           instrumentalness: 0.0000145,
//           liveness: 0.0602,
//           valence: 0.775,
//           tempo: 89.998,
//           type: 'audio_features',
//           id: '5ho74ZlMvEbyhFutCd8SGg',
//           uri: 'spotify:track:5ho74ZlMvEbyhFutCd8SGg',
//           track_href: 'https://api.spotify.com/v1/tracks/5ho74ZlMvEbyhFutCd8SGg',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/5ho74ZlMvEbyhFutCd8SGg',
//           duration_ms: 256653,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.361,
//           energy: 0.47,
//           key: 0,
//           loudness: -9.765,
//           mode: 1,
//           speechiness: 0.0324,
//           acousticness: 0.565,
//           instrumentalness: 0.000396,
//           liveness: 0.0728,
//           valence: 0.431,
//           tempo: 200.273,
//           type: 'audio_features',
//           id: '7xBWYN1Dzciatr34K6sfDh',
//           uri: 'spotify:track:7xBWYN1Dzciatr34K6sfDh',
//           track_href: 'https://api.spotify.com/v1/tracks/7xBWYN1Dzciatr34K6sfDh',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7xBWYN1Dzciatr34K6sfDh',
//           duration_ms: 252560,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.912,
//           energy: 0.412,
//           key: 7,
//           loudness: -8.074,
//           mode: 1,
//           speechiness: 0.124,
//           acousticness: 0.0164,
//           instrumentalness: 0.013,
//           liveness: 0.104,
//           valence: 0.422,
//           tempo: 154.983,
//           type: 'audio_features',
//           id: '0TlLq3lA83rQOYtrqBqSct',
//           uri: 'spotify:track:0TlLq3lA83rQOYtrqBqSct',
//           track_href: 'https://api.spotify.com/v1/tracks/0TlLq3lA83rQOYtrqBqSct',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0TlLq3lA83rQOYtrqBqSct',
//           duration_ms: 238614,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.327,
//           energy: 0.829,
//           key: 9,
//           loudness: -7.646,
//           mode: 0,
//           speechiness: 0.0783,
//           acousticness: 0.171,
//           instrumentalness: 0.106,
//           liveness: 0.353,
//           valence: 0.685,
//           tempo: 191.325,
//           type: 'audio_features',
//           id: '0P24mWo86LgSWUprxr1c1x',
//           uri: 'spotify:track:0P24mWo86LgSWUprxr1c1x',
//           track_href: 'https://api.spotify.com/v1/tracks/0P24mWo86LgSWUprxr1c1x',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0P24mWo86LgSWUprxr1c1x',
//           duration_ms: 172360,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.605,
//           energy: 0.619,
//           key: 9,
//           loudness: -8.971,
//           mode: 0,
//           speechiness: 0.0261,
//           acousticness: 0.423,
//           instrumentalness: 0.313,
//           liveness: 0.0732,
//           valence: 0.578,
//           tempo: 133.074,
//           type: 'audio_features',
//           id: '77vYwoC7e3pVoPq8BA9CuL',
//           uri: 'spotify:track:77vYwoC7e3pVoPq8BA9CuL',
//           track_href: 'https://api.spotify.com/v1/tracks/77vYwoC7e3pVoPq8BA9CuL',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/77vYwoC7e3pVoPq8BA9CuL',
//           duration_ms: 505773,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.631,
//           energy: 0.792,
//           key: 0,
//           loudness: -4.364,
//           mode: 0,
//           speechiness: 0.0427,
//           acousticness: 0.23,
//           instrumentalness: 0.000317,
//           liveness: 0.0756,
//           valence: 0.462,
//           tempo: 82.901,
//           type: 'audio_features',
//           id: '403vzOZN0tETDpvFipkNIL',
//           uri: 'spotify:track:403vzOZN0tETDpvFipkNIL',
//           track_href: 'https://api.spotify.com/v1/tracks/403vzOZN0tETDpvFipkNIL',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/403vzOZN0tETDpvFipkNIL',
//           duration_ms: 247493,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.816,
//           energy: 0.808,
//           key: 4,
//           loudness: -4.836,
//           mode: 0,
//           speechiness: 0.268,
//           acousticness: 0.124,
//           instrumentalness: 0,
//           liveness: 0.142,
//           valence: 0.711,
//           tempo: 176.022,
//           type: 'audio_features',
//           id: '6R59nB9CEaOqrRVxu7JAoR',
//           uri: 'spotify:track:6R59nB9CEaOqrRVxu7JAoR',
//           track_href: 'https://api.spotify.com/v1/tracks/6R59nB9CEaOqrRVxu7JAoR',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/6R59nB9CEaOqrRVxu7JAoR',
//           duration_ms: 174560,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.557,
//           energy: 0.859,
//           key: 2,
//           loudness: -6.557,
//           mode: 1,
//           speechiness: 0.0582,
//           acousticness: 0.00474,
//           instrumentalness: 0.0000579,
//           liveness: 0.103,
//           valence: 0.748,
//           tempo: 154.718,
//           type: 'audio_features',
//           id: '6wNCdMW82LwJgFrnGqLhpJ',
//           uri: 'spotify:track:6wNCdMW82LwJgFrnGqLhpJ',
//           track_href: 'https://api.spotify.com/v1/tracks/6wNCdMW82LwJgFrnGqLhpJ',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/6wNCdMW82LwJgFrnGqLhpJ',
//           duration_ms: 243253,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.58,
//           energy: 0.766,
//           key: 11,
//           loudness: -5.779,
//           mode: 1,
//           speechiness: 0.0331,
//           acousticness: 0.71,
//           instrumentalness: 0.827,
//           liveness: 0.0988,
//           valence: 0.852,
//           tempo: 159.901,
//           type: 'audio_features',
//           id: '7LHfH5NwvTvaUOavdgMSEl',
//           uri: 'spotify:track:7LHfH5NwvTvaUOavdgMSEl',
//           track_href: 'https://api.spotify.com/v1/tracks/7LHfH5NwvTvaUOavdgMSEl',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7LHfH5NwvTvaUOavdgMSEl',
//           duration_ms: 198373,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.708,
//           energy: 0.706,
//           key: 9,
//           loudness: -6.45,
//           mode: 0,
//           speechiness: 0.0385,
//           acousticness: 0.276,
//           instrumentalness: 0.00631,
//           liveness: 0.115,
//           valence: 0.45,
//           tempo: 119.027,
//           type: 'audio_features',
//           id: '6TRQPx5Z0YZ0pCQX7JbtlS',
//           uri: 'spotify:track:6TRQPx5Z0YZ0pCQX7JbtlS',
//           track_href: 'https://api.spotify.com/v1/tracks/6TRQPx5Z0YZ0pCQX7JbtlS',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/6TRQPx5Z0YZ0pCQX7JbtlS',
//           duration_ms: 184827,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.376,
//           energy: 0.92,
//           key: 9,
//           loudness: -7.438,
//           mode: 1,
//           speechiness: 0.0349,
//           acousticness: 0.0288,
//           instrumentalness: 0.0142,
//           liveness: 0.132,
//           valence: 0.381,
//           tempo: 165.792,
//           type: 'audio_features',
//           id: '7pHz9U4AZVAQXjs6ik0duH',
//           uri: 'spotify:track:7pHz9U4AZVAQXjs6ik0duH',
//           track_href: 'https://api.spotify.com/v1/tracks/7pHz9U4AZVAQXjs6ik0duH',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7pHz9U4AZVAQXjs6ik0duH',
//           duration_ms: 229667,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.556,
//           energy: 0.902,
//           key: 11,
//           loudness: -6.087,
//           mode: 0,
//           speechiness: 0.0333,
//           acousticness: 0.215,
//           instrumentalness: 0.357,
//           liveness: 0.109,
//           valence: 0.849,
//           tempo: 152.25,
//           type: 'audio_features',
//           id: '7znbs5T41Li5UBiVGhEACQ',
//           uri: 'spotify:track:7znbs5T41Li5UBiVGhEACQ',
//           track_href: 'https://api.spotify.com/v1/tracks/7znbs5T41Li5UBiVGhEACQ',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7znbs5T41Li5UBiVGhEACQ',
//           duration_ms: 268160,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.72,
//           energy: 0.628,
//           key: 11,
//           loudness: -8.759,
//           mode: 0,
//           speechiness: 0.0302,
//           acousticness: 0.405,
//           instrumentalness: 0.0201,
//           liveness: 0.311,
//           valence: 0.524,
//           tempo: 103.576,
//           type: 'audio_features',
//           id: '3g2BcuGHf4zYPSxv1uoSmv',
//           uri: 'spotify:track:3g2BcuGHf4zYPSxv1uoSmv',
//           track_href: 'https://api.spotify.com/v1/tracks/3g2BcuGHf4zYPSxv1uoSmv',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3g2BcuGHf4zYPSxv1uoSmv',
//           duration_ms: 229307,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.654,
//           energy: 0.539,
//           key: 11,
//           loudness: -7.386,
//           mode: 1,
//           speechiness: 0.0348,
//           acousticness: 0.542,
//           instrumentalness: 0.0791,
//           liveness: 0.0944,
//           valence: 0.279,
//           tempo: 102.002,
//           type: 'audio_features',
//           id: '0WFmNgxgMylXiuJDCfpMeq',
//           uri: 'spotify:track:0WFmNgxgMylXiuJDCfpMeq',
//           track_href: 'https://api.spotify.com/v1/tracks/0WFmNgxgMylXiuJDCfpMeq',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0WFmNgxgMylXiuJDCfpMeq',
//           duration_ms: 235587,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.279,
//           energy: 0.772,
//           key: 0,
//           loudness: -8.083,
//           mode: 1,
//           speechiness: 0.0559,
//           acousticness: 0.0034,
//           instrumentalness: 0.0079,
//           liveness: 0.137,
//           valence: 0.102,
//           tempo: 129.681,
//           type: 'audio_features',
//           id: '1xFKRN7Dx8KP8zdg7zs7XN',
//           uri: 'spotify:track:1xFKRN7Dx8KP8zdg7zs7XN',
//           track_href: 'https://api.spotify.com/v1/tracks/1xFKRN7Dx8KP8zdg7zs7XN',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/1xFKRN7Dx8KP8zdg7zs7XN',
//           duration_ms: 315387,
//           time_signature: 3,
//       },
//       {
//           danceability: 0.806,
//           energy: 0.756,
//           key: 7,
//           loudness: -4.093,
//           mode: 0,
//           speechiness: 0.208,
//           acousticness: 0.385,
//           instrumentalness: 0,
//           liveness: 0.11,
//           valence: 0.637,
//           tempo: 141.97,
//           type: 'audio_features',
//           id: '4EQSeRRJmk3h3HQ5KlkzVy',
//           uri: 'spotify:track:4EQSeRRJmk3h3HQ5KlkzVy',
//           track_href: 'https://api.spotify.com/v1/tracks/4EQSeRRJmk3h3HQ5KlkzVy',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/4EQSeRRJmk3h3HQ5KlkzVy',
//           duration_ms: 283867,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.492,
//           energy: 0.378,
//           key: 6,
//           loudness: -9.288,
//           mode: 0,
//           speechiness: 0.037,
//           acousticness: 0.00146,
//           instrumentalness: 0.0000129,
//           liveness: 0.111,
//           valence: 0.428,
//           tempo: 126.402,
//           type: 'audio_features',
//           id: '7BaDRi8gmRnOducT6KaOfc',
//           uri: 'spotify:track:7BaDRi8gmRnOducT6KaOfc',
//           track_href: 'https://api.spotify.com/v1/tracks/7BaDRi8gmRnOducT6KaOfc',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7BaDRi8gmRnOducT6KaOfc',
//           duration_ms: 235320,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.728,
//           energy: 0.368,
//           key: 0,
//           loudness: -13.14,
//           mode: 1,
//           speechiness: 0.0364,
//           acousticness: 0.00773,
//           instrumentalness: 0.843,
//           liveness: 0.121,
//           valence: 0.823,
//           tempo: 142.146,
//           type: 'audio_features',
//           id: '4Yo5ugCS9WjFBu5HhBpcBk',
//           uri: 'spotify:track:4Yo5ugCS9WjFBu5HhBpcBk',
//           track_href: 'https://api.spotify.com/v1/tracks/4Yo5ugCS9WjFBu5HhBpcBk',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/4Yo5ugCS9WjFBu5HhBpcBk',
//           duration_ms: 160467,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.547,
//           energy: 0.195,
//           key: 4,
//           loudness: -18.23,
//           mode: 1,
//           speechiness: 0.0402,
//           acousticness: 0.865,
//           instrumentalness: 0.00000117,
//           liveness: 0.128,
//           valence: 0.171,
//           tempo: 91.908,
//           type: 'audio_features',
//           id: '6kjje5iuNsnctFccWoLjSW',
//           uri: 'spotify:track:6kjje5iuNsnctFccWoLjSW',
//           track_href: 'https://api.spotify.com/v1/tracks/6kjje5iuNsnctFccWoLjSW',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/6kjje5iuNsnctFccWoLjSW',
//           duration_ms: 107373,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.824,
//           energy: 0.595,
//           key: 11,
//           loudness: -6.346,
//           mode: 1,
//           speechiness: 0.091,
//           acousticness: 0.0571,
//           instrumentalness: 0.0000037,
//           liveness: 0.0876,
//           valence: 0.157,
//           tempo: 140.039,
//           type: 'audio_features',
//           id: '1I3ZAmPmbFV78oNKnibOiW',
//           uri: 'spotify:track:1I3ZAmPmbFV78oNKnibOiW',
//           track_href: 'https://api.spotify.com/v1/tracks/1I3ZAmPmbFV78oNKnibOiW',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/1I3ZAmPmbFV78oNKnibOiW',
//           duration_ms: 137134,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.606,
//           energy: 0.435,
//           key: 9,
//           loudness: -11.458,
//           mode: 1,
//           speechiness: 0.0614,
//           acousticness: 0.318,
//           instrumentalness: 0.00482,
//           liveness: 0.205,
//           valence: 0.376,
//           tempo: 124.943,
//           type: 'audio_features',
//           id: '4INAYJNWgPwA9RwVeM47mA',
//           uri: 'spotify:track:4INAYJNWgPwA9RwVeM47mA',
//           track_href: 'https://api.spotify.com/v1/tracks/4INAYJNWgPwA9RwVeM47mA',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/4INAYJNWgPwA9RwVeM47mA',
//           duration_ms: 233995,
//           time_signature: 3,
//       },
//       {
//           danceability: 0.593,
//           energy: 0.88,
//           key: 11,
//           loudness: -7.931,
//           mode: 0,
//           speechiness: 0.0282,
//           acousticness: 0.775,
//           instrumentalness: 0.877,
//           liveness: 0.117,
//           valence: 0.519,
//           tempo: 142,
//           type: 'audio_features',
//           id: '2Ncj6X3KgUvmIH6iLPJgHP',
//           uri: 'spotify:track:2Ncj6X3KgUvmIH6iLPJgHP',
//           track_href: 'https://api.spotify.com/v1/tracks/2Ncj6X3KgUvmIH6iLPJgHP',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2Ncj6X3KgUvmIH6iLPJgHP',
//           duration_ms: 237427,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.838,
//           energy: 0.771,
//           key: 1,
//           loudness: -3.791,
//           mode: 1,
//           speechiness: 0.244,
//           acousticness: 0.0117,
//           instrumentalness: 0,
//           liveness: 0.0853,
//           valence: 0.405,
//           tempo: 175.957,
//           type: 'audio_features',
//           id: '2Xqd0wUttjueBfdcltADOv',
//           uri: 'spotify:track:2Xqd0wUttjueBfdcltADOv',
//           track_href: 'https://api.spotify.com/v1/tracks/2Xqd0wUttjueBfdcltADOv',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2Xqd0wUttjueBfdcltADOv',
//           duration_ms: 245387,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.487,
//           energy: 0.763,
//           key: 1,
//           loudness: -5.331,
//           mode: 0,
//           speechiness: 0.03,
//           acousticness: 0.0203,
//           instrumentalness: 0.37,
//           liveness: 0.343,
//           valence: 0.716,
//           tempo: 155.667,
//           type: 'audio_features',
//           id: '3MGkU9iwnb6ziAcPul5dSv',
//           uri: 'spotify:track:3MGkU9iwnb6ziAcPul5dSv',
//           track_href: 'https://api.spotify.com/v1/tracks/3MGkU9iwnb6ziAcPul5dSv',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3MGkU9iwnb6ziAcPul5dSv',
//           duration_ms: 206354,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.766,
//           energy: 0.402,
//           key: 1,
//           loudness: -11.155,
//           mode: 1,
//           speechiness: 0.107,
//           acousticness: 0.27,
//           instrumentalness: 0.0007,
//           liveness: 0.106,
//           valence: 0.466,
//           tempo: 125.107,
//           type: 'audio_features',
//           id: '3RpxY4Ba4Led5IG0R0C7ZR',
//           uri: 'spotify:track:3RpxY4Ba4Led5IG0R0C7ZR',
//           track_href: 'https://api.spotify.com/v1/tracks/3RpxY4Ba4Led5IG0R0C7ZR',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3RpxY4Ba4Led5IG0R0C7ZR',
//           duration_ms: 153857,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.467,
//           energy: 0.53,
//           key: 2,
//           loudness: -8.778,
//           mode: 1,
//           speechiness: 0.0643,
//           acousticness: 0.637,
//           instrumentalness: 0.000784,
//           liveness: 0.128,
//           valence: 0.184,
//           tempo: 149.952,
//           type: 'audio_features',
//           id: '3SB7kIGr58HFNTHMoOnHK6',
//           uri: 'spotify:track:3SB7kIGr58HFNTHMoOnHK6',
//           track_href: 'https://api.spotify.com/v1/tracks/3SB7kIGr58HFNTHMoOnHK6',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3SB7kIGr58HFNTHMoOnHK6',
//           duration_ms: 274000,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.623,
//           energy: 0.615,
//           key: 1,
//           loudness: -10.064,
//           mode: 1,
//           speechiness: 0.146,
//           acousticness: 0.304,
//           instrumentalness: 0.00874,
//           liveness: 0.25,
//           valence: 0.672,
//           tempo: 169.137,
//           type: 'audio_features',
//           id: '3bCOiI9S2c3K9ay67scshE',
//           uri: 'spotify:track:3bCOiI9S2c3K9ay67scshE',
//           track_href: 'https://api.spotify.com/v1/tracks/3bCOiI9S2c3K9ay67scshE',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3bCOiI9S2c3K9ay67scshE',
//           duration_ms: 157303,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.548,
//           energy: 0.876,
//           key: 0,
//           loudness: -4.834,
//           mode: 0,
//           speechiness: 0.11,
//           acousticness: 0.0712,
//           instrumentalness: 0.000142,
//           liveness: 0.322,
//           valence: 0.366,
//           tempo: 128.062,
//           type: 'audio_features',
//           id: '3xwm0faDUX5DQxvNVpawjB',
//           uri: 'spotify:track:3xwm0faDUX5DQxvNVpawjB',
//           track_href: 'https://api.spotify.com/v1/tracks/3xwm0faDUX5DQxvNVpawjB',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/3xwm0faDUX5DQxvNVpawjB',
//           duration_ms: 192853,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.324,
//           energy: 0.542,
//           key: 10,
//           loudness: -6.823,
//           mode: 0,
//           speechiness: 0.0289,
//           acousticness: 0.295,
//           instrumentalness: 0.0755,
//           liveness: 0.109,
//           valence: 0.61,
//           tempo: 159.515,
//           type: 'audio_features',
//           id: '42XZcWNSbZCPQarEodiHbi',
//           uri: 'spotify:track:42XZcWNSbZCPQarEodiHbi',
//           track_href: 'https://api.spotify.com/v1/tracks/42XZcWNSbZCPQarEodiHbi',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/42XZcWNSbZCPQarEodiHbi',
//           duration_ms: 202133,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.608,
//           energy: 0.642,
//           key: 2,
//           loudness: -7.978,
//           mode: 1,
//           speechiness: 0.0251,
//           acousticness: 0.17,
//           instrumentalness: 0.0667,
//           liveness: 0.166,
//           valence: 0.608,
//           tempo: 87.703,
//           type: 'audio_features',
//           id: '59FC22eN2Syt9bbv2d6393',
//           uri: 'spotify:track:59FC22eN2Syt9bbv2d6393',
//           track_href: 'https://api.spotify.com/v1/tracks/59FC22eN2Syt9bbv2d6393',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/59FC22eN2Syt9bbv2d6393',
//           duration_ms: 289160,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.642,
//           energy: 0.721,
//           key: 4,
//           loudness: -9.765,
//           mode: 1,
//           speechiness: 0.0434,
//           acousticness: 0.196,
//           instrumentalness: 0.474,
//           liveness: 0.0926,
//           valence: 0.438,
//           tempo: 124.997,
//           type: 'audio_features',
//           id: '7DkTneByAopqOjXFG6XlZK',
//           uri: 'spotify:track:7DkTneByAopqOjXFG6XlZK',
//           track_href: 'https://api.spotify.com/v1/tracks/7DkTneByAopqOjXFG6XlZK',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7DkTneByAopqOjXFG6XlZK',
//           duration_ms: 245280,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.479,
//           energy: 0.66,
//           key: 3,
//           loudness: -5.125,
//           mode: 0,
//           speechiness: 0.0256,
//           acousticness: 0.0162,
//           instrumentalness: 0.0668,
//           liveness: 0.0839,
//           valence: 0.239,
//           tempo: 81.115,
//           type: 'audio_features',
//           id: '7yhVm87pJ2vxvK9gntVcxm',
//           uri: 'spotify:track:7yhVm87pJ2vxvK9gntVcxm',
//           track_href: 'https://api.spotify.com/v1/tracks/7yhVm87pJ2vxvK9gntVcxm',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/7yhVm87pJ2vxvK9gntVcxm',
//           duration_ms: 214013,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.599,
//           energy: 0.551,
//           key: 6,
//           loudness: -8.195,
//           mode: 1,
//           speechiness: 0.0313,
//           acousticness: 0.0299,
//           instrumentalness: 0.0108,
//           liveness: 0.109,
//           valence: 0.16,
//           tempo: 94.956,
//           type: 'audio_features',
//           id: '5i6G3CbuyjcOjKe7lJrsWX',
//           uri: 'spotify:track:5i6G3CbuyjcOjKe7lJrsWX',
//           track_href: 'https://api.spotify.com/v1/tracks/5i6G3CbuyjcOjKe7lJrsWX',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/5i6G3CbuyjcOjKe7lJrsWX',
//           duration_ms: 248612,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.524,
//           energy: 0.446,
//           key: 8,
//           loudness: -7.823,
//           mode: 0,
//           speechiness: 0.0275,
//           acousticness: 0.688,
//           instrumentalness: 0.000745,
//           liveness: 0.101,
//           valence: 0.272,
//           tempo: 97.856,
//           type: 'audio_features',
//           id: '03CMUlyOZzrNXJnb8Vzm4l',
//           uri: 'spotify:track:03CMUlyOZzrNXJnb8Vzm4l',
//           track_href: 'https://api.spotify.com/v1/tracks/03CMUlyOZzrNXJnb8Vzm4l',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/03CMUlyOZzrNXJnb8Vzm4l',
//           duration_ms: 265773,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.505,
//           energy: 0.753,
//           key: 9,
//           loudness: -7.75,
//           mode: 1,
//           speechiness: 0.0284,
//           acousticness: 0.022,
//           instrumentalness: 0.0091,
//           liveness: 0.0764,
//           valence: 0.534,
//           tempo: 92.016,
//           type: 'audio_features',
//           id: '0AHINsVlQQH5w9kXqvyNod',
//           uri: 'spotify:track:0AHINsVlQQH5w9kXqvyNod',
//           track_href: 'https://api.spotify.com/v1/tracks/0AHINsVlQQH5w9kXqvyNod',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0AHINsVlQQH5w9kXqvyNod',
//           duration_ms: 259480,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.577,
//           energy: 0.527,
//           key: 11,
//           loudness: -11.491,
//           mode: 0,
//           speechiness: 0.16,
//           acousticness: 0.516,
//           instrumentalness: 0.00243,
//           liveness: 0.108,
//           valence: 0.565,
//           tempo: 87.921,
//           type: 'audio_features',
//           id: '0yJRQPFhkgBMP8RyerfH8l',
//           uri: 'spotify:track:0yJRQPFhkgBMP8RyerfH8l',
//           track_href: 'https://api.spotify.com/v1/tracks/0yJRQPFhkgBMP8RyerfH8l',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/0yJRQPFhkgBMP8RyerfH8l',
//           duration_ms: 169091,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.601,
//           energy: 0.668,
//           key: 7,
//           loudness: -8.212,
//           mode: 1,
//           speechiness: 0.0397,
//           acousticness: 0.000714,
//           instrumentalness: 0.0208,
//           liveness: 0.101,
//           valence: 0.75,
//           tempo: 79.049,
//           type: 'audio_features',
//           id: '1DCRoGfiVM9haEMJSnAijx',
//           uri: 'spotify:track:1DCRoGfiVM9haEMJSnAijx',
//           track_href: 'https://api.spotify.com/v1/tracks/1DCRoGfiVM9haEMJSnAijx',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/1DCRoGfiVM9haEMJSnAijx',
//           duration_ms: 298360,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.579,
//           energy: 0.897,
//           key: 0,
//           loudness: -5.74,
//           mode: 1,
//           speechiness: 0.0399,
//           acousticness: 0.644,
//           instrumentalness: 0.521,
//           liveness: 0.136,
//           valence: 0.648,
//           tempo: 154.989,
//           type: 'audio_features',
//           id: '1Fec0QqIGljyAMYZ1UKJ0T',
//           uri: 'spotify:track:1Fec0QqIGljyAMYZ1UKJ0T',
//           track_href: 'https://api.spotify.com/v1/tracks/1Fec0QqIGljyAMYZ1UKJ0T',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/1Fec0QqIGljyAMYZ1UKJ0T',
//           duration_ms: 238320,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.619,
//           energy: 0.427,
//           key: 10,
//           loudness: -10.737,
//           mode: 1,
//           speechiness: 0.04,
//           acousticness: 0.699,
//           instrumentalness: 0.00238,
//           liveness: 0.0823,
//           valence: 0.436,
//           tempo: 61.75,
//           type: 'audio_features',
//           id: '1x3bxSSANgIxkoyGldhmdX',
//           uri: 'spotify:track:1x3bxSSANgIxkoyGldhmdX',
//           track_href: 'https://api.spotify.com/v1/tracks/1x3bxSSANgIxkoyGldhmdX',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/1x3bxSSANgIxkoyGldhmdX',
//           duration_ms: 247360,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.608,
//           energy: 0.65,
//           key: 3,
//           loudness: -11.816,
//           mode: 1,
//           speechiness: 0.0469,
//           acousticness: 0.517,
//           instrumentalness: 0.000689,
//           liveness: 0.115,
//           valence: 0.198,
//           tempo: 158.706,
//           type: 'audio_features',
//           id: '2MASSWjF0hSSj6nj9OftoR',
//           uri: 'spotify:track:2MASSWjF0hSSj6nj9OftoR',
//           track_href: 'https://api.spotify.com/v1/tracks/2MASSWjF0hSSj6nj9OftoR',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2MASSWjF0hSSj6nj9OftoR',
//           duration_ms: 271133,
//           time_signature: 4,
//       },
//       {
//           danceability: 0.546,
//           energy: 0.537,
//           key: 9,
//           loudness: -5.131,
//           mode: 0,
//           speechiness: 0.0251,
//           acousticness: 0.16,
//           instrumentalness: 0.0577,
//           liveness: 0.0922,
//           valence: 0.447,
//           tempo: 81.952,
//           type: 'audio_features',
//           id: '2g9LXMNIBCqmngHpH9nXv0',
//           uri: 'spotify:track:2g9LXMNIBCqmngHpH9nXv0',
//           track_href: 'https://api.spotify.com/v1/tracks/2g9LXMNIBCqmngHpH9nXv0',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2g9LXMNIBCqmngHpH9nXv0',
//           duration_ms: 191307,
//           time_signature: 3,
//       },
//       {
//           danceability: 0.614,
//           energy: 0.571,
//           key: 10,
//           loudness: -9.214,
//           mode: 1,
//           speechiness: 0.0242,
//           acousticness: 0.0383,
//           instrumentalness: 0.0000878,
//           liveness: 0.0838,
//           valence: 0.711,
//           tempo: 95.951,
//           type: 'audio_features',
//           id: '2k7UNbEG8SWv2WyuzPfi11',
//           uri: 'spotify:track:2k7UNbEG8SWv2WyuzPfi11',
//           track_href: 'https://api.spotify.com/v1/tracks/2k7UNbEG8SWv2WyuzPfi11',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2k7UNbEG8SWv2WyuzPfi11',
//           duration_ms: 176627,
//           time_signature: 3,
//       },
//       {
//           danceability: 0.273,
//           energy: 0.786,
//           key: 4,
//           loudness: -5.535,
//           mode: 1,
//           speechiness: 0.116,
//           acousticness: 0.0117,
//           instrumentalness: 0.111,
//           liveness: 0.0364,
//           valence: 0.476,
//           tempo: 149.379,
//           type: 'audio_features',
//           id: '2wb2FptR9dbAw9TIQpMfZ1',
//           uri: 'spotify:track:2wb2FptR9dbAw9TIQpMfZ1',
//           track_href: 'https://api.spotify.com/v1/tracks/2wb2FptR9dbAw9TIQpMfZ1',
//           analysis_url: 'https://api.spotify.com/v1/audio-analysis/2wb2FptR9dbAw9TIQpMfZ1',
//           duration_ms: 520813,
//           time_signature: 4,
//       },
//   ],
// };