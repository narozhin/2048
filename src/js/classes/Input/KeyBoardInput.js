
/*
  Ввод с клавиатуры
*/

var KeyBoardInput = function() {
  this.init();
  this.block = false;
};
KeyBoardInput.prototype = Object.create(Input.prototype);

KeyBoardInput.prototype.init = function() {
  var self = this;
  document.addEventListener("keydown", function(ev) {
    if(self.block) return;
    self.block = true;
    switch (ev.code) {
      case 'ArrowRight':
        self.right();
        break;
      case 'ArrowLeft' :
        self.left();
        break;
      case 'ArrowUp' :
        self.up();
        break;
      case 'ArrowDown' :
        self.down();
        break;
      default:
    }
  }, false);
  document.addEventListener("keyup", function(ev) {
    self.block = false;
  }, false);
}
