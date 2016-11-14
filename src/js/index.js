
/*
  INCLUDE LIBRARY
*/

//= lib/pixi.min.js


/*
  INCLUDE CLASSES
*/

//= classes/Input/Input.js
//= classes/Input/SwipeInput.js
//= classes/Utils/ArrUtils.js
//= classes/Utils/DOMUtils.js
//= classes/Utils/BatteryUtils.js

//= classes/Objects/Tile.js
//= classes/Objects/Grid.js
//= classes/Scenes/Scene.js
//= classes/Scenes/GameScene.js
//= classes/Game.js

// Start Application

var game2048;

// Получить размеры экрана без учета внутренних отступов
function getScreenSize() {
  var width = window.innerWidth - 60;
  var height = window.innerHeight - 60;
  return {width : width, height : height};
}

// Создание нового экземпляра игры и запуск
function reloadGame() {
  game2048 = new Game(getScreenSize(), new SwipeInput()); // Создать игру, передать размер и тип управления
  game2048.init() // Инициализация игры
  .changeScene(new GameScene(4, 4)) // Установка сцены
  .start(); // Запуск
}

function startGame() {
  // Клик по кнопкам "заного" и "поехали"
  DOMUtils.onClick('btn-retry', function() {
    game2048.changeScene(new GameScene(4, 4)); // Пересоздать игровую сцену
    DOMUtils.hideDialogWrapper(); // Спрятать диалог
  });
  // Пример использования плагина статуса батареи
  var bstatusEl = document.getElementById('bstatus');
  BatteryUtils.newBatteryStatusHandler(function(status) {
    bstatus.innerHTML = status.level + '%'; // Вывести состояние на экран
  });
  reloadGame(); // Старт игры
}

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false); // Слушатель готовности устройства
    },

    // Устройство готово
    onDeviceReady: function() {
        startGame();
    },

};

// Точка входа
app.initialize();
