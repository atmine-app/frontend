export default function Reviews({ reviews }) {
  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review, i) => {
        return <h2 key={i}>{review.review}</h2>;
      })}
    </div>
  );
}
