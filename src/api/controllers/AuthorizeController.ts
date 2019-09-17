import {
  Authorized, Post, JsonController, Body, HttpCode
} from 'routing-controllers';
import { SpotifyService } from '../webServices/SpotifyService';
import { parseTopTracks } from '../helpers/spotifyHelper';
import { AuthService } from '../webServices/AuthService';
import { createVisualization } from '../helpers/dataHelper';

@Authorized()
@JsonController('/authorize')
export class AuthorizeController {

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService
  ) {}

  @HttpCode(200)
  @Post('/')
  public async Visualize(@Body() authorizeBody: any): Promise<object> {

    const userToken = this.getUserToken(authorizeBody.code);
    const serviceToken = this.getServiceToken(authorizeBody.code);

    const tracks = await this.spotifyService.topTracks(userToken);
    const trackData =  parseTopTracks(tracks);

    const features = await this.spotifyService.features(serviceToken, trackData.ids);
    return createVisualization(features);
  }

  private async getUserToken(code: string): Promise<object> {
    const body = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:9000/login',
    };
    return await this.authService.token(body);
  }

  private async getServiceToken(code: string): Promise<object> {
    const body = {
      grant_type: 'client_credentials',
    };
    return await this.authService.token(body);
  }

}
