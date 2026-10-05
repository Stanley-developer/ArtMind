// Loads MobileNet from /public/model (works offline) - Owner: AMANDA

import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
let model = null;

let loadingPromise = null;

async function downloadModel() {
  try {
    const offlineModel = await mobilenet.load({
      version: 2,
      alpha: 1.0,
      modelUrl: "/model/model.json",
    });
    console.log("ArtMind: loaded MobileNet from the local model folder.");
    return offlineModel;
  } catch (error) {
    console.log(
      "ArtMind: no model in public/model, downloading MobileNet instead.",
    );
    const onlineModel = await mobilenet.load();
    return onlineModel;
  }
}

async function loadModel() {
  if (model !== null) {
    return model;
  }
  if (loadingPromise !== null) {
    return loadingPromise;
  }

  loadingPromise = downloadModel();

  try {
    model = await loadingPromise;
    return model;
  } catch (error) {
    throw error;
  }
}

function isModelLoaded() {
  return model !== null;
}

export default loadModel;
export { loadModel, isModelLoaded };
