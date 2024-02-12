import './App.css';
import {useAuth0} from '@auth0/auth0-react'
import axios from "axios"

function App() {

  const {loginWithPopup, loginWithRedirect,logout, 
         user, isAuthenticated, getAccessTokenSilently} = useAuth0()

  function callPublicAPIRoute(){
    axios.get('http://localhost:5050/public').then(response => console.log(response.data))
         .catch(error => console.log(error.message))
  }

  async function callProtectedAPIRoute(){
    // axios.get('http://localhost:5050/protected').then(response => console.log(response.data))
    //      .catch(error => console.log(error.message))

    try {
      const token = await getAccessTokenSilently()
      console.log(token)
  
      const response = await axios.get('http://localhost:5050/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      
    } catch (error) {
      console.log(error.message)
    }

  }


  return (
    <div className="App">
      <h1>Auth0 Authentication</h1>
      <ul>
        <li><button onClick={loginWithPopup}>Login with Popup</button></li>
        <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>

      <h5>User is {isAuthenticated ? "Logged in" : "Not logged in"} </h5>

      <ul>
        <li><button onClick={callPublicAPIRoute}>Call public API route</button></li>
        <li><button onClick={callProtectedAPIRoute}>Call protected API route</button></li>
      </ul>

       {isAuthenticated && (
        <pre style={{textAlign: "start"}}>{JSON.stringify(user,null,2)}</pre>
       )}
    </div>




  );
}

export default App;
