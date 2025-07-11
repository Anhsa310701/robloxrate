import { useState, useEffect } from "react";
import { Mail, Reply, Trash2, Eye, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string; // Changed from union type to string to match database
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    // TODO: Fetch data here

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải tin nhắn.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    // TODO: Fetch data here

      if (error) throw error;

      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      ));
      
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status });
      }

      toast({
        title: "Thành công",
        description: "Đã cập nhật trạng thái tin nhắn.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái.",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) return;

    // TODO: Fetch data here

      toast({
        title: "Thành công",
        description: "Đã xóa tin nhắn.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa tin nhắn.",
        variant: "destructive",
      });
    }
  };

  const getSubjectText = (subject: string) => {
    const subjects = {
      support: "Hỗ trợ định giá",
      feedback: "Góp ý",
      business: "Hợp tác kinh doanh",
      other: "Vấn đề khác"
    };
    return subjects[subject as keyof typeof subjects] || subject;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "read": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "replied": return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Mới";
      case "read": return "Đã đọc";
      case "replied": return "Đã trả lời";
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  if (loading) {
    return <div className="animate-fade-in p-6">Đang tải...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý tin nhắn</h1>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-sm">
            {messages.filter(m => m.status === "new").length} tin nhắn mới
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold">Danh sách tin nhắn ({messages.length})</h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Chưa có tin nhắn nào
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    selectedMessage?.id === message.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{message.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(message.status)}`}>
                      {getStatusText(message.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {getSubjectText(message.subject)}
                  </p>
                  
                  <p className="text-xs text-gray-500 truncate mb-2">
                    {message.message}
                  </p>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {formatDate(message.created_at)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800">
          {selectedMessage ? (
            <>
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold">{selectedMessage.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedMessage.status)}`}>
                    {getStatusText(selectedMessage.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedMessage.email}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{getSubjectText(selectedMessage.subject)}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(selectedMessage.created_at)}</p>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-2">Nội dung:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
                
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Reply size={16} />
                    Đánh dấu đã trả lời
                  </button>
                  <button 
                    onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <Eye size={16} />
                    Đánh dấu đã đọc
                  </button>
                  <button 
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    <Trash2 size={16} />
                    Xóa
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Mail size={48} className="mx-auto mb-4 opacity-50" />
              <p>Chọn một tin nhắn để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-4">
          <h3 className="font-medium text-green-600 dark:text-green-400">Tin nhắn mới</h3>
          <p className="text-2xl font-bold">{messages.filter(m => m.status === "new").length}</p>
        </div>
        
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-4">
          <h3 className="font-medium text-blue-600 dark:text-blue-400">Đã đọc</h3>
          <p className="text-2xl font-bold">{messages.filter(m => m.status === "read").length}</p>
        </div>
        
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-4">
          <h3 className="font-medium text-gray-600 dark:text-gray-400">Đã trả lời</h3>
          <p className="text-2xl font-bold">{messages.filter(m => m.status === "replied").length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
