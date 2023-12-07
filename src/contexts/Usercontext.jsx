import { createContext, useState, useContext } from "react";

const UserContext = createContext()


// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null)

   const updateUser = (newUser) =>{
    setUser(newUser)
   };

   return (
    <UserContext.Provider value={{user, updateUser}}>
        {children}
    </UserContext.Provider>
   )
};


export const useUser = () =>{
    return useContext(UserContext)
} 


 