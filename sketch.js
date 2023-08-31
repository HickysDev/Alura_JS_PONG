//variaveis da bola
let xBola = 300;
let yBola = 200;
let dBola = 20;
let rBola = dBola / 2;

//velocidade da bola
let velXBola = 10;
let velYBola = 10;

//variaveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;

//padrao de tamanho das raquetes
let wRaquete = 10;
let hRaquete = 90;

//variaveis da raquete do openente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let velYOp;
let chanceDeErrar = 0;

let colidiu = false;

//variaveis de placar
let pontosMeu = 0;
let pontosOp = 0;


//sons
let raquetadas;
let ponto;
let trilha;


function preload(){
  trilha = loadSound("sons/trilha.mp3");
  raquetadas = loadSound("sons/raquetada.mp3");
  ponto = loadSound("sons/ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bola();
  mostraRaquete(xRaquete, yRaquete);
  //verificaColisaoRaquete();
  movimentaRaquete();
  colisaoMinhaRaqueteBib(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOp, yRaqueteOp);
  colisaoMinhaRaqueteBib(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteOp();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function bola() {
  circle(xBola, yBola, dBola);

  xBola += velXBola;
  yBola += velYBola;

  if (xBola + rBola > width || xBola - rBola < 0) {
    velXBola *= -1;
  }

  if (yBola + rBola > height || yBola - rBola < 0) {
    velYBola *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentaRaquete() {
  //movimentacao da raquete
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }

  yRaquete = constrain(yRaquete, 0, 310);
}

function movimentaRaqueteOp() {
  //movimentacao da raquete do oponente

  //Se quiser jogar contra a máquina
  velYOp = yBola - yRaqueteOp - wRaquete / 2 - 30;
  yRaqueteOp += velYOp + chanceDeErrar;
  calculaChanceDeErrar();

  
  //se quiser jogar com alguem 87=W e 83=S
  //if (keyIsDown(87)) {
    //yRaqueteOp -= 10;
  //}
  //if (keyIsDown(83)) {
    //yRaqueteOp += 10;
  //}

  yRaqueteOp = constrain(yRaqueteOp, 0, 310);
}

function calculaChanceDeErrar(){
  if (pontosOp >= pontosMeu) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
  if (xBola - rBola < 0){
  xBola = 23
  }
}


function verificaColisaoRaquete() {
  if (
    xBola - rBola < xRaquete + wRaquete &&
    yBola - rBola < yRaquete + hRaquete &&
    yBola + rBola > yRaquete
  ) {
    velXBola *= -1;
    raquetadas.play();
  }
}

function colisaoMinhaRaqueteBib(x, y) {
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBola, yBola, rBola);

  if (colidiu) {
    velXBola *= -1;
    raquetadas.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(150, 5, 40, 30);
  rect(450, 5, 40, 30);
  fill(255);
  text(pontosMeu, 170, 26);
  fill(255);
  text(pontosOp, 470, 26);
}

function marcaPonto() {
  if (xBola < 10) {
    pontosOp += 1;
    ponto.play();
  }
  if (xBola > 590) {
    pontosMeu += 1;
    ponto.play();
  }
}
