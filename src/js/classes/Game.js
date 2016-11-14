
/*
  Класс игры
  Создает view, управляет сценами
*/

// Конструктор
function Game(screenSize, input) {
  this.screenSize = screenSize;
  this.renderer;
  this.scene;
  this.input = input;
}

// Инициализация экземпляра игры
Game.prototype.init = function() {
  this.renderer = PIXI.autoDetectRenderer(this.screenSize.width, this.screenSize.height, {transparent: true});
  document.body.appendChild(this.renderer.view);
  return this;
}

// Сменить сцену
Game.prototype.changeScene = function(scene) {
  if(!scene) return console.log('Need scene object');
  this.scene = scene;
  this.scene.setScreenSize(this.screenSize);
  this.scene.setInput(this.input);
  this.scene.init();
  return this;
}

// Старт игры
Game.prototype.start = function() {
  if(!this.scene) return console.log('No selected scene');
  this._step();
}

// Обработка основного цикла
Game.prototype._step = function() {
  requestAnimationFrame(this._step.bind(this));
  this.scene.animate();
  this.renderer.render(this.scene);
}
