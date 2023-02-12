import { useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonCard, setPokemonCard] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await res.json();
    console.log(data);
    setPokemonCard({
      name: pokemon,
      number: data.id,
      species: data.species.name,
      image: data.sprites.other.home.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      type: data.types[0].type.name,
    });
    setPokemonChosen(true);
  };

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <div className="search">
        <input
          type="text"
          onChange={(ev) => setPokemon(ev.target.value.toLocaleLowerCase())}
        />
        <button onClick={() => searchPokemon()}>Search Pokemon</button>
      </div>
      {!pokemonChosen ? (
        <p>Please choose a Pokemon</p>
      ) : (
        <div className="pokemonCard">

          <img src={pokemonCard.image} alt={pokemonCard.name} />
          <div className="name">
            <h1>{pokemonCard.name}</h1>
            <h1>#{pokemonCard.number}</h1>
          </div>
          <div className="details">
            <h4>Type: {pokemonCard.type}</h4>
            <h4>Hp: {pokemonCard.hp}</h4>
            <h4>Attack: {pokemonCard.attack}</h4>
            <h4>Defense: {pokemonCard.defense}</h4>
            <h4>Speed: {pokemonCard.speed}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
