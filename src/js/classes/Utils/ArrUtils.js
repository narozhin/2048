
/*
  Утилиты для работы с массивами
*/
var ArrUtils = {

  // Заполняет массив нулями, с начала или с конца
  // arr - массив
  // count - количество нулей, которые необходимо добавить
  // left - слева или справа добавить
  pushZero : function(arr, count, left) {
    var zeroCount = count - arr.length;
    for(var i = 0; i < zeroCount; i++) {
      if(left) {
        arr.push(0);
      }else {
        arr.splice(0, 0, 0);
      }
    }
    return arr;
  },

  // Сдвинуть массив вправо
  // Удаляет все нули из исходного массива
  // Складывает одинаковые рядомстоящие значения
  // Заполняет остальное пространство нулями
  shiftArrayRight : function(arr) {
    var result = [];
    var block = false;
    for(var i = arr.length - 1; i >= 0; i--) {
      var cur = arr[i];
      if(cur == 0) continue;
      var last = result[0];
      if(last == cur && !block) {
        result[0] = cur * 2;
        block = true;
        continue;
      }
      block = false;
      result.splice(0, 0, cur);
    }
    return this.pushZero(result, arr.length, false);
  },

  // Сдвинуть массив влево
  // Удаляет все нули из исходного массива
  // Складывает одинаковые рядомстоящие значения
  // Заполняет остальное пространство нулями
  shiftArrayLeft : function(arr) {
    var result = [];
    var block = false;
    for(var i = 0; i < arr.length; i++) {
      var cur = arr[i];
      if(cur == 0) continue;
      var last = result[result.length - 1];
      if(last == cur && !block) {
        result[result.length - 1] = cur * 2;
        block = true;
        continue;
      }
      block = false;
      result.push(cur);
    }
    return this.pushZero(result, arr.length, true);
  },

  // Создает двухмерный массив и заполняет нулями
  makeArray : function(cols, rows) {
    var res = [];
    for(var x = 0; x < cols; x++) {
      res.push([]);
      for(var y = 0; y < rows; y++) {
        res[x][y] = 0;
      }
    }
    return res;
  },

  // Проверяет эквивалентность массивов
  arraysEqual : function(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  },

  // Сдвинуть массив влева или вправо
  shiftArray : function(arr, left) {
    if(left) {
      return this.shiftArrayLeft(arr);
    }else {
      return this.shiftArrayRight(arr);
    }
  }
};
