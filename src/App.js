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
      searchQuery: '',
      cityData: {},
      showMap: false
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



  handleInput = e => this.setState({searchQuery: e.target.value,})
  

  getCityInfo = async (e) => {
    e.preventDefault();
    //try catch
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;

    // console.log(url);
    let cityResults = await axios.get(url);

    // console.log(cityResults.data[0]);
    this.setState({
      cityData: cityResults.data[0],
      displayCityData: true
    })
  }


  render() {
    console.log(this.state);

    // let cityToRender = this.state.cityData.map((city, idx) => (
    //   <p key={idx}>{city.name}</p>
    // ))
    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>

        <main>

          {/* <button onClick={this.handleClick}>Do a Thing</button> */}
          <form onSubmit={this.getCityInfo}>
            <label>Pick A City!
              <input onInput={this.handleInput}type="text" name="city" />
            </label>
            <button type="submit">Explore!</button>
          </form>

          {
          this.state.displayCityData &&
          <article>
            <h2>{this.state.cityData.display_name}</h2>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&zoom=13&center=${this.state.cityData.lat},${this.state.cityData.lon}`} alt="placehold" />
            <p>Lat: {this.state.cityData.lat}, Lon: {this.state.cityData.lon}</p>
          </article>
          }

          {this.state.renderError && <p>{this.state.errorMessage}</p>}

        </main>
      </>
    );
  }
}
export default App;