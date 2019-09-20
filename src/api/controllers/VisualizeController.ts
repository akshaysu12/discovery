import {
  JsonController, HttpCode, Get, QueryParam
} from 'routing-controllers';
import { SpotifyService } from '../webServices/SpotifyService';
import { parseTopTracks, convertData } from '../helpers/spotifyHelper';
import { AuthService } from '../webServices/AuthService';
import { createVisualization } from '../helpers/dataHelper';

@JsonController('/visualize')
export class VisualizeController {

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService
  ) {}

  @HttpCode(200)
  @Get('/')
  public async Visualize(@QueryParam('code') code: string): Promise<any> {
    const userToken = await this.getUserToken(code);
    const serviceToken = await this.getServiceToken(code);

    const tracks = await this.spotifyService.topTracks(userToken);
    const trackData =  parseTopTracks(tracks);

    const features = await this.spotifyService.features(serviceToken, trackData.ids);
    const dimensions = createVisualization(features);
    return {
      titles: trackData.titles,
      dimensions: convertData(dimensions),
    };
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
