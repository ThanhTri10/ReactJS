import './App.css';
import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HomePageHook/>
    </div>
  );
};

function HomePageHook() {
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

export default App;
