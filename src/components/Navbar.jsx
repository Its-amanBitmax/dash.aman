import { BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-14 bg-[#0b3c5d] text-white flex items-center justify-between px-6 shadow z-10">
      {/* Title */}
      <h1 className="font-semibold text-lg">Admin Panel</h1>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <BellIcon className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100" />
        <UserCircleIcon className="h-8 w-8 cursor-pointer" />
        <ArrowRightOnRectangleIcon
          className="h-6 w-6 cursor-pointer opacity-80 hover:opacity-100"
          onClick={handleLogout}
          title="Logout"
        />
      </div>
    </header>
  );
}

export default Navbar;
