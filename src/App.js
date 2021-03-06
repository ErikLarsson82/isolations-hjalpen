import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import cookie from 'js-cookie';

import SplashScreen from './SplashScreen';

import CreateuserNeeder from './CreateuserNeeder';
import EnterMessage from './EnterMessage';
import SearchMatch from './SearchMatch';

import CreateuserHelper from './CreateuserHelper';
import Dashboard from './Dashboard';

const Component404 = () => <div>404</div>

function App(props) {
  return (
    <Router>
      <div className="App">
        <Link to='/'>
          <img src='/images/grannleveransen-logo.png' className="App-logo" alt="logo" />
        </Link>
        <content className="App-content">
        <h1 className="headerCenter">Grannleveransen</h1>
        <script data-ad-client="ca-pub-9612046672815263" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <Switch>
            <Route path="/" exact component={SplashScreen} />

            <Route path="/needer/createuser" exact component={CreateuserNeeder} />
            <Route path="/needer/entermessage" exact component={EnterMessage} />
            <Route path="/needer/searchmatch" exact component={SearchMatch} />

            <Route path="/helper/createuser" exact component={CreateuserHelper} />
            <Route path="/helper/dashboard" exact component={Dashboard} />

            <Route path="/" component={Component404} />
          </Switch>
        </content>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
