import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import createAuth0Client from '@auth0/auth0-spa-js';
import './App.css';

// Auth0 help -- 
// minktalk-port.us.auth0.com
// LItKCjIm1Zg27OJtntejSKz6gZbhz2dJ

export default function App() {
  const [user, setUser] = useState(null);

  // utilize UseEffect because we need to check ONCE on re-render
  useEffect(() => {
    initAuth();

    async function initAuth() {
      const auth0 = await createAuth0Client({
        domain: 'minktalk-port.us.auth0.com',
        client_id: 'LItKCjIm1Zg27OJtntejSKz6gZbhz2dJ'
      });

      const isAuthenticated = await auth0.isAuthenticated();
      console.log(isAuthenticated);

      const user = await auth0.getUser();
      console.log(user);
    }
  }, [])

  return (
    <Router>
      <div className="app">
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
