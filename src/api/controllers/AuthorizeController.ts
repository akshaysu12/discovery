import {
  Authorized, Post, JsonController, Body
} from 'routing-controllers';
import { SpotifyService } from '../webServices/SpotifyService';
import { parseTopTracks } from '../helpers/spotifyHelper';
import { createVisualization } from '../helpers/dataHelper';

@Authorized()
@JsonController('/authorize')
export class UserController {

  constructor(
    private spotifyService: SpotifyService,
  ) {}

  @Post()
  public async Authorize(@Body() code: string ): Promise<string> {
    const userToken = await this.spotifyService.token(code, 'authorization_code');
    const tracks = await this.spotifyService.topTracks(userToken);
    const serviceToken = await this.spotifyService.token(code, 'client_credentials');
    const features = await this.spotifyService.features(serviceToken, parseTopTracks(tracks));
    return createVisualization(features);
  }

}
