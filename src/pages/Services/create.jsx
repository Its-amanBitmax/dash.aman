import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";

const Create = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    image: null,
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH ================= */
  const fetchServices = async () => {
    const res = await api.get("/api/service");
    if (res.data.success) {
      setServices(res.data.data);
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
      setLoading(false);
    };
    loadServices();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    await api.post("/api/service/create", submitData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFormData(initialForm);
    await fetchServices();
    setSubmitting(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    navigate(`/services/edit/${item._id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await api.delete(`/api/service/${id}`);
    fetchServices();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-semibold text-[#0b3c5d] mb-6">
        Service Management
      </h1>

      {/* ================= CREATE FORM ================= */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Create Service</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border p-2 rounded"
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Service Title"
            required
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Service Description"
            rows="3"
            required
            className="border p-2 rounded md:col-span-2"
          />

          <button
            disabled={submitting}
            className="md:col-span-2 bg-[#0b3c5d] text-white py-2 rounded hover:bg-[#06283d]"
          >
            {submitting ? "Saving..." : "Create Service"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Service List
        </div>

        {services.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No services found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {services.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>

                    <td className="p-3 font-medium">{item.title}</td>

                    <td className="p-3 text-gray-600 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="p-3 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>

                    <td className="p-3 flex gap-3 text-lg">
                      <FaEdit
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleEdit(item)}
                      />
                      <FaTrash
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
