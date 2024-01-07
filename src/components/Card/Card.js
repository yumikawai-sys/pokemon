import React from 'react'
import "./Card.css"

const Card = ({ pokemon, key }) => {
  return (
    <div className="card">
        <div className="cardImg">
            <img src={pokemon.sprites.front_default} alt="" />
        </div>
        <h3 className="cardName">{pokemon.name}</h3>
        <div className="cardTypes">
            <div>Type</div>
            {pokemon.types.map((type)=> {
                return <div className={type.type.name}>
                    <span className="typeName">{type.type.name}</span>
                </div>
            })
            }
        </div>
        <div className="cardInfo">
            <div className="cardData">
                <p className="title">Weight: {pokemon.weight}</p>
            </div>
            <div className="cardData">
                <p className="title">Height: {pokemon.height}</p>
            </div>
            <div className="cardData">
                <p className="title">Ability: {pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    </div>
  )
}

export default Card