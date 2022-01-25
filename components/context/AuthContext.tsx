import React, { useState, useCallback, useEffect, createContext } from 'react';

type User = {
  user_fullname: String,
  user_id: String
}

type AuthContextValue = {
  login?: (mobile: string, password: string) => Promise<any>,
  logout?: () => Promise<any>,
  user: User | null,
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: false });

const AuthContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = (mobile: string, password: string) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      fetch("https://graph-api-test.webby.asia/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation Login($input: loginInput) {
              login(input: $input) {
                token
                user {
                  user_fullname
                  user_id
                }
              }
            }
          `,
          variables: {
            input: {
              user_mobile: mobile,
              password: password
            }
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          setLoading(false);
          if (res.data) {
            setUser(res.data.login.user)
            localStorage.setItem("webby-blog-token", res.data.login.token);
            resolve({ message: "Success" });
          } else {
            reject({ errors: res.errors });
          }
        })
    });
  }

  const logout = () => {
    return new Promise((resolve, reject) => {
      fetch("https://graph-api-test.webby.asia/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("webby-blog-token")}`
        },
        body: JSON.stringify({
          query: `
            mutation{
              logout {
                 status 
                 message
              }
            }
          `,
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.data) {
            setUser(null)
            localStorage.removeItem("webby-blog-token");
            resolve(res.data.logout);
          } else {
            reject({ message: "Failure" });
          }
        })
    });
  }

  return (
    <AuthContext.Provider value = {{ login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }