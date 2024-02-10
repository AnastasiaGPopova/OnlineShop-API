import logo from './logo.svg';
import './App.css';
import {useAuth0} from '@auth0/auth0-react'

function App() {

  const {loginWithPopup, loginWithRedirect,logout, user, isAuthenticated} = useAuth0()


  return (
    <div className="App">
      <h1>Auth0 Authentication</h1>
      <ul>
        <li><button onClick={loginWithPopup}>Login with Popup</button></li>
        <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
        <li><button> onClick={logout}Logout</button></li>
      </ul>
    </div>
  );
}

export default App;
