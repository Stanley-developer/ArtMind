// Upload a photo and recognise it (Feature 4) - Owner: AMANDA

import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import SimilarPaintings from "../components/SimilarPaintings";
import { getEmbedding } from "../ai/embedding";
import { guessCategory } from "../ai/knn";
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

function findNeighbourPaintings(neighbours) {
  const found = [];

  if (!neighbours) {
    return found;
  }

  for (let i = 0; i < neighbours.length; i = i + 1) {
    const neighbour = neighbours[i];
    const painting = artworks.find((item) => item.id === neighbour.id);

    if (painting) {
      found.push({
        id: painting.id,
        title: painting.title,
        artist: painting.artist,
        image: painting.image,
        similarity: neighbour.similarity,
      });
    }
  }

  return found;
}

function toPercent(value) {
  return Math.round(value * 100);
}

const modelErrorText =
  "The AI could not run. The model is downloaded from the internet the first time it is used, so check your connection and try again.";

function Upload() {
  const [previewUrl, setPreviewUrl] = useState("");
  const [working, setWorking] = useState(false);
  const [guess, setGuess] = useState(null);
  const [matches, setMatches] = useState([]);
  const [errorText, setErrorText] = useState("");

  const stored = readStore("artmind_embeddings", []);
  let savedEmbeddings = [];
  if (Array.isArray(stored)) {
    savedEmbeddings = stored;
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    setGuess(null);
    setMatches([]);
    setErrorText("");
  }

  async function handleRecognise() {
    setWorking(true);
    setErrorText("");

    try {
      const imageElement = document.getElementById("preview-image");

      const numbers = await getEmbedding(imageElement);

      const answer = await guessCategory(numbers, savedEmbeddings);

      setGuess(answer);
      setMatches(findNeighbourPaintings(answer.neighbours));
    } catch (error) {
      setErrorText(modelErrorText);
    }

    setWorking(false);
  }

  return (
    <div className="container py-5">
      <p className="eyebrow">Photo Recognition</p>
      <h1 className="page-title">Recognise a painting</h1>

      {savedEmbeddings.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-state-title">The AI has not been trained yet</h2>
          <p className="empty-state-text">
            An admin needs to open the Build AI page once and let it read every
            painting. After that this page will work for everybody.
          </p>
          <Link className="btn btn-teal mt-4" to="/admin/build-ai">
            Go to Build AI
          </Link>
        </div>
      ) : (
        <div className="row g-5">
          <div className="col-md-6">
            <h3 className="small-heading">Choose a picture</h3>
            <p className="band-lead">
              Pick a photo of a painting from your computer and we will tell you
              what kind of work it is and which pieces in our collection look
              closest to it.
            </p>

            <input
              type="file"
              accept="image/*"
              className="form-control mb-4"
              onChange={handleFileChange}
            />

            {previewUrl ? (
              <div className="hero-frame mb-4">
                <img
                  id="preview-image"
                  src={previewUrl}
                  alt="The picture you chose"
                />
              </div>
            ) : null}

            <button
              className="btn btn-teal"
              onClick={handleRecognise}
              disabled={previewUrl === "" || working}
            >
              Recognise this painting
            </button>
          </div>

          <div className="col-md-6">
            {working ? (
              <LoadingSpinner message="Looking at your picture. The first run downloads the model, so give it a moment." />
            ) : null}

            {errorText !== "" ? (
              <div className="ai-summary-box">
                <h3 className="small-heading">Something went wrong</h3>
                <p>{errorText}</p>
              </div>
            ) : null}

            {guess && !working ? (
              <div className="ai-summary-box">
                <h3 className="small-heading">What we think this is</h3>
                <p>
                  This looks like a {guess.category} painting. We are{" "}
                  {toPercent(guess.confidence)} percent sure.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}

      <SimilarPaintings
        paintings={matches}
        title="Closest works in our collection"
      />
    </div>
  );
}

export default Upload;
