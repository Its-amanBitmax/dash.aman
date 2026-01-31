import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const BlogCards = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-[#f5f7fa]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3c5d]">Our Blogs</h1>
          <p className="text-gray-500 mt-1">Latest articles & tech updates</p>
        </div>

        {/* CREATE BUTTON */}
        <button
          onClick={() => navigate("/blogs/create")}
          className="bg-[#0b3c5d] text-white px-5 py-2 rounded hover:bg-[#06283d]"
        >
          + Create Blog
        </button>
      </div>

      {/* BLOG CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No blogs found
          </div>
        ) : (
          blogs.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.subject}
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">
                <span className="text-xs text-blue-600 font-medium">
                  {item.category}
                </span>

                <h2 className="text-lg font-semibold mt-1 line-clamp-2">
                  {item.subject}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* DATE */}
                <div className="text-xs text-gray-400 mt-4">
                  {new Date(item.createdAt).toDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogCards;
