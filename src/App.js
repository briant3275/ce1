import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCityData: false,
      cityData: [],
      renderError: false,
      errorMessage: '',
      searchQuery: ''
    }
  }

  handleClick = async () => {
    console.log('button clicked');

    try {
      //put url in get param
      let cityResults = await axios.get();


      //console.log('results: ', cityResults.data.results);
      this.setState({
        displayCityData: true,
        cityData: cityResults.data.results
      })
    } catch (error) {
      //console.log('oh no, our api pull, its broken');




      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data}`

      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let city = e.target.city.value
      this.setState({
        searchQuery: e.target.city.value,
      });
      this.getCityInfo(city);
  }

  getCityInfo = async (city) => {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${city}&format=json`;

    console.log(url);
    let cityResults = await axios.get(url);

    console.log(cityResults.data[0]);
  }


  render() {
    console.log(this.state.searchQuery);

    let cityToRender = this.state.cityData.map((city, idx) => (
      <p key={idx}>{city.name}</p>
    ))
    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>

        <main>
          <button onClick={this.handleClick}>Do a Thing</button>
          {this.state.displayCityData ? cityToRender : ''}
          {this.state.renderError && <p>{this.state.errorMessage}</p>}
          <form onSubmit={this.handleSubmit}>
            <label>Pick A City!
              <input type="text" name="city" />
            </label>
            <button type="submit">Explore!</button>
          </form>
        </main>
      </>
    );
  }
}
export default App;