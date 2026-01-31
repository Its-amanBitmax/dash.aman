import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Create = () => {
  const navigate = useNavigate();
  const [aboutList, setAboutList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [viewData, setViewData] = useState(null);

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    zipcode: "",
    description: "",
    interest: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH ================= */
  const fetchList = async () => {
    const res = await api.get("/api/about");
    if (res.data.success) setAboutList(res.data.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchList();
      setLoading(false);
    };
    loadData();
  }, []);

  /* ================= COMMON ================= */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "interest") {
        formDataToSend.append(
          key,
          formData[key].split(",").map((i) => i.trim()),
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    await api.post("/api/about", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await fetchList();
    setFormData(initialForm);
    setSubmitting(false);
  };

  /* ================= VIEW ================= */
  const openView = async (id) => {
    const res = await api.get(`/api/about/${id}`);
    if (res.data.success) {
      setViewData(res.data.data);
      setViewOpen(true);
    }
  };

  /* ================= EDIT ================= */
  const openEdit = (item) => {
    navigate(`/edit/${item._id}`);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this profile?")) return;
    await api.delete(`/api/about/${id}`);
    fetchList();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 bg-gray-100 min-h-screen overflow-visible">
      <h1 className="text-2xl font-semibold mb-4">About Management</h1>

      {/* ================= CREATE FORM ================= */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Create Profile</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          {["name", "email", "phone", "address", "zipcode"].map((f) => (
            <input
              key={f}
              name={f}
              value={formData[f]}
              onChange={handleChange}
              placeholder={f.toUpperCase()}
              className="border p-2 rounded"
            />
          ))}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded md:col-span-2"
          />

          <input
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            placeholder="coding, music"
            className="border p-2 rounded"
          />

          <button
            disabled={submitting}
            className="bg-blue-600 text-white py-2 rounded md:col-span-2"
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded shadow border">
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto">
          <table className="min-w-[1000px] w-full text-sm">
            <thead className="bg-[#0b3c5d] text-white sticky top-0">
              <tr>
                <th className="p-3">Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Zip</th>
                <th>Interests</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {aboutList.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{new Date(item.dob).toLocaleDateString()}</td>
                  <td>{item.zipcode}</td>
                  <td>
                    {item.interest.map((i, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-blue-100 rounded mr-1"
                      >
                        {i}
                      </span>
                    ))}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-3 text-lg">
                      <FaEye
                        className="text-blue-600 cursor-pointer"
                        onClick={() => openView(item._id)}
                      />
                      <FaEdit
                        className="text-green-600 cursor-pointer"
                        onClick={() => openEdit(item)}
                      />
                      <FaTrash
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewOpen && viewData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[500px]">
            <h2 className="font-semibold mb-4">View Profile</h2>

            <img
              src={viewData.image}
              className="w-24 h-24 rounded mx-auto mb-4 object-cover"
            />

            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {viewData.name}
              </p>
              <p>
                <b>Email:</b> {viewData.email}
              </p>
              <p>
                <b>Phone:</b> {viewData.phone}
              </p>
              <p>
                <b>DOB:</b> {new Date(viewData.dob).toLocaleDateString()}
              </p>
              <p>
                <b>Address:</b> {viewData.address}
              </p>
              <p>
                <b>Zipcode:</b> {viewData.zipcode}
              </p>
              <p>
                <b>Description:</b> {viewData.description}
              </p>
              <p>
                <b>Interests:</b> {viewData.interest.join(", ")}
              </p>
            </div>

            <button
              onClick={() => setViewOpen(false)}
              className="mt-4 border px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
