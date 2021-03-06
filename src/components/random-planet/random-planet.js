import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

import './random-planet.css';

export default class RandomPlanet extends Component {
  constructor() {
    super();
    this.updatePlanet();
  }

  swapiService = new SwapiService() 

  state = {
    planet: {},
    loading: true,
    error: false
  }

  _onLoadedPlanet = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    });
  }

  updatePlanet() {
    const id = 3;
    this.swapiService
      .getPlanet(id)
      .then(this._onLoadedPlanet)
      .catch(this.onError)
  }      
  
  render() {
    const {planet, loading, error} = this.state;

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const contex = (!loading && !error) ? <PlanetView planet = {planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {contex}
      </div>

    );
  }
}

const PlanetView = ({planet}) => {
  const { 
    id,
    name, 
    population, 
    rotationPeriod, 
    diameter
  } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}