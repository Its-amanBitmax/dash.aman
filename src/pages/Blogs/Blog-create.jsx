import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";

const BlogCreate = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    image: null,
    subject: "",
    description: "",
    category: "",
    tags: "",
  };

  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH ================= */
  const fetchBlogs = async () => {
    const res = await api.get("/api/blogs");
    if (res.data.success) {
      setBlogs(res.data.data);
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      await fetchBlogs();
      setLoading(false);
    };
    loadBlogs();
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
    submitData.append("subject", formData.subject);
    submitData.append("description", formData.description);
    submitData.append("category", formData.category);
    submitData.append(
      "tags",
      formData.tags.split(",").map((tag) => tag.trim()),
    );
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    await api.post("/api/blogs/create", submitData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFormData(initialForm);
    await fetchBlogs();
    setSubmitting(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    navigate(`/blogs/edit/${item._id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await api.delete(`/api/blogs/${id}`);
    fetchBlogs();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-semibold text-[#0b3c5d] mb-6">
        Blog Management
      </h1>

      {/* ================= CREATE FORM ================= */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Create Blog</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border p-2 rounded"
          />

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Blog Subject"
            required
            className="border p-2 rounded"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="border p-2 rounded"
          />

          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            required
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Blog Description"
            rows="3"
            required
            className="border p-2 rounded md:col-span-2"
          />

          <button
            disabled={submitting}
            className="md:col-span-2 bg-[#0b3c5d] text-white py-2 rounded hover:bg-[#06283d]"
          >
            {submitting ? "Saving..." : "Create Blog"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Blog List
        </div>

        {blogs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No blogs found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Tags</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.subject}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>

                    <td className="p-3 font-medium">{item.subject}</td>

                    <td className="p-3">{item.category}</td>

                    <td className="p-3 text-gray-600 max-w-xs truncate">
                      {item.tags.join(", ")}
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

export default BlogCreate;
