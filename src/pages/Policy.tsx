
import { Shield, Lock, EyeOff, BookOpen } from "lucide-react";

const Policy = () => {
  return (
    <div className="py-16 md:py-24 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Chính sách bảo mật</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Chúng tôi coi trọng việc bảo vệ thông tin cá nhân và quyền riêng tư của bạn
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-6 md:p-8 rounded-lg shadow-xl shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/10">
                <BookOpen className="text-blue-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Giới thiệu</h2>
                <p className="text-gray-300 mb-4">
                  GameValue cam kết bảo vệ quyền riêng tư của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân khi bạn sử dụng dịch vụ định giá tài khoản game của chúng tôi.
                </p>
                <p className="text-gray-300">
                  Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này. Thông tin cá nhân mà chúng tôi thu thập chỉ được sử dụng để cải thiện dịch vụ và trải nghiệm của bạn.
                </p>
              </div>
            </div>
          </section>
          
          <section className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-6 md:p-8 rounded-lg shadow-xl shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/10">
                <EyeOff className="text-purple-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400">Thu thập thông tin</h2>
                <p className="text-gray-300 mb-4">
                  Chúng tôi thu thập các loại thông tin sau:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>
                    <span className="font-medium text-gray-200">Thông tin game: </span>
                    Chúng tôi thu thập thông tin về game bạn chơi và các vật phẩm bạn sở hữu để cung cấp dịch vụ định giá chính xác.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Thông tin thiết bị: </span>
                    Chúng tôi có thể thu thập thông tin về thiết bị bạn sử dụng để truy cập dịch vụ, bao gồm loại thiết bị, hệ điều hành, và trình duyệt.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Cookies: </span>
                    Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng và thu thập dữ liệu phân tích.
                  </li>
                </ul>
                <p className="text-gray-300">
                  Chúng tôi không thu thập hoặc lưu trữ tên đăng nhập, mật khẩu, hoặc thông tin đăng nhập khác của tài khoản game.
                </p>
              </div>
            </div>
          </section>
          
          <section className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-6 md:p-8 rounded-lg shadow-xl shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/10">
                <Lock className="text-cyan-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">Bảo mật thông tin</h2>
                <p className="text-gray-300 mb-4">
                  Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>
                    <span className="font-medium text-gray-200">Mã hóa dữ liệu: </span>
                    Chúng tôi sử dụng công nghệ mã hóa tiên tiến để bảo vệ dữ liệu khi truyền tải.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Hạn chế truy cập: </span>
                    Chỉ nhân viên được ủy quyền mới có quyền truy cập thông tin cá nhân, và họ phải tuân thủ các yêu cầu bảo mật nghiêm ngặt.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Kiểm tra bảo mật: </span>
                    Chúng tôi thực hiện đánh giá bảo mật thường xuyên để đảm bảo hệ thống đáp ứng các tiêu chuẩn bảo mật cao nhất.
                  </li>
                </ul>
                <p className="text-gray-300">
                  Mặc dù chúng tôi nỗ lực bảo vệ thông tin của bạn, không có phương thức truyền tải qua Internet hoặc lưu trữ điện tử nào là an toàn 100%. Chúng tôi không thể đảm bảo an ninh tuyệt đối.
                </p>
              </div>
            </div>
          </section>
          
          <section className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-6 md:p-8 rounded-lg shadow-xl shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/10">
                <Shield className="text-green-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-400">Quyền của bạn</h2>
                <p className="text-gray-300 mb-4">
                  Bạn có các quyền sau đối với thông tin cá nhân của mình:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>
                    <span className="font-medium text-gray-200">Truy cập: </span>
                    Bạn có quyền yêu cầu bản sao thông tin cá nhân mà chúng tôi lưu trữ về bạn.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Chỉnh sửa: </span>
                    Bạn có quyền yêu cầu chúng tôi sửa bất kỳ thông tin nào không chính xác.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Xóa: </span>
                    Bạn có quyền yêu cầu xóa thông tin cá nhân của bạn trong một số trường hợp.
                  </li>
                  <li>
                    <span className="font-medium text-gray-200">Từ chối: </span>
                    Bạn có quyền từ chối việc chúng tôi xử lý thông tin cá nhân của bạn trong một số trường hợp.
                  </li>
                </ul>
                <p className="text-gray-300">
                  Để thực hiện bất kỳ quyền nào nêu trên, vui lòng liên hệ với chúng tôi theo thông tin ở cuối chính sách này.
                </p>
              </div>
            </div>
          </section>
          
          {/* ĐÃ XOÁ: KHỐI "Thông tin liên hệ" */}
        </div>
      </div>
    </div>
  );
};

export default Policy;

