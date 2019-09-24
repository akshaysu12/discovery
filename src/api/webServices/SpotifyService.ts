import axios, { AxiosRequestConfig } from 'axios';
import { Service } from 'typedi';

@Service()
export class SpotifyService {

  constructor() {}

  public async topTracks(token: object): Promise<object[]> {
    const timeRange = ['short_term', 'medium_term', 'long_term'];

    const auth = `Bearer ${token}`;

    const requests = timeRange.map((range: string) => {
      const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50`;
      const options = this.createRequest(url, auth);
      return axios(options);
    });

    const res = await Promise.all(requests);
    return res.reduce((accum, result) => accum.concat(result.data.items), []);
  }

  public async features(token: object, tracks: string[]): Promise<object> {
    const auth = `Bearer ${token}`;

    const accumulate = (accum, id) => accum + '%2C' + id;
    const queryParamList = [tracks.slice(0, 90).reduce(accumulate), tracks.slice(90, tracks.length).reduce(accumulate)];

    const requests = queryParamList.map((queryIds) => {
      const url = `https://api.spotify.com/v1/audio-features?ids=${queryIds}`;
      const options = this.createRequest(url, auth);
      return axios(options);
    });

    const res = await Promise.all(requests);
    const features = res.reduce((accum, result) => accum.concat(result.data.audio_features), []);
    console.log(features.length);
    return features;
  }

  private createRequest(url: string, auth: string): AxiosRequestConfig {
    return {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
      url,
    };
  }

}
