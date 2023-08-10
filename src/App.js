import React from 'react';
import './App.css';
import Form from './Form'; 
import Schema from './Schema';
import data from './data';

function App() {
  const onSave = (formData) => {
    console.log('Data saved:', formData);
  }
  
  return (
    <div className="App">
      <Form data={data}  schema={Schema} onSave={onSave} /> 
    </div>
  );
}

export default App;