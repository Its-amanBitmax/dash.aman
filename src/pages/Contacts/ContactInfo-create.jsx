import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ContactInfoCreate = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    image: null,
    title: "",
    description: "",
    link: "",
  };

  const [formData, setFormData] = useState(initialForm);

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
    submitData.append("link", formData.link);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      await api.post("/api/contactinfo/create", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/contactinfo/list");
    } catch (error) {
      console.error("Error creating contact info:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ================= HEADER ================= */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/contactinfo/list")}
          className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Create Contact Info
        </h1>
      </div>

      {/* ================= CREATE FORM ================= */}
      <div className="bg-white p-6 rounded shadow">
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
            placeholder="Contact Info Title"
            required
            className="border p-2 rounded"
          />

          <input
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Link"
            required
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Contact Info Description"
            rows="3"
            required
            className="border p-2 rounded md:col-span-2"
          />

          <button
            disabled={submitting}
            className="md:col-span-2 bg-[#0b3c5d] text-white py-2 rounded hover:bg-[#06283d]"
          >
            {submitting ? "Saving..." : "Create Contact Info"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfoCreate;
