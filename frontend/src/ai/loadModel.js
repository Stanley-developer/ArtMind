// Loads MobileNet from /public/model (works offline) - Owner: AMANDA
// Loads MobileNet from /public/model (works offline) - Owner: AMANDA

import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

// MobileNet is the trained model that lets ArtMind look at a painting and
// describe it as numbers. It is about 16 MB, so we only ever want to load it
// once and then keep it in memory for the rest of the visit.
//
// These two variables live outside the functions, at the top level of the file.
// That is on purpose. Anything written here is created once when the file is
// first imported, and every page that imports this file shares the same copy.
// If we had put them inside loadModel, they would be created fresh on every
// call and we would download the model over and over.

// The finished model once it has arrived. Null means we do not have it yet.
let model = null;

// The promise for a download that is happening right now. Null means no
// download is in progress. This is what stops two pages from each starting
// their own download at the same moment.
let loadingPromise = null;

// ABOUT THE OFFLINE FOLDER
//
// frontend/public/model is empty at the moment. It only holds a .gitkeep file
// so that git keeps the folder in the project.
//
// If someone downloads the MobileNet files (model.json plus its .bin weight
// shards) and drops them into that folder, the site loads the AI straight from
// our own server and works with no internet at all. That is the goal, and it
// is the honest way to demo the project on a machine with no connection.
//
// Until someone does that, the first attempt below fails and we fall back to
// mobilenet.load(), which fetches the model from Google over the internet. So
// right now the AI features need internet the first time they are used in a
// session. After that the model is in memory and no more network is needed.

// This is the part that actually fetches the model. It is kept separate from
// loadModel so that loadModel stays easy to read.
async function downloadModel() {
  try {
    // First choice: our own public/model folder. In Vite, anything inside the
    // public folder is served from the site root, so public/model/model.json
    // is reached at the address '/model/model.json'.
    const offlineModel = await mobilenet.load({
      version: 2,
      alpha: 1.0,
      modelUrl: "/model/model.json",
    });
    console.log("ArtMind: loaded MobileNet from the local model folder.");
    return offlineModel;
  } catch (error) {
    // We land here when the folder is still empty, which it is today.
    // Saying so in the console is better than failing silently, because the
    // next person to open the project will understand what happened.
    console.log(
      "ArtMind: no model in public/model, downloading MobileNet instead.",
    );
    const onlineModel = await mobilenet.load();
    return onlineModel;
  }
}

// Call this from any page that needs the AI. Await it and you get the model.
async function loadModel() {
  // Case 1. We already have the model from an earlier call, so hand it back
  // immediately. No waiting and no network.
  if (model !== null) {
    return model;
  }

  // Case 2. A download is already running because another page asked first.
  // We wait on that same promise instead of starting a second download.
  if (loadingPromise !== null) {
    return loadingPromise;
  }

  // Case 3. Nobody has asked yet, so we are the one who starts it.
  // Notice that we store the promise before awaiting it. That single line is
  // what makes case 2 possible, because any call that arrives while we are
  // still waiting will find the promise sitting here.
  loadingPromise = downloadModel();

  try {
    model = await loadingPromise;
    return model;
  } catch (error) {
    // The download failed, most likely because there is no internet and no
    // local copy either. Clear the promise so a later call is allowed to try
    // again, then pass the error up so the page can show a friendly message.
    loadingPromise = null;
    throw error;
  }
}

// A quick yes or no answer for pages that want to show text like
// "loading the AI" before the model is ready. This only checks the variable,
// so calling it never starts a download.
function isModelLoaded() {
  return model !== null;
}

export default loadModel;
export { loadModel, isModelLoaded };
