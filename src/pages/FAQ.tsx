
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "Định giá tài khoản Game là gì?",
      answer: "Định giá tài khoản Game là dịch vụ cho phép người chơi xác định giá trị thực tế của tài khoản game dựa trên các vật phẩm, tiền tệ, và tài nguyên mà họ sở hữu trong game. Công cụ của chúng tôi sử dụng thuật toán tiên tiến để phân tích và đánh giá giá trị của từng thành phần, cung cấp báo cáo định giá chi tiết và chính xác."
    },
    {
      question: "Làm thế nào để định giá tài khoản game của tôi?",
      answer: "Để định giá tài khoản, bạn cần chọn game mà bạn đang chơi, sau đó chọn các vật phẩm, skin, tài nguyên bạn sở hữu trong game đó. Hệ thống sẽ tự động tính toán giá trị dựa trên dữ liệu thị trường và cung cấp kết quả định giá chi tiết cho bạn."
    },
    {
      question: "Định giá có chính xác không?",
      answer: "Chúng tôi cố gắng cung cấp kết quả định giá chính xác nhất có thể dựa trên dữ liệu thị trường hiện tại. Tuy nhiên, giá trị thực tế khi giao dịch có thể dao động dựa trên nhu cầu thị trường, tình trạng hiếm của vật phẩm, và các yếu tố khác. Định giá của chúng tôi nên được xem là ước tính hợp lý nhất tại thời điểm hiện tại."
    },
    {
      question: "Tôi có thể bán tài khoản game của mình ở đâu?",
      answer: "Chúng tôi không cung cấp dịch vụ mua bán tài khoản game. Việc mua bán tài khoản có thể vi phạm điều khoản dịch vụ của nhiều game. Chúng tôi khuyến nghị bạn tham khảo các điều khoản dịch vụ của game trước khi tiến hành bất kỳ giao dịch nào."
    },
    {
      question: "Định giá có mất phí không?",
      answer: "Chúng tôi cung cấp dịch vụ định giá cơ bản miễn phí. Tuy nhiên, một số tính năng nâng cao như báo cáo chi tiết, định giá nhiều tài khoản, hoặc phân tích thị trường có thể yêu cầu gói dịch vụ cao cấp."
    },
    {
      question: "Tôi có thể tin tưởng vào độ bảo mật của dịch vụ không?",
      answer: "Chúng tôi cam kết bảo vệ thông tin của người dùng. Chúng tôi không yêu cầu thông tin đăng nhập tài khoản game của bạn và không lưu trữ bất kỳ dữ liệu cá nhân nào không cần thiết. Tất cả thông tin bạn cung cấp chỉ được sử dụng để định giá và không được chia sẻ với bên thứ ba."
    },
    {
      question: "Làm thế nào để tôi có thể nhận được báo cáo định giá chi tiết?",
      answer: "Sau khi hoàn tất quá trình định giá, bạn sẽ thấy một nút 'Tải báo cáo' trên trang kết quả. Nhấp vào nút này sẽ tạo và tải xuống một báo cáo PDF chi tiết về giá trị tài khoản của bạn, bao gồm danh sách vật phẩm và giá trị từng vật phẩm."
    }
  ];

  return (
    <div className="py-16 md:py-24 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Câu hỏi thường gặp</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tìm hiểu thêm về dịch vụ định giá tài khoản game của chúng tôi
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="backdrop-blur-md bg-gray-900/40 border border-gray-700 hover:border-blue-500/30 rounded-lg overflow-hidden transition-all duration-300 shadow-lg"
            >
              <button
                className="w-full flex justify-between items-center p-4 md:p-6 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-medium text-left text-gray-200">{item.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-blue-400 transition-transform duration-300 ${
                    openItem === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              
              <div 
                className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ${
                  openItem === index 
                    ? "max-h-96 pb-6 opacity-100" 
                    : "max-h-0 pb-0 opacity-0"
                }`}
              >
                <p className="text-gray-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
