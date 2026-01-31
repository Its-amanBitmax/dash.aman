import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const ContactInfoList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContactInfo = async () => {
    try {
      const res = await api.get("/api/contactinfo");
      if (res.data.success) setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact info?")) return;
    await api.delete(`/api/contactinfo/${id}`);
    fetchContactInfo();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">
          Contact Info List
        </h1>

        <div className="flex gap-3">
          {/* CREATE BUTTON */}
          <button
            onClick={() => navigate("/contactinfo/create")}
            className="flex items-center gap-2 bg-[#0b3c5d] text-white px-4 py-2 rounded"
          >
            <FaPlus /> Create
          </button>

          {/* BACK */}
          <button
            onClick={() => navigate("/contactinfo")}
            className="border px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b3c5d] to-[#06283d] text-white p-4 font-semibold">
          Contact Info Table
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Link</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 object-contain border rounded"
                      />
                    </td>
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">
                      <a href={item.link} className="text-blue-600 underline">
                        {item.link}
                      </a>
                    </td>
                    <td className="p-3 flex gap-4">
                      {/* EDIT */}
                      <FaEdit
                        onClick={() =>
                          navigate(`/contactinfo/edit/${item._id}`)
                        }
                        className="text-blue-600 cursor-pointer"
                        title="Edit"
                      />

                      {/* DELETE */}
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

export default ContactInfoList;
