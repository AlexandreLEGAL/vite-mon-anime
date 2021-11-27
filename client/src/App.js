import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Animes from './components/Animes';
import Home from './Home';

function App() {
  const [animes, setAnimes] = useState([])
  // async function animes(array){
  //   const data = await window.fetch('/animes')
  //   const json = await data.json()
  //   array.push(json)
  // };
  //   var array = new Array()
  //   // animes(array).then(()=>{
  //   //   console.log(array[0])
  //   // })
  // const state = {
  //   user: [animes]
  // };
  const test = "animes"

  return (
    <div className="App">
      <Header />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
         <button onClick={animes}>
          Dis Bonjour
        </button> }
         <p>{array}</p> 
      </header> */}
      <Home />
      {/* <Animes animes={('array')}/> */}
      <Footer />
    </div>
  );
  
}


export default App;
