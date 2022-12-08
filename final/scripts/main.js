let isPaused = false;
let endEarly = false;
let pausedTime = 0;
let resumedTime = 0;
let reverseTime = 0;
let totalReverseTime = 0;
let oneHourFromNow;
let rewind;
let lastTimeSet = '';
let validation;


// MAKE SURE YOU CHANGE THE AUTHORS ARRAY ALONGSIDE THE PROMPTS ARRAY IF YOU ADD/REMOVE ENTIRES
let prompts = [
    "Write about an impulsive purchase with drastic consequences.", 
    "Write a story where a character gets the opportunity to earn their greatest desire.",
    "Write a story about a character going through a dream.",
    "A photographer discovers something strange in one of thier photographs.",
    "You find a letter in the mail. How do you respond?",
    "Write a story where a character joins a secret society.",
    "Write a story where an artist struggles to produce thier masterpiece.",
    "Write a story where a character tells a lie.",
    "Write a story in second-person perspective (you/your/yours)",
    "Write a story where a character needs to say goodbye.",
    "Write a story starting from the ending.",
    "You recieve a text from an unknown number. How do you respond?",
    "Write a story about a secret room.",
    "A character loves someone, but they don't love them back.",
    "Write about a character who meets someone for the first time.",
    "Find a random word in the dictionary, and write a story based on that word.",
    "Write a story involving a set of numbers that hold a special meaning.",
    "Write a story where a character needs to do something they don't want to do.",
    "Write a story about a fear you hold.",
    "Write a story about something that makes you happy.",
    "Write a story where a character finds a missing piece of jewelery."
];

let authors =[
    "Writer's Digest",
    "Writer's Digest",
    "Writer's Digest",
    "Writer's Digest",
    "Writer's Digest",
    "Roger Korpics",
    "Roger Korpics",
    "Writer's Digest",
    "PrepScholar",
    "PrepScholar",
    "PrepScholar",
    "PrepScholar",
    "PrepScholar",
    "thinkwritten",
    "thinkwritten",
    "thinkwritten",
    "thinkwritten",
    "thinkwritten",
    "thinkwritten",
    "thinkwritten",
    "thinkwritten"
];


// Allows JS To handle timer input submissions.
let form = document.getElementById("user-input-timer");
function handleForm(event) { 
    event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);


// Checks for local storage, and adds in 'prompts' array if it's unestablished.
function readData() {
  console.log("readData called");

  // Does this browser support local storage?
  if (typeof (Storage) !== "undefined") {
    let lastTimeSet = window.localStorage.getItem('lastTimeSet');
    document.getElementById("minutes").value = lastTimeSet;
  } else {
    // Sorry! No Web Storage support..
    alert('This browser does NOT support local storage');
  }
}


// Activates the timer, reports time-remaining, updates the timer value and ring percentage.
function startTimer(){
    document.getElementById('dark_background').style.display = 'none'; // Clears the visuals of the prompt reveal animation.
    window.localStorage.setItem('lastTimeSet',document.getElementById('minutes').value); // Updates localstorage with time the user inputted so that it remembers for next time.
    document.getElementById("current_prompt_text").classList.add("current_prompt_reveal"); // Creates the cool fade in after the prompt reveal screen.
    document.getElementById("current_prompt_text").classList.remove("current_prompt_hide");
    let userChosenMinutes = validation * 60000; // Takes the input time and converts it to milliseconds. 1m = 60,000ms. This is because the Date() function reads time in milliseconds.
    let timerAmount = userChosenMinutes;
    let newTime = new Date().getTime(); // Gets the current time
    let oneHourFromNow = new Date(newTime + timerAmount).getTime(); // This calculates the deadline. It's basically (the present time in milliseconds) + (the number of minutes the user wants to do the acitivity in milliseconds).     

    // Runs every single second
    let x = setInterval(function() {
        // If the timer isn't paused, run this.
        if(!isPaused){

            let deadline = oneHourFromNow + totalReverseTime; // Shifts the deadline forward by the number of milliseconds spent paused.
            let currentTime = new Date().getTime();
            let timeDifference = deadline - currentTime; // Calculates how close the present time is to the set deadline. 

            // Reformats the timeDifferent number from milliseconds.
            let minutes = Math.floor((timeDifference % (1000 * 60 * userChosenMinutes)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Turns the values into usable strings
            let formattedMinutes = minutes.toLocaleString('en-US');
            let formattedSeconds = seconds.toLocaleString('en-US' , {minimumIntegerDigits: 2});

            // TimerAmount = How close the user is to the deadline / the deadline. Determines percentage complete.
            let timeRemaining = timeDifference/timerAmount;

            let greyPercentage = timeRemaining * 360; // Multiplied so that 1 = 360, and can therefor be converted into degrees in a circle.
            let redPercentage = 360 - greyPercentage; // Opposite of greyPercentage. As timeRemaining gets smaller, the redPercentage gets bigger.

            document.getElementById("countdown").style.display = 'block';
            document.getElementById("countdown").innerHTML = formattedMinutes + ":" + formattedSeconds;

            //Creates the timer ring.
            document.getElementById('timer_ring').style.background = 'conic-gradient(var(--orange-red) ' + redPercentage + 'deg, var(--white) ' + redPercentage + 'deg ' + greyPercentage + 'deg)';
            document.getElementById('user-input-timer').style.display = 'none';

            // Runs under the condition that the timeDifference has reached a negative number, or if endEarly is set to "true"
            if (timeDifference < 0 || endEarly) {
                clearInterval(x);
                document.getElementById('pause_button').style.display = 'none';
                document.getElementById('end_button').style.display = 'none';
                document.getElementById('start_button').style.display = 'flex';
                document.getElementById('user-input-timer').style.display = 'flex';
                document.getElementById("current_prompt_text").innerHTML = 'Set the timer and press play to begin your writing challenge.';
                resetTimer();
            }
        };
    }, 1);

};

// Pauses the timer
function pauseTimer(){
    pausedTime = new Date().getTime(); // Captures the time that the pause begins so that can compensate for it when it resumes.
    isPaused = true; // Prevents setInterval from running in startTimer()

    // Swaps pause button for resume button
    document.getElementById('pause_button').style.display = 'none';
    document.getElementById('resume_button').style.display = 'flex';
};

function resumeTimer(){
    resumedTime = new Date().getTime(); // Captures the resumed time.
    isPaused = false; // Starts setInterval back up.

    // Swaps back in the pause button.
    document.getElementById('pause_button').style.display = 'flex';
    document.getElementById('resume_button').style.display = 'none';

    // Sets the value of reverse time to equal the difference between pausedTime and resumedTime
    reverseTime = resumedTime - pausedTime;

    // Adds the difference to the totalReverseTime, which determines how much to set the deadline back.
    totalReverseTime += reverseTime;
};

// Sets everything back to square one.
function resetTimer(){
    timeDifference = 0;
    endEarly = false;
    document.getElementById("countdown").style.display = "none";
    document.getElementById('timer_ring').style.background = 'var(--white)';
    document.getElementById('timer_center').style.background = 'var(--white)';
    document.getElementById('countdown').style.color = 'var(--black)';
    document.getElementById('body').style.background = 'var(--white)';
    document.getElementById('pause_button').style.display = 'none';
};

// Triggers the endEarly condition in startTimer() and resets the pause button if the user was paused.
function endTimer(){
    endEarly = true;
    if (isPaused){
        isPaused = false;
        document.getElementById('resume_button').style.display = 'none';
    };
};

// Triggers when user submits the minutes form
function initiate_prompt(){
    document.getElementById('user-input-timer').style.display = 'none'; //Removes the input field
    document.getElementById('minutes').blur(); // Unfocuses the field so that user can't make changes.
    validation = document.getElementById('minutes').value; // Grabs the value of the form
    document.getElementById("countdown").innerHTML = validation + ":00"; // Sets the inner HTML to the start time so that it has a smoother transition between states.
    document.getElementById("countdown").style.display = 'block';

    // Resets pause time variables.
    pausedTime = 0;
    resumedTime = 0;
    reverseTime = 0;
    totalReverseTime = 0;

    // Reads the current length of the prompts variable.
    let promptListLength = prompts.length;

    // Selects a random prompt from the list.
    let chosenPrompt = Math.floor(Math.random() * promptListLength);
    
    document.getElementById("prompt_reveal_large").innerHTML = prompts[chosenPrompt]; // Displays the chosen prompt on the prompt reveal
    document.getElementById("current_prompt_text").classList.remove("current_prompt_reveal");
    document.getElementById("current_prompt_text").classList.add("current_prompt_hide"); // Adds the fade out animation class to the smaller prompt above the circle
    document.getElementById("prompt_author").innerHTML = "Source: " + authors[chosenPrompt]; // Reads the corresponding author of the prompt based on the prompt list


    // This gets triggered one second after the prompt is initiated.
    function updatePromptText(){
        document.getElementById("current_prompt_text").innerHTML = prompts[chosenPrompt]; // Updates the smaller prompt info above the circle
       
        // Changes the UI behind the scenes so that it's not jarring
        document.getElementById('start_button').style.display = 'none';
        document.getElementById('pause_button').style.display = 'flex';
        document.getElementById('end_button').style.display = 'flex';
    };

    setTimeout(updatePromptText, 1000);
    document.getElementById('dark_background').style.display = 'flex'; // Shows the prompt reveal animation
    setTimeout(startTimer, 5000); // Starts the timer five seconds after initiations
};

// Animation trigger for showing app info
function showInfo(){
    let element = document.getElementById("info_background");
    let info = document.getElementById("info_container");
    element.style.display = 'flex';
    element.classList.remove("info_close");
    info.classList.remove("info_container_close");
    element.classList.add("info_open");
    info.classList.add("info_container_open");
};

// Animation trigger for hiding app info
function hideInfo(){
    let element = document.getElementById("info_background");
    let info = document.getElementById("info_container");
    element.classList.remove("info_open");
    info.classList.remove("info_container_open");
    element.classList.add("info_close");
    info.classList.add("info_container_close");
    setTimeout(closeInfo, 1000);
};

// Fully removes the info box after one second.
// Did this so that its not a jarring change.
function closeInfo(){
    let element = document.getElementById("info_background");
    element.style.display = 'none';
};


