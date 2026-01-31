import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";
import api from "../../api";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await api.get("/api/banner");
      if (res.data.success) {
        setBanners(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) {
    return <div className="p-6">Loading banners...</div>;
  }

  return (
    <div className="p-10 bg-[#f5f7fa] min-h-screen overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Banner Management
        </h1>

        {/* CREATE BUTTON */}
        <Link
          to="/banner/create"
          className="flex items-center gap-2 bg-[#0b3c5d] text-white px-5 py-2 rounded shadow hover:bg-[#06283d] transition"
        >
          <FaPlus />
          Create Banner
        </Link>
      </div>

      {banners.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          No banner found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              {/* EDIT ICON */}
              <Link
                to={`/banner/edit/${item._id}`}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                title="Edit Banner"
              >
                <FaEdit className="text-[#0b3c5d]" />
              </Link>

              {/* IMAGE */}
              <div className="h-48 bg-gray-200">
                <img
                  src={`${api.defaults.baseURL}${item.image}`}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="p-4 border-t">
                <p className="text-xs text-gray-500 mb-1">Created At</p>
                <p className="text-sm font-medium text-gray-700">
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

export default BannerPage;
