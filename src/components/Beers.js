import React from 'react';
import '../css/Beers.css';

const Beers = ({ beers }) => {
  const beerList = beers.length ? (
    beers.map(beer => {
      return (
        <div className="card" key={beer.id}>
          <div className="card__col">
            <img className="card__img" src={beer.imageURL} alt={beer.name} />
            <p className="card__text card__text--sm">First brewed: {beer.firstBrewed}</p>
          </div>
          <div className="card__content">
            <h2 className="card__title">{beer.name}</h2>
            <p className="card__text card__text--gray">{beer.tagline}</p>
            <p className="card__text">{beer.desc}</p>
          </div>
          <i className="far fa-star"></i>
        </div>
      );
    })
  ) : (
      <p className="info">...Loading Beer!</p>
    );

  return (
    <div className="container">
      {beerList}
    </div>
  );
}

export default Beers;