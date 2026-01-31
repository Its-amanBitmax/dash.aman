import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CREATE_API = "https://portfolio-48mo.onrender.com/api/projects/create";
const LIST_API = "https://portfolio-48mo.onrender.com/api/projects";

function Create() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    image: null,
    link: "",
    techstack: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH LIST ================= */
  const fetchProjects = async () => {
    try {
      const res = await axios.get(LIST_API);
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("link", form.link);
      formData.append("techstack", form.techstack);
      if (form.image) {
        formData.append("image", form.image);
      }

      // Send all data including image file to backend
      await axios.post(CREATE_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setForm({ title: "", image: null, link: "", techstack: "" });
      setImagePreview(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Project Management
        </h1>
        <p className="text-sm text-gray-500">Create and manage your projects</p>
      </div>

      {/* ===== CREATE FORM ===== */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Create Project</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <input
            name="link"
            placeholder="Project Link"
            value={form.link}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="techstack"
            placeholder="Tech stack (react, node, mongodb)"
            value={form.techstack}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            disabled={submitting}
            className="md:col-span-2 bg-[#0b3c5d] text-white py-2 rounded"
          >
            {submitting ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded shadow">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Project List
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Tech Stack</th>
                {/* <th className="p-3 text-left">Link</th> */}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No projects found
                  </td>
                </tr>
              ) : (
                projects.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-10 object-cover rounded border"
                      />
                    </td>

                    <td className="p-3 font-medium">{item.title}</td>

                    <td className="p-3">
                      {item.techstack.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs bg-blue-100 rounded mr-1"
                        >
                          {t}
                        </span>
                      ))}
                    </td>

                    <td className="p-3">
                      {/* <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Create;
