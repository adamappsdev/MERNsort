import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  getButtonsUsingMap = () => {
    var algos = ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Shell Sort", "Radix Sort", "Swap Sort", "Heap Sort"];  
    return algos.map((number) => {
      return <button key={number}>{number}</button>
    })
  }

  render() {
    return (
      <div id="sectionLeft">
        <div id="dash">
          <label htmlFor="randomizerAlgorithm">Choose a randomization method: </label>
          <select id="randomizerAlgorithm" name="randomizerAlgorithm">
              <option value="random">Random</option>
              <option value="nearly">Nearly sorted</option>
              <option value="reversed">Reversed</option>
              <option value="nonunique">Few unique</option>
          </select>
          <button onClick={ this.props.onRandomize }>Randomize</button>
          <button onClick={ this.props.bubbleSort }>Bubble sort</button>
          <button onClick={ this.props.mergeSort }>Merge sort</button>
          <button onClick={ this.props.heapSort }>Heap sort</button>
          <button onClick={ this.props.insertionSort }>Insertion sort</button>
          <br/>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
          <button onClick={ this.props.playAlgo }>Play</button>
          <button onClick={ this.props.pauseAlgo }>Pause</button>
        </div>
        <div id="description">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    )
  };
}

export default Dashboard;