function startTimer(){
    let newTime = new Date().getTime();
    let timerAmount = 30000;
    let oneHourFromNow = new Date(newTime + timerAmount).getTime();
    let x = setInterval(function() {
    let currentTime = new Date().getTime();
    let timeDifference = oneHourFromNow - currentTime;
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let formattedMinutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
    let formattedSeconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});

    let timeRemaining = timeDifference/timerAmount;
    
    let greyPercentage = timeRemaining * 360;
    let redPercentage = 360 - greyPercentage;

    
    console.log(redPercentage);
    console.log(greyPercentage);

    document.getElementById("countdown").innerHTML = formattedMinutes + ":" + formattedSeconds;
    //document.getElementById('timer_ring').style.background = 'conic-gradient(red 48deg, grey 48deg 195deg)';
    document.getElementById('timer_ring').style.background = 'conic-gradient(red ' + redPercentage + 'deg, lightgrey ' + redPercentage + 'deg ' + greyPercentage + 'deg)';
    
    document.getElementById('start_button').style.display = 'none';
    

    if (timeDifference < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "00:00";
        document.getElementById('timer_ring').style.background = 'black';
        document.getElementById('timer_center').style.background = 'red';
        document.getElementById('countdown').style.color = 'white';
        document.getElementById('body').style.background = 'red';

    }
    }, 1);

};