
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";

const Index = () => {
  return (
    <div className="relative animate-fade-in">
      {/* Cyberpunk overlay effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#0f172a_2px,_transparent_2px)] bg-[size:40px_100%] pointer-events-none opacity-30"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#0f172a_2px,_transparent_2px)] bg-[size:100%_40px] pointer-events-none opacity-30"></div>
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10 pointer-events-none"></div>
        
        {/* Cyberpunk glowing circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 backdrop-blur-sm">
              #1 Công cụ định giá Game Việt Nam
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
              Định giá tài khoản Game<br />một cách chính xác
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Chọn game và các vật phẩm bạn sở hữu để nhận được giá trị ước tính cho tài khoản của bạn.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/games" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20 transform hover:translate-y-[-2px]"
              >
                Định giá ngay <ArrowRight className="ml-1" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-8 rounded-lg text-center hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 transform hover:translate-y-[-5px]">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-2">100k+</h2>
              <p className="text-gray-300">Tài khoản đã định giá</p>
            </div>
            <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-8 rounded-lg text-center hover:border-purple-500/30 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 transform hover:translate-y-[-5px]">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">98%</h2>
              <p className="text-gray-300">Độ chính xác</p>
            </div>
            <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-8 rounded-lg text-center hover:border-cyan-500/30 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 transform hover:translate-y-[-5px]">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-2">24/7</h2>
              <p className="text-gray-300">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">Cách thức hoạt động</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 hover:border-blue-500/30 rounded-lg p-6 text-center transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
              <StepIndicator 
                number={1} 
                title="Chọn Game" 
                description="Chọn các game mà tài khoản của bạn đã chơi và có vật phẩm/tiền tệ"
                active={true}
              />
            </div>
            <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 hover:border-purple-500/30 rounded-lg p-6 text-center transition-all duration-300 shadow-xl hover:shadow-purple-500/10">
              <StepIndicator 
                number={2} 
                title="Thêm chi tiết" 
                description="Nhập thông tin về các vật phẩm, Robux, level, và những tài sản khác bạn sở hữu"
                active={true}
              />
            </div>
            <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 hover:border-cyan-500/30 rounded-lg p-6 text-center transition-all duration-300 shadow-xl hover:shadow-cyan-500/10">
              <StepIndicator 
                number={3} 
                title="Nhận định giá" 
                description="Nhận kết quả định giá chi tiết cùng phân tích về giá trị của từng vật phẩm"
                active={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
