
/*
  Основная сцена игры
  Обрабатывает логику игры,
  Для отображения использует экземпляр класса Grid
*/

// Конструктор
GameScene = function(cols, rows) {
  PIXI.Container.call(this);
  this.cols = cols || 4;
  this.rows = rows || 4;
  this.gridView;
  this.field = [];
  this.winLimit = 2048;
}
GameScene.prototype = Object.create(Scene.prototype);

// Инициализация сцены
GameScene.prototype.init = function() {
  this.gridView = new Grid(this.cols, this.rows, this.screenSize);
  this.addChild(this.gridView);
  this.field =  ArrUtils.makeArray(this.cols, this.rows);
  this.makeRandomTiles(2);
  this.registerInputHandlers();
}

// Установить обработчики ввода
GameScene.prototype.registerInputHandlers = function() {
  this.input.addEventListener('right', this.moveRight.bind(this));
  this.input.addEventListener('left', this.moveLeft.bind(this));
  this.input.addEventListener('up', this.moveTop.bind(this));
  this.input.addEventListener('down', this.moveBottom.bind(this));
}

// Анимация сцены
GameScene.prototype.animate = function() {
  this.gridView.animate();
}

// Случайное число
GameScene.prototype.randomInt = function(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

// Выбрать случайную свободную позицию в поле
GameScene.prototype.getRandomPosition = function() {
  while(true) {
    var x = this.randomInt(0, this.cols - 1);
    var y = this.randomInt(0, this.rows - 1);
    if(this.field[x][y] != 0) continue;
    return {x : x, y : y};
  }
}

// Создать тайл в свободной случайной клетке
GameScene.prototype.makeRandomTiles = function(count) {
  for(var i = 0; i < count; i++) {
    var pos = this.getRandomPosition();
    this.field[pos.x][pos.y] = !!this.randomInt(0, 1) ? 2 : 4;
  }
  this.updateView();
}

// Обновить изображение сцены
GameScene.prototype.updateView = function() {
  this.gridView.showField(this.field);
}

// Получить строку поля
GameScene.prototype.getRow = function(index) {
  var res = [];
  for(var i = 0; i < this.cols; i++) {
    res.push(this.field[i][index]);
  }
  return res;
}

// Установить строку поля
GameScene.prototype.setRow = function(index, row) {
  for(var i = 0; i < row.length; i++) {
    this.field[i][index] = row[i];
  }
}

// Получить колонку поля
GameScene.prototype.getCol = function(index) {
  var res = [];
  for(var i = 0; i < this.rows; i++) {
    res.push(this.field[index][i]);
  }
  return res;
}

// Установить колонку поля
GameScene.prototype.setCol = function(index, col) {
  for(var i = 0; i < col.length; i++) {
    this.field[index][i] = col[i];
  }
}

// Сдвинуть поле вниз
GameScene.prototype.moveBottom = function() {
  var self = this;
  this.gridView.moveDown(function() {
    var eq = 0;
    for(var i = 0; i < self.cols; i++) {
      var curCol = self.getCol(i);
      var newCol = ArrUtils.shiftArray(curCol, false);
      eq += +!ArrUtils.arraysEqual(curCol, newCol);
      self.setCol(i, newCol);
    }
    self.checkState(!!eq);
  });
}

// Сдвинуть поле вверх
GameScene.prototype.moveTop = function() {
  var self = this;
  this.gridView.moveUp(function() {
    var eq = 0;
    for(var i = 0; i < self.cols; i++) {
      var curCol = self.getCol(i);
      var newCol = ArrUtils.shiftArray(curCol, true);
      eq += +!ArrUtils.arraysEqual(curCol, newCol);
      self.setCol(i, newCol);
    }
    self.checkState(!!eq);
  });
}

// Сдвинуть поле вправо
GameScene.prototype.moveRight = function() {
  var self = this;
  this.gridView.moveRight(function() {
    var eq = 0;
    for(var i = 0; i < self.rows; i++) {
      var curRow = self.getRow(i);
      var newRow = ArrUtils.shiftArray(curRow, false);
      eq += +!ArrUtils.arraysEqual(curRow, newRow);
      self.setRow(i, newRow);
    }
    self.checkState(!!eq);
  });
}

// Сдвинуть поле влево
GameScene.prototype.moveLeft = function() {
  var self = this;
  this.gridView.moveLeft(function() {
    var eq = 0;
    for(var i = 0; i < self.rows; i++) {
      var curRow = self.getRow(i);
      var newRow = ArrUtils.shiftArray(curRow, true);
      eq += +!ArrUtils.arraysEqual(curRow, newRow);
      self.setRow(i, newRow);
    }
    self.checkState(!!eq);
  });
}

// Проверить состояние игры
GameScene.prototype.checkState = function(shifts) {
  this.updateView();
  if(!shifts) return;
  if(this.isWin()) return this.win();
  this.makeRandomTiles(1);
  if(this.isLoss()) return this.loss();
}

// Проверка на проигрыш
GameScene.prototype.isLoss = function() {
  for(var x = 0; x < this.cols - 1; x++) {
    for(var y = 0; y < this.rows -1; y++) {
      var curValue = this.field[x][y];
      var downValue = this.field[x][y + 1];
      var rightValue = this.field[x + 1][y];
      if(curValue == 0 || downValue == 0 || rightValue == 0) return false;
      if(curValue == downValue || curValue == rightValue) return false;
    }
  }
  return true;
}

// Проверка на победу
GameScene.prototype.isWin = function() {
  for(var x = 0; x < this.rows; x++) {
    for(var y = 0; y < this.cols; y++) {
      var curValue = this.field[x][y];
      if(curValue == this.winLimit) return true;
    }
  }
  return false;
}

// Обработчик состояния "победа"
GameScene.prototype.win = function() {
  DOMUtils.showModalSuccess();
}

// Обработчик состояния "проигрыш"
GameScene.prototype.loss = function() {
  DOMUtils.showModalError();
}
