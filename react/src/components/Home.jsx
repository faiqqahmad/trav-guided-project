import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


function Home() {

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
        <header>Star Wars Universe Lookup</header>
        <ul>
            {characters.map((obj)=> (
                <li key={obj.id}>
                    <Link to={"/character/" + obj.id}>{obj.name}</Link>
                    </li>
            ))}
        </ul>
        
        </>
    )
}

export default Home