// Admin only - runs MobileNet once over every painting - Owner: AMANDA
// Admin only - runs MobileNet once over every painting - Owner: AMANDA

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getEmbedding } from "../ai/embedding";
import { artworks } from "../data/artworks";

// WHY THIS PAGE EXISTS
//
// Before the site can say "here are paintings that look like this one", it
// needs the 1024 numbers for every painting in the gallery. Working those
// numbers out means running MobileNet over each picture, and that takes a
// second or two per painting. Fourteen paintings is therefore the best part of
// half a minute of the browser doing nothing else.
//
// If we did that work on every page load, every visitor would sit and wait,
// and the site would feel broken. So we do it once, here, on purpose, and we
// save the answers in localStorage. After that the rest of the site just reads
// the saved numbers, which is instant.
//
// Doing slow work in advance and saving the result is called pre-computing.
// It is the same idea as chopping the vegetables before the guests arrive.

// The one place we read saved data from. Wrapping it in try and catch means a
// half written or hand edited value in localStorage gives us the fallback
// instead of crashing the whole page.
function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

// MobileNet reads the pixels straight off a real picture element, so we cannot
// hand it a file name. We have to create an image, point it at the file and
// wait for the browser to finish fetching it.
//
// Loading is not something we can wait for with a plain line of code, because
// the browser tells us it has finished by calling onload later. A Promise is
// how we turn that "call me back later" into something we can await.
function loadPicture(source) {
  return new Promise(function (resolve, reject) {
    const picture = new Image();

    // A browser will not let JavaScript read the pixels of a picture that came
    // from a different website unless that site gives permission. Asking for
    // permission here costs nothing for our own pictures and keeps the page
    // working if a painting is ever linked from somewhere else.
    picture.crossOrigin = "anonymous";

    picture.onload = function () {
      resolve(picture);
    };

    picture.onerror = function () {
      reject(new Error("The picture " + source + " could not be loaded."));
    };

    // The src line goes last. Setting it is what starts the download, so the
    // two handlers above must already be in place.
    picture.src = source;
  });
}

function AdminBuildAI() {
  const { user } = useUser();

  // How many paintings the data saved on this computer covers. Zero means
  // nothing has been built yet.
  const [savedCount, setSavedCount] = useState(0);

  // True only while a build is running, so we can disable the button and show
  // the progress bar.
  const [running, setRunning] = useState(false);

  // How many paintings have been measured so far in the run happening now.
  const [doneCount, setDoneCount] = useState(0);

  // Set after a run finishes, so we can show the success line once.
  const [finishedCount, setFinishedCount] = useState(0);

  // Empty string means no error. Anything else gets shown to the admin.
  const [errorMessage, setErrorMessage] = useState("");

  // When the page opens, look at what is already saved so the admin knows
  // whether they are building for the first time or replacing old data.
  useEffect(() => {
    const saved = readStore("artmind_embeddings", []);
    if (Array.isArray(saved)) {
      setSavedCount(saved.length);
    }
  }, []);

  async function buildTheData() {
    setRunning(true);
    setErrorMessage("");
    setDoneCount(0);
    setFinishedCount(0);

    try {
      const collected = [];

      // One painting at a time, and that is deliberate. We could start all
      // fourteen at once, but MobileNet is heavy and the browser has one main
      // thread to do it on, so they would fight each other and the tab would
      // lock up. A plain loop with await is slower on paper and far kinder in
      // practice, and it lets us report honest progress as we go.
      for (let i = 0; i < artworks.length; i++) {
        const painting = artworks[i];

        const picture = await loadPicture(painting.image);
        const embedding = await getEmbedding(picture);

        // The category is saved next to the numbers because the guessing code
        // in knn.js needs to know what each set of numbers was a painting of.
        // Numbers with no label cannot teach anything.
        collected.push({
          id: painting.id,
          category: painting.category,
          embedding: embedding,
        });

        setDoneCount(i + 1);
      }

      // Everything worked, so write the whole list in one go. Saving only at
      // the end means a run that fails halfway leaves the old data alone
      // rather than replacing it with a half finished list.
      localStorage.setItem("artmind_embeddings", JSON.stringify(collected));

      setSavedCount(collected.length);
      setFinishedCount(collected.length);
    } catch (error) {
      // Most failures here are a missing picture file or the model not being
      // able to download. Showing the real message saves a lot of guessing.
      setErrorMessage(error.message);
    }

    // This runs whether the build worked or not, so the button always comes
    // back to life and the admin is never stuck.
    setRunning(false);
  }

  // THE DOOR CHECK
  //
  // This page rewrites data the whole site depends on, so only an admin is
  // allowed in. We show a message rather than sending the visitor somewhere
  // else, because a page that silently jumps away is confusing.
  if (!user || user.role !== "admin") {
    return (
      <div className="container py-5">
        <p className="eyebrow">Restricted</p>
        <h1 className="page-title">Admins only</h1>
        <p className="band-lead mb-4">
          This page rebuilds the AI data for the whole gallery, so it is kept
          for admin accounts.
        </p>
        <Link to="/" className="btn btn-teal">
          Back to the home page
        </Link>
      </div>
    );
  }

  // Work out how far along the bar should be. Dividing by the number of
  // paintings turns "3 of 14" into a percentage the bar can use as a width.
  let percent = 0;
  if (artworks.length > 0) {
    percent = Math.round((doneCount / artworks.length) * 100);
  }

  return (
    <div className="container py-5">
      <p className="eyebrow">Admin</p>
      <h1 className="page-title">Build the AI data</h1>

      <div className="row">
        <div className="col-md-8">
          <p className="band-lead mb-4">
            This measures every painting in the gallery once and saves the
            result on this computer. The similar paintings panel and the
            category guess both read that saved data, which is why they need
            this to be done first.
          </p>

          <div className="ai-summary-box">
            {savedCount > 0 ? (
              <p>
                AI data is already saved and it covers {savedCount} paintings.
                Building again measures everything from the start and replaces
                what is there now.
              </p>
            ) : (
              <p>
                No AI data is saved yet. The similar paintings panel and the
                category guess stay empty until this has been run once.
              </p>
            )}
          </div>

          <button
            className="btn btn-teal mb-4"
            onClick={buildTheData}
            disabled={running}
          >
            {running ? "Working, please wait" : "Build the AI data"}
          </button>

          {running ? (
            <div className="mb-4">
              <p className="small-heading">
                {doneCount} of {artworks.length} done
              </p>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: percent + "%" }}
                ></div>
              </div>
              <p className="loading-text">
                Each painting takes a moment. Please leave this tab open until
                it finishes.
              </p>
            </div>
          ) : null}

          {finishedCount > 0 ? (
            <div className="alert alert-success">
              Finished. {finishedCount} paintings were measured and saved. The
              gallery can now show similar work and guess categories.
            </div>
          ) : null}

          {errorMessage !== "" ? (
            <div className="alert alert-danger">
              Something went wrong and nothing was saved. {errorMessage}
            </div>
          ) : null}

          <h2 className="small-heading mt-5">What this actually does</h2>
          <p className="band-lead">
            For each painting it loads the picture, hands it to MobileNet and
            keeps the 1024 numbers the model gives back. Those numbers describe
            shape, texture and colour, so two paintings that look alike end up
            with similar numbers. Saving them once is what keeps the rest of the
            site fast.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminBuildAI;
