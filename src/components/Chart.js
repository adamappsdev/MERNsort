import React from 'react';
import { RoughProvider, Rectangle } from 'react-roughjs';
import Dashboard from "./Dashboard";


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayBars: [],
            bars: this.props.bars,
            velocity: this.props.velocity
        }
        this.array = []; //[0.5, 0.4, 0.3, 0.2, 0.1]; // actual array of actual values
        this.arraySVG = []; // SVG array of each bar
        this.finished = false;
        this.inProgress = false;
        this.stopped = false;
        this.instructions = [];
        this.createGraph = this.createGraph.bind(this);
    }

    runAlgo() {
        switch(this.props.selectedAlgo) {
            case "heap": // heap
                this.sortHeapsort();
                break;
            case "merge": // merge
                this.sortMergesort();
                break;
            case "insertion": // insertion
                this.sortInsertionsort();
                break;
            case "bubble": // bubble
                this.sortBubblesort();
                break;
            default:
                alert("Error. No such algorithm found.");
                break;
        }
    }

    changeVelocity(event) {
        this.setState({ velocity: event })
    }

    handleBarChange(event) {
        if (this.inProgress === true && this.finished === false){
            return;
        } else {
            this.setState(
                { bars: event },
                () => { 
                    this.array = [];
                    let shuffledArray = [];
                    for (let i = 0; i < this.state.bars; i++) {
                        shuffledArray.push(i); // creates an array
                    }
                    for (let i = 0; i < this.state.bars; i++) {
                        this.array.push(Math.random());
                    }
                    this.createGraph(this.array, this.state.bars);
                    this.finished = false;
                    this.stopped = false;
                }
            );
        }
    }

    pauseAlgo() { // needs work
        this.finished = false;
        this.inProgress = false;
        this.stopped = true;
        clearInterval(this.intervalHighligher);
        clearInterval(this.intervalSwapper);
        this.createGraph(this.array, this.state.bars, { fill: 'black', fillStyle: 'cross-hatch', bowing: 4 });
    }

    createBar(i, arrayValue, barsLength, options) {
        let clientHeight = document.getElementById('graphSVG').clientHeight;
        let clientWidth = document.getElementById('graphSVG').clientWidth;
        let allotedWidth = clientWidth / barsLength ;
        return (
            <Rectangle 
                key={ i }
                x={ 1.1 + i * allotedWidth } 
                y={ clientHeight - ( clientHeight * arrayValue ) } 
                width={ allotedWidth - 7 } 
                height={ ( clientHeight - 5 ) * arrayValue } 
                options={ options }
            >
            </Rectangle>
        );
    }

    createGraph(array, barsLength, options={ fill: 'red' }) {
        this.arraySVG = [];
        for (let i = 0; i < barsLength; i++) {
            this.arraySVG.push( this.createBar(i, array[i], barsLength, options) );
        }
        this.setState({ arrayBars: this.arraySVG });
    }

    updateArray(i, mutatedBar) { // used for randomization
        let shallowState = this.state; // makes a shallow copy of the current arrayBars
        let arrayBar = shallowState.arrayBars[i]; // makes a shallow copy of the bar in question
        arrayBar = mutatedBar; // mutates the bar
        shallowState.arrayBars[i] = mutatedBar; // puts the mutated bar back into the array
        return shallowState;
    }

    highlightElements(array, options={ fill: 'yellow' }) { // highlighter
        this.arraySVG = [];
        for (let i = 0; i < this.state.bars; i++) {
            if (array.includes(i) === true) {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, options ));
            } else {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'red' } ));
            }
        }
        this.setState({ arrayBars: this.arraySVG });
    }

    highlightElementsSpecial(array, key, options={ fill: 'yellow' }) { // highlighter
        this.arraySVG = [];
        for (let i = 0; i < this.state.bars; i++) {
            if (array.includes(i) === true) {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, options ));
            } else if (i === key) {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'yellow' }) );
            } else {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'red' } ));
            }
        }
        this.setState({ arrayBars: this.arraySVG });
    }

    swapElements(first, second) { // swapper
        var temp = this.array[first];
        this.array[first] = this.array[second];
        this.array[second] = temp;
        this.arraySVG = [];
        for (let i = 0; i < this.state.bars; i++) {
            if (i === first || i === second) {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'blue', roughness: 2.8 }) );
            } else {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'red' }) );
            }
        }
        this.setState({ arrayBars: this.arraySVG });
    }

    swapAndHighlight(first, second, highlight) { // swapper
        var temp = this.array[first];
        this.array[first] = this.array[second];
        this.array[second] = temp;
        this.arraySVG = [];
        for (let i = 0; i < this.state.bars; i++) {
            if (i === first || i === second) {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'blue', roughness: 2.8 }) );
            } else if (i === highlight) {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'yellow' }) );
            } else {
                this.arraySVG.push( this.createBar(i, this.array[i], this.state.bars, { fill: 'red' }) );
            }
        }
        this.setState({ arrayBars: this.arraySVG });
    }

    animateGraph(instructions) {
        instructions.push([0, 0, 'finish']);
        var step = 0;
        for (var i = 0; i < instructions.length; i++) {
            this.timeoutInstructions = setTimeout(() => {
                if (instructions[step][2] === "swap") {
                    this.swapElements(instructions[step][0], instructions[step][1]);
                } else if (instructions[step][2] === "highlight with key") {
                    this.highlightElementsSpecial([instructions[step][0][0], instructions[step][0][1]], instructions[step][1]);
                } else if (instructions[step][2] === "highlight with green") {
                    this.highlightElementsSpecial([instructions[step][0][0], instructions[step][0][1]], instructions[step][1], { fill: 'black' });
                } else if (instructions[step][2] === "swap and highlight") {
                    this.swapAndHighlight(instructions[step][0][0], instructions[step][0][1], instructions[step][1]);
                } else if (instructions[step][2] === "highlight before") {
                    this.highlightElements(instructions[step][0], { fill: 'green' });
                } else if (instructions[step][2] === "finish") {
                    this.createGraph(this.array, this.state.bars, { fill: 'green', fillWeight: 2 });
                    this.finished = true;
                    this.inProgress = false;
                    this.stopped = true;
                }
                step++;
            }, this.state.velocity * i); 
        }
    }

    componentDidMount() {
        for (let i = 0; i < this.state.bars; i++) { // adds initial randomized array set
            this.array.push(Math.random());
        }
        this.createGraph(this.array, this.state.bars); // creates the initial graph
        window.addEventListener('resize', () => { // resize function
            if(this.finished === true) {
                this.createGraph(this.array, this.state.bars, { fill: 'green', fillWeight: 2 });
            } else if (this.stopped === true) {
                this.createGraph(this.array, this.state.bars, { fill: 'black', fillStyle: 'cross-hatch', bowing: 4 });
            } else {
                this.createGraph(this.array, this.state.bars);
            }
        });
    }

    componentWillUnmount() {
    }

    maxHeap(array, i, arrayLength) {
        const left = 2 * i + 1; 
        const right = 2 * i + 2; 
        var max = i;
        if (left < arrayLength && array[left] > array[max]) {
            max = left;
        }
        if (right < arrayLength && array[right] > array[max]) {
            max = right;
        }
        if (max !== i) {
            var tmp = array[i];
            array[i] = array[max];
            array[max] = tmp;
            this.instructions.push([i, max, 'highlight']);
            this.instructions.push([i, max, 'swap']);
            this.maxHeap(array, max, arrayLength);
        }
    }
    sortHeapsort() {
        if(this.finished === false && this.inProgress === true) {
            return;
        } else {
            this.finished = false;
            this.inProgress = true;
            this.stopped = false;

            this.instructions = [];
            var tmpArray = [];

            for (var i = 0; i < this.array.length; i++) {
                tmpArray.push(this.array[i]);
            }

            var arrayLength = tmpArray.length; // 5
            for (i = Math.floor(arrayLength / 2); i >= 0; i--) { // builds a maxheap
                this.maxHeap(tmpArray, i, arrayLength); // i = 2, 1, 0
            }
            for (i = tmpArray.length - 1; i > 0; i--) {
                var tmp = tmpArray[i];
                tmpArray[i] = tmpArray[0];
                tmpArray[0] = tmp;
                this.instructions.push([0, i, 'highlight']);
                this.instructions.push([0, i, 'swap']);
                arrayLength--;
                this.maxHeap(tmpArray, 0, arrayLength);
            }

            this.instructions.push([0, 0, 'finish']);

            var step = 0;
            for (i = 0; i < this.instructions.length; i++) {
                this.timeoutInstructions = setTimeout(() => {
                    if (this.instructions[step][2] === "swap") {
                        this.swapElements(this.instructions[step][0], this.instructions[step][1]);
                    } else if (this.instructions[step][2] === "highlight") {
                        this.highlightElements([this.instructions[step][0], this.instructions[step][1]]);
                    } else if (this.instructions[step][2] === "finish") {
                        this.createGraph(this.array, this.state.bars, { fill: 'green', fillWeight: 2 });
                        this.finished = true;
                        this.inProgress = false;
                        this.stopped = true;
                    }
                    step++;
                }, this.state.velocity * i); 
            }
        }
    }

    sortInsertionsort() { // complete
        if(this.finished === false && this.inProgress === true) {
            return;
        } else {
            this.finished = false;
            this.inProgress = true;
            this.stopped = false;

            this.instructions = [];
            var tmpArray = [];

            for (var i = 0; i < this.array.length; i++) {
                tmpArray.push(this.array[i]);
            }
        
            for (i = 1; i < tmpArray.length; i++) {
                var key = tmpArray[i];
                var j = i - 1;
                while (j >= 0 && key < tmpArray[j]) {
                    tmpArray[j + 1] = tmpArray[j];
                    this.instructions.push([[j, j + 1], i, "highlight with key"]);
                    this.instructions.push([[j, j + 1], i, "swap and highlight"]);
                    j--;
                }

                if (i > 1 && tmpArray[i] > tmpArray[j]) {
                    this.instructions.push([[j, j + 1], i, "highlight with key"]);
                    this.instructions.push([[j, j + 1], i, "highlight with green"]);
                }

                var highlight = [];
                for (var x = j; x < i + 1; x++) {
                    highlight.push(x);
                }
                if (highlight.length === 1) highlight.push(j);
                this.instructions.push([highlight, null, "highlight before"])

                tmpArray[j + 1] = key;
            }

            this.animateGraph(this.instructions);

            this.finished = true;
            this.inProgress = false;
            this.stopped = true;
        }
    }

    sortBubblesort() { // complete
        if(this.finished === false && this.inProgress === true) {
            return;
        } else {
            this.finished = false;
            this.inProgress = true;
            this.stopped = false;
            var i = 0;
            var barsCounter = this.state.bars - 2; // necessary for the logic of the bubble sort algo
            this.intervalHighlighter = setInterval(() => { 
                if (i > barsCounter) {
                    barsCounter--;
                    i = 0;
                }
                if (barsCounter < 0) { // function ends here
                    clearInterval(this.intervalHighlighter); // clears the hightlighter interval
                    clearInterval(this.intervalSwapper); // clears the swapper interval
                    this.createGraph(this.array, this.state.bars, { fill: 'green', fillWeight: 2 });
                    this.inProgress = false;
                    this.finished = true;
                } else {
                    this.highlightElements([i, i + 1]); // highlights everything else
                }
            }, this.state.velocity);
            this.intervalSwapper = setInterval(() => {
                if (this.array[i] > this.array[i + 1]) { // does the actual sort check
                    this.swapElements(i, i + 1);
                } else { // checks it as already sorted
                    this.highlightElements([i, i + 1], { fill: 'green' });
                }
                i++; // this needs to be at the end of the second interval for proper sequencing
            }, this.state.velocity * 2); // the 2 is necessary for proper sequencing
        }
    }

    mergeSort(array) {
        if (array.length > 1) {
            var middle = Math.floor(array.length / 2);
            var leftArray = array.slice(0, middle);
            var rightArray = array.slice(middle);

            this.mergeSort(leftArray);
            this.mergeSort(rightArray);

            var i = 0, k = 0, j = 0;
            while (i < leftArray.length && k < rightArray.length) {
                console.log(leftArray[i], rightArray[j]);
                if (leftArray[i] < rightArray[j]) {
                    array[k] = leftArray[i];
                    i++;
                } else {
                    array[k] = rightArray[j];
                    j++;
                }
                k++;
                this.instructions.push(array);
            }
            
            while (i < leftArray.length) {
                array[k] = leftArray[i];
                i++;
                k++;
            }
            
            while (j < rightArray.length) {
                array[k] = rightArray[j];
                j++;
                k++;
            }
        }
    }
    sortMergesort() { // tbd
        if(this.finished === false && this.inProgress === true) {
            return;
        } else {
            this.finished = false;
            this.inProgress = true;
            this.stopped = false;

            this.instructions = [];
            var tmpArray = [];

            for (var i = 0; i < this.array.length; i++) {
                tmpArray.push(this.array[i]);
            }

            this.mergeSort(tmpArray);

            this.finished = true;
            this.inProgress = false;
            this.stopped = true;
        }
    }

    shuffleArray(array) { // used for randomization 
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) { // while there remain elements to shuffle
            // picks a remaining element below
            randomIndex = Math.floor(Math.random() * currentIndex); 
            currentIndex -= 1;
            // swap the remaining element with the current element below
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
        // The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
        // https://github.com/coolaj86/knuth-shuffle
        // thanks https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    }

    randomizeArray() { 
        if(this.inProgress === true && this.finished === false){
            return;
        } else {
            let shuffledArray = [];
            for (let i = 0; i < this.state.bars; i++) {
                shuffledArray.push(i); // creates an array
            }
            this.array = [];
            for (let i = 0; i < this.state.bars; i++) {
                this.array.push(Math.random());
            }
            this.shuffleArray(shuffledArray).forEach( i => {
                this.updateArray(i, this.createBar(i, this.array[i], this.state.bars, { fill: 'red' }));
                this.setState({ arrayBars: this.arraySVG });
            });
            this.finished = false;
            this.stopped = false;
        }
    }

    render() {
        return (
            <div id="sectionRight">
                <svg id="graphSVG">
                	<RoughProvider>
                        { this.state.arrayBars }
                    </RoughProvider>
                </svg>
            </div>
        );
    }
}

export default Chart;
