
import { Edit, Gamepad, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Game {
  id: string;
  name: string;
  category: string;
  items: number;
  active: boolean;
}

interface Category {
  id: string;
  name: string;
}

const AdminGames = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [newGameData, setNewGameData] = useState({
    name: "",
    category: "",
    items: 0,
    active: true
  });
  
  const [games, setGames] = useState<Game[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
    // TODO: Fetch data here
        console.error("Error fetching data:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu. Vui lòng thử lại sau.",
          variant: "destructive",
        });
        
        // Fallback to localStorage if needed
        const savedGames = localStorage.getItem('adminGames');
        if (savedGames) {
          setGames(JSON.parse(savedGames));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const filteredGames = searchQuery.trim() === "" 
    ? games 
    : games.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const deleteGame = async (id: string) => {
    // TODO: Fetch data here
    } catch (error) {
      console.error("Error deleting game:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa game. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  const toggleGameStatus = async (id: string) => {
    const game = games.find(g => g.id === id);
    if (!game) return;
    
    const newStatus = !game.active;
    
    // TODO: Fetch data here
      
      if (error) throw error;
      
      // Update local state
      const updatedGames = games.map(game => 
        game.id === id ? { ...game, active: newStatus } : game
      );
      setGames(updatedGames);
      
      // Update localStorage backup
      localStorage.setItem('adminGames', JSON.stringify(updatedGames));
      
      // Update the public games list
      updatePublicGames(updatedGames);
      
      toast({
        title: "Thành công",
        description: `Đã ${newStatus ? 'kích hoạt' : 'tạm dừng'} game`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error toggling game status:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái game. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  // Update the public games list in localStorage
  const updatePublicGames = (updatedGames: Game[]) => {
    const publicGames = updatedGames
      .filter(game => game.active)
      .map(game => ({
        id: game.id,
        name: game.name,
        category: game.category,
        image: "/placeholder.svg",
        players: Math.floor(Math.random() * 10000) + 1000,
        items: game.items
      }));
    
    localStorage.setItem('gamesList', JSON.stringify(publicGames));
  };
  
  const handleAddGame = async () => {
    // Validate form
    if (!newGameData.name || !newGameData.category) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin game",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Fetch data here
      
      // Update localStorage backup
      localStorage.setItem('adminGames', JSON.stringify(updatedGames));
      
      // Update the public games list
      updatePublicGames(updatedGames);
      
      toast({
        title: "Thành công",
        description: "Đã thêm game mới",
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding game:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm game. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Danh sách game</h1>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/20 transform hover:translate-y-[-2px] transition-all duration-300"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          <span>Thêm game mới</span>
        </button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm game hoặc thể loại..."
          className="w-full py-2 px-4 pl-10 bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-lg focus:outline-none transition-all duration-300 shadow-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Games Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tên game</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Thể loại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Số vật phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredGames.map((game) => (
                <tr 
                  key={game.id}
                  className="hover:bg-blue-900/20 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{game.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center mr-3 shadow-md shadow-blue-500/10">
                        <Gamepad size={16} />
                      </div>
                      <span className="font-medium text-gray-200">{game.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{game.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{game.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        game.active
                          ? "bg-green-900/30 text-green-400 border border-green-500/30"
                          : "bg-red-900/30 text-red-400 border border-red-500/30"
                      }`}
                      onClick={() => toggleGameStatus(game.id)}
                    >
                      {game.active ? "Hoạt động" : "Tạm dừng"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-3">
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => deleteGame(game.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && filteredGames.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            Không tìm thấy game nào.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-400">
          Hiển thị 1-{filteredGames.length} của {filteredGames.length} game
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
      
      {/* Add Game Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg w-full max-w-md shadow-2xl shadow-purple-500/10 animate-scale-in">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Thêm game mới</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Tên game</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newGameData.name}
                  onChange={(e) => setNewGameData({...newGameData, name: e.target.value})}
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Thể loại</label>
                <select
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newGameData.category}
                  onChange={(e) => setNewGameData({...newGameData, category: e.target.value})}
                >
                  <option value="">Chọn thể loại</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Số vật phẩm</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newGameData.items}
                  onChange={(e) => setNewGameData({...newGameData, items: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="activeStatus"
                  className="mr-2"
                  checked={newGameData.active}
                  onChange={(e) => setNewGameData({...newGameData, active: e.target.checked})}
                />
                <label htmlFor="activeStatus" className="text-gray-300">Kích hoạt game</label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
                onClick={() => setShowAddModal(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-purple-500/20 transition-all"
                onClick={handleAddGame}
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

export default AdminGames;
