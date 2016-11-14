
/*
  Класс фишки поля
*/

// Конструктор
Tile = function(gridPos, size, value) {
  PIXI.Container.call(this);
  this.value = value;
  this.gridPos = gridPos;
  this.size = size;
  this.padding = 4;
  this.setRealPosition();
  this._init();
  this.show = false;
}

Tile.prototype = Object.create(PIXI.Container.prototype);

// Инициализация
Tile.prototype._init = function() {
  var texture = PIXI.Texture.fromImage('./img/' + this.value + '.jpg');
  var sprite = new PIXI.Sprite(texture);
  sprite.width = sprite.height = this.size - this.padding;
  sprite.position.x = sprite.position.y = this.padding / 2;
  this.addChild(sprite);
}

// Установить позицию на экране
Tile.prototype.setRealPosition = function() {
  this.position.y = this.gridPos.row * this.size + (this.size - this.size) / 2;
  this.position.x = this.gridPos.col * this.size + (this.size - this.size) / 2;
}

// Возвращает отступ фишки от клетки поля
// Используется, если фишка меньше клетки поля
Tile.prototype.getPadding = function() {
  return this.padding;
}

// Получить текущую строку
Tile.prototype.getRow = function() {
  return this.gridPos.row;
}

// Получить текущую колонку
Tile.prototype.getCol = function() {
  return this.gridPos.col;
}

// Установить новую строку
Tile.prototype.setRow = function(row) {
  this.gridPos.row = row;
  this.setRealPosition();
}

// Установить новую колонку
Tile.prototype.setCol = function(col) {
  this.gridPos.col = col;
  this.setRealPosition();
}

// Получить клетку поля
Tile.prototype.getCell = function() {
  return this.gridPos;
}

// Сменить клетку поля
Tile.prototype.changeGridPos = function(gridPos) {
  var shifts = {
    col : this.gridPos.col - gridPos.col,
    row : this.gridPos.row - gridPos.row
  }
  this.gridPos = gridPos;
  return shifts;
}
