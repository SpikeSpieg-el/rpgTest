/*:
 * @plugindesc Shows a custom post-battle rewards screen with experience, loot, abilities, and level-up notifications.
 * @author YourName
 *
 * @help This plugin customizes the post-battle rewards screen to display experience,
 * loot, abilities, and level-up notifications with ally avatars.
 */

(function() {
    // Перехватываем метод createResults, чтобы добавить кастомное окно
    var _Scene_Battle_createResults = Scene_Battle.prototype.createResults;

    Scene_Battle.prototype.createResults = function() {
        _Scene_Battle_createResults.call(this);
        this.createCustomResults();
    };

    Scene_Battle.prototype.createCustomResults = function() {
        if (this._resultsWindow) {
            this.removeChild(this._resultsWindow); // Удаляем старое окно, если оно есть
        }
        this._resultsWindow = new Window_CustomResults();
        this.addChild(this._resultsWindow);
    };

    // Создание кастомного окна результатов
    function Window_CustomResults() {
        this.initialize.apply(this, arguments);
    }

    Window_CustomResults.prototype = Object.create(Window_Base.prototype);
    Window_CustomResults.prototype.constructor = Window_CustomResults;

    Window_CustomResults.prototype.initialize = function() {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this.refresh();
    };

    Window_CustomResults.prototype.refresh = function() {
        this.contents.clear();
        console.log("Refreshing custom results window."); // Отладочное сообщение
        this.drawExperience();
        this.drawLoot();
        this.drawAbilities();
        this.drawLevelUp();
        this.drawAllyAvatars();
    };

    Window_CustomResults.prototype.drawExperience = function() {
        var x = 20;
        var y = 20;
        var exp = $gameParty.highestLevel() * 100; // Пример значения опыта
        console.log("Drawing experience: " + exp); // Отладочное сообщение
        this.drawText("Experience: " + exp, x, y);

        // Рисуем полоску опыта
        this.drawBar(x, y + 30, 200, exp, exp, "Experience");
    };

    Window_CustomResults.prototype.drawLoot = function() {
        var x = 20;
        var y = 100;
        var items = $gameParty.allItems(); // Пример списка лута
        console.log("Drawing loot."); // Отладочное сообщение
        this.drawText("Loot:", x, y);

        items.forEach(function(item, index) {
            this.drawText("- " + item.name, x, y + 30 + (index * 30));
        }, this);
    };

    Window_CustomResults.prototype.drawAbilities = function() {
        var x = 20;
        var y = 200;
        var abilities = $gameParty.allSkills(); // Пример списка способностей
        console.log("Drawing abilities."); // Отладочное сообщение
        this.drawText("New Abilities:", x, y);

        abilities.forEach(function(skill, index) {
            this.drawText("- " + skill.name, x, y + 30 + (index * 30));
        }, this);
    };

    Window_CustomResults.prototype.drawLevelUp = function() {
        var x = 20;
        var y = 300;
        var newLevel = $gameParty.highestLevel(); // Пример проверки повышения уровня
        if (newLevel > 1) {
            console.log("Drawing level up message. New level: " + newLevel); // Отладочное сообщение
            this.drawText("Level Up! New Level: " + newLevel, x, y, this.contents.width - x);
        }
    };

    Window_CustomResults.prototype.drawAllyAvatars = function() {
        var x = Graphics.boxWidth - 200;
        var y = Graphics.boxHeight - 100;
        console.log("Drawing ally avatars."); // Отладочное сообщение
        $gameParty.members().forEach(function(actor, index) {
            var actorBitmap = ImageManager.loadFace(actor.faceName());
            var faceWidth = ImageManager.faceWidth;
            var faceHeight = ImageManager.faceHeight;

            this.contents.blt(actorBitmap, 0, 0, faceWidth, faceHeight, x, y + (index * (faceHeight + 10)));
        }, this);
    };

    Window_CustomResults.prototype.drawBar = function(x, y, width, value, maxValue, label) {
        this.contents.fillRect(x, y, width, 20, '#000000');
        this.contents.fillRect(x, y, width * (value / maxValue), 20, '#00ff00');
        this.drawText(label, x + 5, y + 5);
    };
})();
