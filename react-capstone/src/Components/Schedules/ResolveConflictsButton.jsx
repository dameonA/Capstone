import Button from '@material-ui/core/Button'
import {addDays} from 'date-fns'
function ResolveConflictsButton(props) {
    let handleClick = ()=>{
        alert("Please wait, this will take time");
        fetch(props.api+"schedule/resolve", {
            method: "POST"
        }).then((ret)=>{
            if (ret==="success") {
                alert("Successfully resolved all conflicts")
            }else{
                alert("Was unable to resolve all conflicts.")
            }
        }).catch((err)=>alert("Failed while resolving conflicts"));
    }
    return ( 
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={()=>handleClick()}
    >Resolve All Conflicts
    </Button>
    )
    }
    export default ResolveConflictsButton;