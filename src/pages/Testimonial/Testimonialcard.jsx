import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const LIST_API = "https://portfolio-48mo.onrender.com/api/testimonials";
const CREATE_API =
  "https://portfolio-48mo.onrender.com/api/testimonials/create";
const DELETE_API = "https://portfolio-48mo.onrender.com/api/testimonials";

const Testimonials = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(LIST_API);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (location.state && location.state.item) {
      setForm(location.state.item);
      setEditing(true);
      setEditingId(location.state.item._id);
    }
  }, [location.state]);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  /* ================= CREATE/UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        await axios.put(`${LIST_API}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Testimonial updated successfully");
      } else {
        await axios.post(CREATE_API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Testimonial created successfully");
      }
      setForm({ name: "", title: "", description: "", image: null });
      setEditing(false);
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert(
        editing
          ? "Failed to update testimonial"
          : "Failed to create testimonial",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm(item);
    setEditing(true);
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await axios.delete(`${DELETE_API}/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0b3c5d]">
            Testimonials
          </h1>
          <p className="text-sm text-gray-500">Manage client testimonials</p>
        </div>
      </div>

      {/* ===== CREATE/EDIT FORM ===== */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">
          {editing ? "Edit Testimonial" : "Create Testimonial"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="title"
            placeholder="Title / Company"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border p-2 rounded md:col-span-2"
            required={!editing}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded md:col-span-2"
            rows="3"
            required
          />

          <button
            disabled={submitting}
            className="md:col-span-2 bg-[#0b3c5d] text-white py-2 rounded"
          >
            {submitting
              ? editing
                ? "Updating..."
                : "Creating..."
              : editing
                ? "Update Testimonial"
                : "Create Testimonial"}
          </button>
        </form>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded shadow">
        <div className="bg-[#0b3c5d] text-white p-4 font-semibold">
          Testimonials List
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No testimonials found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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

export default Testimonials;
