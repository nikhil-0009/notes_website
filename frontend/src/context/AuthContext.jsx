import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)

    useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to parse user:", err);
      localStorage.removeItem("user");
    }
  }
}, []);


    //login func

    const login=(userData,token)=>{
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token",token)
        setUser(userData)

    }

    //logout

    const logout=()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}



