// Turns an image into 1024 numbers using MobileNet - Owner: AMANDA

import loadModel from "./loadModel";

async function getEmbedding(imageElement) {
  const model = await loadModel();

  const tensor = model.infer(imageElement, true);

  const data = await tensor.data();
  const numbers = Array.from(data);

  tensor.dispose();

  return numbers;
}

export default getEmbedding;
export { getEmbedding };
