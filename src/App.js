import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayCityData: false,
      cityData: []
    }
  }

  handleClick = async () => {
    console.log('button clicked');

    try {
//put url in get param
    let cityResults = await axios.get();

    console.log('results: ', cityResults.data.results);
    this.setState({
      displayCityData: true,
      cityData: cityResults.data.results
    })
    } catch(error) {
      console.log('oh no, our api pull, its broken');
    }
  }
  render () {

    let cityToRender = this.state.cityData.map((city,idx) =>(
      <p key={idx}>{city.name}</p>
    ))
    return (
      <>
      <header>
        <h1>City Explorer</h1>
      </header>
          
      <main>
        <button onClick={this.handleClick}>Do a Thing</button>
      </main>
      </>
    );
  }
}
export default App;