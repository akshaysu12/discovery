import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import btoa from 'btoa';
import { env } from '../../env';
import { Service } from 'typedi';

@Service()
export class SpotifyService {

  constructor() {}

  public async token(code: string, grantType: string): Promise<object> {
    const auth = `${env.app.spotify.clientId}:${env.app.spotify.clientSecret}`;
    const url = 'https://accounts.spotify.com/api/token';
    const data = {
      grant_type: grantType,
    };

    if (grantType === 'authorization_code') {
      // tslint:disable: no-string-literal
      data['code'] = code;
      data['redirect_uri'] = 'http://localhost:9000/login';
    }
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(auth)}`,
      },
      data: qs.stringify(data),
      url,
    };
    const token = axios(options);
    return token;
  }

  public async topTracks(token: object): Promise<object> {
    const auth = `Bearer ${token}`;
    const url = 'https://api.spotify.com/v1/me/top/tracks?limit=50';
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
      url,
    };
    const res = axios(options);
    return res;
  }

  public async features(token: object, tracks: string[]): Promise<object> {
    const auth = `Bearer ${token}`;
    const url = `https://api.spotify.com/v1/audio-features?ids=${tracks.toString}`;
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
      url,
    };
    const res = axios(options);
    return res;
  }

}
