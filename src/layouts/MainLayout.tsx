import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Lock, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [footerSettings, setFooterSettings] = useState({
    contact_email: "contact@gamevalue.vn",
    discord_url: "discord.gg/GameValue",
    facebook_url: "https://www.facebook.com/riu.minh.2025/"
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadFooterSettings();
  }, []);

  const loadFooterSettings = async () => {
    // TODO: Fetch data here
      
      if (data && data.length > 0) {
        const settingsObj = data.reduce((acc, item) => {
          acc[item.setting_key] = item.setting_value;
          return acc;
        }, {} as any);
        
        setFooterSettings({
          contact_email: settingsObj.contact_email || "contact@gamevalue.vn",
          discord_url: settingsObj.discord_url || "discord.gg/GameValue",
          facebook_url: settingsObj.facebook_url || "https://www.facebook.com/riu.minh.2025/"
        });
      }
    } catch (error) {
      console.error('Error loading footer settings:', error);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated admin credentials as requested
    if (adminEmail === "admin3107@sad.com" && adminPassword === "310707") {
      // Save admin status to localStorage for persistence
      localStorage.setItem("isAdmin", "true");
      // Close modal and navigate to admin panel
      setAdminModalOpen(false);
      navigate("/admin");
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng quay trở lại, Admin!",
      });
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không chính xác.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen game-bg text-white">
      {/* Admin Login Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg w-full max-w-md shadow-2xl shadow-blue-500/10 animate-scale-in">
            <h2 className="text-xl font-bold mb-4 flex items-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              <Lock className="mr-2 text-blue-400" size={20} /> Đăng nhập Admin
            </h2>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-300">Email</label>
                <input 
                  type="email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin3107@sad.com"
                  className="w-full p-2 bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-lg text-white transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-1 text-gray-300">Mật khẩu</label>
                <input 
                  type="password" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full p-2 bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-lg text-white transition-all duration-300"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-300"
                >
                  Đăng nhập
                </button>
                <button 
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-game-darkblue/90 border-b border-gray-800 shadow-md shadow-blue-500/5">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center rounded shadow-lg shadow-purple-500/20">RV</div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Định giá Acc Game</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" active={location.pathname === "/"}>
              Trang chủ
            </NavLink>
            <NavLink href="/games" active={location.pathname.includes("/games")}>
              Game
            </NavLink>
            <NavLink href="/faq" active={location.pathname === "/faq"}>
              FAQ
            </NavLink>
            <NavLink href="/policy" active={location.pathname === "/policy"}>
              Chính sách
            </NavLink>
          </nav>
          
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setAdminModalOpen(true)}
              className="px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 shadow-lg shadow-blue-500/5 flex items-center gap-2"
            >
              <Lock size={16} /> Admin
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="block md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} className="text-blue-400" /> : <Menu size={24} className="text-blue-400" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-md border-b border-gray-800 animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <MobileNavLink href="/" active={location.pathname === "/"} onClick={() => setMenuOpen(false)}>
                Trang chủ
              </MobileNavLink>
              <MobileNavLink href="/games" active={location.pathname.includes("/games")} onClick={() => setMenuOpen(false)}>
                Game
              </MobileNavLink>
              <MobileNavLink href="/faq" active={location.pathname === "/faq"} onClick={() => setMenuOpen(false)}>
                FAQ
              </MobileNavLink>
              <MobileNavLink href="/policy" active={location.pathname === "/policy"} onClick={() => setMenuOpen(false)}>
                Chính sách
              </MobileNavLink>
              
              <div className="pt-3 border-t border-gray-700">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setAdminModalOpen(true);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center rounded shadow-lg shadow-purple-500/20">RV</div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Định giá Acc Game</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nền tảng định giá tài khoản game đáng tin cậy hàng đầu Việt Nam
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-blue-400">Liên kết</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-blue-400 transition-colors">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/games" className="hover:text-blue-400 transition-colors">Game</Link>
                </li>
                <li>
                  <Link to="/value" className="hover:text-blue-400 transition-colors">Định giá</Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
                </li>
                <li>
                  <Link to="/policy" className="hover:text-blue-400 transition-colors">Chính sách</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-purple-400">Liên hệ</h3>
              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  className="p-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-full text-purple-400 transition-colors flex items-center gap-2"
                  title="Thông tin liên hệ"
                >
                  <Mail size={22} />
                  <span className="sr-only">Liên hệ</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Game Value. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={href}
    className={`text-sm font-medium ${
      active 
        ? "text-blue-400 border-b-2 border-blue-500" 
        : "text-gray-300 hover:text-blue-400"
    } transition-colors`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, active, children, onClick }: { href: string; active: boolean; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`py-2 ${
      active 
        ? "text-blue-400 border-l-2 border-blue-500 pl-3" 
        : "text-gray-300 hover:text-blue-400 pl-4"
    } transition-colors`}
  >
    {children}
  </Link>
);

export default MainLayout;
