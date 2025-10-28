import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Home, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    navigate("/login");
  };
  const handleProfileNavigation = () => {
    setProfileDropdownOpen(false);

    if (user?.role === "buyer") {
      navigate("/profile");
    } else if (user?.role === "real_estate_developer") {
      navigate("/developer-dashboard");
    } else {
      navigate("/sellerProfile");
    }
  };
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary-navy/95 backdrop-blur-md shadow-lg py-2"
          : "bg-primary-navy py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center font-playfair text-white text-3xl font-bold"
          >
            <Home className="mr-2" />
            DreamHome
          </button>

          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-white font-medium hover:text-accent-gold transition-colors relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/chat-agent")}
                className="text-white font-medium hover:text-accent-gold transition-colors relative group"
              >
                AI Agent
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/marketplace")}
                className="text-white font-medium hover:text-accent-gold transition-colors relative group"
              >
                New Project
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>

            <li>
              <button className="text-white font-medium hover:text-accent-gold transition-colors relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/services")}
                className="text-white font-medium hover:text-accent-gold transition-colors relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </button>
            </li>

            {/* إظهار زرار Register فقط لو المستخدم مش مسجل دخول */}
            {!user && (
              <li>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-accent-gold text-white font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-primary-navy transition-all duration-300 hover:-translate-y-0.5"
                >
                  Register
                </button>
              </li>
            )}

            {/* إظهار Profile Avatar فقط لو المستخدم مسجل دخول */}
            {user && (
              <li className="relative profile-dropdown">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-accent-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center overflow-hidden border-2 border-white/20 hover:border-accent-gold transition-all duration-300">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-text-dark">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-text-light">
                        {user?.email || ""}
                      </p>
                    </div>

                    <button
                      onClick={handleProfileNavigation}
                      className="w-full flex items-center px-4 py-2 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/settings");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>

                    <hr className="my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
