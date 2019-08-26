import * as tsnejs from '@jwalsh/tsnejs';

export const createVisualization = (data: any) => {
  const opt = {
    epsilon: 10,    // epsilon is learning rate (10 = default)
    perplexity: 30, // roughly how many neighbors each point influences (30 = default)
    dim: 2 // dimensionality of the embedding (2 = default)
  };

  var tsne = new tsnejs.tSNE(opt); // create a tSNE instance

  // initialize data. Here we have 3 points and some example pairwise dissimilarities
  // var dists = [[1.0, 0.1, 0.2], [0.1, 1.0, 0.3], [0.2, 0.1, 1.0]];
  tsne.initDataDist(data);

  for (let k = 0; k < 100; k++) {
    tsne.step(); // every time you call this, solution gets better
  }

  return tsne.getSolution(); // Y is an array of 2-D points that you can plot
}