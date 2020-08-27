import React from 'react';
import './App.css';
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedAlgo: "heap",
      bars: 11,
      velocity: 200
    }
  }

  randomizeArray = (event) => {
    this.arrayFiddler.handleBarChange(event);
    this.setState({ bars: event })
  }

  getVelocity = (event) => {
    this.arrayFiddler.changeVelocity(event);
    this.setState({ velocity: event })
  }

  render() {
    return (
      <>
        <Header />
        <Dashboard
          onRandomize={ () => this.arrayFiddler.randomizeArray() }
          selectedAlgo={ event => this.setState({ selectedAlgo: event }) }
          runAlgo={ () => this.arrayFiddler.runAlgo() }
          pauseAlgo={ () => this.arrayFiddler.pauseAlgo() }
          handleBarData={ this.randomizeArray }
          handleVelocityData={ this.getVelocity }
        />
        <Chart 
          ref={ arrayFiddler => this.arrayFiddler = arrayFiddler }
          selectedAlgo={ this.state.selectedAlgo }
          bars={ this.state.bars }
          velocity={ this.state.velocity }
        />
      </>
    )
  }
}

export default App;
