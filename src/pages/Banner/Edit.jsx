import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const Edit = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH ================= */
  const fetchBanner = async () => {
    try {
      const res = await api.get(`/api/banner/${id}`);
      if (res.data.success) {
        setImage(res.data.data.image);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [id]);

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Image URL required");

    setSubmitting(true);
    try {
      await api.put(`/api/banner/${id}`, { image });
      alert("Banner updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error updating banner");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-12 min-h-screen bg-[#f5f7fa]">
      <h1 className="text-2xl font-semibold mb-6 text-[#0b3c5d]">
        Edit Banner
      </h1>

      <div className="bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Banner Image URL"
            className="flex-1 border p-2 rounded"
          />

          <button
            disabled={submitting}
            className="px-6 py-2 rounded text-white bg-[#0b3c5d]"
          >
            {submitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
