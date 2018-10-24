import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Beers from './components/Beers';
import Favourites from './components/Favourites';

class App extends Component {
  state = {
    items: [],
    favourites: [],
    isLoaded: false,
    error: null
  }

  toggleFavourite = (e, id) => {
    const beer = this.state.items.filter(item => item.id === id)[0];
    let favourites;
    if (!beer.isFavourite) {
      e.target.className = 'fas fa-star';
      e.target.setAttribute('title', 'Remove from Favourites');
      favourites = [...this.state.favourites, beer];
    } else {
      e.target.className = 'far fa-star';
      e.target.setAttribute('title', 'Add to Favourites');
      favourites = this.state.favourites.filter(favourite => favourite.id !== id);
    }
    beer.isFavourite = !beer.isFavourite;
    this.setState({ favourites });
  }

  componentDidMount() {
    const items = [];
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=24')
      .then(res => {
        if (res.ok) {
          this.setState({ isLoaded: true });
          return res.json();
        } else {
          throw new Error(`The connection ended with status ${res.status}${res.statusText ? ': ' + res.statusText : ''}`);
        }
      })
      .then(json => {
        json.forEach(item => {
          const beer = {
            id: item.id,
            name: item.name,
            tagline: item.tagline,
            firstBrewed: item.first_brewed,
            desc: item.description,
            imageURL: item.image_url,
            isFavourite: false
          };
          items.push(beer);
        });
        this.setState({ items });
      })
      .catch(error => {
        this.setState({ isLoaded: true, error });
        alert(error);
      });
  }

  render() {
    const { items, favourites } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Beers beers={items} toggleFavourite={this.toggleFavourite} />} />
            <Route path="/favourites" render={() => <Favourites beers={favourites} toggleFavourite={this.toggleFavourite} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
