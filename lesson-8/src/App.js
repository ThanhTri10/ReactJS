
import './App.css';
// import HomePage from './Components/HomePage'
// import RegisterPage from './Components/RegisterPage'
// import LoginPage from './Components/LoginPage'
import React, {useState, useEffect, useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";

let UserContext = React.createContext();
function App() {
  
  let userId = localStorage.getItem("userId");
  return (
    <UserContext.Provider value={{ userId: JSON.parse(userId) }}>
      <Router>
        <Switch>
          <Route exact path="/register"  >
            <RegisterPage />
          </Route>
          <Route exact path="/login" >
            <LoginPage />
          </Route>
          <PrivateRoute exact component={HomePage} path="/homepage" />
          <PrivateRoute exact component={AddPhotoPage} path="/add-photos" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

function PrivateRoute({ component: Component, path, ...rest }) {
  let userId = localStorage.getItem("userId");
  return <Route {...rest}
    render={(props) => {
      return userId != null && userId !== "" ? <Component {...props} /> : <Redirect to={{
        pathname: "/login"
      }} />
    }}>
  </Route>
}
RegisterPage = withRouter(RegisterPage);
LoginPage = withRouter(LoginPage);




export default App;


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


function LoginPage(){
  const [user, setUser] = useState({username:"",password:"", errorMessage: ""});
  let state = false;
  const history = useHistory();
    
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
            history.push('/homepage');
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
        <div>{state === true ? <></> : user.errorMessage}</div>
      </form>
    </div> 
  )
}


function HomePage() { 
  let [listImage, setListImage] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);
  let [maxPage, setMaxPage] = useState(1);


  useEffect(() => {
    getListPhotos();
  }, []);

  useEffect(() => {
    getListPhotos();
  }, [page])

  function getListPhotos(){
    fetch(`https://635d318dfc2595be26551a65.mockapi.io/api/v1/users/1/photos?page=${page}&limit=${limit}`).then((response) => response.json()).then((res) => { 
      setListImage(res.items);
      setMaxPage(res.count/limit);
    })
  }
  const handleAddition = () => {
      fetch('https://635d318dfc2595be26551a65.mockapi.io/api/v1/users/1/photos',
      {
      method: 'POST',
    }
    ).then((response) => response.json()).then((result) => {
        console.log('Success:', result);
    });
  };

  return (<>
    <h1>Home Page</h1>
    <button onClick={handleAddition}>Add</button>
    <div>
      {page > 1 ? <button onClick={() => {
        setPage(page-1)
      }}>Previous Page</button> : <></>}
      <div>{page}</div>
      {page <= maxPage ? <button onClick={() => {
        setPage(page+1)
      }}>Next Page</button> : <></>}
    </div>
    <div>
      <select onChange={(e) =>{
        setLimit(e.target.value);
        setPage(1)
      }} defaultValue={limit}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>  
    </div>
    <div>
      {
        listImage.map((value, index) => <div key={index}>
          <img src={value.image} alt={value.description} />
        </div>)
        }
    </div>,
  </>
)
};


function AddPhotoPage(){
  const [user, setUser] = useState({image:"", description:""})
  let userContext = useContext(UserContext);
  let history = useHistory();
  console.log(userContext);
  const handleImageChange = e =>{
    e.preventDefault()
    setUser({...user, image: e.target.value});
  };
  const handleDescriptionChange = e =>{
    e.preventDefault()
    setUser({...user, description: e.target.value});
  };
  const handleSubmitForm = e => {
    e.preventDefault()
    fetch(`https://635d318dfc2595be26551a65.mockapi.io/api/v1/users/${userContext.userId}/photos`,{
      method: "POST",
      body: JSON.stringify({
        userId: userContext.userId,
        image: user.image,
        description: user.description,
      }),
      headers: {
        'Content-type': 'application/json'
      },
    }).then((res) => {
      if(res.status === 201){
        history.push("/homepage");
      }
    })
  }
  return(
    <div>
      <div>
          <label>Image:</label>
          <input type="text" name="image" onChange={handleImageChange} className="image"/>
        </div>
        <div>
          <label>Description:</label>
          <textarea type="description" name="description" onChange={handleDescriptionChange} className="description"/>
        </div>
        <button onClick={handleSubmitForm}>Add Photo</button>
    </div>
  )
}