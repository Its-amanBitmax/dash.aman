import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";

const Create = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH ================= */
  const fetchBanners = async () => {
    const res = await api.get("/api/banner");
    if (res.data.success) setBanners(res.data.data);
  };

  useEffect(() => {
    fetchBanners().finally(() => setLoading(false));
  }, []);

  /* ================= CREATE (FILE UPLOAD) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select image");

    setSubmitting(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    await api.post("/api/banner/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setImageFile(null);
    await fetchBanners();
    setSubmitting(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    await api.delete(`/api/banner/${id}`);
    fetchBanners();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      <h1 className="text-2xl font-semibold mb-6 text-[#0b3c5d]">
        Banner Section
      </h1>

      {/* ================= CREATE ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4 text-[#0b3c5d]">Create Banner</h2>

        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="flex-1 border p-2 rounded"
          />

          <button
            disabled={submitting}
            className="px-6 py-2 rounded text-white bg-[#0b3c5d] hover:bg-[#06283d]"
          >
            {submitting ? "Uploading..." : "Create"}
          </button>
        </form>
      </div>

      {/* ================= TABLE LIST ================= */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No banners found
                </td>
              </tr>
            ) : (
              banners.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt="banner"
                      className="w-28 h-16 object-cover rounded border"
                    />
                  </td>

                  <td className="p-3 text-gray-600">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex justify-center gap-4 text-lg">
                    <FaEdit
                      className="text-green-600 cursor-pointer"
                      title="Edit"
                      onClick={() => navigate(`/banner/edit/${item._id}`)}
                    />
                    <FaTrash
                      className="text-red-600 cursor-pointer"
                      title="Delete"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Create;
