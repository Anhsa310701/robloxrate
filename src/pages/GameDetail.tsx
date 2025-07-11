
import { ArrowLeft, Check, Database, Star } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface GameItem {
  id: string;
  name: string;
  value: string;
  category: string;
  icon?: string;
  numericValue?: number;
}

interface Game {
  id: string;
  name: string;
  description: string;
  items: GameItem[];
}

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  
  console.log("GameDetail - Game ID:", id);
  
  useEffect(() => {
    const fetchGameData = async () => {
      if (!id) return;
      
      setLoading(true);
    // TODO: Fetch data here
        
        console.log("Game data fetched:", gameData);
        
        // Fetch game items
          
        if (itemsError) {
          console.error("Error fetching items:", itemsError);
          throw itemsError;
        }
        
        console.log("Game items fetched:", itemsData);
        
        // Transform items to match the expected format
        const transformedItems: GameItem[] = itemsData.map(item => ({
          id: item.id,
          name: item.name,
          value: item.rarity === "Legendary" || item.rarity === "Godly" ? "High" :
                 item.rarity === "Epic" || item.rarity === "Rare" ? "Medium" : "Low",
          category: item.category,
          icon: getIconForCategory(item.category),
          numericValue: item.price
        }));
        
        setGame({
          id: gameData.id,
          name: gameData.name,
          description: "Game mô phỏng cuộc sống với nhiều vật phẩm độc đáo và thú cưng. Người chơi có thể tùy chỉnh nhân vật, xây dựng và trang trí nhà, và tương tác với người chơi khác.",
          items: transformedItems
        });
        
        console.log("Final game state:", {
          name: gameData.name,
          itemsCount: transformedItems.length
        });
        
      } catch (error) {
        console.error("Error fetching game data:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu game. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameData();
  }, [id]);
  
  const getIconForCategory = (category: string) => {
    if (category === "Pet" || category === "Thú cưng") return "🐱";
    if (category === "Vehicle" || category === "Phương tiện") return "🚗";
    if (category === "Property" || category === "Bất động sản") return "🏠";
    if (category === "Weapon" || category === "Vũ khí") return "⚔️";
    if (category === "Accessory" || category === "Phụ kiện") return "👑";
    if (category === "Pass" || category === "Game Pass") return "🎫";
    return "🎮";
  };
  
  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  
  const handleContinue = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Chưa chọn vật phẩm",
        description: "Vui lòng chọn ít nhất một vật phẩm để tiếp tục",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Navigating to value result with:", {
      gameId: id,
      selectedItems: selectedItems
    });
    
    // Navigate to value result page with proper URL encoding
    const itemsParam = selectedItems.join(',');
    navigate(`/value?gameId=${encodeURIComponent(id || '')}&items=${encodeURIComponent(itemsParam)}`);
  };
  
  if (loading) {
    return (
      <div className="py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!game) {
    return (
      <div className="py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-400">Không tìm thấy game này.</p>
            <Link 
              to="/games" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-500 mt-4"
            >
              <ArrowLeft size={18} /> Quay lại danh sách game
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link 
          to="/games" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-500 mb-6"
        >
          <ArrowLeft size={18} /> Quay lại danh sách game
        </Link>
        
        {/* Game Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center">
              <Star size={40} className="text-blue-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
              <p className="text-gray-300">{game.description}</p>
            </div>
          </div>
        </div>
        
        {/* Item Selection */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center mb-6">
            <Database className="mr-2 text-blue-400" size={20} />
            <h2 className="text-2xl font-bold">Chọn các vật phẩm bạn sở hữu</h2>
          </div>
          
          {game.items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {game.items.map(item => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? "bg-blue-600/20 border border-blue-500"
                      : "bg-game-card border border-gray-700 hover:border-blue-500/50"
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedItems.includes(item.id)
                        ? "bg-blue-600"
                        : "bg-gray-700"
                    }`}>
                      {selectedItems.includes(item.id) && <Check size={14} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium flex items-center gap-2">
                        {item.icon && <span>{item.icon}</span>}
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-400">Giá trị: {item.value}</p>
                      {item.numericValue && (
                        <p className="text-xs text-cyan-400">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(item.numericValue).replace(/\s/g, '')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Chưa có vật phẩm nào cho game này.
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedItems.length === 0}
          >
            Tiếp tục {selectedItems.length > 0 && `(${selectedItems.length} vật phẩm)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
