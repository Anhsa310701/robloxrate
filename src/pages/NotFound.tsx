
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen game-bg flex flex-col items-center justify-center p-4">
      <div className="glass-card p-8 md:p-12 max-w-lg w-full text-center">
        <div className="mb-6 mx-auto w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
          <span className="text-5xl font-bold">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Không tìm thấy trang</h1>
        <p className="text-gray-300 mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Về trang chủ</span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg text-blue-400 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Quay lại</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
