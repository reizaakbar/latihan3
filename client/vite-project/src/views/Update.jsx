import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState({ power: "0", role: "-" });

  useEffect(() => {
    const fetchHero = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:3000/favourites/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHero(response.data);
      } catch (error) {
        console.error("Error fetching hero", error);
      }
    };

    fetchHero();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      await axios.put(
        `http://localhost:3000/favourites/${id}`,
        {
          power: e.target.power.value,
          role: e.target.role.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toastify({
        text: "Hero updated successfully",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/favorite");
    } catch (error) {
      console.error("Error updating hero", error);
      Toastify({
        text: "Failed to update hero",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "red",
          color: "#fff",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
          <span className="block">Update Hero</span>
        </h2>
        <div className="mt-10 grid grid-cols-10">
          <div className="col-start-2 col-span-3">
            <img
              src="https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl8MDzOAYTdJAAGJKaZhxlA426.jpg"
              className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md"
            />
          </div>
          <div className="col-start-6 col-span-4">
            <div className="card px-10 py-5 sm:px-20 sm:py-10 rounded-md">
              <form className="mt-6 mb-6 space-y-6" onSubmit={handleUpdate}>
                <div className="mb-5">
                  <label htmlFor="power-update" className="sr-only">
                    Power
                  </label>
                  <input
                    id="power-update"
                    name="power"
                    type="text"
                    defaultValue={hero.power}
                    autoComplete="off"
                    required=""
                    className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                    placeholder="Power (ex: 2200)"
                  />
                </div>
                <div>
                  <label htmlFor="role-update" className="sr-only">
                    Role
                  </label>
                  <select
                    id="role-update"
                    name="role"
                    defaultValue={hero.role}
                    className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                  >
                    <option value="-" disabled="">
                      -- Select Role --
                    </option>
                    <option value="Jungler">Jungler</option>
                    <option value="Roamer">Roamer</option>
                    <option value="Mid Laner">Mid Laner</option>
                    <option value="Gold Laner">Gold Laner</option>
                    <option value="Exp Laner">Exp Laner</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-sm text-purple-900 bg-white bg-opacity-90 hover:bg-white hover:bg-opacity-80 focus:outline-none focus:ring focus:border-purple-500 focus:ring-purple-500 text-lg tracking-wider flex font-bold"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
