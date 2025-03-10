
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function CharacterPage() {

    const params = useParams()

    const [character, setCharacter] = useState({})

    useEffect(() => {
    const getCharacter = async () => {
        const url = "http://localhost:4000/api/characters/"+params.id;
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json)
            setCharacter(json)
        } catch (error) {
            console.error(error.message);
        }
    }
    getCharacter();
  }, []);


    return (
        <>
        {character[0].stringify()}
        {/* <p>{character[0].gender}</p>
        <p>{character[0].skin_color}</p>
        <p>{character[0].hair_color}</p>
        <p>{character[0].height}</p>
        <p>{character[0].eye_color}</p>
        <p>{character[0].mass}</p>
        <p>{character[0].name}</p>
        <p>{character[0].name}</p> */}
        <ul>

        </ul>
        </>
    )
}

export default CharacterPage