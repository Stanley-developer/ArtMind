// Guesses the category from the nearest matching paintings - Owner: AMANDA
// Guesses the category from the nearest matching paintings - Owner: AMANDA

// This file holds the maths behind the AI guess. The method is called
// k nearest neighbour, and behind the long name it is a very simple idea:
// "which paintings look most like this one, and what are they".
// We do not train anything here. We already have a list of paintings whose
// category we know, we measure how close the new painting is to each of them,
// then we let the closest few vote on the answer.

// HOW WE MEASURE CLOSENESS
//
// Every painting is described by an array of 1024 numbers called an embedding,
// made by embedding.js. To compare two paintings we compare their two arrays.
// Cosine similarity is the usual way to do that. A score of 1 means the two
// arrays point in exactly the same direction, so the paintings are identical
// as far as the model is concerned. A score of 0 means nothing alike at all.
function cosineSimilarity(a, b) {
  // dot grows when the two arrays agree at the same position.
  let dot = 0;
  // sizeA and sizeB measure how big each array is on its own. We need them so
  // that a painting with large numbers does not score higher just for that.
  let sizeA = 0;
  let sizeB = 0;

  for (let i = 0; i < a.length; i++) {
    dot = dot + a[i] * b[i];
    sizeA = sizeA + a[i] * a[i];
    sizeB = sizeB + b[i] * b[i];
  }

  // If either array is all zeros its size is 0, and dividing by 0 would give
  // us NaN. An empty description cannot look like anything, so we say 0.
  if (sizeA === 0 || sizeB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(sizeA) * Math.sqrt(sizeB));
}

// A compare function for sort. Sort hands us two items at a time and wants a
// number back. A negative number means the first item goes first, so working
// out second minus first puts the biggest score at the top of the list.
function compareByScore(first, second) {
  return second.score - first.score;
}

// embedding is the 1024 numbers for the painting we are guessing about.
// labelled is an array of { id, category, embedding } we already know about,
// which the app keeps in localStorage under 'artmind_embeddings'.
// k is how many neighbours are allowed to vote. Five is a sensible default.
function guessCategory(embedding, labelled, k) {
  // Nothing has been scanned yet, so there is nobody to compare against and
  // no honest answer to give.
  if (!labelled || labelled.length === 0) {
    return { category: null, confidence: 0, neighbours: [] };
  }

  // Step 1. Work out how many neighbours we are asking.
  let howMany = k;
  if (howMany === undefined) {
    howMany = 5;
  }

  // Step 2. Score the new painting against every painting we know.
  const scored = [];
  for (let i = 0; i < labelled.length; i++) {
    const item = labelled[i];
    const score = cosineSimilarity(embedding, item.embedding);
    // We keep the id so the page can look the painting up and show it.
    scored.push({ id: item.id, category: item.category, score: score });
  }

  // Step 3. Put the closest matches at the front.
  scored.sort(compareByScore);

  // Step 4. Take the top few. slice stops early on its own if the list is
  // shorter than howMany, so a brand new gallery with two paintings in it
  // still works instead of crashing.
  const neighbours = scored.slice(0, howMany);

  // Step 5. Count the votes. counts ends up looking like
  // { Portrait: 3, Landscape: 2 }
  const counts = {};
  for (let i = 0; i < neighbours.length; i++) {
    const name = neighbours[i].category;
    if (counts[name] === undefined) {
      counts[name] = 1;
    } else {
      counts[name] = counts[name] + 1;
    }
  }

  // Step 6. Find the category with the most votes.
  const names = Object.keys(counts);
  let winner = names[0];
  let winnerVotes = counts[winner];
  for (let i = 1; i < names.length; i++) {
    const name = names[i];
    if (counts[name] > winnerVotes) {
      winner = name;
      winnerVotes = counts[name];
    }
  }

  // Step 7. Turn the votes into a confidence between 0 and 1. Four votes out
  // of five is 0.8, and the page can show that as 80 percent.
  // We divide by the number of neighbours we actually had rather than by k,
  // because if only three paintings are saved then three votes out of three
  // really is full agreement.
  const confidence = winnerVotes / neighbours.length;

  // The page gets the answer, how sure we are, and the paintings that led us
  // there, so it can show its working instead of asking to be believed.
  return { category: winner, confidence: confidence, neighbours: neighbours };
}

// guessCategory is the main job of this file, so it is the default export.
// cosineSimilarity is the helper it leans on, exported as well because the
// admin page uses it on its own to show how alike two paintings are.
// Either of these works:
// import guessCategory from '../ai/knn'
// import { cosineSimilarity, guessCategory } from '../ai/knn'
export default guessCategory;
export { cosineSimilarity, guessCategory };
