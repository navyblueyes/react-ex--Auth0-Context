import React, { useState,  createContext, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';


export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);


export function Auth0Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAuth();

    async function initAuth() {
      const auth0 = await createAuth0Client({ 
        domain: 'minktalk-port.us.auth0.com',
        client_id: 'LItKCjIm1Zg27OJtntejSKz6gZbhz2dJ',
        redirect_uri: window.location.origin,
      });
      setAuth0Client(auth0);

      // handle redirect when user comes back
      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        try {
          await auth0.handleRedirectCallback();
        } catch (err) {
          alert(err);
        }

        window.location.replace(window.location.pathname);
      }

      // await for auth check (boolean)
      const waitForAuth0 = await auth0.isAuthenticated();

      // apply status of auth to isAuth
      setIsAuthenticated(waitForAuth0);
      
      // apply user name
      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) return <div> loading... </div>

  return (
    <Auth0Context.Provider 
      value={{ 
        isAuthenticated,
        user,
        isLoading,
        login: (...p) => auth0Client.loginWithRedirect(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
        {children}
    </Auth0Context.Provider>
  );
}



// const [user, setUser] = useState(null);

// utilize UseEffect because we need to check ONCE on re-render
/* useEffect(() => {
  initAuth();


    
    });

    const isAuthenticated = await auth0.isAuthenticated();
    console.log(isAuthenticated);

    const user = await auth0.getUser();
    console.log(user);
  }
}, []) */