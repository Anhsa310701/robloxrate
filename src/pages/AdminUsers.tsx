
import { Edit, Search, ShieldCheck, Trash2, User, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  registered_date: string;
  role: string;
  status: string;
}

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
    // TODO: Fetch data here
        console.error("Error fetching users:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách người dùng. Vui lòng thử lại sau.",
          variant: "destructive",
        });
        
        // Fallback to localStorage if needed
        const savedUsers = localStorage.getItem('adminUsers');
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const filteredUsers = searchQuery.trim() === "" 
    ? users 
    : users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const deleteUser = async (id: string) => {
    // TODO: Fetch data here
      
      // Update localStorage backup
      localStorage.setItem('adminUsers', JSON.stringify(users.filter(user => user.id !== id)));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa người dùng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  const toggleUserStatus = async (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    const newStatus = user.status === "Active" ? "Suspended" : "Active";
    
    // TODO: Fetch data here
      
      if (error) throw error;
      
      // Update local state
      const updatedUsers = users.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);
      
      // Update localStorage backup
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
      
      toast({
        title: "Thành công",
        description: `Đã ${newStatus === "Active" ? 'kích hoạt' : 'khóa'} tài khoản người dùng`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái người dùng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Quản lý người dùng</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/20 transform hover:translate-y-[-2px] transition-all duration-300">
          <UserCheck size={18} />
          <span>Xác minh người dùng</span>
        </button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc vai trò..."
          className="w-full py-2 px-4 pl-10 bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-lg focus:outline-none transition-all duration-300 shadow-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Users Table */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-800/80 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tên người dùng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ngày đăng ký</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  className="hover:bg-blue-900/20 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center mr-3 shadow-md shadow-blue-500/10">
                        {user.role === "Admin" ? (
                          <ShieldCheck size={16} />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <span className="font-medium text-gray-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.registered_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-900/30 text-purple-400 border border-purple-500/30"
                        : user.role === "Moderator"
                        ? "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                        : "bg-gray-800 text-gray-400 border border-gray-500/30"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-900/30 text-green-400 border border-green-500/30"
                          : "bg-red-900/30 text-red-400 border border-red-500/30"
                      }`}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-3">
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && filteredUsers.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            Không tìm thấy người dùng nào.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-400">
          Hiển thị 1-{filteredUsers.length} của {filteredUsers.length} người dùng
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-gray-700 hover:border-blue-500/50 text-sm bg-gray-900/60 backdrop-blur-sm transition-all duration-300">
            Trước
          </button>
          <button className="px-3 py-1 rounded border border-blue-500 text-blue-400 text-sm bg-blue-900/30 backdrop-blur-sm shadow-lg shadow-blue-500/10">
            1
          </button>
          <button className="px-3 py-1 rounded border border-gray-700 hover:border-blue-500/50 text-sm bg-gray-900/60 backdrop-blur-sm transition-all duration-300">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
