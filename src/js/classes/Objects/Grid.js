
/*
  Основной класс для отображения игры
*/

// Конструктор
Grid = function(cols, rows, screenSize) {
  PIXI.Container.call(this);
  this.rows = rows;
  this.cols = cols;
  this.screenSize = screenSize;
  this.gridSize = this._getGridSize();
  this.cellSize = this._calcCellSize();
  this.position = this._calcPosition();
  this.drawGrid();
  this.animDelay = 5;
  this.shiftTilesCount = 0;
}
Grid.prototype = Object.create(PIXI.Container.prototype);

// Отрисовать сетку
Grid.prototype.drawGrid = function() {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(4, 0xFFFFFF, 1);
  for(var r = 1; r < this.rows; r++) {
    var yOffset = r * this.cellSize;
    graphics.moveTo(0, yOffset);
    graphics.lineTo(this.gridSize, yOffset);
  }
  for(var c = 1; c < this.cols; c++) {
    var xOffset = c * this.cellSize;
    graphics.moveTo(xOffset, 0);
    graphics.lineTo(xOffset, this.gridSize);
  }
  graphics.lineStyle(4, 0xFFFFFF, 1);
  graphics.beginFill(0x000000, 0);
  graphics.drawRoundedRect(0, 0, this.gridSize, this.gridSize, 15);
  graphics.endFill();
  this.addChild(graphics);
}

// Возвращает необходимый размер сетки
Grid.prototype._getGridSize = function() {
  return this.screenSize.width > this.screenSize.height ? this.screenSize.height : this.screenSize.width;
}

// Считает размер ячейки
Grid.prototype._calcCellSize = function() {
  var s = this.cols == this.rows ? this.cols : this.cols > this.rows ? this.cols : this.rows;
  return this.gridSize / s;
}

// Считает позицию сетки на экране
Grid.prototype._calcPosition = function() {
  var gs2 = this.gridSize / 2;
  return {
    x : this.screenSize.width / 2 - gs2,
    y : this.screenSize.height / 2 - gs2
  }
}

// Добавить фишку на поле
Grid.prototype.addTile = function(x, y, value, alpha) {
  var tile = new Tile({col : x, row : y}, this.cellSize, value);
  this.addChildAt(tile, this.children.length - 1)
}

// Возвращает фишку в запрашиваемой клетке
Grid.prototype.getTileInCell = function(x, y) {
  for(var i = 0; i < this.children.length - 1; i++) {
    var tile = this.children[i];
    var tileCell = tile.getCell();
    if(tileCell.row == x && tileCell.col == y) return tile;
  }
  return false;
}

// Возвращает все фишки в строке
Grid.prototype.getTilesInRow = function(row) {
  var result = [];
  for(var i = 0; i < this.children.length - 1; i++) {
    var tile = this.children[i];
    var tileCell = tile.getCell();
    if(tileCell.row == row) result.push(tile);
  }
  return result;
}

// Возвращает все фишки в колонке
Grid.prototype.getTilesInCol = function(col) {
  var result = [];
  for(var i = 0; i < this.children.length - 1; i++) {
    var tile = this.children[i];
    var tileCell = tile.getCell();
    if(tileCell.col == col) result.push(tile);
  }
  return result;
}

// Удалить все фишки с поля
Grid.prototype.removeAllTiles = function() {
  if(this.children.length < 2) return;
  for (var i = this.children.length - 2; i >= 0; i--) {
    this.removeChild(this.children[i]);
  };
}

// Отобразить двухмерный массив как игровое поле
Grid.prototype.showField = function(field) {
  this.removeAllTiles();
  for(var x = 0; x < this.cols; x++) {
    for(var y = 0; y < this.rows; y++) {
      var value = field[x][y];
      if(!value) continue;
      this.addTile(x, y, value);
    }
  }
}

// Сдвинуть все фишки на 1 вправо
Grid.prototype.shiftRowRight = function(tiles) {
  var moved = 0;
  for(var i = tiles.length - 1; i >= 0; i--) {
    var tile = tiles[i];
    var tileCell = tile.getCell();
    if(tileCell.col >= this.cols - 1) continue;
    var nextTile = this.getTileInCell(tileCell.row, tileCell.col + 1);
    if(nextTile) continue;
    tile.setCol(tileCell.col + 1);
    moved++;
  }
  return moved;
}

// Сдвинуть все фишки на 1 влево
Grid.prototype.shiftRowLeft = function(tiles) {
  var moved = 0;
  for(var i = 0; i < tiles.length; i++) {
    var tile = tiles[i];
    var tileCell = tile.getCell();
    if(tileCell.col <= 0) continue;
    var prevTile = this.getTileInCell(tileCell.row, tileCell.col - 1);
    if(prevTile) continue;
    tile.setCol(tileCell.col - 1);
    moved++;
  }
  return moved;
}

// Сдвинуть все фишки на 1 вверх
Grid.prototype.shiftColUp = function(tiles) {
  var moved = 0;
  for(var i = 0; i < tiles.length; i++) {
    var tile = tiles[i];
    var tileCell = tile.getCell();
    if(tileCell.row <= 0) continue;
    var prevTile = this.getTileInCell(tileCell.row - 1, tileCell.col);
    if(prevTile) continue;
    tile.setRow(tileCell.row - 1);
    moved++;
  }
  return moved;
}

// Сдвинуть все фишки на 1 вниз
Grid.prototype.shiftColDown = function(tiles) {
  var moved = 0;
  for(var i = tiles.length - 1; i >= 0; i--) {
    var tile = tiles[i];
    var tileCell = tile.getCell();
    if(tileCell.row >= this.rows - 1) continue;
    var nextTile = this.getTileInCell(tileCell.row + 1, tileCell.col);
    if(nextTile) continue;
    tile.setRow(tileCell.row + 1);
    moved++;
  }
  return moved;
}

// Анимация сдвига вправо
Grid.prototype.moveRight = function(callback) {
  var count = 0;
  for(var i = 0; i < this.rows; i++) {
    var tiles = this.getTilesInRow(i);
    if(!tiles.length) continue;
    count = this.shiftRowRight(tiles);
    this.shiftTilesCount += count;
  }
  if(!count) {
    callback(this.shiftTilesCount);
    return this.shiftTilesCount = 0;
  }
  this.wait(this.animDelay, callback).then(this.moveRight.bind(this));
}

// Анимация сдвига влево
Grid.prototype.moveLeft = function(callback) {
  var count = 0;
  for(var i = 0; i < this.rows; i++) {
    var tiles = this.getTilesInRow(i);
    if(!tiles.length) continue;
    count = this.shiftRowLeft(tiles);
    this.shiftTilesCount += count;
  }
  if(!count) {
    callback(this.shiftTilesCount);
    return this.shiftTilesCount = 0;
  }
  this.wait(this.animDelay, callback).then(this.moveLeft.bind(this));
}

// Анимация сдвига вверх
Grid.prototype.moveUp = function(callback) {
  var count = 0;
  for(var i = 0; i < this.cols; i++) {
    var tiles = this.getTilesInCol(i);
    if(!tiles.length) continue;
    count = this.shiftColUp(tiles);
    this.shiftTilesCount += count;
  }
  if(!count) {
    callback(this.shiftTilesCount);
    return this.shiftTilesCount = 0;
  }
  this.wait(this.animDelay, callback).then(this.moveUp.bind(this));
}

// Анимация сдвига вниз
Grid.prototype.moveDown = function(callback) {
  var count = 0;
  for(var i = 0; i < this.cols; i++) {
    var tiles = this.getTilesInCol(i);
    if(!tiles.length) continue;
    count = this.shiftColDown(tiles);
    this.shiftTilesCount += count;
  }
  if(!count) {
    callback(this.shiftTilesCount);
    return this.shiftTilesCount = 0;
  }
  this.wait(this.animDelay, callback).then(this.moveDown.bind(this));
}

// Задержка анимации
Grid.prototype.wait = function(del, callback) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(callback);
    }, del);
  });
}

// Анимация сцены
Grid.prototype.animate = function() {
  this.children.forEach(function(object) {
    if(object.animate) object.animate();
  });
}
