import Image from 'next/image'
import Link from 'next/link';
import styles from './card.module.css'

type Pokemon = {
    uuid: number;
    name: string;
}

interface PokemonProps {
    pokemon: Pokemon
}

export const Card = ({ pokemon }: PokemonProps) => {

    return (
        <Link href={`/pokemon/${pokemon.uuid}`}>
            <div className={styles.card_wrapper}>
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.uuid}.png`}
                    width={120}
                    height={120}
                    alt={pokemon.name}
                />
                <p>{pokemon.name}</p>
            </div>
        </Link>
    );
};
