import './App.css';
import DisplayForm from './components/DisplayForm';

import { useState } from 'react';
const App = () => {
   const [file, setFile] = useState(null);

   const onFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      fetch('http://localhost:8000/uploadfile', {
          method: 'POST',
          body: formData,
      })
      .then(res => res.json())
      .then(data => {
          console.log(data);
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onFormSubmit}>
          <h1>File upload</h1>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        <DisplayForm />
      </header>
    </div>
  );
}

export default App;
