// One customer review box - Owner: AMANDA
function TestimonialCard({ name, role, rating, text }) {
  const stars = Array.from({ length: 5 });

  return (
    <div className="testimonial-card">
      <div className="stars">
        {stars.map((item, index) => (
          <span
            key={index}
            className={index < rating ? "star star-on" : "star"}
          >
            &#9733;
          </span>
        ))}
      </div>

      <p className="testimonial-text">{text}</p>

      <p className="testimonial-name">{name}</p>
      <p className="testimonial-role">{role}</p>
    </div>
  );
}

export default TestimonialCard;
