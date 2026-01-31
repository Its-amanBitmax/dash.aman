import React, { useEffect, useState } from "react";
import api from "../api";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COMMENTS ================= */
  const fetchComments = async () => {
    try {
      const res = await api.get("/api/comments");
      if (res.data.success) {
        setComments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return <div className="p-6">Loading comments...</div>;
  }

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">Blog Comments</h1>
        <p className="text-sm text-gray-500">
          All comments coming from backend
        </p>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Comments List
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Website</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Blog</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {comments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No comments found
                  </td>
                </tr>
              ) : (
                comments.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.name}</td>

                    <td className="p-3">{item.email}</td>

                    <td className="p-3">
                      {item.website ? (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Visit
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3 max-w-xs">
                      <p className="line-clamp-2">{item.message}</p>
                    </td>

                    <td className="p-3 text-sm text-gray-600">
                      {item.blogId?.subject || "N/A"}
                    </td>

                    <td className="p-3 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
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

export default Comments;
