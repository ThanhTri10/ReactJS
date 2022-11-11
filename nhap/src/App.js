import React, {useState} from 'react';

function App(){
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  
  const handleSubmission = () => {
	  const formData = new FormData();
	  formData.append('File', selectedFile);
	  fetch('https://635d318dfc2595be26551a65.mockapi.io/api/v1/users/1/photos',
	  {
      method: 'POST',
      
    }
    ).then((response) => response.json()).then((result) => {
        console.log('Success:', result);
    }).catch((error) => {
        console.error('Error:', error);
    });
  };

  return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
};

export default App;
