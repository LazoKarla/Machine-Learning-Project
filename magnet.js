let fruitNames = ["manzana", "durazno", "pera", "mora", "uva"]; // Nombres de las frutas

// Clase Magnet
class Magnet {
  constructor() {
    this.fruit = random(fruitNames); // Selecciona una fruta aleatoria
    this.image = fruitImages[this.fruit]; // Asocia la imagen de la fruta
    this.x = random(width);
    this.y = random(height);
    this.angle = random(TWO_PI); // Genera un ángulo de rotación aleatorio
    this.c = color(255);
    this.size = 80; // Tamaño del ícono
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // Dibuja la imagen de la fruta
    if (this.image) {
      imageMode(CENTER);
      image(this.image, 0, 0, this.size, this.size);
    }
    pop();

    // Círculo rojo de interacción
    fill(255, 0, 0);
    ellipse(this.fingerx, this.fingery, 10, 10);
  }

  touch(thumbx, thumby, holax, holay) {
    let distBetweenFingers = dist(thumbx, thumby, holax, holay);
    this.fingerx = abs(thumbx - holax) + min(thumbx, holax);
    this.fingery = abs(thumby - holay) + min(thumby, holay);
    let distFromFingers = dist(this.x, this.y, this.fingerx, this.fingery);

    if (distBetweenFingers < 40 && distFromFingers < this.size / 2) {
      this.c = color(255, 0, 0);
      this.x = this.fingerx;
      this.y = this.fingery;
    } else {
      this.c = color(255);
    }
  }
}
