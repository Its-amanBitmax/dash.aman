import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "",
    tags: "",
    image: null,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/blogs/${id}`);
      if (res.data.success) {
        const item = res.data.data;
        setFormData({
          subject: item.subject || "",
          description: item.description || "",
          category: item.category || "",
          tags: item.tags ? item.tags.join(", ") : "",
          image: item.image || "",
        });
        setCurrentImage(item.image);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((p) => ({ ...p, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setNewImagePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setNewImagePreview(null);
      }
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append(
      "tags",
      formData.tags.split(",").map((tag) => tag.trim()),
    );
    if (formData.image && typeof formData.image === "object") {
      formDataToSend.append("image", formData.image);
    }

    await api.put(`/api/blogs/${id}`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setSubmitting(false);
    navigate("/blogs/list");
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold">Edit Blog</h1>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Current Image
            </label>
            {currentImage && (
              <img
                src={currentImage}
                alt="Current blog"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="border p-2 rounded"
            />
            {newImagePreview && (
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1">
                  New Image Preview
                </label>
                <img
                  src={newImagePreview}
                  alt="New preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
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
            className="border p-2 rounded md:col-span-2"
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
            className="bg-blue-600 text-white py-2 rounded md:col-span-2"
          >
            {submitting ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogEdit;
