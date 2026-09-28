// All the page addresses of the website - Owner: AMANDA
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

// Every page sits between the menu bar and the footer, so we write those
// two once here instead of repeating them inside every page
function App() {
  return (
    <div className="page-wrapper">
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* The colon means anything can go there. Opening /painting/5
              gives the page an id of 5. */}
          <Route path="/painting/:id" element={<PaintingDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/analytics" element={<Analytics />} />

          {/* These three pages only make sense for someone who is logged in,
              so ProtectedRoute goes around them. It checks the login first
              and sends a visitor to /login when there is nobody signed in. */}
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

          {/* The star matches any address we have not listed above, so a
              wrong link shows our own not found page instead of a blank
              screen. It must stay last. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
