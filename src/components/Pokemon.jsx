import React, {useState} from 'react';
import '../styles/pokemon.scss';

const Pokemon = ({pokemon, image}) => {
    const [cardFlipped, setCardFlipped] = useState(false);
    const [side, setSide] = useState(false);

    const flipCard = () => {
        setCardFlipped(!cardFlipped);
        setTimeout(() => {
            setSide(!side);
            setCardFlipped(!cardFlipped);
        }, 200);
    }


    if (!side) {
        return (
            <div className='card' onClick={flipCard}>
                <div className={`cardInner ${cardFlipped && 'flip'}`}>
                    <div className='cardFront'>
                        <div>#{pokemon.id}</div>
                        <div>{pokemon.name}</div>
                        <img src={image} alt={pokemon.name}/>
                        <div className='types'>
                            {
                                pokemon.types.map(item =>
                                    <div
                                        key={`${pokemon.id}_${item.type.name}`}
                                        className={`type ${item.type.name}`}
                                    >
                                        {item.type.name}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className='card' onClick={flipCard}>
                <div className={`cardInner ${cardFlipped && 'flip'}`}>
                    <div className='cardBack'>
                        <div>Abilities:
                            <div>
                                {pokemon.abilities.map(item =>
                                    <div key={`${pokemon.id}_${item.ability.name}`}>
                                        {`-${item.ability.name}`}
                                    </div>
                                )}
                            </div>
                        </div>
                        <br/>
                        <div>Base experience: {pokemon.base_experience}</div>
                        <br/>
                        <div>Base stats:
                            <div>
                                {pokemon.stats.map(item =>
                                    <div>{`${item.stat.name}: ${item.base_stat}`}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Pokemon;