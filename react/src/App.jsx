import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home'
import CharacterPage from './components/CharacterPage'
import PlanetPage from './components/PlanetPage'

import {useState, useEffect} from 'react'
import FilmsPage from "./components/FilmsPage";
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const theme = createTheme({
  palette: {
    primary: {
      main: '#151501', // Custom primary color
    },
    secondary: {
      main: '#e1d816', // Custom secondary color
    },
    // background: {
    //   default: '#f5f5f5', // Custom background color
    // },
    text: {
      primary: '#e1d816', // Custom text color
    },
  },
});

  const [characters, setCharacters] = useState([])
  const [planets , setPlanets] = useState([])
  const [films, setFilms] = useState([])

    useEffect(() => {
    const getCharacters = async () => {
        const url = "http://localhost:4000/api/characters";
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setCharacters(json)
        } catch (error) {
            console.error(error.message);
        }
    }
    getCharacters();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home theme={theme}/>}/>
        <Route path="/characters/:id" element={<CharacterPage theme={theme}/>}/>
        <Route path="/planets/:id" element={<PlanetPage theme={theme}/>}/>
        <Route path="/films/:id" element={<FilmsPage theme={theme}/>}/>
      </Routes>
    </Router>
  )
}


export default App