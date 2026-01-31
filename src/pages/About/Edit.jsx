import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    zipcode: "",
    description: "",
    interest: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/about/${id}`);
      if (res.data.success) {
        const item = res.data.data;
        setFormData({
          name: item.name || "",
          email: item.email || "",
          phone: item.phone || "",
          address: item.address || "",
          dob: item.dob ? item.dob.slice(0, 10) : "",
          zipcode: item.zipcode || "",
          description: item.description || "",
          interest: item.interest?.join(", ") || "",
          image: item.image || "",
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

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

    await api.put(`/api/about/${id}`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setSubmitting(false);
    navigate("/create");
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
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
      </div>
      <div className="bg-white p-6 rounded shadow">
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
            {submitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
