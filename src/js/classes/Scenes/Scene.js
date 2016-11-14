
/*
  Интерфейс сцены
*/

Scene = function(screenSize) {
  PIXI.Container.call(this);
  this.screenSize;
  this.input;
}
Scene.prototype = Object.create(PIXI.Container.prototype);

Scene.prototype.setScreenSize = function(screenSize) {
  this.screenSize = screenSize;
}
Scene.prototype.setInput = function(input) {
  this.input = input;
}
Scene.prototype.init = function() {

}
