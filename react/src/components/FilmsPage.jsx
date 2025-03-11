
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function FilmsPage() {

    const params = useParams()

    const [planets, setPlanets] = useState([])
    const [film, setFilm] = useState({})
    const [characters, setCharacters] = useState([])

    useEffect(() => {
    const getFilm = async () => {
        const url1 = "http://localhost:4000/api/films/"+params.id;
        const url2 = "http://localhost:4000/api/films/"+params.id+"/planets";
        const url3 = "http://localhost:4000/api/planets";
        const url4 = "http://localhost:4000/api/films/"+params.id+"/characters";
        let characters = []
        let planets = []
        const url5 = "http://localhost:4000/api/characters"

        try {
            const response = await fetch(url1);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setFilm(json[0])
        } catch (error) {
            console.error(error.message);
        }

        try {
            const response = await fetch(url2);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            planets = json.map( obj => obj.planet_id)
        } catch (error) {
            console.error(error.message);
        }

         try {
            const response = await fetch(url3);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            
            setPlanets(json.filter(obj => planets.includes(obj.id)))
        } catch (error) {
            console.error(error.message);
        }

         try {
            const response = await fetch(url4);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            characters = json.map(obj => obj.character_id)
        } catch (error) {
            console.error(error.message);
        }

         try {
            const response = await fetch(url5);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setCharacters(json.filter(obj => characters.includes(obj.id)))
        } catch (error) {
            console.error(error.message);
        }
    }
    getFilm();
  }, []);


    return (
        <>
        {film?.producer}
        <p>{film?.title}</p>
        <p>{film?.episode_id}</p>
        <p>{film?.director}</p>
        <p>{film?.release_date}</p>
        <p>{film?.opening_crawl}</p>
        <ul>
        {planets.map( obj => (
            <li key={obj.id}>
                <Link to={"/planets/"+obj.id}>{obj.name}</Link>
                </li>
        ))}
        </ul>
        <ul>
        {characters.map( obj => (
            <li key={obj.id}>
                <Link to={"/characters/"+obj.id}>{obj.name}</Link>
                </li>
        ))}
        </ul>
        </>
    )
}

export default FilmsPage