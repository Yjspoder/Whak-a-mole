const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole'); 
  let lasthole;
  let timeUp = false;
  let score = 0;

  function randomTime(min , max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  function randomHole(holes){
      const idx = Math.floor(Math.random() * holes.length);
      const hole = holes[idx];
      
      if (hole === lasthole){
          console.log('Ah nah thats the same one bud');

          return randomHole(holes);
      }
      lasthole = hole;
      return hole;
  }

  function peek(){
      const time = randomTime(200, 1000);
      const hole = randomHole(holes);
      hole.classList.add("up");
      setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peek();
      }, time);
  
  }

  function startGame(e) {
      if(e.keyCode == 13){

          scoreBoard.textContent = 0;
          timeUp = false;
          score = 0;
          peek();
          setTimeout(() => timeUp = true, 10000)
      }

  }


  function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  document.addEventListener("keydown" , startGame);
  moles.forEach(mole => mole.addEventListener('click', bonk));