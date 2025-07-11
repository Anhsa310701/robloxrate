
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu và xác nhận mật khẩu phải giống nhau.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Đăng ký thành công",
        description: "Tài khoản của bạn đã được tạo thành công.",
        variant: "default",
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="py-16 md:py-24 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto glass-card p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 mb-4">
              <User size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Đăng ký</h1>
            <p className="text-gray-300 mt-2">Tạo tài khoản mới</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-1">
                  Họ tên
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 px-4 pl-10 bg-game-darker border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-4 pl-10 bg-game-darker border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="your@email.com"
                    required
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-300 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-4 pl-10 pr-10 bg-game-darker border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-gray-300 mb-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-2 px-4 pl-10 pr-10 bg-game-darker border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                  Tôi đồng ý với{" "}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-500">
                    Điều khoản
                  </Link>{" "}
                  và{" "}
                  <Link to="/policy" className="text-blue-400 hover:text-blue-500">
                    Chính sách bảo mật
                  </Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  loading ? "bg-blue-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-500">
                Đăng nhập
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm mb-4">Hoặc đăng ký với</p>
            <div className="flex gap-4">
              <button className="flex-1 flex justify-center items-center gap-2 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
                <span className="text-sm text-gray-300">Google</span>
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
                <span className="text-sm text-gray-300">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
