import Button from '@material-ui/core/Button'
import {addDays} from 'date-fns'
function AutoScheduleButton(props) {
    let handleClick = ()=>{
        alert("Please wait, this will take time");
        let currentDate = new Date(Date.now());
        while (currentDate.getDay() != 1) {
            currentDate = addDays(currentDate,1); // find monday
        }
        fetch(props.api+"schedule/autoschedule", {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({date:currentDate})
        }).then(ret.text()).then((ret)=>{
            if (ret==="success")
                alert("Successfully autoscheduled starting on Monday: "+currentDate)
            else
                alert("Was unable to autoschedule.")
        }).catch((err)=>alert("Failed while attempting to autoschedule"));
    }
    return ( 
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={()=>handleClick()}
    >Autoschedule
    </Button>
    )
    }
    export default AutoScheduleButton;