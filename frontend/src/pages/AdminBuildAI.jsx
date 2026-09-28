// Admin only - runs MobileNet once over every painting - Owner: AMANDA

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getEmbedding } from "../ai/embedding";
import { artworks } from "../data/artworks";

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
function loadPicture(source) {
  return new Promise(function (resolve, reject) {
    const picture = new Image();

    picture.crossOrigin = "anonymous";

    picture.onload = function () {
      resolve(picture);
    };

    picture.onerror = function () {
      reject(new Error("The picture " + source + " could not be loaded."));
    };

    picture.src = source;
  });
}

function AdminBuildAI() {
  const { user } = useUser();

  const [savedCount, setSavedCount] = useState(0);

  const [running, setRunning] = useState(false);

  const [doneCount, setDoneCount] = useState(0);

  const [finishedCount, setFinishedCount] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

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

      for (let i = 0; i < artworks.length; i++) {
        const painting = artworks[i];

        const picture = await loadPicture(painting.image);
        const embedding = await getEmbedding(picture);

        collected.push({
          id: painting.id,
          category: painting.category,
          embedding: embedding,
        });

        setDoneCount(i + 1);
      }

      localStorage.setItem("artmind_embeddings", JSON.stringify(collected));

      setSavedCount(collected.length);
      setFinishedCount(collected.length);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setRunning(false);
  }

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
