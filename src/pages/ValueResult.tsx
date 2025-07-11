import { Download, Share2, Star, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
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

const ValueResult = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get('gameId');
  const selectedItems = searchParams.get('items')?.split(',').filter(item => item.trim() !== '') || [];
  
  console.log("ValueResult - URL params:", { gameId, selectedItems });
  
  const [account, setAccount] = useState({
    game: "Đang tải...",
    gameIcon: <Star size={32} className="text-blue-400" />,
    overallValue: "0 VNĐ",
    items: [],
  });

  const [settings, setSettings] = useState({
    paypal_qr_code: "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png",
    donate_enabled: "true"
  });
  
  // Format number to VND
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0 
    }).format(value).replace(/\s/g, '');
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
  
  // Generate fallback value based on rarity
  const generateFallbackValue = (rarity: string) => {
    if (rarity === "Legendary" || rarity === "Godly") {
      return Math.floor(Math.random() * 9000000) + 7000000; // 7M - 16M
    }
    if (rarity === "Epic" || rarity === "Rare") {
      return Math.floor(Math.random() * 4000000) + 3000000; // 3M - 7M
    }
    return Math.floor(Math.random() * 2000000) + 500000; // 500K - 2.5M
  };

  const loadSettings = async () => {
    // TODO: Fetch data here
      
      console.log('Settings data loaded:', data);
      
      if (data && data.length > 0) {
        const settingsObj = data.reduce((acc, item) => {
          acc[item.setting_key] = item.setting_value;
          return acc;
        }, {} as any);
        
        console.log('Processed settings:', settingsObj);
        
        setSettings({
          paypal_qr_code: settingsObj.paypal_qr_code || "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png",
          donate_enabled: settingsObj.donate_enabled || "true"
        });
      } else {
        // Use the new image as default
        setSettings({
          paypal_qr_code: "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png",
          donate_enabled: "true"
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Use the new image as fallback
      setSettings({
        paypal_qr_code: "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png",
        donate_enabled: "true"
      });
    }
  };
  
  useEffect(() => {
    loadSettings();
    
    const fetchValueData = async () => {
      setLoading(true);
      
      // Check if we have the required parameters
      if (!gameId || selectedItems.length === 0) {
        console.log("Missing parameters:", { gameId, selectedItemsLength: selectedItems.length });
        toast({
          title: "Lỗi",
          description: "Thiếu thông tin game hoặc vật phẩm đã chọn. Vui lòng quay lại và chọn lại.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
    // TODO: Fetch data here
        
        console.log("Game data fetched:", gameData);
        
        // Fetch selected game items
          
        if (itemsError) {
          console.error("Error fetching items:", itemsError);
          throw itemsError;
        }
        
        console.log("Items data fetched:", itemsData);
        
        if (!itemsData || itemsData.length === 0) {
          console.log("No items found for the selected IDs");
          toast({
            title: "Cảnh báo",
            description: "Không tìm thấy vật phẩm được chọn. Có thể dữ liệu đã thay đổi.",
            variant: "destructive",
          });
          setAccount({
            game: gameData.name,
            gameIcon: <Star size={32} className="text-blue-400" />,
            overallValue: "0 VNĐ",
            items: [],
          });
          setLoading(false);
          return;
        }
        
        // Transform items to match the expected format
        const transformedItems = itemsData.map(item => {
          let valueAmount = item.price || 0;
          
          // If no price is set, generate a fallback value based on rarity
          if (!valueAmount) {
            valueAmount = generateFallbackValue(item.rarity);
          }
          
          const rarity = item.rarity === "Legendary" || item.rarity === "Godly" ? "High" :
                        item.rarity === "Epic" || item.rarity === "Rare" ? "Medium" : "Low";
          
          return {
            name: item.name,
            rarity: rarity,
            value: formatVND(valueAmount),
            icon: getIconForCategory(item.category),
            numericValue: valueAmount
          };
        });
        
        // Calculate overall value
        const totalValue = transformedItems.reduce((sum: number, item: any) => {
          return sum + item.numericValue;
        }, 0);
        
        // Update account state
        setAccount({
          game: gameData.name,
          gameIcon: <Star size={32} className="text-blue-400" />,
          overallValue: formatVND(totalValue),
          items: transformedItems,
        });
        
        console.log("Value result updated:", {
          game: gameData.name,
          totalValue: formatVND(totalValue),
          itemsCount: transformedItems.length
        });
        
      } catch (error) {
        console.error("Error fetching value data:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu định giá. Vui lòng thử lại sau.",
          variant: "destructive",
        });
        
        // Set a fallback state instead of leaving it empty
        setAccount({
          game: "Không xác định",
          gameIcon: <Star size={32} className="text-blue-400" />,
          overallValue: "0 VNĐ",
          items: [],
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchValueData();
  }, [gameId, selectedItems.join(',')]);
  
  const handleDownloadPDF = () => {
    setLoading(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Tải xuống hoàn tất",
        description: "Báo cáo định giá đã được tải xuống.",
        variant: "default",
      });
    }, 2000);
  };
  
  const handleShare = () => {
    // Copy share link to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Đã sao chép liên kết",
      description: "Liên kết định giá đã được sao chép vào clipboard.",
      variant: "default",
    });
  };
  
  if (loading) {
    return (
      <div className="py-12 animate-fade-in bg-gradient-to-b from-game-darkblue to-game-darkest min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-4 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10">
              Đang tính toán
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Kết quả định giá tài khoản
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Đây là kết quả định giá dựa trên thông tin mà bạn đã cung cấp về {account.game}
            </p>
            
            <div className="glass-card p-8 backdrop-blur-md bg-gray-900/40 border border-gray-700 rounded-lg shadow-2xl shadow-blue-500/10">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-900/30 border border-blue-500/50 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/10">
                  {account.gameIcon}
                </div>
                <h2 className="text-xl font-medium mb-4 text-gray-200">Đang tải...</h2>
                <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 animate-fade-in bg-gradient-to-b from-game-darkblue to-game-darkest min-h-screen">
      <div className="container mx-auto px-4">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 rounded-full bg-green-600/20 text-green-400 text-sm font-medium mb-4 border border-green-500/30 backdrop-blur-sm shadow-lg shadow-green-500/10">
            Định giá hoàn tất
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Kết quả định giá tài khoản
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Đây là kết quả định giá dựa trên thông tin mà bạn đã cung cấp về {account.game}
          </p>
        </div>
        
        {/* Result Overview */}
        <div className="glass-card p-8 mb-8 text-center backdrop-blur-md bg-gray-900/40 border border-gray-700 rounded-lg shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-900/30 border border-blue-500/50 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/10">
              {account.gameIcon}
            </div>
            <h2 className="text-xl font-medium mb-1 text-gray-200">{account.game}</h2>
            <div className="text-4xl md:text-6xl font-bold mt-4 mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
              {account.overallValue}
            </div>
            <p className="text-gray-300">Giá trị ước tính</p>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleDownloadPDF}
                disabled={loading}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg ${
                  loading
                    ? "bg-blue-700/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/20"
                } transition-all duration-300`}
              >
                <Download size={18} />
                <span>{loading ? "Đang tải..." : "Tải báo cáo"}</span>
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500/10 text-blue-400 flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/5"
              >
                <Share2 size={18} />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Results - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 backdrop-blur-md bg-gray-900/40 border border-gray-700 rounded-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Chi tiết vật phẩm</h2>
              
              {account.items.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border border-dashed border-gray-700 rounded-lg">
                  <p className="mb-4">Không có vật phẩm nào được chọn hoặc không tìm thấy dữ liệu.</p>
                  <Link 
                    to="/games" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                  >
                    Quay lại chọn game
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {account.items.map((item: any, index: number) => (
                    <div 
                      key={index}
                      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-purple-500/30 rounded-lg p-4 flex items-center transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mr-4 text-xl shadow-md shadow-purple-500/10">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-200">{item.name}</h3>
                            <div className="text-sm mt-1">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                item.rarity === "High"
                                  ? "bg-purple-900/30 text-purple-400 border border-purple-500/50"
                                  : item.rarity === "Medium"
                                  ? "bg-blue-900/30 text-blue-400 border border-blue-500/50"
                                  : "bg-green-900/30 text-green-400 border border-green-500/50"
                              }`}>
                                {item.rarity === "High" ? "Cực hiếm" : item.rarity === "Medium" ? "Hiếm" : "Thường"}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-cyan-400">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Donate Section - 1/3 width */}
          {settings.donate_enabled === 'true' && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700 p-6 rounded-lg shadow-xl shadow-blue-500/5">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 justify-center text-center">
                    <Heart className="text-red-400" size={24} />
                    Ủng hộ dự án
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm text-center">
                    Nếu bạn thấy dự án hữu ích, hãy ủng hộ chúng tôi qua PayPal để chúng tôi tiếp tục phát triển và cải thiện dịch vụ.
                  </p>
                  <div className="flex flex-col items-center">
                    <img 
                      src={settings.paypal_qr_code}
                      alt="PayPal QR Code - Ủng hộ dự án"
                      className="w-48 h-48 object-contain bg-white p-2 rounded-lg shadow-lg"
                      onError={(e) => {
                        console.error('Error loading QR code image:', settings.paypal_qr_code);
                        e.currentTarget.src = "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png";
                      }}
                      onLoad={() => console.log('QR code image loaded successfully:', settings.paypal_qr_code)}
                    />
                    <p className="text-sm text-gray-400 mt-3 text-center">Quét mã QR để ủng hộ</p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-xs text-gray-400 text-center">
                      Mọi đóng góp của bạn đều giúp chúng tôi duy trì và phát triển dịch vụ tốt hơn. Chân thành cảm ơn!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/games" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium shadow-lg shadow-purple-500/20 transition-all duration-300"
            >
              Định giá game khác
            </Link>
            <Link 
              to="/" 
              className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-lg text-blue-400 font-medium transition-all duration-300"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueResult;
