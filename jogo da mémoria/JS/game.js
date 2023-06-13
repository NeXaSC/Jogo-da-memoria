const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const scoreElement = document.querySelector('#score-value');

const characters = [
    'Sonic',
    'Tails',
    'Knuckles',
    'Amy',
    'Eggman',
    'Silver',
    'Blaze',
    'Cream',
    'Jet',
    'Shadow',
];  
    

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`  );
    }
}

let score = 0;
let numAttempts = 0;

const updateScore = () => {
  score += 1;
  scoreElement.innerHTML = score;
  checkEndGame();

  firstCard.firstChild.classList.add('disable-card');
  secondCard.firstChild.classList.add('disable-card');

  firstCard = '';
  secondCard = '';

};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-characters');
    const secondCharacter = secondCard.getAttribute('data-characters');

    numAttempts++;

    if (firstCharacter === secondCharacter) {
        updateScore();

        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');
        
        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}



const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }
    else if(secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        
        checkCards();
    }

}

const createCard = (characters) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${characters}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-characters', characters);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];


    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((characters) => {

        const card = createCard(characters);
        grid.appendChild(card);
        
    });

}

const startTimer = () => {

    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);
}

window.onload = () => {

    const playerName = localStorage.getItem('player');
    startTimer();
    spanPlayer.innerHTML = playerName;

    loadGame();
}


