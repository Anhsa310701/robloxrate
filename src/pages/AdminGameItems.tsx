
import { Edit, Package, Plus, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface GameItem {
  id: string;
  name: string;
  game: string;
  category: string;
  price: number;
  rarity: string;
}

interface Game {
  id: string;
  name: string;
}

interface Category {
  name: string;
}

const AdminGameItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [newItemData, setNewItemData] = useState({
    name: "",
    game: "",
    category: "",
    price: 0,
    rarity: "Common"
  });
  
  // States for dropdown options
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<GameItem[]>([]);
  
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
        const savedItems = localStorage.getItem('adminGameItems');
        if (savedItems) {
          setItems(JSON.parse(savedItems));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Update game-specific items
  const updateGameSpecificItems = (itemsData: GameItem[], gamesData: Game[]) => {
    const gameItemsMap = new Map();
    
    itemsData.forEach(item => {
      if (!gameItemsMap.has(item.game)) {
        gameItemsMap.set(item.game, []);
      }
      
      const gameItems = gameItemsMap.get(item.game);
      gameItems.push({
        id: item.id,
        name: item.name,
        value: item.rarity === "Legendary" || item.rarity === "Godly" ? "High" :
               item.rarity === "Epic" || item.rarity === "Rare" ? "Medium" : "Low",
        category: item.category,
        icon: getIconForCategory(item.category),
        numericValue: item.price // Store the actual price value
      });
    });
    
    // Save each game's items to localStorage
    for (const [gameName, gameItems] of gameItemsMap.entries()) {
      const gameId = gamesData.find(g => g.name === gameName)?.id;
      if (gameId) {
        localStorage.setItem(`game-${gameId}-items`, JSON.stringify(gameItems));
      }
    }
  };
  
  const getIconForCategory = (category: string) => {
    if (category === "Pet" || category === "Thú cưng") return "🐱";
    if (category === "Vehicle" || category === "Phương tiện") return "🚗";
    if (category === "Property" || category === "Bất động sản") return "🏠";
    if (category === "Weapon" || category === "Vũ khí") return "⚔️";
    if (category === "Accessory" || category === "Phụ kiện") return "👑";
    if (category === "Pass" || category === "Game Pass") return "🎫";
    return "🎮";
  };
  
  const filteredItems = searchQuery.trim() === "" 
    ? items 
    : items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const deleteItem = async (id: string) => {
    // TODO: Fetch data here
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  const handleAddItem = async () => {
    // Validate form
    if (!newItemData.name || !newItemData.game || !newItemData.category) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin sản phẩm",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Fetch data here
      
      // Update localStorage backup
      localStorage.setItem('adminGameItems', JSON.stringify(updatedItems));
      
      // Update game-specific items
      updateGameSpecificItems(updatedItems, games);
      
      toast({
        title: "Thành công",
        description: "Đã thêm sản phẩm mới",
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(price).replace(/\s/g, '');
  };
  
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Sản phẩm game</h1>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/20 transform hover:translate-y-[-2px] transition-all duration-300"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          <span>Thêm sản phẩm</span>
        </button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, game, thể loại..."
          className="w-full py-2 px-4 pl-10 bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-lg focus:outline-none transition-all duration-300 shadow-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Items Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Game</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Độ hiếm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Giá (VND)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id}
                  className="hover:bg-blue-900/20 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900/40 text-blue-400 rounded-full flex items-center justify-center mr-3 shadow-md shadow-blue-500/10">
                        <Package size={16} />
                      </div>
                      <span className="font-medium text-gray-200">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.game}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="flex items-center">
                      <Tag size={14} className="mr-1.5 text-gray-400" />
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.rarity === "Legendary" || item.rarity === "Godly"
                        ? "bg-purple-900/40 text-purple-400 border border-purple-500/50"
                        : item.rarity === "Epic"
                        ? "bg-orange-900/40 text-orange-400 border border-orange-500/50"
                        : item.rarity === "Rare"
                        ? "bg-blue-900/40 text-blue-400 border border-blue-500/50"
                        : item.rarity === "Uncommon"
                        ? "bg-green-900/40 text-green-400 border border-green-500/50"
                        : "bg-gray-800 text-gray-400 border border-gray-500/50"
                    }`}>
                      {item.rarity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-400">{formatPrice(item.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-3">
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && filteredItems.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            Không tìm thấy sản phẩm nào.
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-400">
          Hiển thị 1-{filteredItems.length} của {filteredItems.length} sản phẩm
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
      
      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg w-full max-w-md shadow-2xl shadow-purple-500/10 animate-scale-in">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Thêm sản phẩm mới</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Tên sản phẩm</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData({...newItemData, name: e.target.value})}
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Game</label>
                <select
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newItemData.game}
                  onChange={(e) => setNewItemData({...newItemData, game: e.target.value})}
                >
                  <option value="">Chọn game</option>
                  {games.map(game => (
                    <option key={game.id} value={game.name}>{game.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Loại</label>
                <select
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newItemData.category}
                  onChange={(e) => setNewItemData({...newItemData, category: e.target.value})}
                >
                  <option value="">Chọn loại</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Giá (VND)</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newItemData.price}
                  onChange={(e) => setNewItemData({...newItemData, price: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Độ hiếm</label>
                <select
                  className="w-full p-2 border border-gray-700 focus:border-blue-500 rounded-lg bg-gray-800/90 shadow-inner transition-all duration-300"
                  value={newItemData.rarity}
                  onChange={(e) => setNewItemData({...newItemData, rarity: e.target.value})}
                >
                  <option value="Common">Phổ thông</option>
                  <option value="Uncommon">Không phổ biến</option>
                  <option value="Rare">Hiếm</option>
                  <option value="Epic">Cực hiếm</option>
                  <option value="Legendary">Huyền thoại</option>
                  <option value="Godly">Thần thánh</option>
                </select>
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
                onClick={handleAddItem}
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

export default AdminGameItems;
