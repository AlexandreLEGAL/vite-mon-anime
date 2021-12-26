import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Animes from './components/Animes';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AnimeDetails from './components/AnimeDetails';


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
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/animes">
            <div>lol</div>
          </Route>
          <Route exact path="/animes/:id">
            <AnimeDetails />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    
  );
  
}


export default App;
