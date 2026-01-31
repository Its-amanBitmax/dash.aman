import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/service");
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error("Service fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0b3c5d]">
            Service Management
          </h1>
          <p className="text-sm text-gray-500">Services fetched from backend</p>
        </div>

        {/* CREATE BUTTON */}
        <Link
          to="/services/create"
          className="bg-[#0b3c5d] text-white px-5 py-2 rounded hover:bg-[#06283d]"
        >
          + Create Service
        </Link>
      </div>

      {/* ================= LIST ================= */}
      {services.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          No services found
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-44 bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0b3c5d] mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.description}
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  Created: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Service;
