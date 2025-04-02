/* eslint-disable react/prop-types */
import {
  StarIcon,
  Clock,
  MapPin,
  Phone,
  Globe,
  User,
  MessageSquarePlus,
  Trash2,
  Pencil,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Badge } from "../ui/badge";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [userReviews, setUserReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    console.log("Current user:", user);
    console.log("User ID:", user?.id);
  }, [user]);

  useEffect(() => {
    if (productDetails?.place_id) {
      console.log(
        "Product details changed, fetching reviews for:",
        productDetails.place_id,
      );
      fetchUserReviews();
    } else {
      console.error("No place_id found in productDetails:", productDetails);
    }
  }, [productDetails?.place_id]);

  const fetchUserReviews = async () => {
    try {
      setIsLoadingReviews(true);
      console.log("Fetching reviews for place:", productDetails.place_id);
      const response = await axios.get(
        API_ENDPOINTS.shop.reviews.get(productDetails.place_id),
      );
      console.log("Fetched reviews:", response.data.data);

      // Ensure we have the correct user ID in the reviews
      const reviewsWithUserId = response.data.data.map((review) => {
        console.log("Processing review:", review);
        return {
          ...review,
          userId: review.userId || review.user_id, // Keep the original format
        };
      });

      console.log("Processed reviews with user IDs:", reviewsWithUserId);
      setUserReviews(reviewsWithUserId);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoadingReviews(false);
    }
  };

  if (!productDetails) return null;

  const {
    name,
    rating,
    user_ratings_total,
    vicinity,
    opening_hours,
    photos,
    types,
    website,
    phone,
    reviews,
    editorial_summary,
    place_id,
  } = productDetails;

  console.log("Product details:", { name, place_id, rating });

  const fallbackImage =
    "https://via.placeholder.com/300x200?text=No+Image+Available";
  const photoReference = photos?.[0]?.photo_reference;
  const imageUrl = photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    : fallbackImage;

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to leave a review.",
        variant: "destructive",
      });
      return;
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review Required",
        description: "Please enter your review text.",
        variant: "destructive",
      });
      return;
    }

    if (!place_id) {
      console.error("Missing place_id in productDetails:", productDetails);
      toast({
        title: "Error",
        description: "Location information is missing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Submitting review with data:", {
        placeId: place_id,
        rating: reviewRating,
        text: reviewText,
      });

      const response = await axios.post(
        API_ENDPOINTS.shop.reviews.add,
        {
          placeId: place_id,
          rating: reviewRating,
          text: reviewText,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast({
          title: "Review Submitted",
          description: "Thank you for your review!",
        });

        setShowReviewForm(false);
        setReviewText("");
        setReviewRating(5);
        fetchUserReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        API_ENDPOINTS.shop.reviews.delete(reviewId),
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast({
          title: "Review Deleted",
          description: "Your review has been deleted.",
        });
        fetchUserReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewText(review.text);
    setReviewRating(review.rating);
    setShowReviewForm(true);
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    if (!reviewText.trim()) {
      toast({
        title: "Review Required",
        description: "Please enter your review text.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.put(
        API_ENDPOINTS.shop.reviews.update(editingReview._id),
        {
          rating: reviewRating,
          text: reviewText,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast({
          title: "Review Updated",
          description: "Your review has been updated successfully!",
        });

        setShowReviewForm(false);
        setReviewText("");
        setReviewRating(5);
        setEditingReview(null);
        fetchUserReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to update review. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-[300px] object-cover rounded-lg"
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
            {rating && (
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-yellow-500" />
                <span className="font-semibold">{rating}</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{vicinity}</span>
              </div>
            </div>

            <Separator />

            {rating && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <StarRatingComponent rating={rating} />
                  <span className="text-sm text-muted-foreground">
                    ({user_ratings_total} reviews)
                  </span>
                </div>
              </div>
            )}

            {opening_hours && (
              <div className="space-y-2">
                <Label>Opening Hours</Label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{opening_hours.open_now ? "Open Now" : "Closed"}</span>
                </div>
              </div>
            )}

            {types && types.length > 0 && (
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-secondary rounded-full text-sm"
                    >
                      {type
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {editorial_summary && (
          <>
            <Separator className="my-6" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-muted-foreground">
                {editorial_summary.overview}
              </p>
            </div>
          </>
        )}

        <Separator className="my-6" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setReviewText("");
                setReviewRating(5);
                setShowReviewForm(!showReviewForm);
              }}
              className="flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Write a Review
            </Button>
          </div>

          {/* Write/Edit Review Form */}
          {showReviewForm && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>{editingReview ? 'Edit Rating' : 'Your Rating'}</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`w-6 h-6 ${
                          star <= reviewRating ? "fill-yellow-500" : "fill-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>{editingReview ? 'Edit Review' : 'Your Review'}</Label>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewText("");
                    setReviewRating(5);
                    setEditingReview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingReview ? handleUpdateReview : handleSubmitReview}>
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </Button>
              </div>
            </div>
          )}

          {/* User Reviews */}
          {userReviews.map((review) => {
            console.log("Checking review:", {
              reviewUserId: review.userId,
              currentUserId: user?.id,
              isMatch: user?.id === review.userId
            });
            
            return (
              <div key={review._id} className="space-y-2 border-b pb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{review.userName}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  <Badge variant="secondary" className="ml-auto bg-primary text-primary-foreground">
                    Putco Review
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <StarRatingComponent rating={review.rating} />
                </div>
                <p className="text-muted-foreground">{review.text}</p>
                {user?.id === review.userId && (
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 hover:bg-secondary"
                      onClick={() => handleEditReview(review)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 hover:bg-secondary text-destructive hover:text-destructive"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Google Maps Reviews */}
          {reviews?.map((review, index) => (
            <div key={index} className="space-y-2 border-b pb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{review.author_name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.time * 1000).toLocaleDateString()}
                </span>
                <Badge variant="secondary" className="ml-auto">
                  Google Maps Review
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <StarRatingComponent rating={review.rating} />
                <span className="text-sm text-muted-foreground">
                  {review.relative_time_description}
                </span>
              </div>
              <p className="text-muted-foreground">{review.text}</p>
              {review.translated && (
                <p className="text-sm text-muted-foreground italic">
                  Translated: {review.translated}
                </p>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
