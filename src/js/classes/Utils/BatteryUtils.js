
/*
  Утилита для работы со статусом батареи
*/
var BatteryUtils = {

  // Добавить слушателя состояния батареи
  newBatteryStatusHandler : function(callback) {
    window.addEventListener("batterystatus", callback, false);
  }

}
