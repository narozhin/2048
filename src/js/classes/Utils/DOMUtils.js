
/*
  Утилита для работы с DOM
*/
var DOMUtils = {

  // Показать окно "вы проиграли"
  showModalError : function() {
    this.hideDialogs();
    document.getElementsByClassName("error")[0].className = 'dialog error';
    this.showDialogWrapper();
  },

  // Показать окно "победа"
  showModalSuccess : function() {
    this.hideDialogs();
    document.getElementsByClassName("success")[0].className = 'dialog success';
    this.showDialogWrapper();
  },

  // Показать обертку сообщений
  showDialogWrapper : function() {
    document.getElementsByClassName("dialog-wrapper")[0].style.display = 'table';
  },

  // Спрятать диалоги
  hideDialogWrapper : function() {
    document.getElementsByClassName("dialog-wrapper")[0].style.display = 'none';
  },

  // Спрятать все диалоги
  hideDialogs : function() {
    var elems = document.getElementsByClassName("dialog");
    for(var i = 0; i < elems.length; i++) {
      elems[0].className = 'dialog hide';
    }
  },

  // Навешать слушателя на кнопки управления
  onClick : function(className, callback) {
    var elems = document.getElementsByClassName(className);
    for(var i = 0; i < elems.length; i++) {
      elems[i].onclick = callback;
      elems[i].addEventListener('touchstart', function(event) {
        if (event.targetTouches.length == 1) {
          callback();
        }
      }, false);
    }
  }

};
