import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home'
import CharacterPage from './components/CharacterPage'
import PlanetPage from './components/PlanetPage'

import {useState, useEffect} from 'react'

function App() {

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
        <Route path="/" element={<Home/>}/>
        <Route path="/character/:id" element={<CharacterPage/>}/>
        <Route path="/planet/:id" element={<PlanetPage/>}/>
      </Routes>
    </Router>
  )
}


export default App