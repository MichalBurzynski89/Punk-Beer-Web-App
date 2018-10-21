import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    items: [],
    isLoaded: false,
    error: null
  }

  componentDidMount() {
    let items = [];
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=20')
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
            imageURL: item.image_url
          };
          items.push(beer);
        });
        this.setState({ items });
      })
      .catch(error => this.setState({ isLoaded: true, error }));
  }

  render() {
    // const { items, isLoaded, error } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {/* <h1>{error ? `Error: ${error.message}` : (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} {item.tagline}
              </li>
            ))}
          </ul>
        )}</h1> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
