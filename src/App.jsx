import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as math from 'mathjs';
import { row } from 'mathjs';
import TextInput from './TextInput';
import OutputDisplay from './OutputDisplay';
import magicFunction from './ObfuscatedInputCode.js';
import PreviousInputDisplay from './PreviousInputDisplay';

function App() {
  
  const powerIteration = (matrix, rankMatrix) => {
    
    const mathMatrix = math.matrix([...matrix]);
    //const rankMatrix = math.matrix(ranks);
    const newRanks = math.multiply(mathMatrix, rankMatrix);
    return newRanks;
  }

  const handleInput = (input) => {
    const lines = input.split('\n');

    //The first token should be the number of lines of commmands
    //The second should be the number of power Iterations
    const tokensInLine0 = lines[0].split(' ');
    const numLines = parseInt(tokensInLine0[0]);
    const numPowerIterations = parseInt(tokensInLine0[1]);

    
    const websiteToID = {}; //Map that will store IDs (which will be used as array indices)
    const outDegrees = {};  //Maps an ID to that website's number of outgoing links
    
    let numWebsites = 0;  //Number of websites added so far
    const matrix = [[]];  //Initialize Matrix
    
    for(let i = 1; i < numLines + 1; i++){
      
      //Split into tokens. First token is the origin, 2nd is the destination
      const tokens = lines[i].split(' ');
      const fromSite = tokens[0];
      const destinationSite = tokens[1];

      
      

      //If websites haven't been seen yet, assign them IDs that will represent indices in the matrix
      if (!(fromSite in websiteToID))
      {
        const id = numWebsites;
        websiteToID[fromSite] = id;
        numWebsites++;


        setNodes([...nodes, fromSite ]); //Only used for visualization
      }

      if (!(destinationSite in websiteToID))
      {
        const id = numWebsites;
        websiteToID[destinationSite] = id;
        numWebsites++;

        setNodes([...nodes, destinationSite ]); //Only used for visualization
      }

      const fromSiteID = websiteToID[fromSite];
      const destinationSiteID = websiteToID[destinationSite];

      setEdges([...edges, [fromSite, destinationSite]]);


      //Set matrix[destination][source] to 1 to represent a link from source to representation
      //If the row has not been initialized, init to an empty array
      if (matrix[destinationSiteID] == undefined)  
      {
        matrix[destinationSiteID] = []; 
      }
      
      matrix[destinationSiteID][fromSiteID] = 1;
      
      //Increment outDegree for the source site
      outDegrees[fromSiteID] = (fromSiteID in outDegrees) ? outDegrees[fromSiteID] + 1 : 1;
    }

    //Initialize any empty outDegrees mappings to 0
    for (const website in websiteToID){
      if (!(websiteToID[website] in outDegrees))
      {
        outDegrees[websiteToID[website]] = 0;
      }
    }


    //Finalize the matrix
    //Every space M[i][j] should have a value of  1 / (outdegree of j) if there is a
    //link from i to j, or 0 if there is not
    
    //Calculate dimensions of the array once all empty spaces have been filled out
    const numRows = matrix.length;
    const listOfColumnLengths = matrix.reduce( (lengths, row) => {
      if (row != undefined)
      {
        lengths.push(row.length);
      }
      return lengths;
    }, []);

    const numCols = Math.max(...listOfColumnLengths);
    const numVertices = Math.max(numRows, numCols);

    //Fill in all rows
    for(let i = 0; i < numVertices; i++){
      if (matrix[i] == undefined)
      {
        matrix[i] = [];
      }
    }

    //Set all values to 1 / outDegree[column] if there is a link, or 0 if not
    
    for(let row = 0; row < numVertices; row++){
      for(let col = 0; col < numVertices; col++){

        if (matrix[row][col] === 1)
        {
          matrix[row][col] = 1 / outDegrees[col];
        }
        else{
          matrix[row][col] = 0;
        }
      }
    }


    //Create list of ranks
    //Initialize ranks to 1 / number of vertices
    let ranks = [];
    for(let i = 0; i < numVertices; i++){
      ranks[i] = 1 / numVertices;
    }

    let rankMatrix = math.matrix(ranks);

    for(let i = 1; i < numPowerIterations; i++){
      rankMatrix = powerIteration(matrix, rankMatrix);
    }

    const websiteURLs = (Object.keys(websiteToID)).sort();
    const websitesToRanks = {};
    websiteURLs.forEach((url) => {
      const id = websiteToID[url];

      websitesToRanks[url] = rankMatrix.get([id]);  //Get element from 1D math.js matrix
    }) 

    //return array of strings where each string is a website and its rank
    const outputArray = [];
    const formatTwoDecimalPlaces = (num) => num.toLocaleString('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    for (const siteName in websitesToRanks){
      const rank = parseFloat(websitesToRanks[siteName]);
      const str = siteName + ' ' + formatTwoDecimalPlaces(rank);
      outputArray.push(str);
    }
    
    return outputArray;
  }

  const [input, setInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [output, setOutput] = useState([]);

  //Used for visualization
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);


  return (
    <div className="App">
      <div className='heading'>
        <h1>PageRank Tester</h1>
        <h4>Project 2 for COP3530: Data Structures & Algorithms</h4>
        <h5>Created by R Chase Mooney</h5>
      </div>
      
        <TextInput input={input} setInput = {setInput}></TextInput>
      
      

      <button className='SubmitButton'
       onClick={() => {
        //setOutput(handleInput(input));
        setPreviousInput(input);
        setOutput(magicFunction(input)) //This does the calculations
        setInput('');
      }}
       name="Submit"
       type='submit'
      >
        Submit
      </button>

      <div style={{ display:'flex', margin:'auto', justifyContent:'center'}}>

        <div style={{width:'30%', marginRight:'30px'}}>
          <h2>Input:</h2>
          <PreviousInputDisplay previousInput={previousInput}></PreviousInputDisplay>
        </div>

        <div style={{width:'30%', marginLeft:'30px'}}>
          <h2 >Output:</h2>
          <OutputDisplay strings={output}></OutputDisplay>
        </div>

        
      </div>
      
      
      
    </div>
  )
}

export default App
