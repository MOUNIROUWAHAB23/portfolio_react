import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import About from './components/About';
// import Projects from './components/Projects';
import {Contact} from './components/Contact';
import {Projects  } from "./components/Projects";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
// import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     
     
     <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
     {/* <TodoList /> */}
     
      
    
    </div>
  );
}

export default App;
