'use client'

import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import errorToastComponent from "../components/Toast/error-toast";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: null,
    avatar: null
  })

  const errorToast = ({ customMessage }) => errorToastComponent(customMessage)

  const { push } = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'p2u-token': token } = parseCookies()

    if (token != null) {
      setUser({
        avatar: 'https://github.com/bonatoneto.png'
      })
    }
  }, [])

  async function signIn(email, password) {
    await api.post('/login', email, password)
      .then(response => {
        const resp = response.data
        if (resp.success) {
          const token = resp.data.token
          setUser({
            name: resp.data.name,
            avatar: 'https://github.com/bonatoneto.png'
          })
          console.log(user);
          setCookie(undefined, 'p2u-token', token, {
            maxAge: 60 * 60 * 1, // 1 Hour
            path: '/'
          })
          api.defaults.headers['Authorization'] = `Bearer ${token}`
          push('/dashboard')
        } else {
          errorToast({ customMessage: "E-mail ou senha incorreto(s)." })
        }
      })
      .catch(error => {
        errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde" })
      })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}