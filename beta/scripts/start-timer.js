
let isPaused = false;
let endEarly = false;
let rewind;

function startTimer(){
    document.getElementById('dark_background').style.display = 'none';

    let userChosenMinutes = (document.getElementById('minutes').value) * 60000;
    let userChosenSeconds = (document.getElementById('seconds').value) * 1000;
    let timerAmount = userChosenMinutes + userChosenSeconds;
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
            let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            let formattedMinutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
            let formattedSeconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});

            let timeRemaining = timeDifference/timerAmount;
            let greyPercentage = timeRemaining * 360;
            let redPercentage = 360 - greyPercentage;

            document.getElementById("countdown").style.display = 'block';
            document.getElementById("countdown").innerHTML = formattedMinutes + ":" + formattedSeconds;

            // UNCOMMENT THE ABOVE LINE TO GET THE TICKING CLOCK BACK
            document.getElementById('timer_ring').style.background = 'conic-gradient(var(--orange-red) ' + redPercentage + 'deg, lightgrey ' + redPercentage + 'deg ' + greyPercentage + 'deg)';
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
                document.getElementById('reset_button').style.display = 'block';

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
    document.getElementById('timer_ring').style.background = 'lightgrey';
    document.getElementById('timer_center').style.background = 'rgb(245, 243, 237)';
    document.getElementById('countdown').style.color = 'black';
    document.getElementById('body').style.background = 'rgb(245, 243, 237)';
    document.getElementById('pause_button').style.display = 'none';
    document.getElementById('reset_button').style.display = 'none';
    document.getElementById('start_button').style.display = 'block';
    document.getElementById('user-input-timer').style.display = 'flex';
}

function endTimer(){
    endEarly = true;
    if (isPaused){
        isPaused = false;
        document.getElementById('resume_button').style.display = 'none';
    }
}

function initiate_prompt(){
    document.getElementById('dark_background').style.display = 'flex';
    setTimeout(startTimer, 5000);
}