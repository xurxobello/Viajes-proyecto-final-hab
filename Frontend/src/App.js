import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecommendationPage from "./pages/RecommendationPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./pages/Navigation";
import CreateRecommendationPage from "./pages/CreateRecommendationPage";
import MoreLikesPage from "./pages/MoreLikesPage";
import CategoriesPage from "./pages/CategoriesPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* OJO!!! NO SE COMO HACER QUE LA RUTA INICIAL SEA /api/recommendations */}
        <Route element={<Navigation />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/newRecommendation"
            element={<CreateRecommendationPage></CreateRecommendationPage>}
          />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/moreLikes" element={<MoreLikesPage></MoreLikesPage>} />
          <Route
            path="/categories"
            element={<CategoriesPage></CategoriesPage>}
          />
          <Route path="/aboutUs" element={<AboutUsPage></AboutUsPage>} />

          <Route path="/recommendations/:id" element={<RecommendationPage />} />
          <Route path="/registro" element={<RegisterPage></RegisterPage>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
