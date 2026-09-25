# 09 — The AI Explained (viva preparation)

**Read this twice before the presentation.** This is what you will be questioned on
hardest, and the marks are here.

---

## The one-paragraph answer

> "We use a pre-trained neural network called **MobileNet**, through **TensorFlow.js**,
> running in the browser. Instead of asking it to name what is in the picture, we stop
> one layer early and take **1024 numbers** that describe the image. Paintings that look
> alike produce similar numbers. We compare those numbers with **cosine similarity** to
> find similar paintings, and with **k-nearest-neighbour** to guess a category. We did
> not train the network — we reused one that Google trained. That technique is called
> **transfer learning**."

---

## Why we do not use MobileNet the normal way

MobileNet was trained on **ImageNet** — 1.2 million photographs of everyday objects:
dogs, cars, chairs, envelopes. Its 1000 output labels contain no painting styles at all.

If you upload an abstract painting and ask MobileNet what it is, you get something like
*"envelope, 34%"*. Useless.

**So we do not use its answer. We use its understanding.**

A neural network works in layers. Early layers detect edges and colours. Middle layers
detect shapes and textures. The **last** layer converts all of that into one of 1000
labels — and that final step is where the art-specific information gets thrown away.

So we stop **one layer before the end** and take what is there: 1024 numbers.

```js
const features = model.infer(imageElement, true)
//                                          ^^^^
//                          true = "give me the features, not the label"
```

Those 1024 numbers are called an **embedding**. They are a numeric fingerprint of what
the picture looks like.

---

## Feature 1 — Similar paintings (cosine similarity)

Two paintings that look alike have similar embeddings. To measure "similar", we use
**cosine similarity**.

**The idea:** think of each set of 1024 numbers as an arrow pointing somewhere in space.
Cosine similarity measures the **angle** between two arrows.

- Same direction → score **1.0** → very similar
- At right angles → score **0.0** → nothing in common

We use the angle, not the distance, because the angle ignores how "big" the numbers are
and only cares about the **pattern** — which is what we actually want.

**The formula:**

```
similarity = (A · B) / (|A| × |B|)

A · B   = multiply the pairs and add them up   (the dot product)
|A|     = the length of A = square root of the sum of its squares
```

**The code** (`backend/ai/similarity.js`, about 10 lines):

```js
function cosineSimilarity(a, b) {
  let dot = 0, lengthA = 0, lengthB = 0
  for (let i = 0; i < a.length; i++) {
    dot     += a[i] * b[i]
    lengthA += a[i] * a[i]
    lengthB += b[i] * b[i]
  }
  if (lengthA === 0 || lengthB === 0) return 0   // avoid dividing by zero
  return dot / (Math.sqrt(lengthA) * Math.sqrt(lengthB))
}
```

To find similar paintings: score the current painting against every other one, sort
highest first, take the top 6.

---

## Feature 4 — Image recognition (k-nearest-neighbour)

The user uploads a photo. We need to guess its category.

1. Run MobileNet on the upload → 1024 numbers
2. Compare against every painting we already labelled
3. Take the **5 closest** matches
4. Whichever category appears most among those 5 is our answer

That is **k-nearest-neighbour**, with k = 5.

**Why it is honest:** we are not claiming the computer knows art. We are saying *"this
photo looks most like these 5 paintings, and 4 of them are Landscapes, so it is probably
a Landscape."* That is a real, explainable method.

**Confidence:** if 4 out of 5 agree, say 80%. If the 5 are split, say the confidence is
low. Showing low confidence honestly is better than showing a fake high number.

---

## Features 2 and 5 — Chatbot and Smart Search

**These do not use the neural network.** They are rule-based text matching, and that is
fine — say so plainly.

The user types: *"Show blue abstract paintings"*

1. **Intent** — what do they want? Look for trigger words.
   "show", "find", "display" → they want to find paintings.
2. **Entities** — what details did they give? Scan the sentence for any known category
   name, medium name or colour name. Here: colour = blue, category = Abstract.
3. **Query** — search the database with those filters.
4. **Reply** — fill a sentence template: *"I found 4 blue Abstract paintings."*

**Synonyms are what make it feel smart.** Keep a list so "sea", "mountain" and "valley"
all map to Landscape. The more synonyms you add, the better the demo looks.

### The honest answer when asked "is this real AI?"

> "This part is rule-based Natural Language Processing — the same family of technique
> used by most bank chatbots. It is not a large language model. It cannot hold a
> conversation or answer something we did not plan for. We chose it because it runs
> instantly, needs no internet, costs nothing, and we can explain every line. The neural
> network is used for the image features, which is where it genuinely helps."

That answer scores better than pretending it is ChatGPT.

---

## Feature 6 — The AI summary

We do **not** generate text with a language model. We take facts we extracted — the
dominant colours, the category, the medium — and fit them into a sentence template:

> "{title} is a {category} painting by {artist}, worked in {medium} on {surface}.
> Its palette is led by {colour1} and {colour2}, giving it a {mood} feeling."

**The AI part is the facts, not the sentence.** The colours were found by analysing the
actual pixels; the mood comes from those colours. The template just puts them into
readable English.

This is called **Natural Language Generation from structured data**. It is how automatic
weather reports and sports results are written in real life. Say exactly that — do not
claim the computer "wrote" the description.

---

## Why the AI runs in the browser, not on the server

TensorFlow.js was designed for the browser. There, `tf.browser.fromPixels()` reads an
`<img>` element directly.

To run it on the server we would need `@tensorflow/tfjs-node`, which has to compile
native code and frequently fails on Windows without Visual Studio Build Tools — a hard
stop for our team.

So: the **browser** does the neural network part, and sends the 1024 numbers to the
server. The **server** only does cosine similarity, which is ten lines of ordinary
JavaScript.

It also demos well — the AI visibly runs on the examiner's own machine.

---

## Why we calculate once and store the result

Running MobileNet over 30 paintings takes several seconds. Doing that on every page load
would make the website unusable.

So we run it **once** from the AdminBuildAI page and save the numbers into the database.
After that, finding similar paintings is just arithmetic on numbers we already have.

This is called **pre-computing**. The trade-off: we use a little more storage in exchange
for a much faster website. That is a good engineering answer.

---

## What our AI honestly cannot do

Say these before the examiner finds them. It shows you understand your own system.

| Limitation | Why |
|------------|-----|
| Better at texture and composition than at artistic style | MobileNet was trained on photographs, not paintings |
| Cannot explain *why* two paintings are similar | The 1024 numbers have no human meaning individually |
| Category guess is only as good as our labels | k-NN compares against paintings we labelled by hand |
| Chatbot cannot handle "paintings that are **not** blue" | We match words, not grammar. We do not handle negation |
| Chatbot cannot answer anything we did not plan for | It is rule-based, not a language model |
| Accuracy is untested | We have ~30 paintings. That is too few to measure accuracy honestly |

---

## Likely viva questions

**"Did you train this model?"**
No. We used MobileNet, trained by Google on ImageNet. We reused it as a feature
extractor. That is called transfer learning.

**"What are the 1024 numbers?"**
The output of the second-to-last layer of the network. They describe the visual content
of the image. No single number means anything on its own — it is the pattern that matters.

**"Why cosine similarity and not straight-line distance?"**
Cosine compares the *direction* of the two lists and ignores their size. We care about
the pattern, not the magnitude. It is also the standard choice for comparing embeddings.

**"What happens if the user uploads a photo of a dog?"**
It still produces 1024 numbers and returns whichever paintings are closest. We do not
check whether the upload is actually a painting — that is a known limitation, and we
would fix it by setting a minimum similarity threshold.

**"How accurate is it?"**
We have not measured it properly — we only have about 30 paintings, which is too small a
sample for an honest accuracy figure. It works well on the examples we tested. To measure
it properly we would need a labelled test set of several hundred paintings.

*(That answer is worth more marks than inventing a percentage.)*
