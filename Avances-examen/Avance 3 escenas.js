const E = { NO: 0, TEXTO: 1, NUBE: 2 };

let estado = E.NO;

let clicks = 0;
let nos = [];

let nubeY = 0;

/* solo control del ángel */
let zoom = 1;
let angelSize = 200;
let angelX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}

/* ---------------- DRAW ---------------- */

function draw() {

  if (estado == E.NO) {
    escena_no();
  }

  else if (estado == E.TEXTO) {
    escena_texto();
  }

  else if (estado == E.NUBE) {
    escena_nube();
  }

}

/* ---------------- ESCENA 1 ---------------- */

function escena_no() {

  background(220, 220, 235);

  fill(255);
  ellipse(width / 2, height / 2, 250);

  let oscuridad = map(clicks, 0, 60, 0, 180);
  fill(0, oscuridad);
  rect(0, 0, width, height);

  fill(255);

  for (let n of nos) {

    textSize(n.size);

    text(
      "NO",
      n.x + random(-2, 2),
      n.y + random(-2, 2)
    );

  }

}

/* ---------------- ESCENA 2 ---------------- */

function escena_texto() {

  background(255);

  fill(0);
  textSize(28);

  text(
    "No puedes amarla,\nsusurran,\nporque es un pecado.",
    width / 2,
    height / 2
  );

}

/* ---------------- CONTROL ---------------- */

function keyPressed() {

  if (estado == E.TEXTO) {
    estado = E.NUBE;
  }

  if (estado == E.NUBE) {

    if (keyCode == DOWN_ARROW) {
      nubeY -= 30;
    }

    if (keyCode == UP_ARROW) {
      nubeY += 30;
    }

    nubeY = constrain(nubeY, -height, 0);
  }

}

/* ---------------- ESCENA 3 ---------------- */

function escena_nube() {

  background(180, 60, 60);

  dibujar_infierno();

  push();

  translate(0, nubeY);

  /* nube */
  fill(255);
  noStroke();
  ellipse(width / 2, height / 2, width * 1.2, height * 1.4);

  fill(245);
  ellipse(width / 2 - 200, height / 2 + 80, 300, 160);
  ellipse(width / 2 + 200, height / 2 + 80, 300, 160);

  /* ÁNGEL (AHORA CONTROLADO SOLO POR VARIABLES) */
  fill(255);
  ellipse(width / 2 + angelX, height / 2 - 120, angelSize);

  /* texto */
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(26);

  text(
    "Solo sonrió ante sus palabras,\nsabiendo que no se han arrodillado ante su altar\nni han probado la divinidad que tienen sus labios.",
    width / 2,
    height / 2
  );

  pop();

}

/* ---------------- CONTROL ÁNGEL (IMPORTANTE) */

function mouseWheel(event) {

  if (estado == E.NUBE) {

    // esto ya NO escala todo, solo controla el ángel
    zoom += -event.delta * 0.001;
    zoom = constrain(zoom, 0.6, 1.8);

    angelSize = map(zoom, 0.6, 1.8, 200, 450);
    angelX = map(zoom, 0.6, 1.8, 0, -200);
  }

  return false;
}

/* ---------------- INFIERNO ---------------- */

function dibujar_infierno() {

  fill(180, 60, 60);
  rect(0, 0, width, height);

  fill(80, 0, 0);
  ellipse(width * 0.75, height * 0.7, 100);

  fill(255);
  ellipse(width * 0.3, height * 0.7, 120);

}

/* ---------------- INTERACCIÓN ---------------- */

function mousePressed() {

  if (estado == E.NO) {

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
