import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const initialForm = { title: "", image: null };
  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH ================= */
  const fetchSkills = async () => {
    const res = await api.get("/api/skills");
    if (res.data.success) setSkills(res.data.data);
  };

  useEffect(() => {
    fetchSkills().finally(() => setLoading(false));
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editId) {
      await api.put(`/api/skills/${editId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await api.post("/api/skills/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setFormData(initialForm);
    setEditId(null);
    setShowForm(false);
    await fetchSkills();
    setSubmitting(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    navigate(`/skills/edit/${item._id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    await api.delete(`/api/skills/${id}`);
    fetchSkills();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Skills Management
        </h1>

        <button
          onClick={() => navigate("/skills/create")}
          className="flex items-center gap-2 bg-[#0b3c5d] text-white px-5 py-2 rounded hover:bg-[#06283d]"
        >
          <FaPlus /> Create
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Skills List
        </div>

        {skills.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No skills found</div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <h3 className="text-lg font-semibold text-[#0b3c5d]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Created: {new Date(item.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-3">
                  <FaEdit
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleEdit(item)}
                  />
                  <FaTrash
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
