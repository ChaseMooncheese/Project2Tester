import PreviousInputDisplay from "./PreviousInputDisplay";
import RandomizeButton from "./RandomizeButton";

export default function TextInput(props){
    
    const isValid = ( () => {
       // const regex = new RegExp('^\d \d(\s)*\n(\w+ \w+\s*\n*)*$');
        const regex = /^\d+ \d+\s*\n(\w+ \w+\s*\n)*(\w+ \w+\s*\n*)$/;
        //console.log(regex.test(props.input.replaceAll('.', '')));
        //console.log(props.input.replaceAll('.', ''))
        //console.log(props.input.replaceAll('.', ''));

        return regex.test(props.input.replaceAll('.', '')) || /^(\d \d)*$/.test(props.input);

    })

    
    
    return (
        <div className={`textInput ${isValid() ? '' : 'invalidInput'}`}>
            <textarea
            name= "textarea"
            placeholder="Enter input: "
            value={props.input}
            onChange={e => props.setInput(e.target.value)}
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            /> 

            <RandomizeButton setInput={props.setInput}></RandomizeButton>
        </div>
        
    )
}