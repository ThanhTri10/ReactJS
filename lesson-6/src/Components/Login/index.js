import './style.css'
import {useState} from 'react'

function RegisterPage(){
    const [user, setUser] = useState({name:"", username:"",password:"",passwordConfirm:""});
    
    // const handleNameChange = e =>{
    //   e.preventDefault()
    //   setUser({...user, name: e.target.value});
    // };
      
    if (user.username == "username"){
        checkUsernamExist(user.username);
    }
    const handleUsernameChange = e =>{
      e.preventDefault()
      setUser({...user, username: e.target.value});
    };
  
    const handlePasswordChange = e =>{
      e.preventDefault()
      setUser({...user, password: e.target.value});
    };
    
    // const handleConfirmPasswordChange = e =>{
    //   e.preventDefault()
    //   setUser({...user, passwordConfirm: e.target.value});
    // }

    function checkUsernamExist(value){
        fetch(`https://635d318dfc2595be26551a65.mockapi.io/api/v1/users?username=${value}`,
        {method: 'GET'}).then((value) => {
            console.log(value);
        });
    }
  
    // const handleSubmitForm = (e) =>{
    //   e.preventDefault();
    //   const newUser={...user}
    //   fetch("https://635d318dfc2595be26551a65.mockapi.io/api/v1/users",{
    //     method: "POST",
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: user.name,
    //       username: user.username,
    //       password: user.password,
    //     })
    //   });
    // }
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
            <input type="submit" className="button"/>
          </div>
        </form>
      </div> 
    )
}

export default RegisterPage;