let $rolls = [];
let $score = [];
let $thisframe = [];
let currentFrame = 1;

function pinHit(numpins) {
  const $frames = $('#frameinput').children('td');
  $scoreframe = $('#score-row').children('td');

  if (currentFrame <= 12) {
    if (numpins >= 0 && numpins <= 10) {
      if (numpins === 10 && $thisframe.length === 0) {
        $rolls.push([10]);
        $frames.eq(2 * currentFrame - 1).text("X"); // need account for 10th frame
        currentFrame++;
        $thisframe = [];
      } else if($thisframe.length === 0) {
        $thisframe.push(numpins);
        $rolls[currentFrame - 1] = $thisframe;
        $frames.eq(2 * currentFrame - 2).text($thisframe[0]);
      } else {
        numpins = (numpins + $thisframe[0] > 10 ) ? 10 - $thisframe[0]:numpins;
        $thisframe.push(numpins);
        $frames.eq(2 * currentFrame - 1).text($thisframe[1]);
        $rolls[currentFrame - 1] = $thisframe;
        currentFrame++;
        $thisframe = [];
      }
    }
  }
  updateScore();
}

function updateScore() {
  var i = $score.length;
  var strikes = 0;
  var spare = false;
  
  while (i < $rolls.length) {
    const frame = $rolls[i];
    if(strikes > 0) {
      if(frame.length === 2){
        logscore(10 + frame[0] + frame[1]);
        strikes--;
      }
      else if(strikes === 2) {
        logscore(20 + frame[0]);
        break;
      }
      else if(frame[0] === 10){
        strikes++;
        i++;
      }
    }
    else if(spare === true) {
      logscore(10 + frame[0]);
      break;
    }
    else if(frame[0] === 10){
      strikes++;
      i++;
    }
    else if (frame[0] !== 10 && frame[0] + frame[1] === 10) {
      i++; // you got spare check next frame
      spare = true;
    }
    else if (frame.length === 1 ) {
      break;
      //first roll don't track score
    }
    else {
      logscore(frame[0] + frame[1]);
      break;
    }
  }
}

function logscore(thisscore) {
  if ($score.length === 0) {
    $score.push(thisscore);
  }
  else {
    thisscore = thisscore + $score[$score.length - 1];
    $score.push(thisscore);
  }
  $scoreframe.eq($score.length - 1).text(thisscore);
}
function resetGame() {
  $rolls = [];
  $thisframe = [];
  $score = [];
  currentFrame = 1;
  $('#frameinput').children('td').empty();
  $('#score-row').children('td').empty();
}

$(document).ready(function(){
  $('#reset').click(resetGame);
});
