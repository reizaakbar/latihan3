import { useState, useEffect } from "react";
import axios from "axios";
import CardFav from "../components/CardFav";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get("http://localhost:3000/favourites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setFavorites(
            response.data.map((fav) => ({
              id: fav.id,
              name: fav.Hero.name,
              type: fav.Hero.type,
              power: fav.power,
              role: fav.role,
            }))
          );
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching favorite heroes", error);
        setError("Error fetching favorite heroes");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
        <span className="block">Favourites</span>
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {favorites.length > 0 ? (
          favorites.map((hero) => (
            <CardFav
              key={hero.id}
              id={hero.id}
              name={hero.name}
              type={hero.type}
              power={hero.power}
              role={hero.role}
            />
          ))
        ) : (
          <p>No favorite heroes yet.</p>
        )}
      </div>
    </div>
  );
}
