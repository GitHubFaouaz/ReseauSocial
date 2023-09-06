import { createContext, useContext, useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';

// export const UserContext = createContext();
 const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // Initialisation avec null ou les données par défaut de votre choix

  // Mettez à jour 'user' en utilisant useSelector ici, par exemple :
  //  const userStore = useSelector((state) => state.authReducer.authData);
  //  setUser(userStore)

  const userStore = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    setUser(userStore);
  }, [userStore]); // Le tableau de dépendances est vide, ce qui signifie que cet effet s'exécute une seule fois

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}