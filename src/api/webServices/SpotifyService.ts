import axios, { AxiosRequestConfig } from 'axios';
import { Service } from 'typedi';

@Service()
export class SpotifyService {

  constructor() {}

  public async topTracks(token: object): Promise<object[]> {
    const auth = `Bearer ${token}`;
    const url = 'https://api.spotify.com/v1/me/top/tracks?limit=50';
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
      url,
    };
    const res = await axios(options);
    return res.data.items;
  }

  public async features(token: object, tracks: string[]): Promise<object> {
    const auth = `Bearer ${token}`;
    const queryIds = tracks.reduce((accum, id) => accum + '%2C' + id);
    const url = `https://api.spotify.com/v1/audio-features?ids=${queryIds}`;
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
      url,
    };
    const res = await axios(options);
    return res.data;
  }

}
