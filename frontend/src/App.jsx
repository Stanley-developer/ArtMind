// All the page addresses of the website - Owner: AMANDA

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import PaintingDetails from "./pages/PaintingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Chatbot from "./pages/Chatbot";
import Favourites from "./pages/Favourites";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AdminBuildAI from "./pages/AdminBuildAI";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="page-wrapper">
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/painting/:id" element={<PaintingDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/build-ai"
            element={
              <ProtectedRoute>
                <AdminBuildAI />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
