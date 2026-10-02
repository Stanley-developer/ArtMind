// Guesses the category from the nearest matching paintings - Owner: AMANDA

function cosineSimilarity(a, b) {
  let dot = 0;
  let sizeA = 0;
  let sizeB = 0;

  for (let i = 0; i < a.length; i++) {
    dot = dot + a[i] * b[i];
    sizeA = sizeA + a[i] * a[i];
    sizeB = sizeB + b[i] * b[i];
  }

  if (sizeA === 0 || sizeB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(sizeA) * Math.sqrt(sizeB));
}

function compareByScore(first, second) {
  return second.score - first.score;
}

function guessCategory(embedding, labelled, k) {
  if (!labelled || labelled.length === 0) {
    return { category: null, confidence: 0, neighbours: [] };
  }

  let howMany = k;
  if (howMany === undefined) {
    howMany = 5;
  }

  const scored = [];
  for (let i = 0; i < labelled.length; i++) {
    const item = labelled[i];
    const score = cosineSimilarity(embedding, item.embedding);

    scored.push({ id: item.id, category: item.category, score: score });
  }

  scored.sort(compareByScore);

  const neighbours = scored.slice(0, howMany);

  const counts = {};
  for (let i = 0; i < neighbours.length; i++) {
    const name = neighbours[i].category;
    if (counts[name] === undefined) {
      counts[name] = 1;
    } else {
      counts[name] = counts[name] + 1;
    }
  }

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

  const confidence = winnerVotes / neighbours.length;

  return { category: winner, confidence: confidence, neighbours: neighbours };
}

export default guessCategory;
export { cosineSimilarity, guessCategory };
