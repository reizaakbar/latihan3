import { useNavigate } from "react-router-dom";

export default function CardFav({ id, name, type, power, role }) {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="group">
      <div className="relative">
        <div className="w-full">
          <img
            src="https://img.mobilelegends.com/group1/M00/00/A8/Cq2Ixl8MDzOAYTdJAAGJKaZhxlA426.jpg"
            className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md"
            alt={name}
          />
          <div className="absolute bottom-0 px-2 py-4 flex flex-col bg-gradient-to-t from-black w-full rounded-md">
            <p className="text-xl text-white uppercase inline-block align-start text-left pl-2 font-bold">
              {name}
            </p>
            <p className="text-md text-white inline-block align-start text-left pl-2 mb-2">
              {type}
            </p>
            <p className="text-md text-purple-400 inline-block align-start text-left pl-2">
              Power: {power}
            </p>
            <p className="text-md text-purple-400 inline-block align-start text-left pl-2">
              Role: {role}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-16">
        <button
          onClick={handleUpdate}
          className="px-3 py-2 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 uppercase tracking-widest font-bold"
        >
          Update
        </button>
      </div>
    </div>
  );
}
