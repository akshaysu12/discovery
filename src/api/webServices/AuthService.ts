import qs from 'qs';
import axios from 'axios';
import btoa from 'btoa';
import { env } from '../../env';
import { Service } from 'typedi';
import { HttpError } from 'routing-controllers';

@Service()
export class AuthService {

  constructor() {}

  public async token(body: object): Promise<object> {
    const auth = `${env.app.spotify.clientId}:${env.app.spotify.clientSecret}`;
    const url = 'https://accounts.spotify.com/api/token';

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
      throw new HttpError(500, 'error exchanging code for token');
    }
  }
}
