import { useEffect, useState } from "react";
import axios from "axios";
import CardHero from "../components/CardHero";

export default function HomePage() {
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const token = localStorage.getItem("access_token");
      console.log("Fetching heroes with token", token);
      try {
        const response = await axios.get("http://localhost:3000/hero", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);

        if (Array.isArray(response.data)) {
          setHero(response.data);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching heroes", error);
        setError("Error fetching heroes");
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
          <span className="block">Choose your Hero</span>
        </h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && hero.length === 0 && <p>Hero Not Found</p>}
        {!loading && hero.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {hero.map((heroItem) => (
              <div key={heroItem.id} className="relative">
                <CardHero
                  id={heroItem.id}
                  name={heroItem.name}
                  type={heroItem.type}
                  imageUrl={heroItem.imageUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
