
////maquina de estados de escenas
const E = {
  NO: 0,
  TEXTO: 1,
  NUBE: 2,
  DEMONIA: 3,
  FINAL: 4
};
///MAquina de estasdos del fondo
const F = {
  NOCHE: 0,
  CREPUSCULO: 1,
  TRANSICION: 2,
  OSCURIDAD: 3,
  DIA: 4
};

let estadoFondo = F.NOCHE;

// MAQUINA DE ESTADOS DE INTERACCION

const I = {
  CLICK: 0,
  FLECHAS: 1,
  AVANCE: 2,
  SCROLL: 3
};

let estadoInteraccion = I.CLICK;


// imágenes
let ImgAEsc1;
let ImgAEsc3;
let ImgAEscf;
let ImgNubeEsc3;
let ImgDEsc3;
let ImgDEsc4;
let ImgDEscf;

// estado
let estado = E.NO;

let clicks = 0;
let nos = [];

let nubeY = 0;
let progresoNube = 0;
let movimientoAngel = 0;

// preload
function preload() {

  ImgAEsc1 = loadImage("./Angel/Escena1 a.png");
  ImgAEsc3 = loadImage("./Angel/escena 3 a.png");
  ImgAEscf = loadImage("./Angel/escena final a.png");

  ImgNubeEsc3 = loadImage("./escena nubecita 3.png");

  ImgDEsc3 = loadImage("./Demonia/escena 3 d silueta.png");
  ImgDEsc4 = loadImage("./Demonia/escena 4 d.png");
  ImgDEscf = loadImage("./Demonia/escena final d.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

function draw() {
  
actualizarFondo();
actualizarInteraccion();
  
  if (estado == E.NO) {
    escena_no();
  }

  else if (estado == E.TEXTO) {
    escena_texto();
  }

  else if (estado == E.NUBE) {
    escena_nube();
  }

  else if (estado == E.DEMONIA) {
    escena_demonia();
  }

  else if (estado == E.FINAL) {
    escena_final();
  }
}
//inicio escenas de nos

function escena_no() {

  let altoAngel = height * 1.4;

image(
  ImgAEsc1,
  width / 2,
  height / 2,
  altoAngel * ImgAEsc1.width / ImgAEsc1.height,
  altoAngel
);

  let oscuridad = map(clicks, 0, 60, 0, 255);
  fill(0, oscuridad);
  rect(0, 0, width, height);

  fill(255);

  for (let n of nos) {
    textSize(n.size);
    textFont("Times New Roman");
    text("NO", n.x + random(-2, 2), n.y + random(-2, 2));
  }
}

//escena de texto

function escena_texto() {


  fill(255);
  textSize(40);

  text(
    "No puedes amarla,\nsusurran,\nporque es un pecado.",
    width / 2,
    height / 2
  );
  
   textSize(30);
  text("↓", width / 2, height * 0.75);
}

//escena de nube
function escena_nube() {


  dibujar_infierno();

  let t = map(progresoNube, 10, 20, 0, 1);
  t = constrain(t, 0, 1);

  push();

  translate(0, nubeY);

  let altoNube = height * 1.4;

  image(
    ImgNubeEsc3,
    width / 2,
    height / 2,
    altoNube * ImgNubeEsc3.width / ImgNubeEsc3.height,
    altoNube
  );

  // TEXTO DENTRO DE LA NUBE 
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);

  text(
    "Solo sonríe ante sus palabras,\nsabiendo que no se han arrodillado ante su altar\nni han probado la divinidad que tienen sus labios.",
    width / 2,
    height / 2
  );

  pop();

  // transición visual (oscurece hacia demonia)
  fill(20, 0, 0, t * 255);
  rect(0, 0, width, height);

  // cambio de estado
  if (progresoNube >= 20) {
    estado = E.DEMONIA;
  }
}

//fondo que aparece para ver a silueta demonia

function dibujar_infierno() {

fill(180, 60, 60, 120);
rect(0, 0, width, height);

  let altoDemonia = height * 0.10;

  image(
    ImgDEsc3,
    width * 0.75,
    height * 0.5,
    altoDemonia * ImgDEsc3.width / ImgDEsc3.height,
    altoDemonia
  );

  let altoNube = height * 0.40;

  image(
    ImgNubeEsc3,
    width * 0.75,
    height * 0.90,
    altoNube * ImgNubeEsc3.width / ImgNubeEsc3.height,
    altoNube
  );

  let altoAngel = height * 1.1;

  image(
    ImgAEsc3,
    width * 0.18,
    height * 0.55,
    altoAngel * ImgAEsc3.width / ImgAEsc3.height,
    altoAngel
  );
}

//demonia

function escena_demonia() {


  let alto = height * 1.3;

image(
  ImgDEsc4,
  width * 0.30,
  height / 2,
  alto * ImgDEsc4.width / ImgDEsc4.height,
  alto
);

  push();
  textAlign(LEFT, CENTER);
  fill(255);
  textSize(26);

  text(
    "Ni han probado\nla divinidad que tiñe\nsus labios. No han \noído sus risitas \nentre besos",
    width * 0.60,
    height / 2
  );

  pop();
}
//escena ultima con scroll
function escena_final() {


  // ÁNGEL movible
  let altoAngel = height * 0.8;

 image(
  ImgAEscf,
  width * 0.25,
  height * 0.15 + movimientoAngel,
  altoAngel * ImgAEscf.width / ImgAEscf.height,
  altoAngel
);

  // DEMONIA que se mueve con scroll
  let altoDemonia = height * 0.8;

 image(
  ImgDEscf,
  width * 0.75,
  height * 0.75,
  altoDemonia * ImgDEscf.width / ImgDEscf.height,
  altoDemonia
);
}


function actualizarFondo() {

  if (estado == E.NO) {
    estadoFondo = F.NOCHE;
  }

  else if (estado == E.TEXTO) {
    estadoFondo = F.CREPUSCULO;
  }

  else if (estado == E.NUBE) {
    estadoFondo = F.TRANSICION;
  }

  else if (estado == E.DEMONIA) {
    estadoFondo = F.OSCURIDAD;
  }

  else if (estado == E.FINAL) {
    estadoFondo = F.DIA;
  }

  // DIBUJO DEL FONDO SEGÚN EL ESTADO

  if (estadoFondo == F.NOCHE) {
    background(20, 30, 70);
  }

  else if (estadoFondo == F.CREPUSCULO) {
    background(70, 50, 110);
  }

  else if (estadoFondo == F.TRANSICION) {
    background(130, 80, 140);
  }

  else if (estadoFondo == F.OSCURIDAD) {
    background(60, 0, 0);
  }

  else if (estadoFondo == F.DIA) {
    background(200, 230, 255);
  }
}
function actualizarInteraccion() {

  if (estado == E.NO) {
    estadoInteraccion = I.CLICK;
  }

  else if (estado == E.TEXTO) {
    estadoInteraccion = I.FLECHAS;
  }

  else if (estado == E.NUBE) {
    estadoInteraccion = I.FLECHAS;
  }

  else if (estado == E.DEMONIA) {
    estadoInteraccion = I.AVANCE;
  }

  else if (estado == E.FINAL) {
    estadoInteraccion = I.SCROLL;
  }
}

//teclado
function keyPressed() {

  // TEXTO → NUBE
  if (estadoInteraccion == I.FLECHAS && estado == E.TEXTO) {
    estado = E.NUBE;
  }

  // CONTROL DE LA NUBE
  else if (estadoInteraccion == I.FLECHAS && estado == E.NUBE) {

    if (keyCode == DOWN_ARROW) {
      nubeY -= 30;
      progresoNube++;
    }

    if (keyCode == UP_ARROW) {
      nubeY += 30;
      progresoNube--;
    }

    nubeY = constrain(nubeY, -height * 1.5, 0);
    progresoNube = constrain(progresoNube, 0, 20);
  }

  // DEMONIA → FINAL
  else if (estadoInteraccion == I.AVANCE && estado == E.DEMONIA) {

    if (keyCode == DOWN_ARROW) {
      estado = E.FINAL;
    }
  }
}
//mouse

function mousePressed() {

 if (estadoInteraccion == I.CLICK) {

    clicks++;

    let cantidad = floor(map(clicks, 1, 60, 1, 6));

    for (let i = 0; i < cantidad; i++) {
      nos.push({
        x: random(width),
        y: random(height),
        size: random(11 + clicks * 0.2, 25 + clicks * 0.2)
      });
    }

    if (clicks >= 35) {
      estado = E.TEXTO;
    }
  }
}
function mouseWheel(event) {

if (estadoInteraccion == I.SCROLL) {

    movimientoAngel += event.delta * 0.4;

    movimientoAngel = constrain(
      movimientoAngel,
      0,
      height * 0.45
    );
  }

  return false;
}