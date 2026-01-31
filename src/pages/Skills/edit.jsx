import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: "", image: null });

  /* ================= FETCH SKILL ================= */
  const fetchSkill = async () => {
    try {
      const res = await api.get(`/api/skills/${id}`);
      if (res.data.success) {
        setFormData({ title: res.data.data.title, image: null }); // Image is URL, but we'll allow re-upload
      }
    } catch (error) {
      console.error("Error fetching skill:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, [id]);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await api.put(`/api/skills/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/skills"); // Redirect back to skills list
    } catch (error) {
      console.error("Error updating skill:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-[#f5f7fa]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#0b3c5d] mb-6">
          Edit Skill
        </h1>

        <div className="bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit}>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="p-2 font-medium">Skill Title</td>
                  <td className="p-2">
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Skill Title"
                      required
                      className="border p-2 rounded w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">
                    Skill Image (Optional - leave empty to keep current)
                  </td>
                  <td className="p-2">
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="border p-2 rounded w-full"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="p-2 text-center">
                    <div className="flex gap-3 justify-center">
                      <button
                        disabled={submitting}
                        className="bg-[#0b3c5d] text-white px-6 py-2 rounded"
                      >
                        {submitting ? "Updating..." : "Update"}
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate("/skills")}
                        className="border px-6 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSkill;
