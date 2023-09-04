import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/SignUp";
import Login from "./pages/Auth/SignIn";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import ToogleBg from "./component/ToogleBg/ToogleBg";
import Profile from "./pages/Profil/ProfileUser";
import { UserContext } from "./component/utils/AppContext/AppContext";
import { useContext } from "react";
import { UserContextProvider} from "./component/utils/AppContext/AppContext";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

//   const ThemeProvider = ({children})=> {
//   const {user}  = useSelector((state) => state.authReducer.authData);
//   const value = user._id;
//   return (
//     <UserContext.Provider value={value}> {children}</UserContext.Provider>
//     )
   
// } 
// const context = useContext(UserContext)
// console.log('context' ,context)
  
  return (
    <div className="App">
     <UserContextProvider>
      {/* <ThemeProvider> */}
      <ToogleBg />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="login" />} // s'il ya un user alors envoi le a la page home sinon a la page auth
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />} //sur la page home s'il ya un user envoi le a la page Home sinon a la page Auth
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/login" /> : <Auth />} // si tu es a la page auth quil ya un utilisateur alors envoi a la page homme sinon page auth
        />
        {/* <Route path="/Auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to={"../auth"} />}
        />
        {/* pour profile Card  <Link to={`/profile/${user._id}`}></Link> */}
        {/* <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Il n'y a rien ici!</p>
            </main>
          }
        /> */}
      </Routes>
      {/* </ThemeProvider> */}
      </UserContextProvider>
    </div>
  );
}

export default App;
