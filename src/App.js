import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DasborPage from "./pages/DasborPage";
import Register from "./component/Register";
import PrediksiPage from "./pages/PrediksiPage";
import RiwayatPage from "./pages/RiwayatPage";
import ProtectedRoute from "./private/ProtectRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/daftar" element={<Register />} />
          <Route
            path="/dasbor"
            element={
              <ProtectedRoute>
                <DasborPage />
              </ProtectedRoute>
            }
          />
          <Route path="/prediksi" element={<PrediksiPage />} />
          <Route path="/riwayat" element={<RiwayatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
