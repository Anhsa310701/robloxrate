
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  Home, 
  LayoutGrid, 
  LogOut, 
  Package, 
  Settings, 
  Tag, 
  Users
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState({
    games: false,
  });

  const toggleMenu = (menu: string) => {
    setMenuOpen({
      ...menuOpen,
      [menu]: !menuOpen[menu as keyof typeof menuOpen],
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/admin" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <span className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">GS</span>
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              location.pathname === "/admin" 
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          
          <div>
            <button 
              onClick={() => toggleMenu("games")}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md ${
                location.pathname.includes("/admin/games") 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutGrid size={20} />
                <span>Quản lý Game</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${menuOpen.games ? "rotate-180" : ""}`} 
              />
            </button>
            
            {menuOpen.games && (
              <div className="mt-1 ml-9 pl-2 border-l border-gray-200 dark:border-gray-700 space-y-1">
                <Link 
                  to="/admin/game-categories" 
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === "/admin/game-categories" 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Thể loại
                </Link>
                <Link 
                  to="/admin/games" 
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === "/admin/games" 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Danh sách game
                </Link>
                <Link 
                  to="/admin/game-items" 
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === "/admin/game-items" 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Sản phẩm game
                </Link>
              </div>
            )}
          </div>
          
          <Link 
            to="/admin/users" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              location.pathname === "/admin/users" 
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Users size={20} />
            <span>Quản lý người dùng</span>
          </Link>
          
          <Link 
            to="/admin/settings" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              location.pathname === "/admin/settings" 
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Settings size={20} />
            <span>Cài đặt</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-800">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
