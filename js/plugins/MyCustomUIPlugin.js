/*:
 * @plugindesc Custom UI for mobile devices with movement and action buttons.
 * @param Button Up X
 * @type number
 * @min 0
 * @desc X позиция кнопки вверх
 * @default 45
 *
 * @param Button Up Y
 * @type number
 * @min 0
 * @desc Y позиция кнопки вверх
 * @default 0
 *
 * @param Button Down X
 * @type number
 * @min 0
 * @desc X позиция кнопки вниз
 * @default 45
 *
 * @param Button Down Y
 * @type number
 * @min 0
 * @desc Y позиция кнопки вниз
 * @default 72
 *
 * @param Button Left X
 * @type number
 * @min 0
 * @desc X позиция кнопки влево
 * @default 0
 *
 * @param Button Left Y
 * @type number
 * @min 0
 * @desc Y позиция кнопки влево
 * @default 36
 *
 * @param Button Right X
 * @type number
 * @min 0
 * @desc X позиция кнопки вправо
 * @default 90
 *
 * @param Button Right Y
 * @type number
 * @min 0
 * @desc Y позиция кнопки вправо
 * @default 36
 *
 * @param Button Action X
 * @type number
 * @min 0
 * @desc X позиция кнопки взаимодействия
 * @default 90
 *
 * @param Button Action Y
 * @type number
 * @min 0
 * @desc Y позиция кнопки взаимодействия
 * @default 0
 *
 * @param Button Back X
 * @type number
 * @min 0
 * @desc X позиция кнопки назад
 * @default 0
 *
 * @param Button Back Y
 * @type number
 * @min 0
 * @desc Y позиция кнопки назад
 * @default 0
 *
 * @param Button Scale
 * @type number
 * @min 0.1
 * @decimals 2
 * @desc Масштаб кнопок (1 = 100%)
 * @default 1.00
 *
 * @param Disable Touch Movement
 * @type boolean
 * @desc Отключить перемещение по касанию карты?
 * @default false
 *
 * @help This plugin creates a custom UI for movement and actions for mobile devices.
 */

(function() {
    var parameters = PluginManager.parameters('MyCustomUIPlugin');
    
    var buttonUpX = Number(parameters['Button Up X'] || 45);
    var buttonUpY = Number(parameters['Button Up Y'] || 0);
    var buttonDownX = Number(parameters['Button Down X'] || 45);
    var buttonDownY = Number(parameters['Button Down Y'] || 72);
    var buttonLeftX = Number(parameters['Button Left X'] || 0);
    var buttonLeftY = Number(parameters['Button Left Y'] || 36);
    var buttonRightX = Number(parameters['Button Right X'] || 90);
    var buttonRightY = Number(parameters['Button Right Y'] || 36);
    var buttonActionX = Number(parameters['Button Action X'] || 90);
    var buttonActionY = Number(parameters['Button Action Y'] || 0);
    var buttonBackX = Number(parameters['Button Back X'] || 0);
    var buttonBackY = Number(parameters['Button Back Y'] || 0);
    var buttonScale = Number(parameters['Button Scale'] || 1.00);
    var disableTouchMovement = parameters['Disable Touch Movement'] === 'true';

    var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;

    Scene_Map.prototype.createSpriteset = function() {
        _Scene_Map_createSpriteset.call(this);
        this.createMobileUI();
    };

    Scene_Map.prototype.createMobileUI = function() {
        if (this._uiContainer) {
            this.removeChild(this._uiContainer);
        }
        this._uiContainer = new Sprite();
        this.addChild(this._uiContainer);

        if (this._buttonUp) this._uiContainer.removeChild(this._buttonUp);
        if (this._buttonDown) this._uiContainer.removeChild(this._buttonDown);
        if (this._buttonLeft) this._uiContainer.removeChild(this._buttonLeft);
        if (this._buttonRight) this._uiContainer.removeChild(this._buttonRight);
        if (this._buttonAction) this._uiContainer.removeChild(this._buttonAction);
        if (this._buttonBack) this._uiContainer.removeChild(this._buttonBack);

        this._buttonUp = this.createButton('up', buttonUpX, buttonUpY);
        this._buttonDown = this.createButton('down', buttonDownX, buttonDownY);
        this._buttonLeft = this.createButton('left', buttonLeftX, buttonLeftY);
        this._buttonRight = this.createButton('right', buttonRightX, buttonRightY);
        this._buttonAction = this.createButton('action', buttonActionX, buttonActionY);
        this._buttonBack = this.createButton('back', buttonBackX, buttonBackY);
    };

    Scene_Map.prototype.createButton = function(type, x, y) {
        var button = new Sprite_Button();
        button.bitmap = ImageManager.loadSystem('Button' + type.charAt(0).toUpperCase() + type.slice(1));
        button.x = x;
        button.y = y;
        button.scale.x = buttonScale;
        button.scale.y = buttonScale;
        button.setClickHandler(this.onButtonClicked.bind(this, type));
        this._uiContainer.addChild(button);
        return button;
    };

    Scene_Map.prototype.onButtonClicked = function(type) {
        switch (type) {
            case 'up':
                $gamePlayer.moveStraight(8);
                break;
            case 'down':
                $gamePlayer.moveStraight(2);
                break;
            case 'left':
                $gamePlayer.moveStraight(4);
                break;
            case 'right':
                $gamePlayer.moveStraight(6);
                break;
            case 'action':
                this.triggerAction();
                break;
            case 'back':
                SceneManager.push(Scene_Menu);
                break;
        }
    };

    // Имитация нажатия пробела или Enter для взаимодействия с объектами
    Scene_Map.prototype.triggerAction = function() {
        var x = $gamePlayer.x;
        var y = $gamePlayer.y;

        // Проверяем наличие события в текущей позиции
        if ($gameMap.eventIdXy(x, y) > 0) {
            // Выполняем взаимодействие с событием
            $gamePlayer.checkEventTriggerHere([0]); // [0] - стандартное взаимодействие
        } else {
            // Если нет события, проверяем наличие события перед игроком
            $gamePlayer.checkEventTriggerThere([0]); // [0] - стандартное взаимодействие
        }
    };

    var _Scene_Map_onMapTouch = Scene_Map.prototype.onMapTouch;
    Scene_Map.prototype.onMapTouch = function() {
        if (!disableTouchMovement) {
            _Scene_Map_onMapTouch.call(this);
        }
    };

    Scene_Map.prototype.processMapTouch = function() {
        if (disableTouchMovement) return;
        _Scene_Map_onMapTouch.call(this);
    };
})();



