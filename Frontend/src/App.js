import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecommendationPage from "./pages/RecommendationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* OJO!!! NO SE COMO HACER QUE LA RUTA INICIAL SEA /api/recommendations */}
        <Route index path="/api/recommendations" element={<HomePage />} />
        <Route path="/api/auth" element={<LoginPage />} />
        <Route path="/api/accounts" element={<RegisterPage />} />
        <Route
          path="/api/recommendations/:id"
          element={<RecommendationPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
