import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Create from "./pages/Create";
import Login from "./pages/Login";
import ShowOne from "./pages/ShowOne";
import Home from "./pages/Home";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <>
      {" "}
      {authIsReady && (
        <div className="stem">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/product/:id" element={<ShowOne />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
