import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ContactInfo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContactInfo = async () => {
    try {
      const res = await api.get("/api/contactinfo");
      if (res.data.success) setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Contact Information
        </h1>

        <button
          onClick={() => navigate("/contactinfo/list")}
          className="bg-[#0b3c5d] text-white px-5 py-2 rounded"
        >
          View List
        </button>
      </div>

      {/* CARDS */}
      {data.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          No contact info found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded shadow overflow-hidden"
            >
              <div className="h-40 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-lg text-[#0b3c5d]">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                <a
                  href={item.link}
                  className="text-sm text-blue-600 underline mt-2 inline-block"
                >
                  {item.link}
                </a>

                <p className="text-xs text-gray-400 mt-3">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
