import {
  Authorized, Post, JsonController, Body
} from 'routing-controllers';
import { SpotifyService } from '../webServices/SpotifyService';
import { parseTopTracks } from '../helpers/spotifyHelper';
// import { createVisualization } from '../helpers/dataHelper';

@Authorized()
@JsonController('/authorize')
export class AuthorizeController {

  constructor(
    private spotifyService: SpotifyService
  ) {}

  @Post()
  public async Authorize(@Body() code: string ): Promise<object> {
    const userToken = await this.spotifyService.token(code, 'authorization_code');
    const tracks = await this.spotifyService.topTracks(userToken);
    const serviceToken = await this.spotifyService.token(code, 'client_credentials');
    // tslint:disable-next-line: no-string-literal
    // const topTracks = tracks['items'].map((track) => track.id);
    const features = await this.spotifyService.features(serviceToken, parseTopTracks(tracks));
    return features;
    // return createVisualization(serviceToken);
  }

}
