import { useEffect, useState } from 'react';
import './App.css';
import { getAllPockemon, getPokemon } from './utils/pockemon';
import Card from './components/Card/Card'
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setloading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    // Get all pockemons
    const fetchPockemonData = async () => {
      let res = await getAllPockemon(initialURL);
      // Get each pokemon
      loadPokemon(res.results);
      
      // Store next page url
      setNextURL(res.next);

      // Store previous page url
      setPrevURL(res.previous);

      // Change the status
      setloading(false);
    }
    fetchPockemonData();
  },[])
  
  // Get each pokemon data
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon)=> {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }
  // console.log(pokemonData);

  // Go to Next page
  const handleNextPage = async () => {
    // nextURL is null then return
    if (nextURL===null || nextURL==="") return

    // Change the status
    setloading(true);
    
    // Call Next 20 Pokemons
    let data = await getAllPockemon(nextURL);
    await loadPokemon(data.results);

    // Store next page url
    setNextURL(data.next);

    // Store previous page url
    setPrevURL(data.previous);

    // Change the status
    setloading(false);
  }


  const handlePrevPage = async () => {
    // prevURL is null then return
    if (prevURL===null||prevURL==="") return

    // Change the status
    setloading(true);

    let data =  await getAllPockemon(prevURL);
    await loadPokemon(data.results);

    // Store next page url
    setNextURL(data.next);

    // Store previous page url
    setPrevURL(data.previous);

    // Change the status
    setloading(false);

  }

  
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ):(
          <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          <div className="Btn">
            <button onClick={handlePrevPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
