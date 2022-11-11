import {useState} from 'react';
import './style.css'

function RegisterPage(){
    const [user, setUser] = useState({name:"", username:"",password:"",passwordConfirm:""});
    
    const handleNameChange = e =>{
      e.preventDefault()
      setUser({...user, name: e.target.value});
    };
      
    const handleUsernameChange = e =>{
      e.preventDefault()
      setUser({...user, username: e.target.value});
    };
  
    const handlePasswordChange = e =>{
      e.preventDefault()
      setUser({...user, password: e.target.value});
    };
    
    const handleConfirmPasswordChange = e =>{
      e.preventDefault()
      setUser({...user, passwordConfirm: e.target.value});
    }
  
    const handleSubmitForm = (e) =>{
      e.preventDefault();
      const newUser={...user}
      fetch("https://635d318dfc2595be26551a65.mockapi.io/api/v1/users",{
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          username: user.username,
          password: user.password,
        })
      });
    }
    return(
      <div className="form">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleNameChange} className="name"/>
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={handleUsernameChange} className="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handlePasswordChange} className="password"/>
          </div>
          <div>
            <label>Password Confirm:</label>
            <input type="password" name="passwordConfirm" onChange={handleConfirmPasswordChange} className="passwordConfirm"/>
            {user.password !== user.passwordConfirm ? <div>{"Mat khau khac nhau"}</div> : <></>}
          </div>
          <div>
            <input type="submit" className="button"/>
          </div>
        </form>
      </div> 
    )
}

export default RegisterPage;