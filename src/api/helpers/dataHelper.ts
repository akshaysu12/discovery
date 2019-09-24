import TSNE from 'tsne-js';
import { parseAudioFeatures } from './spotifyHelper';

export const createVisualization = (features: any) => {

  const data = parseAudioFeatures(features);
  const model = new TSNE({
    dim: 2,
    perplexity: 20.0,
    earlyExaggeration: 4.0,
    learningRate: 100,
    nIter: 1000,
    metric: 'euclidean',
  });

  // inputData is a nested array which can be converted into an ndarray
  // alternatively, it can be an array of coordinates (second argument should be specified as 'sparse')
  model.init({
    data,
    type: 'dense',
  });

  // `error`,  `iter`: final error and iteration number
  // note: computation-heavy action happens here
  const [error, iter] = model.run();

  if (error) {
    console.log(`error on iteration ${iter}: ${error}`);
  }

  // rerun without re-calculating pairwise distances, etc.
  // [error, iter] = model.rerun();

  // if (error) {
  //   console.log(`error on iteration ${iter}: ${error}`);
  // }

  // `output` is unpacked ndarray (regular nested javascript array)
  // return model.getOutput();

  // `outputScaled` is `output` scaled to a range of [-1, 1]
  return model.getOutputScaled();
};
