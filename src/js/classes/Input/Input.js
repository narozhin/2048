
/*
  Интерфейс ввода - "абстрактный" класс
*/

var Input = function() {

};
Input.prototype.events = {
  'left' : [],
  'right': [],
  'up'   : [],
  'down' : []
};
Input.prototype.onEvent = function(evName) {
  var handlers = this.events[evName];
  if(!handlers) return console.log('Unknow input handler name');
  handlers.forEach(function(handler) {
    handler();
  });
};
Input.prototype.addEventListener = function(evName, handler) {
  var handlers = this.events[evName];
  if(!handlers) return console.log('Unknow input handler name');
  handlers.push(handler);
};
Input.prototype.left = function() {
  this.onEvent('left');
};
Input.prototype.right = function() {
  this.onEvent('right');
};
Input.prototype.up = function() {
  this.onEvent('up');
};
Input.prototype.down = function() {
  this.onEvent('down');
};
