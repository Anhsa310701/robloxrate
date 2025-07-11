
import { BarChart, Gamepad, Package, Plus, Tag, User, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import ActivityItem from "@/components/ActivityItem";
import TaskItem from "@/components/TaskItem";

const Admin = () => {
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Cập nhật lần cuối: {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Người dùng"
          value="245"
          icon={<Users size={24} />}
          change={{ value: 12, type: "increase", text: "so với tháng trước" }}
        />
        <StatCard 
          title="Game"
          value="38"
          icon={<Gamepad size={24} />}
          change={{ value: 8, type: "increase", text: "so với tháng trước" }}
        />
        <StatCard 
          title="Thể loại"
          value="12"
          icon={<Tag size={24} />}
          change={{ value: 0, type: "neutral", text: "so với tháng trước" }}
        />
        <StatCard 
          title="Sản phẩm"
          value="156"
          icon={<Package size={24} />}
          change={{ value: 3, type: "decrease", text: "so với tháng trước" }}
        />
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg">Hoạt động gần đây</h2>
          </div>
          <div className="p-2">
            <ActivityItem 
              icon={<User size={20} />}
              title="Người dùng mới đăng ký"
              time="2 giờ trước"
            />
            <ActivityItem 
              icon={<Gamepad size={20} />}
              title="Game mới được thêm vào"
              time="4 giờ trước"
            />
            <ActivityItem 
              icon={<Package size={20} />}
              title="Sản phẩm mới được tạo"
              time="6 giờ trước"
            />
            <ActivityItem 
              icon={<Tag size={20} />}
              title="Thể loại mới được tạo"
              time="1 ngày trước"
            />
          </div>
        </div>
        
        {/* Tasks */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg">Công việc cần làm</h2>
          </div>
          <div className="p-6">
            <TaskItem 
              label="Cập nhật danh sách game mới"
            />
            <TaskItem 
              label="Xem xét và phê duyệt người dùng mới"
            />
            <TaskItem 
              label="Cập nhật giá sản phẩm"
            />
            <TaskItem 
              label="Thêm thể loại game mới"
            />
            <TaskItem 
              label="Kiểm tra báo cáo hàng tuần"
            />
          </div>
        </div>
      </div>
      
      {/* Charts - Placeholder */}
      <div className="mt-8 bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Thống kê</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm">7 ngày</button>
            <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-800 text-sm">30 ngày</button>
            <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm">90 ngày</button>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/20 rounded-lg border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center text-gray-400">
            <BarChart size={48} strokeWidth={1} />
            <p className="mt-2">Biểu đồ phân tích dữ liệu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
