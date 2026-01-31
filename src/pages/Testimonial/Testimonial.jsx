import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://portfolio-48mo.onrender.com/api/testimonials";

const TestimonialsCards = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get(API);
    if (res.data.success) setData(res.data.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    await axios.delete(`${API}/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-12 bg-[#f5f7fa] min-h-screen">
      {/* header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">Testimonials</h1>

        <button
          onClick={() => navigate("/testimonial/manage")}
          className="bg-[#0b3c5d] text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item._id} className="bg-white rounded shadow p-4">
            <img
              src={item.image}
              className="w-16 h-16 rounded-full object-cover mb-3"
              alt=""
            />

            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.title}</p>

            <p className="text-sm mt-2">{item.description}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  navigate("/testimonial/manage", { state: { item } })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCards;
