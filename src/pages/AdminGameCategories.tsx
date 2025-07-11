
import { Database, Plus, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  games_count: number;
}

const AdminGameCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  useEffect(() => {
    const fetchCategories = async () => {
    // TODO: Fetch data here
        console.error("Error fetching categories:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách thể loại. Vui lòng thử lại sau.",
          variant: "destructive",
        });
        
        // Fallback to localStorage if needed
        const savedCategories = localStorage.getItem('adminCategories');
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  const filteredCategories = searchQuery.trim() === "" 
    ? categories 
    : categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const addCategory = async () => {
    if (newCategory.trim() !== "") {
      const duplicateCategory = categories.find(
        cat => cat.name.toLowerCase() === newCategory.toLowerCase()
      );
      
      if (duplicateCategory) {
        toast({
          title: "Lỗi",
          description: `Thể loại "${newCategory}" đã tồn tại`,
          variant: "destructive",
        });
        return;
      }
      
    // TODO: Fetch data here
          ])
        
        if (error) throw error;
        
        // Update local state with the new category
        const newCategoryData = data[0];
        setCategories([...categories, newCategoryData]);
        
        setNewCategory("");
        setShowAddModal(false);
        toast({
          title: "Thành công",
          description: `Đã thêm thể loại "${newCategory}"`,
          variant: "default",
        });
        
        // Update localStorage backup
        localStorage.setItem('adminCategories', JSON.stringify([...categories, newCategoryData]));
        localStorage.setItem('gameCategories', JSON.stringify([...categories, newCategoryData]));
      } catch (error) {
        console.error("Error adding category:", error);
        toast({
          title: "Lỗi",
          description: "Không thể thêm thể loại. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    }
  };
  
  const deleteCategory = async (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    
    // TODO: Fetch data here
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa thể loại. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Database className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
          <h1 className="text-2xl font-bold">Quản lý thể loại game</h1>
        </div>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/20 transform hover:translate-y-[-2px] transition-all duration-300"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          <span>Thêm thể loại</span>
        </button>
      </div>
      
      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="relative col-span-2">
          <input
            type="text"
            placeholder="Tìm kiếm thể loại..."
            className="w-full py-2 px-4 pl-10 bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-lg focus:outline-none transition-all duration-300 shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Add New */}
        <div className="flex">
          <input
            type="text"
            placeholder="Tên thể loại mới..."
            className="flex-1 py-2 px-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-l-lg focus:outline-none transition-all duration-300 shadow-inner"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addCategory();
            }}
          />
          <button 
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-r-lg shadow-lg shadow-purple-500/10 transition-all duration-300"
            onClick={addCategory}
          >
            Thêm
          </button>
        </div>
      </div>
      
      {/* Categories Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tên thể loại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Số game</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCategories.map((category) => (
                <tr 
                  key={category.id}
                  className="hover:bg-blue-900/20 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{category.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center mr-3 shadow-md shadow-blue-500/10">
                        <Tag size={16} />
                      </div>
                      <span className="font-medium text-gray-200">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded border border-blue-500/30">
                      {category.games_count} game
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button 
                      className="text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => setShowDeleteConfirm(category.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    {showDeleteConfirm === category.id && (
                      <div className="absolute right-8 mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 backdrop-blur-md">
                        <p className="text-sm mb-2">Xác nhận xóa?</p>
                        <div className="flex gap-2">
                          <button 
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                            onClick={() => deleteCategory(category.id)}
                          >
                            Xóa
                          </button>
                          <button 
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded transition-colors"
                            onClick={() => setShowDeleteConfirm(null)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && filteredCategories.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            Không tìm thấy thể loại nào.
          </div>
        )}
      </div>
      
      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg w-full max-w-md shadow-2xl shadow-purple-500/10 animate-scale-in">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Thêm thể loại mới</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">Tên thể loại</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
                onClick={() => {
                  setShowAddModal(false);
                  setNewCategory("");
                }}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-purple-500/20 transition-all"
                onClick={addCategory}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGameCategories;
