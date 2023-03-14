import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Top from "./pages/Top";
import Cart from "./pages/products/Cart";
import MembersInfoEdit from "./pages/users/MembersInfoEdit";
import Favorite from "./pages/products/Favorite";
import Histry from "./pages/products/Histry";
import ProductDetail from "./pages/products/ProductDetail";
import ProductRegistration from "./pages/products/ProductRegistration";
import PurchaseConfirmation from "./pages/products/PurchaseConfirmation";
import ErrPage from "./pages/404";
import Header from "./components/layout/Header";
import React, { createContext, useContext, useState } from "react";
import { Session, SessionContextType, SessionContextValue, Users } from "./types/type";



export const SessionContext = React.createContext<SessionContextType>({
  session: { isLoggedIn: false, user: null },
  setSession: () => {},
});



export const useSession = (): SessionContextValue => useContext(SessionContext);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //cookieが存在するかしないか(リダイレクトに使用)
  function checkCookieExists(cookieName: string) {
    const cookies = document.cookie.split(';'); // すべてのCookieを取得し、配列に変換する
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Cookieの前後にある余分なスペースを削除する
      if (cookie.startsWith(cookieName + '=')) {
        return setIsAuthenticated(true); // 名前が一致するCookieが見つかった場合にはtrueを返す
      }
    }
    return setIsAuthenticated(false); // 名前が一致するCookieが見つからなかった場合にはfalseを返す
  }

  return (
    <>
      <Router>
        <SessionContext.Provider value={{ session, setSession }}>
          <Header />
          <Routes>
            <Route path="/" element={<Top />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/membersinfoedit/:id"
              element={<MembersInfoEdit />}
            ></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
            <Route path="/histry" element={<Histry />}></Route>
            <Route path="productdetail/:id" element={<ProductDetail />}></Route>
            <Route
              path="/productregistration"
              element={<ProductRegistration />}
            ></Route>
            <Route
              path="/purchaseconfirmation/:id"
              element={<PurchaseConfirmation />}
            ></Route>
            <Route path="*" element={<ErrPage />}></Route>
          </Routes>
        </SessionContext.Provider>
      </Router>
    </>
  );
}

export default App;
