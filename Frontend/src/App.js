import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import RecommendationPage from "./pages/RecommendationPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./pages/Navigation";
import CreateRecommendationPage from "./pages/CreateRecommendationPage";
import MoreLikesPage from "./pages/MoreLikesPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserPage from "./pages/UserPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Formulario } from "./components/Formulario";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route element={<Navigation />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/newRecommendation"
            element={<CreateRecommendationPage></CreateRecommendationPage>}
          />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/moreLikes" element={<MoreLikesPage></MoreLikesPage>} />
          <Route path="/aboutUs" element={<AboutUsPage></AboutUsPage>} />

          <Route path="/recommendations/:id" element={<RecommendationPage />} />
          <Route path="/register" element={<Formulario></Formulario>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
