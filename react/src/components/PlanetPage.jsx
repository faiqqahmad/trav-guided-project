
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function PlanetPage() {

    const params = useParams()

    const [planet, setPlanet] = useState({})
    const [films, setFilms] = useState([])
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        console.log("testing")
    const getPlanet = async () => {
        const url1 = "http://localhost:4000/api/planets/"+params.id;
        const url2 = "http://localhost:4000/api/planets/"+params.id+"/films";
        const url3 = "http://localhost:4000/api/films";
        const url4 = "http://localhost:4000/api/planets/"+params.id+"/characters";
        let filmIds = []

        try {
            const response = await fetch(url1);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setPlanet(json)
        } catch (error) {
            console.error(error.message);
        }

        try {
            const response = await fetch(url2);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            filmIds = json.map((obj) => obj.film_id)
        } catch (error) {
            console.error(error.message);
        }

         try {
            const response = await fetch(url3);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            const filtered = json.filter( obj => filmIds.includes(obj.id))
            setFilms(filtered)
        } catch (error) {
            console.error(error.message);
        }

         try {
            const response = await fetch(url4);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setCharacters(json)
        } catch (error) {
            console.error(error.message);
        }
    }
    getPlanet();
  }, []);


    return (
        <>
        {planet[0]?.climate}
        <p>{planet[0]?.surface_water}</p>
        <p>{planet[0]?.name}</p>
        <p>{planet[0]?.diameter}</p>
        <p>{planet[0]?.rotation_period}</p>
        <p>{planet[0]?.terrain}</p>
        <p>{planet[0]?.gravity}</p>
        <p>{planet[0]?.orbital_period}</p>
        <p>{planet[0]?.population}</p>
        <ul>
        {films.map( obj => (
            <li key={obj.id}>
                <Link to={"/films/"+obj.id}>{obj.title}</Link>
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

export default PlanetPage