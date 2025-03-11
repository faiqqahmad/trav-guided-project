import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Home(props) {

    const [characters, setCharacters] = useState([])
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
        <>
            <ThemeProvider theme={props.theme}>
            <header>Star Wars Universe Lookup</header>
            <ul style={{
            listStyleType: 'none'
            }}>
                {characters.map((obj)=> (
                    <li key={obj.id}>
                        <Link to={"/characters/" + obj.id}>
                        <Button variant='contained' sx={{ m: 0.5 }}>{obj.name}</Button>
                        </Link>
                        </li>
                ))}
            </ul>
            </ThemeProvider>
        </>
    )
}

export default Home