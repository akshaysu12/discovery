import {
  Authorized, Post, JsonController, Body, HttpCode, Get
} from 'routing-controllers';
import { SpotifyService } from '../webServices/SpotifyService';
import { parseTopTracks } from '../helpers/spotifyHelper';
import { createVisualization } from '../helpers/dataHelper';

@Authorized()
@JsonController('/authorize')
export class AuthorizeController {

  constructor(
    private spotifyService: SpotifyService
  ) {}

  @HttpCode(200)
  @Post('/')
  public async Authorize(@Body() authorizeBody: any): Promise<object> {
    const userToken = await this.spotifyService.token(authorizeBody.code, 'authorization_code');
    const tracks = await this.spotifyService.topTracks(userToken);
    // console.log('TRACKS: ', tracks);
    const trackIds =  parseTopTracks(tracks);
    console.log('IDS: ', trackIds);
    const serviceToken = await this.spotifyService.token(authorizeBody.code, 'client_credentials');
    console.log('TOKEN: ', serviceToken);
    // tslint:disable-next-line: no-string-literal
    // const topTracks = tracks['items'].map((track) => track.id);
    const features = await this.spotifyService.features(serviceToken, trackIds);
    return features;
  }

  @HttpCode(200)
  @Get('/visualize')
  public async Visualize(): Promise<any> {
    return createVisualization();
  }

}
