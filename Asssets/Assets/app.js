/**
 * 2C = Two of clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntos_jugador = 0;
let puntos_com = 0;
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartascom = document.querySelector("#com-cartas");
const smalls = document.querySelectorAll("small");

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas";
    console.log("???????????");
  }
  const cartas = deck.pop();
  return cartas;
};
//for (let i = 0; i <= 100; i++) {
// pedirCarta();
//}
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};
//turno pc
const turnoCom = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntos_com = puntos_com + valorCarta(carta);
    smalls[1].innerText = puntos_com;
    const imgCarta = document.createElement("img");
    imgCarta.src = `Assets/cartas/${carta}.png`;
    imgCarta.classList.add("cartas");
    divCartascom.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntos_com < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntos_com === puntosMinimos) {
      alert("Empate");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntos_com > 21) {
      alert("Ganaste");
    } else {
      alert("Computadora gana");
    }
  }, 50);
};
//Evento
btnPedir.addEventListener("click", function () {
  const carta = pedirCarta();
  puntos_jugador = puntos_jugador + valorCarta(carta);
  smalls[0].innerText = puntos_jugador;
  const imgCarta = document.createElement("img");
  imgCarta.src = `Assets/cartas/${carta}.png`;
  imgCarta.classList.add("cartas");
  divCartasJugador.append(imgCarta);

  if (puntos_jugador > 21) {
    console.warn("has pardido");
    btnPedir.disabled = true;
    turnoCom(puntos_jugador);
  } else if (puntos_jugador === 21) {
    console.info("Ganaste");
    btnPedir.disabled = true;
    turnoCom(puntos_jugador);
  }
});
btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoCom(puntos_jugador);
});
btnNuevo.addEventListener("click", () => {
  deck = crearDeck();
  puntos_jugador = 0;
  puntos_com = 0;
  smalls[0].innerText = 0;
  smalls[1].innerText = 0;
  divCartasJugador.innerHTML = "";
  divCartascom.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
