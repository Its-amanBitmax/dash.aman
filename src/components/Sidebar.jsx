import { NavLink } from "react-router-dom";
import {
  UserIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  DocumentTextIcon,
  FolderIcon,
  AcademicCapIcon,
  SparklesIcon,
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { to: "/about", label: "About", icon: UserIcon },
  { to: "/services", label: "Services", icon: WrenchScrewdriverIcon },
  { to: "/comments", label: "Comments", icon: ChatBubbleLeftRightIcon },
  { to: "/contact", label: "Contact", icon: PhoneIcon },
  { to: "/blogs", label: "Blogs", icon: DocumentTextIcon },
  { to: "/banner/create", label: "Banner", icon: FolderIcon },
  { to: "/project", label: "Projects", icon: FolderIcon },
  { to: "/testimonial", label: "Testimonials", icon: ChatBubbleLeftRightIcon },
  { to: "/skills", label: "Skills", icon: AcademicCapIcon },

];

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 bg-gradient-to-b from-[#0a3353] via-[#0b3c5d] to-[#092d49] text-white fixed left-0 top-0 shadow-2xl border-r border-blue-800/40 flex flex-col group">
      {/* Logo with gradient - Elegant Design */}
      <div className="relative px-7 py-6 border-b border-blue-900/30 bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg ring-2 ring-blue-500/30">
              <SparklesIcon className="h-6 w-6 text-white" />
              <div className="absolute -inset-1 bg-blue-400/20 rounded-xl blur-sm"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Admin Pro
              </h1>
              <p className="text-xs text-blue-300/70 mt-0.5 tracking-wider">
                Control Panel
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse ring-2 ring-green-400/30"></div>
            <div className="absolute -inset-2 bg-green-400/10 rounded-full blur-sm"></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
        <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-blue-500/5 rounded-full blur-xl"></div>
      </div>

      {/* User Profile - New Section */}
      <div className="px-6 py-4 border-b border-blue-900/20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0b3c5d]"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-white">Administrator</h3>
            <p className="text-xs text-blue-300/60">admin@example.com</p>
          </div>
        </div>
      </div>

      {/* Scrollable Menu Section with Hidden Scrollbar */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hidden hover:scrollbar-visible">
        {/* Menu Items with Elegant Design */}
        <nav className="space-y-1 px-4">
          {menuItems.map((item) => {
            const { to, label, icon: Icon } = item;
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:translate-x-1
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/40 to-blue-500/20 text-white shadow-lg border-l-3 border-blue-400"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon with glowing effect */}
                    <div className="relative">
                      <div
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-blue-300"
                            : "bg-blue-900/20 text-blue-300/70 group-hover:bg-blue-500/20 group-hover:text-blue-300"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-sm"></div>
                      )}
                    </div>

                    <span className="flex-1 font-medium text-sm tracking-wide">
                      {label}
                    </span>

                    {/* Hover indicator */}
                    <div
                      className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : ""
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    </div>

                    {/* Active state glow */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-xl -z-10"></div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

      

        {/* Quick Actions */}
        <div className="px-6 mt-6 space-y-3">
         
        </div>
      </div>

    

      {/* Background Particles Effect */}
      {/* <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-20 left-10 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-8 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-500"></div>
      </div> */}

      {/* Custom CSS for hidden scrollbar */}
      <style jsx>{`
        .scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .scrollbar-visible {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
        }
        .scrollbar-visible::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-visible::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        .btn-gradient {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.3),
            rgba(29, 78, 216, 0.3)
          );
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </aside>
  );
}
