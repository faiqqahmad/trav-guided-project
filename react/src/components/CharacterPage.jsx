
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';


function CharacterPage() {

    const params = useParams()

    const [character, setCharacter] = useState([])
    const [films, setFilms] = useState([])
    const [homeworld, setHomeworld] = useState("")

    useEffect(() => {
        console.log("testing")
    const getCharacter = async () => {
        const url1 = "http://localhost:4000/api/characters/"+params.id;
        const url2 = "http://localhost:4000/api/characters/"+params.id+"/films";
        const url3 = "http://localhost:4000/api/films";
        let url4 = "http://localhost:4000/api/planet/"+character[0]?.homeworld;
        let filmIds = []

        try {
            const response = await fetch(url1);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setCharacter(json)
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
            url4 = "http://localhost:4000/api/planets/";
            const response = await fetch(url4);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setHomeworld(json[0]?.name)
        } catch (error) {
            console.error(error.message);
        }
    }
    getCharacter();
  }, []);


    return (
        <>
        {character[0]?.name}
        <p>{character[0]?.gender}</p>
        <p>{character[0]?.skin_color}</p>
        <p>{character[0]?.hair_color}</p>
        <p>{character[0]?.height}</p>
        <p>{character[0]?.eye_color}</p>
        <p>{character[0]?.birth_year}</p>
        <p>{character[0]?.mass}</p>
        <p>
            <Link to={"/planets/"+character[0]?.homeworld}>{homeworld}</Link>
            </p>
        <ul>
        {films.map( obj => (
            <li key={obj.id}>
                <Link to={"/films/"+obj.id}>{obj.title}</Link>
                </li>
        ))}
        </ul>
        </>
    )
}

export default CharacterPage