/*:
 * @plugindesc Показывает количество золота в верхнем правом углу экрана.
 * @help Этот плагин отображает количество золота игрока в верхнем правом углу экрана.
 */

(function() {
    // Создаем новый Window_Gold для отображения золота в верхнем правом углу
    function Window_GoldDisplay() {
        this.initialize.apply(this, arguments);
    }

    Window_GoldDisplay.prototype = Object.create(Window_Base.prototype);
    Window_GoldDisplay.prototype.constructor = Window_GoldDisplay;

    Window_GoldDisplay.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, Graphics.boxWidth - width, 0, width, height);
        this.refresh();
    };

    Window_GoldDisplay.prototype.windowWidth = function() {
        return 240;
    };

    Window_GoldDisplay.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_GoldDisplay.prototype.refresh = function() {
        var x = this.textPadding();
        var y = 0;
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, x, y, width);
    };

    Window_GoldDisplay.prototype.open = function() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    // Обновляем золото при изменении
    var _Game_Party_gainGold = Game_Party.prototype.gainGold;
    Game_Party.prototype.gainGold = function(amount) {
        _Game_Party_gainGold.call(this, amount);
        if (SceneManager._scene._goldDisplayWindow) {
            SceneManager._scene._goldDisplayWindow.refresh();
        }
    };

    // Добавляем окно на сцену карты
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createGoldDisplayWindow();
    };

    Scene_Map.prototype.createGoldDisplayWindow = function() {
        this._goldDisplayWindow = new Window_GoldDisplay();
        this.addWindow(this._goldDisplayWindow);
    };
})();
