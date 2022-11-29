let isPaused = false;
let endEarly = false;
let rewind;

let prompts = [
    'You are sitting at a bar talking to a giraffe. What is your conversation about?', /* By Mel Wicks from SmartBlogger */
    'A shoe falls out of the sky. Justify why.', /* by Laura Staffaroni from Prep Scholar*/
    '"Two weeks passed and it happened again..."', /* from The Mysteries of Harris Burdick */
    'Write a story in second-person perspective (you/your/yourself)', /* by Laura Staffaroni from Prep Scholar*/
    'Look around the room and write a story about the first object you notice.',
    'You recieve a text message from an unknown number. How do you respond?',
    'You find a secret room in your house. What do you do?',
    'Someone puts a large black box on your doorstep. A note on the front reads "Caution: may bite."',
    'You wake up to discover a completely different, unknown face staring back at you from the mirror.',
    'Local gravestones start dissappearing. Why?',
    '"...and that is why dividing by three is illegal."',
    'Write a story where someone decides to take the long way home',
    'Write about a time that you were lost.'
];

let mainNdx = 0;

function readData() {
  console.log("readData called");
  // Does this browser support local storage?
  if (typeof (Storage) !== "undefined") {
    window.localStorage.setItem('prompts', JSON.stringify(prompts));
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
  preventDefault();

}


function startTimer(){
    document.getElementById('dark_background').style.display = 'none';

    let userChosenMinutes = (document.getElementById('minutes').value) * 60000;
    let timerAmount = userChosenMinutes;
    let newTime = new Date().getTime();
    
/*     if (isPaused){
        let pausedTime = new Date().getTime();
        let x = setInterval(function() {
            let currentTime = new Date().getTime();
            let reverseTime = currentTime - pausedTime;
            return reverseTime;
            }, 1);
    }; */
    
    let oneHourFromNow = new Date(newTime + timerAmount).getTime();
        
    let x = setInterval(function() {
        if(!isPaused){

            let currentTime = newTime += 4.55
            

            timeDifference = oneHourFromNow - currentTime;
            let minutes = Math.floor((timeDifference % (1000 * 60 * userChosenMinutes)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            let formattedMinutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 3});
            let formattedSeconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});

            let timeRemaining = timeDifference/timerAmount;
            let greyPercentage = timeRemaining * 360;
            let redPercentage = 360 - greyPercentage;

            document.getElementById("countdown").style.display = 'block';
            document.getElementById("countdown").innerHTML = formattedMinutes + ":" + formattedSeconds;

            // UNCOMMENT THE ABOVE LINE TO GET THE TICKING CLOCK BACK
            document.getElementById('timer_ring').style.background = 'conic-gradient(var(--orange-red) ' + redPercentage + 'deg, rgb(245, 243, 237) ' + redPercentage + 'deg ' + greyPercentage + 'deg)';
            document.getElementById('user-input-timer').style.display = 'none';
            document.getElementById('start_button').style.display = 'none';
            document.getElementById('pause_button').style.display = 'flex';
            document.getElementById('end_button').style.display = 'flex';


            if (timeDifference < 0 || endEarly) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "00:00";
                document.getElementById('timer_ring').style.background = 'black';
                document.getElementById('timer_center').style.background = 'var(--orange-red)';
                document.getElementById('countdown').style.color = 'white';
                document.getElementById('body').style.background = 'var(--orange-red)';
                document.getElementById('pause_button').style.display = 'none';
                document.getElementById('end_button').style.display = 'none';
                resetTimer();


            }
        };
    }, 1);

};

function pauseTimer(){
    isPaused = true;
    document.getElementById('pause_button').style.display = 'none';
    document.getElementById('resume_button').style.display = 'flex';
};
function resumeTimer(){
    isPaused = false;
    document.getElementById('pause_button').style.display = 'flex';
    document.getElementById('resume_button').style.display = 'none';
}

function resetTimer(){
    timeDifference = 0;
    endEarly = false;
    document.getElementById("countdown").style.display = "none";
    document.getElementById('timer_ring').style.background = 'rgb(245, 243, 237)';
    document.getElementById('timer_center').style.background = 'rgb(245, 243, 237)';
    document.getElementById('countdown').style.color = 'black';
    document.getElementById('body').style.background = 'rgb(245, 243, 237)';
    document.getElementById('pause_button').style.display = 'none';
    document.getElementById('reset_button').style.display = 'none';
    document.getElementById('start_button').style.display = 'block';
    document.getElementById('user-input-timer').style.display = 'flex';
    document.getElementById("current_prompt_text").innerHTML = 'Set the timer and press play to begin your writing challenge.';
}

function endTimer(){
    endEarly = true;
    if (isPaused){
        isPaused = false;
        document.getElementById('resume_button').style.display = 'none';
    }
}

function initiate_prompt(){

    let unusedPrompts = window.localStorage.getItem('prompts');
    let unusedPromptsArray = JSON.parse(unusedPrompts);
    if (unusedPrompts == "[]"){
        window.localStorage.setItem('prompts', JSON.stringify(prompts));
        let unusedPrompts = window.localStorage.getItem('prompts');
        unusedPromptsArray = JSON.parse(unusedPrompts);
    }
    let promptListLength = unusedPromptsArray.length;

    let chosenPrompt = Math.floor(Math.random() * promptListLength);
    console.log(chosenPrompt);
    document.getElementById("prompt_reveal_large").innerHTML = unusedPromptsArray[chosenPrompt];
    document.getElementById("current_prompt_text").innerHTML = unusedPromptsArray[chosenPrompt];

    unusedPromptsArray.splice(chosenPrompt, 1);

    


    /* let newPromptList = prompts.splice(chosenPrompt, promptListLength - 1); */
  
    window.localStorage.setItem('prompts', JSON.stringify(unusedPromptsArray));
    document.getElementById('dark_background').style.display = 'flex';
    setTimeout(startTimer, 5000);
}
