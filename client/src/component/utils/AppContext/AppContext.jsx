import { createContext, useContext, useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';


 const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // Initialisation avec null ou les données par défaut de votre choix

  const userStore = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    setUser(userStore);
    // console.log('userContext' , user);
  }, [userStore,user]); // Le tableau de dépendances est vide, ce qui signifie que cet effet s'exécute une seule fois
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}