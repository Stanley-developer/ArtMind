// Turns an image into 1024 numbers using MobileNet - Owner: AMANDA
// Turns an image into 1024 numbers using MobileNet - Owner: AMANDA

import loadModel from "./loadModel";

// This file does one job. You hand it a picture that is already showing on the
// page and it hands back a list of 1024 numbers that describe that picture.
// Those numbers are called an embedding. Two paintings that look alike end up
// with similar numbers, and that is what lets the app find similar art later.
//
// The imageElement you pass in must be a real <img> tag that has finished
// loading, because MobileNet reads the pixels straight off the element.
async function getEmbedding(imageElement) {
  // Step 1. Get the model. loadModel keeps one copy in memory and gives the
  // same copy back every time, so calling it here is cheap after the first go.
  const model = await loadModel();

  // Step 2. Ask the model about the image.
  // The second argument, true, means "give me the numbers from the second to
  // last layer, not the final label". That one word is the whole trick of this
  // project. MobileNet was trained on photos of everyday objects, so if we let
  // it pick a label it would tell us a painting is an envelope or a jigsaw
  // puzzle, which is useless. But the numbers sitting behind that label still
  // describe shape, texture and colour, and those are exactly the things that
  // make two paintings look alike. So we throw the guess away and keep the
  // numbers.
  const tensor = model.infer(imageElement, true);

  // Step 3. The model gives back a tensor, which is TensorFlow's own kind of
  // box for numbers. We cannot loop over it or save it to localStorage as it
  // is, so we pull the numbers out with data() and copy them into a normal
  // JavaScript array with Array.from.
  const data = await tensor.data();
  const numbers = Array.from(data);

  // Step 4. Free the memory. TensorFlow does not clean up after itself in the
  // browser, because tensors live on the graphics card where the garbage
  // collector cannot reach them. If we forget this line, every painting we
  // scan leaves its tensor behind and the tab slowly runs out of memory.
  tensor.dispose();

  // Step 5. Hand back the plain array of 1024 numbers.
  return numbers;
}

// Two ways out of the same door. Files can write either
// import getEmbedding from '../ai/embedding'
// or
// import { getEmbedding } from '../ai/embedding'
// and both land on the function above.
export default getEmbedding;
export { getEmbedding };
