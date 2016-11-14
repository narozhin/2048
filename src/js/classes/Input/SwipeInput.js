
/*
  Ввод свайпом
*/

var SwipeInput = function() {
  this.init();
  this.block = false;
};
SwipeInput.prototype = Object.create(Input.prototype);

SwipeInput.prototype.init = function() {
  var initialPoint;
  var finalPoint;
  var self = this;

  document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
  }, false);

  document.addEventListener('touchend', function(event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint=event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX) {
          self.left();
        }
        else {
          self.right();
        }
      }
      else {
        if (finalPoint.pageY < initialPoint.pageY){
          self.up();
        }
        else {
          self.down();
        }
      }
    }
  }, false);
}
