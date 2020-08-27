import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.algorithms = { 
      title: [
        "Heap sort",
        "Merge sort",
        "Insertion sort",
        "Bubble sort"
      ],
      description: [
        "Heap sort",
        "Merge sort",
        "Insertion sort",
        "Bubble sort"
      ]
    }
    this.state = {
      selectedAlgo: "heap"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleBarChange = this.handleBarChange.bind(this);
    this.handleVelocityChange = this.handleVelocityChange.bind(this);
  }

  handleChange(event) {
    this.props.selectedAlgo( event.target.value )
  }

  handleBarChange = (event) => {
    this.props.handleBarData( event.target.value )
  }

  handleVelocityChange = (event) => {
    this.props.handleVelocityData( event.target.value )
  }
  
  render() {
    return (
      <div id="sectionLeft">
        <div id="dash">
          <div className="option">
            <label htmlFor="randomizerAlgorithm">Choose a randomization method:</label>
            <select id="randomizerAlgorithm" name="randomizerAlgorithm">
                <option value="random">Random</option>
                <option value="nearly">Nearly sorted</option>
                <option value="reversed">Reversed</option>
                <option value="nonunique">Few unique</option>
            </select>
            <button id="randomizebtn" onClick={ this.props.onRandomize }>Randomize</button>
          </div>
          <div className="option">
            <label htmlFor="algorithm">Choose an algorithm:</label>
            <select id="algorithm" value={ this.state.selectedOption } onChange={ this.handleChange }>
              <option value={ "heap" }>Heap sort</option>
              <option value={ "merge" }>Merge sort</option>
              <option value={ "insertion" }>Insertion sort</option>
              <option value={ "bubble" }>Bubble sort</option>
            </select>
          </div>
          <div className="option">
            <label htmlFor="bars">Bars</label>
            <input onChange={ this.handleBarChange } type="range" id="bars" min={2} max={40} defaultValue={ "10" } className="slider" />
          </div>
          <div className="option">
            <label htmlFor="velocity">Velocity</label>
            <input onChange={ this.handleVelocityChange } type="range" id="velocity" min={ 50 } max={ 500 } defaultValue={ "200" } className="slider" />
          </div>
          <div className="option">
            <button id="run" onClick={ this.props.runAlgo }>Do the thing</button>
            <button onClick={ this.props.pauseAlgo }>Pause</button>
          </div>
        </div>
        <div id="description">
          <h4>{ this.algorithms.title[this.state.selectedAlgo] }</h4>
          <p>{ this.algorithms.description[this.state.selectedAlgo] }</p>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      </div>
    )
  };
}

export default Dashboard;