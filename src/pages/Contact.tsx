
import { Facebook, Mail, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const Contact = () => {
  const [settings, setSettings] = useState({
    facebook_url: "facebook.com/dinhgiaccroblox",
    discord_url: "discord.gg/dinhgiaccroblox", 
    contact_email: "support@dinhgiaccroblox.com",
    support_hours: "Thứ Hai - Thứ Sáu: 9:00 - 18:00\nThứ Bảy - Chủ Nhật: 10:00 - 16:00"
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    // TODO: Fetch data here
      
      console.log('Contact settings data:', data);
      
      if (data && data.length > 0) {
        const settingsObj = data.reduce((acc, item) => {
          acc[item.setting_key] = item.setting_value;
          return acc;
        }, {} as any);
        
        setSettings({ 
          facebook_url: settingsObj.facebook_url || "facebook.com/dinhgiaccroblox",
          discord_url: settingsObj.discord_url || "discord.gg/dinhgiaccroblox",
          contact_email: settingsObj.contact_email || "support@dinhgiaccroblox.com",
          support_hours: settingsObj.support_hours || "Thứ Hai - Thứ Sáu: 9:00 - 18:00\nThứ Bảy - Chủ Nhật: 10:00 - 16:00"
        });
      }
    } catch (error) {
      console.error('Error loading contact settings:', error);
    }
  };

  return (
    <div className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-4">
            Liên hệ
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
            Kết nối với chúng tôi
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hãy liên hệ với chúng tôi qua các kênh dưới đây để được hỗ trợ nhanh nhất.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-8 text-blue-400 text-center">Thông tin liên hệ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Facebook</h3>
                    <p className="text-gray-300">{settings.facebook_url}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 flex-shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Discord</h3>
                    <p className="text-gray-300">{settings.discord_url}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center text-green-400 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-300">{settings.contact_email}</p>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="flex flex-col justify-center">
                <div className="p-6 bg-game-darker rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Giờ hỗ trợ</h3>
                  <div className="space-y-2 text-gray-300">
                    {settings.support_hours.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
