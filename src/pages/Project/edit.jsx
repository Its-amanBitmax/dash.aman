import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EDIT_API = "https://portfolio-48mo.onrender.com/api/projects";
const GET_API = "https://portfolio-48mo.onrender.com/api/projects";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    image: "",
    link: "",
    techstack: "",
  });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${GET_API}/${id}`);
      const project = res.data.data;
      setForm({
        title: project.title,
        image: project.image,
        link: project.link,
        techstack: project.techstack.join(", "),
      });
    } catch (error) {
      console.error("Error fetching project", error);
      alert("Failed to load project");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      image: form.image,
      link: form.link,
      techstack: form.techstack.split(","),
    };

    try {
      await axios.put(`${EDIT_API}/${id}`, payload);
      alert("Project updated successfully");
      navigate("/project");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            name="link"
            placeholder="Project Link"
            value={form.link}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            name="techstack"
            placeholder="Tech stack (react, node, mongodb)"
            value={form.techstack}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate("/project")}
              className="w-full bg-gray-400 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
