let video;
let handPose;
let hands = [];
let fruitImages = {}; // Contenedor para las imágenes de las frutas
let magnets = [];
let num = 5;

function preload() {
  // Carga las imágenes de las frutas
  fruitImages["manzana"] = loadImage("manzana.png");
  fruitImages["durazno"] = loadImage("durazno.png");
  fruitImages["pera"] = loadImage("pera.png");
  fruitImages["mora"] = loadImage("mora.png");
  fruitImages["uva"] = loadImage("uva.png");

  // Inicializa el modelo de poses de manos
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  // Inicia la detección de manos
  handPose.detectStart(video, gotHands);

  rectMode(CENTER);

  // Crea los objetos Magnet
  for (let i = 0; i < num; i++) {
    magnets[i] = new Magnet();
  }
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (hands.length > 0) {
    let hola = hands[0].keypoints[8]; // Índice
    let thumb = hands[0].keypoints[4]; // Pulgar

    for (let i = 0; i < num; i++) {
      magnets[i].touch(thumb.x, thumb.y, hola.x, hola.y);
    }
  }

  for (let i = 0; i < num; i++) {
    magnets[i].display();
  }
}

function gotHands(results) {
  hands = results;
}
