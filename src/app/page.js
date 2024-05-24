import { getPokemonList } from "./api";
import Bar from "./componentes/Nav";
import Header from "./componentes/header";
import PokemonList from "./componentes/pokemonlist";




const Home = async () => {
  const pokemon = await getPokemonList();

  return (
    <div>
    <Header></Header>
    <Bar></Bar>
    <PokemonList pokemon={pokemon} />
    </div>
  );
};

export default Home;
