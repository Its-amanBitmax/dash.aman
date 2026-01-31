import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://portfolio-48mo.onrender.com/api/projects";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data.data || []);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setProjects(projects.filter((project) => project._id !== id));
        alert("Project deleted successfully");
      } catch (error) {
        console.error("Error deleting project", error);
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="p-8">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link
          to="/project/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Project
        </Link>
      </div>

      {/* Loading */}
      {loading && <p>Loading projects...</p>}

      {/* Project List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.techstack.map((tech, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-200 px-3 py-1 rounded-full"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                {/* <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Visit Project →
                </a> */}
                <div className="flex gap-2">
                  <Link
                    to={`/project/edit/${project._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
