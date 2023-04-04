import CopiedTooltip from "./CopiedTooltip";

const copyToClipboard = async (str) => {

    if (str =='')
    {
        return;
    }
    try {
        await navigator.clipboard.writeText(str);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
}

export default function PreviousInputDisplay(props){

    const strings = props.previousInput.split('\n');

    const output = strings.map( (string, index) => {
        return <h4 key={index}>{string}</h4>
    });
    
    
    return (props.previousInput.length == 0) ? <div></div> :
        (
        <div className="PreviousInput">
            {output}
            <button className="CopyButton" onClick={() => {copyToClipboard(props.previousInput)}}>
                <span className="material-symbols-outlined">
                    content_copy
                </span>
                <CopiedTooltip></CopiedTooltip>
            </button> 
        </div>
        
        )
}