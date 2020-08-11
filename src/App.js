import React from 'react';
import './App.css';
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";

class App extends React.Component {
  constructor (props) {
    super(props);
  }
  
  handleClick = () => {
    this.arrayFiddler.randomizeArray();
  }

  playAlgo = () => {
    this.arrayFiddler.playAlgo();
  }

  pauseAlgo = () => {
    this.arrayFiddler.pauseAlgo()
  }

  handleBubblesort = () => {
    this.arrayFiddler.sortBubblesort();
  } 

  handleHeapsort = () => {
    this.arrayFiddler.sortHeapsort();
  }
  
  handleMergesort = () => {
    this.arrayFiddler.sortMergesort();
  }

  handleInsertionsort = () => {
    this.arrayFiddler.sortInsertionsort();
  }

  render() {
    return (
      <div>
        <Header />
        <Dashboard
          onRandomize={ this.handleClick.bind(this) }
          bubbleSort={ this.handleBubblesort.bind(this) }
          mergeSort={ this.handleMergesort.bind(this) }
          heapSort={ this.handleHeapsort.bind(this) }
          insertionSort={ this.handleInsertionsort.bind(this) }
          playAlgo={ this.playAlgo.bind(this) }
          pauseAlgo={ this.pauseAlgo.bind(this) }
        />
        <Chart ref={ arrayFiddler => this.arrayFiddler = arrayFiddler }/>
      </div>
    )
  };
}

export default App;
