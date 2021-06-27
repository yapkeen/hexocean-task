import Form from './Form.js'
import {Provider} from "react-redux";
import React, {useState} from 'react';
import store from './store';
function App() {
const [response, setResponse] = useState("")
  return (
    <Provider store={store}>
    <Form onSubmit={
      values => new Promise((resolve, reject) =>{
        var new_values;
        if(values.type === 'pizza'){
          new_values = {
            name: values.name, 
            preparation_time: values.preparation_time, 
            type: values.type, 
            no_of_slices: values.no_of_slices, 
            diameter: values.diameter}
        }
        else if(values.type === 'soup'){
          new_values = {
            name: values.name, 
            preparation_time: values.preparation_time, 
            type: values.type, 
            spiciness_scale: values.spiciness_scale}
        }
        else if(values.type === 'sandwich'){
          new_values = {
            name: values.name, 
            preparation_time: values.preparation_time, 
            type: values.type, 
            slices_of_bread: values.slices_of_bread}
        }
        fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", 
        {
          method: "post", 
          body: JSON.stringify(new_values), 
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
          setResponse(JSON.stringify(res))
          console.log(res)
          if (res.hasOwnProperty("errors")) {
            reject(res.errors)
          } else {
            resolve(res.data)
          }
      })
    })}></Form>
    <h5>
    {response}
    </h5>
    </Provider>
  );
}

export default App;
