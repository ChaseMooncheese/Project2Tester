const generateRandomString = function(length){
    return Math.random().toString(20).substring(2, length)
}

const listOfWebsites = ['google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'instagram.com', 'wikipedia.org', 'ufl.edu', 'roblox.com', 'weather.com', 'aman.com', 'stackoverflow.com', 'openai.com', 'zoom.us', 'microsoft.com', 'apple.com', 'samsung.com', 'disney.com', 'pcbuildinguf.com', 'reactjs.org', 'mozilla.org', 'getbootstrap.com', 'github.com', 'python.org', 'chase.com'];

export default function RandomizeButton(props){

    const generateRandomTestCase = () => {
        
        const numWebsitesToUse = Math.floor(2 + Math.random() * (listOfWebsites.length - 2));
        const numPossibleCombinations = Math.trunc((numWebsitesToUse * numWebsitesToUse - numWebsitesToUse) / 2);
        //const numWebsitesToUse = 1;
        //const numLines = Math.floor(2 + Math.random() * 20);
        const numLines = Math.floor(1 + Math.random() * numPossibleCombinations);
        const numPowerIterations = Math.floor(1 + Math.random() * 17);

        console.log(numLines);
        console.log(numWebsitesToUse);
        console.log();
        console.log('');


        let output = '' + numLines + ' ' + numPowerIterations + '\n';

        //pick number of websites to choose between
        
        
        
        const sitesSet = new Set([]);

        while (sitesSet.size < numWebsitesToUse){
            const randomIndex = Math.floor(Math.random() * listOfWebsites.length);
            sitesSet.add(listOfWebsites[randomIndex]);
        }
        console.log(sitesSet);

        const sites = Array.from(sitesSet);

        let lineCount = 0;
        
        const linesAdded = new Set();   //used to avoid duplicate lines
        let numDuplicates = 0;
        while (lineCount < numLines){
            const firstURLIndex = Math.floor(Math.random() * sites.length);
            const secondURLIndex = Math.floor(Math.random() * sites.length);
            if (firstURLIndex === secondURLIndex)
            {
                continue;
            }
            
            const firstURL = sites[firstURLIndex];
            const secondURL = sites[secondURLIndex];
            
            const newLine = firstURL + ' ' + secondURL + '\n';

            //If line is duplicate
            if (linesAdded.has(newLine) && numDuplicates < 20)
            {
                numDuplicates++;
                continue;
            }
            

            output += newLine;
            linesAdded.add(newLine);
            lineCount++;
        }
        return output;
        


    }

    return (
    <div className="RandomizeSection">
        <h4>Generate: </h4>
            <button className="RandomizeButton" onClick={() => {props.setInput(generateRandomTestCase())}}>
                <span className="material-symbols-outlined biggerIcon">
                shuffle
                </span>
            </button>
        
    </div>
    
    )
}