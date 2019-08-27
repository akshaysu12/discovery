import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import btoa from 'btoa';
import { env } from '../../env';
import { Service } from 'typedi';
import { HttpError } from 'routing-controllers';

@Service()
export class SpotifyService {

  constructor() {}

  public async token(code: string, grantType: string): Promise<object> {
    const auth = `${env.app.spotify.clientId}:${env.app.spotify.clientSecret}`;
    const url = 'https://accounts.spotify.com/api/token';
    const body = {
      grant_type: grantType,
    };

    if (grantType === 'authorization_code') {
      // tslint:disable: no-string-literal
      body['code'] = code;
      body['redirect_uri'] = 'http://localhost:9000/login';
    }

    const options = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(auth)}`,
      },
    };
    try {
      const res = await axios.post(url, qs.stringify(body), options);
      const data = res.data;
      return data.access_token;

    } catch (error) {
      console.log('ERROR: ', error);
      throw new HttpError(500);
    }
  }

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
    console.log(queryIds);
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
