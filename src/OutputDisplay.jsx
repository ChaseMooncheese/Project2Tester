import CopiedTooltip from "./CopiedTooltip";

export default function OutputDisplay(props){

    let [x, setX] = useState('');

    const copyOutputToClipboard = async (outputArray) => {
        if (outputArray.length === 0)
        {
          return;
        }

        
        const str = outputArray.reduce((copyString, currentString) => {
            copyString += ('\n' + currentString);
            return copyString
        });

        try {
          await navigator.clipboard.writeText(str);
          console.log('Content copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    } 

    const output = props.strings.map( (str, index) => {
        return (
            <h4 key={index}>{str}</h4>
        );
    });
    
    return (props.strings.length == 0) ? <div></div> :
        (
        <div className="Output">
            {output}
            <button className="CopyButton" onClick={() => {copyOutputToClipboard(props.strings)}}>
                <span className="material-symbols-outlined">
                    content_copy
                </span>
                <CopiedTooltip></CopiedTooltip>
            </button> 
        </div>
        
        )
}