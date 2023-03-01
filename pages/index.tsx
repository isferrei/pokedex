import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image';

import styles from '@/styles/Home.module.css'
import { Card } from '@/components/Card';
import search from '../public/assets/search.svg'
import sort from '../public/assets/sort.svg'
import pokemon from '../public/assets/pokemon.svg'
import api from '@/services/api';

type Pokemons = {
  uuid: number;
  name: string;
};

interface PokemonsProps {
  pokemons: Pokemons[];
}

export default function Home({ pokemons }: PokemonsProps) {

  const [sorting, setSorting] = useState<'asc' | 'desc'>('asc');
  const [searchValue, setSearchValue] = useState('');

  function sortPokemonsByName(pokemons: Pokemons[], sorting: 'asc' | 'desc') {
    return pokemons.sort((a, b) => {
      if (a.name < b.name) {
        return sorting === 'asc' ? -1 : 1;
      }
      if (a.name > b.name) {
        return sorting === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedPokemons = sortPokemonsByName(pokemons, sorting);

  return (
    <div className={styles.pokedex_wrapper}>
      <Head>
        <title>Home</title>
      </Head>

      <nav className={styles.navbar}>
        <h1 className={styles.pokedex_title}>
          <Image
            src={pokemon}
            width={40}
            alt='Pokemon logo'
          />
          Pokedex
        </h1>
        <div className={styles.interaction_bar}>
          <button onClick={() => setSorting(sorting === 'asc' ? 'desc' : 'asc')} className={styles.sorting_wrapper}>
            <Image
              src={sort}
              width={20}
              alt='Ordernar'
            />
            {sorting === 'asc' ? 'Ordenar de Z a A' : 'Ordenar de A a Z'}
          </button>

          <div className={styles.search_wrapper}>
            <Image
              src={search}
              width={20}
              alt='Buscar'
            />
            <input
              type="text"
              placeholder="Busque pelo nome do pokémon"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
        </div>
      </nav>

      {pokemons.length ?
        <section className={styles.pokedex_grid}>
          {sortedPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase())).map((pokemon) => (
            <div key={`pokemon-${pokemon.uuid}`}>
              <Card pokemon={pokemon} />
            </div>
          ))}
        </section>
        : <h2>Nenhum pokémon encontrado</h2>}
    </div>
  )
}

export async function getStaticProps() {
  const response = await api.get('/pokemon');

  const pokemons = response.data.results.map((pokemon: {
    name: string;
  }, index: number) => {
    return {
      uuid: index + 1,
      name: pokemon.name,
    };
  }
  );


  return {
    props: {
      pokemons
    },
  };
}