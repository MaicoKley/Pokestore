import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Pokemon, ShoppingItem, ShoppingCart } from './styles';

interface Types {
  type: {
    name: string;
  }
}

interface Pokemon {
  name: string;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  types: Types[];
}

interface Result {
  name: string;
  url: string;
}

interface CartItem {
  name: string;
  price: number;
  image: string;
  key: string;
}

const Content: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  async function handleAddPokemonToList(endpoint: string) {
    const { data } = await api.get(endpoint);

    const pokemon = data as Pokemon;

    pokemonList.push(pokemon);

    setPokemonList([...pokemonList]);
  }

  function handleAddPokemonToCart(pokemon: string) {
    const cartItem = pokemonList.find((item) => item.name === pokemon);

    if (cartItem) {
      shoppingCart.push({
        name: cartItem.name,
        price: cartItem.base_experience,
        image: cartItem.sprites.front_default,
        key: cartItem.name + Date.now(),
      });

      setShoppingCart([...shoppingCart]);
      setTotal(total + cartItem.base_experience);
    }
  }

  useEffect(() => {
    api.get('?limit=9').then((response) => {
      response.data.results.map((result: Result) => (
        handleAddPokemonToList(result.url.substring(34))
      ));
    });
  }, []);

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function formatValue(value: number) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      value,
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Pokémon</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {/* {console.log(pokemonList)} */}
              {pokemonList.map((pokemon) => (
                <div key={pokemon.name} className="col-md-4">
                  <Pokemon>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
                    <div>
                      {pokemon.types.map((type) => (
                        <p key={type.type.name}>{capitalizeFirstLetter(type.type.name)}</p>
                      ))}
                    </div>
                    <p>{formatValue(pokemon.base_experience)}</p>
                    <button type="button" onClick={() => handleAddPokemonToCart(pokemon.name)}>
                      I chose you!
                    </button>
                  </Pokemon>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h3>Carrinho</h3>
            <ShoppingCart>
              {shoppingCart.map((item) => (
                <ShoppingItem key={item.key}>
                  <img src={item.image} alt={item.name} />
                  <p>{capitalizeFirstLetter(item.name)}</p>
                  <p>{formatValue(item.price)}</p>
                </ShoppingItem>
              ))}
            </ShoppingCart>
            <h3>{`Total: ${formatValue(total)}`}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default Content;
