// Home page - Owner: AMANDA

import { Link } from "react-router-dom";
import PaintingCard from "../components/PaintingCard";
import TestimonialCard from "../components/TestimonialCard";
import { artworks, categories, findByIds } from "../data/artworks";

const featured = artworks[8];

const heroWall = [
  { painting: artworks[8], width: 1.3 }, // The Starry Nigsht
  { painting: artworks[5], width: 0.9 }, // Girl with a Pearl Earring
  { painting: artworks[7], width: 1.5 }, // The Great Wave off Kanagawa
  { painting: artworks[10], width: 0.9 }, // The Kiss
  { painting: artworks[4], width: 1.4 }, // Almond Blossoms
];

const blendPaintings = findByIds([9, 11, 4]);
const darkBandPaintings = findByIds([8, 13, 12, 14]);
const trending = findByIds([2, 5, 6, 10]);

const services = [
  {
    title: "Curated Collections",
    text: "Hand picked works across six categories.",
  },
  {
    title: "AI Recommendations",
    text: "Similar paintings found by our own AI.",
  },
  {
    title: "Image Recognition",
    text: "Upload a photo and we identify the style.",
  },
  { title: "Free Downloads", text: "Save any painting as a PDF or Word file." },
];

const reviews = [
  {
    name: "Anita Sharma",
    role: "Interior Designer",
    rating: 5,
    text: "I found three pieces for a client in one evening. The similar paintings feature is genuinely useful, not a gimmick.",
  },
  {
    name: "David Okoro",
    role: "Art Student",
    rating: 5,
    text: "I photographed a painting at a museum and the site told me the style and showed me related works. Brilliant.",
  },
  {
    name: "Leena Mathew",
    role: "Collector",
    rating: 4,
    text: "The search understands normal sentences. I typed find nature oil paintings and it simply worked.",
  },
];

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-top">
            <h1 className="hero-headline">
              A Journey
              <br />
              Through Arts
            </h1>

            <Link to={"/painting/" + featured.id} className="hero-mini-card">
              <img src={featured.image} alt={featured.title} />
              <p className="hero-mini-label">Featured</p>
              <p className="hero-mini-title">{featured.title}</p>
              <p className="hero-mini-link">View painting &rarr;</p>
            </Link>
          </div>

          <div className="hero-wall">
            {heroWall.map((item) => (
              <Link
                to={"/painting/" + item.painting.id}
                className="hero-wall-item"
                key={item.painting.id}
                style={{ flexGrow: item.width }}
              >
                <img src={item.painting.image} alt={item.painting.title} />
                <span className="hero-wall-caption">
                  {item.painting.title}
                  <em>{item.painting.artist}</em>
                </span>
              </Link>
            ))}
          </div>

          <div className="hero-wall-footer">
            <Link to="/gallery" className="btn btn-teal">
              Explore the Collection
            </Link>
            <p className="hero-wall-note">
              Five of the {artworks.length} works in the collection. Hover any
              painting to see its name.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="band-head">
            <p className="eyebrow">Featured</p>
            <h2 className="section-title">A Blend Of Talented Genius In Art</h2>
          </div>

          <div className="row g-4">
            {blendPaintings.map((painting) => (
              <div className="col-md-4" key={painting.id}>
                <PaintingCard
                  id={painting.id}
                  title={painting.title}
                  artist={painting.artist}
                  image={painting.image}
                  tall
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-tight">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div
                className="promo-card"
                style={{ backgroundImage: "url(" + artworks[4].image + ")" }}
              >
                <div className="promo-inner">
                  <h3 className="promo-title">Calm and Quiet</h3>
                  <p className="promo-text">Soft landscapes and still water.</p>
                  <Link
                    to="/gallery?category=Nature"
                    className="btn btn-light-plain"
                  >
                    View Nature
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="promo-card"
                style={{ backgroundImage: "url(" + artworks[10].image + ")" }}
              >
                <div className="promo-inner">
                  <h3 className="promo-title">Bold and Golden</h3>
                  <p className="promo-text">
                    Portraits with colour that shouts.
                  </p>
                  <Link
                    to="/gallery?category=Figurative"
                    className="btn btn-light-plain"
                  >
                    View Figurative
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-dark">
        <div className="container">
          <div className="band-head band-head-centre">
            <p className="eyebrow eyebrow-light">Our Collection</p>
            <h2 className="section-title">
              Artworks That Speak A Million Words
            </h2>
            <p className="band-lead">
              Every piece is tagged by our AI, so one painting always leads you
              to the next.
            </p>
          </div>

          <div className="row g-4">
            {darkBandPaintings.map((painting) => (
              <div className="col-6 col-lg-3" key={painting.id}>
                <PaintingCard
                  id={painting.id}
                  title={painting.title}
                  artist={painting.artist}
                  image={painting.image}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/gallery" className="btn btn-light-plain">
              See all paintings
            </Link>
          </div>
        </div>
      </section>

      <section className="band band-tight">
        <div className="container">
          <div className="row g-4">
            {services.map((service) => (
              <div className="col-6 col-lg-3 text-center" key={service.title}>
                <svg
                  className="service-icon"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="22" />
                  <rect x="15" y="15" width="18" height="18" />
                </svg>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-text">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="band-head">
            <p className="eyebrow">Browse</p>
            <h2 className="section-title">Find Your Style</h2>
          </div>

          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-6 col-md-4 col-lg-2" key={category.name}>
                <Link
                  to={"/gallery?category=" + category.name}
                  className="category-tile"
                >
                  <img src={category.image} alt={category.name} />
                  <p className="category-name">{category.name.toUpperCase()}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-tight">
        <div className="container">
          <div className="band-head">
            <p className="eyebrow">Popular</p>
            <h2 className="section-title">Trending Now</h2>
          </div>

          <div className="row g-4">
            {trending.map((painting) => (
              <div className="col-6 col-lg-3" key={painting.id}>
                <PaintingCard
                  id={painting.id}
                  title={painting.title}
                  artist={painting.artist}
                  image={painting.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-soft">
        <div className="container">
          <div className="band-head band-head-centre">
            <p className="eyebrow">Reviews</p>
            <h2 className="section-title">What Our Visitors Are Saying</h2>
          </div>

          <div className="row g-4">
            {reviews.map((review) => (
              <div className="col-md-4" key={review.name}>
                <TestimonialCard
                  name={review.name}
                  role={review.role}
                  rating={review.rating}
                  text={review.text}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
