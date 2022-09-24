import { useEffect, useState } from "react";
import { getSingleRecommendationService } from "../services";

function useRecommendation(id) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        setLoading(true);
        const data = await getSingleRecommendationService(id);

        setRecommendation(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadRecommendation();
  }, [id]);

  return { recommendation, loading, error };
}
export default useRecommendation;
