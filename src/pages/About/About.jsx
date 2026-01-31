import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Award,
  Briefcase,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    api
      .get("/api/about")
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setAbout(res.data.data[0]);
        } else {
          setError("About data not found in response");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load about information");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <User className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 text-gray-600 font-medium animate-pulse">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-red-500 text-xl">!</div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to load profile
          </h3>
          <p className="text-gray-500 mb-4">
            {error || "About data not found"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Invalid date"
        : date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6 lg:p-8 mt-20">
      {/* Glassmorphism Header */}
      <div className="mb-8 relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                About Me
              </h1>
              <p className="text-gray-600">
                Welcome to my personal profile page
              </p>
            </div>
            <button
              onClick={() => navigate("/create")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white/50 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-100">
                    <img
                      src={imgError ? "/default-avatar.png" : about.image}
                      alt={about.name}
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full border-2 border-white shadow-md">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-1">
                {about.name}
              </h2>
              <p className="text-blue-100 text-center text-sm mb-4">
                {about.description}
              </p>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {about.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {about.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">
                      {about.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-700 mb-4">
                  Connect with me
                </h3>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-800 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-700 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-purple-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Download CV
                </button>
                <button className="px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl p-2 mb-6 shadow-lg border border-white/20">
            {["personal", "professional", "skills"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Personal Info Card */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-white to-gray-50 p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-500" />
                  Personal Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Date of Birth"
                    value={formatDate(about.dob)}
                    color="purple"
                  />
                  <InfoCard
                    icon={<MapPin className="w-5 h-5" />}
                    label="Zip Code"
                    value={about.zipcode || "Not provided"}
                    color="green"
                  />
                  <InfoCard
                    icon={<Briefcase className="w-5 h-5" />}
                    label="Status"
                    value="Available for work"
                    color="blue"
                  />
                  <InfoCard
                    icon={<Award className="w-5 h-5" />}
                    label="Member Since"
                    value="January 2023"
                    color="orange"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills & Interests */}
          {activeTab === "skills" && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-white to-gray-50 p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">
                  Skills & Interests
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "React",
                      "Node.js",
                      "TypeScript",
                      "Tailwind",
                      "MongoDB",
                      "GraphQL",
                    ].map((skill, index) => (
                      <div key={index} className="group">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl font-medium border border-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {about.interest && about.interest.length > 0 ? (
                      about.interest.map((item, index) => (
                        <div key={index} className="group">
                          <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl font-medium border border-purple-100 hover:shadow-md hover:scale-105 transition-all duration-300">
                            {item}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No interests listed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-gray-900">12</span>
              </div>
              <h4 className="font-semibold text-gray-700">Total Projects</h4>
              <p className="text-sm text-gray-500 mt-1">
                Completed successfully
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-3xl font-bold text-gray-900">3+</span>
              </div>
              <h4 className="font-semibold text-gray-700">Years Experience</h4>
              <p className="text-sm text-gray-500 mt-1">
                In software development
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-3xl font-bold text-green-600">
                  Available
                </span>
              </div>
              <h4 className="font-semibold text-gray-700">Availability</h4>
              <p className="text-sm text-gray-500 mt-1">
                Open for opportunities
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-white to-gray-50 p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                About {about.name}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed">
                Passionate software developer with {about.interest?.length || 0}
                + years of experience in building scalable web applications.
                Specialized in modern JavaScript frameworks and cloud
                technologies. Always eager to learn new technologies and
                contribute to innovative projects.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Remote work experience
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Agile methodology
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Team leadership</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Problem solving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div
        className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          {label}
        </p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default About;
