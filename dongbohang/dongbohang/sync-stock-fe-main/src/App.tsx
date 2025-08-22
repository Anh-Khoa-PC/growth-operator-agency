import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";

// Import các component/trang với đường dẫn chính xác
import SyncStockPage from './app/sync-stock/SyncStock';
import EtsyAccountForm from './app/account-config/components/EtsyForm';
import EtsyCallbackPage from './app/account-config/EtsyCallback';
import ShipXanhAccountForm from './app/account-config/components/ShipXanhForm';

function App() {
  return (
    <>
      <main className="p-4">
        <Routes>
          {/* Khi người dùng vào trang chủ, hiển thị trang đồng bộ */}
          <Route path="/" element={<SyncStockPage />} />
          
          {/* Trang cài đặt chung */}
          <Route path="/account-configs" element={
            <div className="p-6 max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Cài đặt kết nối</h1>
              <div className="grid gap-8">
                <EtsyAccountForm />
                <ShipXanhAccountForm />
              </div>
            </div>
          } />
          
          {/* Trang callback mà Etsy sẽ chuyển hướng về */}
          <Route path="/account-configs/callback" element={<EtsyCallbackPage />} />

        </Routes>
      </main>
      
      {/* Component này để hiển thị các thông báo toast */}
      <Toaster />
    </>
  )
}

export default App;