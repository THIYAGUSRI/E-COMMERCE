import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ReviewSection({ productId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [review, setReview] = useState('');
  const [reviewError, setReviewError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: review, productId, userId: currentUser._id }),
      });
      const data = await res.json();
      if (res.ok) {
        setReview('');
        setReviewError(null);
        setReviews([data, ...reviews]);
      }
    } catch (error) {
      setReviewError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-4">
      {currentUser ? (
        <div className="flex items-center gap-3 my-5 text-gray-500 text-lg">
          <p>Signed in as:</p>
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={'/dashboard?tab=profile'}
            className="text-lg text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to review the product.
          <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
  <form
    onSubmit={handleSubmit}
    className="border border-teal-500 rounded-lg p-4 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl w-full"
  >
    <Textarea
      className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors duration-200"
      placeholder="Add a Review..."
      rows="4"
      maxLength="200"
      onChange={(e) => setReview(e.target.value)}
      value={review}
    />
    <div className="flex justify-between items-center mt-4">
      <p className="text-gray-500 text-sm">
        {200 - review.length} characters remaining
      </p>
      <Button
        gradientDuoTone="tealToLime"
        className="px-6 py-2 text-lg font-semibold transition-transform transform hover:scale-105"
        type="submit">
        Submit
      </Button>
    </div>
    {reviewError && (
            <Alert color='failure' className='mt-5'>
              {reviewError}
            </Alert>
          )}
  </form>
)}
</div>
  );
}
