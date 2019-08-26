import TSNE from 'tsne-js';

export const createVisualization = (data: any) => {

  const model = new TSNE({
    dim: 2,
    perplexity: 30.0,
    earlyExaggeration: 4.0,
    learningRate: 100.0,
    nIter: 100,
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
  // const [error, iter] = model.rerun();

  // `output` is unpacked ndarray (regular nested javascript array)
  return model.getOutput();

  // `outputScaled` is `output` scaled to a range of [-1, 1]
  // const outputScaled = model.getOutputScaled();
};