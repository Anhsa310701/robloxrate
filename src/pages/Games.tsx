
import { Link } from "react-router-dom";
import { ArrowRight, Database, Gamepad, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Game {
  id: string;
  name: string;
}

const Games = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGames = async () => {
    // TODO: Fetch data here
        
        setGames(formattedGames);
        console.log("Games fetched:", formattedGames);
      } catch (error) {
        console.error("Error fetching games:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách game. Vui lòng thử lại sau.",
          variant: "destructive",
        });
        
        const savedGames = localStorage.getItem('gamesList');
        if (savedGames) {
          setGames(JSON.parse(savedGames));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);
  
  const filteredGames = searchQuery.trim() === "" 
    ? games 
    : games.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">Chọn Game</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Chọn game mà bạn đang muốn định giá tài khoản. Hệ thống của chúng tôi hỗ trợ nhiều game phổ biến.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm game..."
              className="w-full py-3 px-4 pl-12 bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-lg focus:outline-none transition-all duration-300 shadow-lg shadow-blue-500/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Game Grid */}
        <div className="glass-card p-8">
          <div className="flex items-center mb-6">
            <Database className="mr-2 text-blue-400" size={20} />
            <h2 className="text-2xl font-bold">Danh sách Game ({filteredGames.length})</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    id={game.id} 
                    name={game.name} 
                  />
                ))}
              </div>
              
              {filteredGames.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  Không tìm thấy game nào phù hợp với tìm kiếm của bạn.
                </div>
              )}
            </>
          )}
          
          <div className="mt-8 text-center">
            <Link 
              to="/value" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Định giá Acc <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Game Card Component
const GameCard = ({ id, name }: { id: string; name: string }) => {
  return (
    <div className="game-card bg-game-card hover:bg-game-darker transition-all duration-300 border border-gray-700 hover:border-blue-500 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/10 transform hover:translate-y-[-5px]">
      <Link to={`/games/${id}`} className="block p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/30 rounded-full flex items-center justify-center shadow-inner shadow-blue-500/20">
          <Gamepad size={32} className="text-blue-400" />
        </div>
        <h3 className="text-center text-white font-medium">{name}</h3>
      </Link>
    </div>
  );
};

export default Games;
