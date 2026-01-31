import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");
      if (res.data.success) setBlogs(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await api.delete(`/api/blogs/${id}`);
    fetchBlogs();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-[#f5f7fa]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Blog Management
        </h1>

        <button
          onClick={() => navigate("/blogs/create")}
          className="flex items-center gap-2 bg-[#0b3c5d] text-white px-4 py-2 rounded"
        >
          <FaPlus /> Create Blog
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Blog List
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Tags</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No blogs found
                  </td>
                </tr>
              ) : (
                blogs.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-14 h-10 object-cover rounded border"
                      />
                    </td>

                    <td className="p-3 font-medium">{item.subject}</td>

                    <td className="p-3">{item.category}</td>

                    <td className="p-3">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 mr-1 text-xs bg-blue-100 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>

                    <td className="p-3 flex gap-4">
                      <FaEdit
                        onClick={() =>
                          navigate(`/blogs/edit/${item._id}`)
                        }
                        className="text-blue-600 cursor-pointer"
                        title="Edit"
                      />
                      <FaTrash
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 cursor-pointer"
                        title="Delete"
                      />
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
};

export default BlogList;
