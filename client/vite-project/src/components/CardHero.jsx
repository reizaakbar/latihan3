import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardHero({ id, name, type, imageUrl }) {
  const navigate = useNavigate();

  const handleChooseHero = () => {
    const selectedHero = { id, name, type, imageUrl };
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Add hero if not already in favorites
    if (!favorites.some(hero => hero.id === id)) {
      favorites.push(selectedHero);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    // Navigate to favorites page
    navigate("/favorite");
  };

  return (
    <div className="group">
      <div className="relative">
        <div className="w-full">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md"
          />
          <div className="absolute bottom-0 px-2 py-4 flex flex-col bg-gradient-to-t from-black w-full rounded-md">
            <p className="text-xl text-white uppercase inline-block align-start text-left pl-2 font-bold">
              {name}
            </p>
            <p className="text-md text-white inline-block align-start text-left pl-2">
              {type}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-16">
        <button
          onClick={handleChooseHero}
          className="px-3 py-2 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 uppercase tracking-widest font-bold"
        >
          Choose Hero
        </button>
      </div>
    </div>
  );
}
