import './style.css'
import React, {useState} from 'react'

function LoginPage(){
    const [user, setUser] = useState({username:"",password:"", errorMessage: ""});
    let state = false;

      
    const handleUsernameChange = e =>{
      e.preventDefault()
      setUser({...user, username: e.target.value});
    };
  
    const handlePasswordChange = e =>{
      e.preventDefault()
      setUser({...user, password: e.target.value});
    };
  

    function handleSubmitForm(e){
        e.preventDefault();
        fetch(`https://635d318dfc2595be26551a65.mockapi.io/api/v1/users?username=${user.username}`,
        {method: 'GET'}).then((response) => response.json()).then((users) => {
          let userFound = users.find((newUser) =>
          newUser.username === user.username
          )
          console.log(userFound);
          let message = ''
          if (userFound != null) {
            if (user.username === userFound.username && user.password === userFound.password){
              localStorage.setItem("userId", JSON.stringify(userFound.id));
              state = true;
            } else {
              message = "Sai username hoac password"
            }
          } else {
            message = "Sai username hoac password"
          }
          setUser({
            ...user,
            password: "",
            errorMessage: message,
          })
        });
    }
  
    return(
      <div className="form">
        <h1>Login Page</h1>
        <form>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={handleUsernameChange} className="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handlePasswordChange} className="password"/>
          </div>
          <div>
            <input type="submit" className="button" onClick={handleSubmitForm}/>
          </div>
        </form>
        <div>{state === true ? <></> : user.errorMessage}</div>
      </div> 
    )
}

export default LoginPage;
