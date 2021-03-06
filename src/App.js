import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './App.css';
import { useAuth0 } from './context/auth0-context';
import PrivateRoute from './components/PrivateRoute';

// Auth0 help -- 
// minktalk-port.us.auth0.com
// LItKCjIm1Zg27OJtntejSKz6gZbhz2dJ

export default function App() {
  const auth0 = useAuth0();

  return (
    <Router>
      <div className="app">
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/" exact={true}>
            <Home />
            {console.log(auth0)}
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
