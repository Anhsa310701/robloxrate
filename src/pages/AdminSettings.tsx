import { useState, useEffect } from "react";
import { Save, Settings as SettingsIcon, Globe, Mail, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    facebookUrl: "",
    discordUrl: "",
    supportHours: "",
    paypalQrCode: "",
    donateEnabled: false,
    maintenanceMode: false
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setInitialLoading(true);
    // TODO: Fetch data here

      console.log('Raw settings data:', data);

      if (data && data.length > 0) {
        const settingsObj = data.reduce((acc, item) => {
          acc[item.setting_key] = item.setting_value;
          return acc;
        }, {} as any);

        console.log('Processed settings:', settingsObj);

        setSettings({
          siteName: settingsObj.site_name || "GameValue",
          siteDescription: settingsObj.site_description || "Định giá tài khoản game chính xác",
          contactEmail: settingsObj.contact_email || "support@dinhgiaccroblox.com",
          facebookUrl: settingsObj.facebook_url || "facebook.com/dinhgiaccroblox",
          discordUrl: settingsObj.discord_url || "discord.gg/dinhgiaccroblox",
          supportHours: settingsObj.support_hours || "Thứ Hai - Thứ Sáu: 9:00 - 18:00\nThứ Bảy - Chủ Nhật: 10:00 - 16:00",
          paypalQrCode: settingsObj.paypal_qr_code || "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png",
          donateEnabled: settingsObj.donate_enabled === 'true',
          maintenanceMode: settingsObj.maintenance_mode === 'true'
        });
      } else {
        console.log('No settings found, using defaults and creating them...');
        const defaultSettings = {
          siteName: "GameValue",
          siteDescription: "Định giá tài khoản game chính xác",
          contactEmail: "support@dinhgiaccroblox.com",
          facebookUrl: "facebook.com/dinhgiaccroblox",
          discordUrl: "discord.gg/dinhgiaccroblox",
          supportHours: "Thứ Hai - Thứ Sáu: 9:00 - 18:00\nThứ Bảy - Chủ Nhật: 10:00 - 16:00",
          paypalQrCode: "/lovable-uploads/3f5a2b0e-133c-4a25-815b-0a1f9789f691.png",
          donateEnabled: true,
          maintenanceMode: false
        };
        
        setSettings(defaultSettings);
        // Auto-save default settings
        await saveDefaultSettings(defaultSettings);
      }
      
      setHasChanges(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Lỗi tải cài đặt",
        description: "Không thể tải cài đặt từ cơ sở dữ liệu",
        variant: "destructive",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const saveDefaultSettings = async (defaultSettings: typeof settings) => {
    // TODO: Fetch data here
        { setting_key: 'site_description', setting_value: defaultSettings.siteDescription },
        { setting_key: 'contact_email', setting_value: defaultSettings.contactEmail },
        { setting_key: 'facebook_url', setting_value: defaultSettings.facebookUrl },
        { setting_key: 'discord_url', setting_value: defaultSettings.discordUrl },
        { setting_key: 'support_hours', setting_value: defaultSettings.supportHours },
        { setting_key: 'paypal_qr_code', setting_value: defaultSettings.paypalQrCode },
        { setting_key: 'donate_enabled', setting_value: defaultSettings.donateEnabled.toString() },
        { setting_key: 'maintenance_mode', setting_value: defaultSettings.maintenanceMode.toString() }
      ];

      for (const setting of settingsToInsert) {
          .insert(setting);
        
        if (error) {
          console.error('Error inserting default setting:', setting, error);
        }
      }
      
      console.log('Default settings created successfully');
    } catch (error) {
      console.error('Error creating default settings:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges) {
      toast({
        title: "Không có thay đổi",
        description: "Không có cài đặt nào được thay đổi để lưu",
        variant: "default",
      });
      return;
    }

    setLoading(true);
    
    // TODO: Fetch data here
        { setting_key: 'site_description', setting_value: settings.siteDescription },
        { setting_key: 'contact_email', setting_value: settings.contactEmail },
        { setting_key: 'facebook_url', setting_value: settings.facebookUrl },
        { setting_key: 'discord_url', setting_value: settings.discordUrl },
        { setting_key: 'support_hours', setting_value: settings.supportHours },
        { setting_key: 'paypal_qr_code', setting_value: settings.paypalQrCode },
        { setting_key: 'donate_enabled', setting_value: settings.donateEnabled.toString() },
        { setting_key: 'maintenance_mode', setting_value: settings.maintenanceMode.toString() }
      ];

      // Delete existing settings first to avoid conflicts
        .delete()

      // Insert updated settings
        .insert(settingsToUpdate.map(setting => ({
          setting_key: setting.setting_key,
          setting_value: setting.setting_value,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })));

      if (insertError) {
        console.error('Error inserting settings:', insertError);
        throw insertError;
      }

      console.log('Settings saved successfully');
      setHasChanges(false);

      toast({
        title: "Lưu thành công",
        description: "Tất cả cài đặt đã được lưu và áp dụng",
        variant: "default",
      });

      // Reload to confirm everything was saved
      setTimeout(() => {
        loadSettings();
      }, 500);

    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Lỗi lưu cài đặt",
        description: "Không thể lưu cài đặt. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="animate-fade-in p-6">
        <div className="flex items-center gap-2 text-blue-400">
          <div className="w-4 h-4 border-2 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
          Đang tải cài đặt hệ thống...
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
          <p className="text-gray-400 text-sm mt-1">Quản lý các cài đặt chung của website</p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="flex items-center gap-2 text-orange-400 text-sm">
              <AlertCircle size={16} />
              Có thay đổi chưa lưu
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={loading || !hasChanges}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all ${
              loading || !hasChanges 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            <Save size={20} />
            {loading ? "Đang lưu..." : "Lưu cài đặt"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <SettingsIcon size={20} />
            Cài đặt chung
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên website</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="GameValue"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả website</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Định giá tài khoản game chính xác"
              />
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-game-darker rounded-lg">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium">
                Chế độ bảo trì
              </label>
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail size={20} />
            Thông tin liên hệ
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email hỗ trợ</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="support@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="facebook.com/yourpage"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Discord URL</label>
              <input
                type="text"
                value={settings.discordUrl}
                onChange={(e) => handleInputChange('discordUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="discord.gg/yourserver"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Giờ hỗ trợ</label>
              <textarea
                value={settings.supportHours}
                onChange={(e) => handleInputChange('supportHours', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Thứ Hai - Thứ Sáu: 9:00 - 18:00"
              />
            </div>
          </div>
        </div>

        {/* Donate Settings */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} />
            Cài đặt ủng hộ
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-game-darker rounded-lg">
              <input
                type="checkbox"
                id="donateEnabled"
                checked={settings.donateEnabled}
                onChange={(e) => handleInputChange('donateEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="donateEnabled" className="text-sm font-medium">
                Hiển thị mục ủng hộ
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">PayPal QR Code URL</label>
              <input
                type="text"
                value={settings.paypalQrCode}
                onChange={(e) => handleInputChange('paypalQrCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-game-darker focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/lovable-uploads/your-image.png"
              />
            </div>
            
            {settings.paypalQrCode && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Xem trước QR Code:</label>
                <div className="flex justify-center p-4 bg-gray-50 dark:bg-game-darker rounded-lg">
                  <img 
                    src={settings.paypalQrCode}
                    alt="PayPal QR Code Preview"
                    className="w-32 h-32 object-contain bg-white p-2 rounded border shadow-sm"
                    onError={(e) => {
                      console.error('Error loading QR code image:', settings.paypalQrCode);
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={() => console.log('QR code image loaded successfully:', settings.paypalQrCode)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white dark:bg-game-card rounded-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin hệ thống</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-2 bg-gray-50 dark:bg-game-darker rounded">
              <span className="text-gray-600 dark:text-gray-400">Phiên bản:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 dark:bg-game-darker rounded">
              <span className="text-gray-600 dark:text-gray-400">Cập nhật cuối:</span>
              <span className="font-medium">{new Date().toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 dark:bg-game-darker rounded">
              <span className="text-gray-600 dark:text-gray-400">Trạng thái:</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {settings.maintenanceMode ? "Bảo trì" : "Hoạt động"}
              </span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 dark:bg-game-darker rounded">
              <span className="text-gray-600 dark:text-gray-400">Ủng hộ:</span>
              <span className={`font-medium ${settings.donateEnabled ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {settings.donateEnabled ? "Bật" : "Tắt"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
