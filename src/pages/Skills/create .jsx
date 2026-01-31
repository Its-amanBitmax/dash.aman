import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CreateSkill = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: "", image: null });

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
      await api.post("/api/skills/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/skills"); // Redirect back to skills list
    } catch (error) {
      console.error("Error creating skill:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#f5f7fa]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#0b3c5d] mb-6">
          Create Skill
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
                  <td className="p-2 font-medium">Skill Image</td>
                  <td className="p-2">
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      required
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
                        {submitting ? "Creating..." : "Create"}
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

export default CreateSkill;
