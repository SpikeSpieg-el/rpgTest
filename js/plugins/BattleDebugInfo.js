/*:
 * @plugindesc Плагин для вывода данных о битве в консоль для отладки, включая формулы и значения урона.
 * @author ChatGPT
 *
 * @help Этот плагин выводит различные данные о битве в консоль, 
 * включая информацию о нанесенном уроне, использованных формулах и значениях атрибутов.
 */

(function() {
    // Вывод информации о начале битвы
    var _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        console.log("============ Битва началась ============");
        console.log("Враги:", $gameTroop.members().map(enemy => enemy.name()));
        console.log("Игроки:", $gameParty.members().map(actor => actor.name()));
        _BattleManager_startBattle.call(this);
    };

    // Вывод информации о каждом действии
    var _BattleManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        console.log("=== Действие ===");
        console.log("Источник:", subject.name());
        console.log("Цель:", target.name());
        console.log("Умение/Атака:", this._action.item().name);
        console.log("HP цели до:", target.hp);
        console.log("MP цели до:", target.mp);
        
        // Получение формулы и расчет урона
        var result = target.result();
        var damage = result.hpDamage;
        var formula = this._action.item().damage.formula;
        var a = subject; // Источник атаки (a)
        var b = target;  // Цель атаки (b)
        
        // Подготовка для вычисления формулы
        var variables = {
            'a.hp': a.hp,
            'a.mp': a.mp,
            'a.atk': a.atk,
            'a.def': a.def,
            'a.mat': a.mat,
            'a.agi': a.agi, // Добавлено значение ловкости
            'a.level': a.level,
            'b.hp': b.hp,
            'b.mp': b.mp,
            'b.atk': b.atk,
            'b.def': b.def,
            'b.mdf': b.mdf
        };
        
        // Функция для замены переменных в формуле и вычисления результата
        function evaluateFormula(formula, vars) {
            try {
                var expression = formula;
                for (var key in vars) {
                    expression = expression.replace(new RegExp(key, 'g'), vars[key]);
                }
                return eval(expression);
            } catch (e) {
                console.error("Ошибка вычисления формулы:", e);
                return 0;
            }
        }

        // Вычисление формулы и расшифровка
        var detailedFormula = formula
            .replace(/a\.hp/g, a.hp)
            .replace(/a\.mp/g, a.mp)
            .replace(/a\.atk/g, a.atk)
            .replace(/a\.def/g, a.def)
            .replace(/a\.mat/g, a.mat)
            .replace(/a\.agi/g, a.agi) // Заменить значение ловкости
            .replace(/a\.level/g, a.level)
            .replace(/b\.hp/g, b.hp)
            .replace(/b\.mp/g, b.mp)
            .replace(/b\.atk/g, b.atk)
            .replace(/b\.def/g, b.def)
            .replace(/b\.mdf/g, b.mdf)
            .replace(/\*/g, ' * ')
            .replace(/\+/g, ' + ')
            .replace(/-/g, ' - ');

        var computedDamage = evaluateFormula(formula, variables);
        
        // Вывод информации
        console.log("Формула урона:", formula);
        console.log("Расшифровка формулы:", detailedFormula);
        console.log("Промежуточные значения:");
        console.log("  Атакующий: " + a.name() + " (HP: " + a.hp + ", MP: " + a.mp + ", ATK: " + a.atk + ", DEF: " + a.def + ", MAT: " + a.mat + ", AGI: " + a.agi + ", LEVEL: " + a.level + ")");
        console.log("  Цель: " + b.name() + " (HP: " + b.hp + ", MP: " + b.mp + ", ATK: " + b.atk + ", DEF: " + b.def + ", MDF: " + b.mdf + ")");
        console.log("  Вычисленный урон: " + computedDamage);
        
        _BattleManager_invokeAction.call(this, subject, target);
        
        // После применения действия выводим результат
        console.log("Урон:", damage);
        console.log("HP цели после:", target.hp);
        console.log("MP цели после:", target.mp);
    };

    // Вывод информации о завершении битвы
    var _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        console.log("=== Битва завершена ===");
        console.log("Результат:", result === 0 ? "Победа" : result === 1 ? "Поражение" : "Ничья");
        console.log("Игроки после битвы:", $gameParty.members().map(actor => actor.name() + " (HP: " + actor.hp + ", MP: " + actor.mp + ")"));
        console.log("Враги после битвы:", $gameTroop.members().map(enemy => enemy.name() + " (HP: " + enemy.hp + ", MP: " + enemy.mp + ")"));
        _BattleManager_endBattle.call(this, result);
    };

    // Вывод информации о применении умений и предметов
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        var result = target.result();
        var damage = result.hpDamage;
        var formula = this.item().damage.formula;
        var a = this.subject(); // Источник атаки (a)
        var b = target;  // Цель атаки (b)

        console.log("============ Применение умения/предмета ============");
        console.log("Источник:", a.name());
        console.log("Цель:", b.name());
        console.log("Умение/Предмет:", this.item().name);
        console.log("Формула урона:", formula);
        
        // Подготовка для вычисления формулы
        var variables = {
            'a.hp': a.hp,
            'a.mp': a.mp,
            'a.atk': a.atk,
            'a.def': a.def,
            'a.mat': a.mat,
            'a.agi': a.agi, // Добавлено значение ловкости
            'a.level': a.level,
            'b.hp': b.hp,
            'b.mp': b.mp,
            'b.atk': b.atk,
            'b.def': b.def,
            'b.mdf': b.mdf
        };
        
        // Функция для замены переменных в формуле и вычисления результата
        function evaluateFormula(formula, vars) {
            try {
                var expression = formula;
                for (var key in vars) {
                    expression = expression.replace(new RegExp(key, 'g'), vars[key]);
                }
                return eval(expression);
            } catch (e) {
                console.error("Ошибка вычисления формулы:", e);
                return 0;
            }
        }

        // Вычисление формулы и расшифровка
        var detailedFormula = formula
            .replace(/a\.hp/g, a.hp)
            .replace(/a\.mp/g, a.mp)
            .replace(/a\.atk/g, a.atk)
            .replace(/a\.def/g, a.def)
            .replace(/a\.mat/g, a.mat)
            .replace(/a\.agi/g, a.agi) // Заменить значение ловкости
            .replace(/a\.level/g, a.level)
            .replace(/b\.hp/g, b.hp)
            .replace(/b\.mp/g, b.mp)
            .replace(/b\.atk/g, b.atk)
            .replace(/b\.def/g, b.def)
            .replace(/b\.mdf/g, b.mdf)
            .replace(/\*/g, ' * ')
            .replace(/\+/g, ' + ')
            .replace(/-/g, ' - ');

        var computedDamage = evaluateFormula(formula, variables);
        
        // Вывод информации
        console.log("Формула урона:", formula);
        console.log("Расшифровка формулы:", detailedFormula);
        console.log("Промежуточные значения:");
        console.log("  Атакующий: " + a.name() + " (HP: " + a.hp + ", MP: " + a.mp + ", ATK: " + a.atk + ", DEF: " + a.def + ", MAT: " + a.mat + ", AGI: " + a.agi + ", LEVEL: " + a.level + ")");
        console.log("  Цель: " + b.name() + " (HP: " + b.hp + ", MP: " + b.mp + ", ATK: " + b.atk + ", DEF: " + b.def + ", MDF: " + b.mdf + ")");
        console.log("  Вычисленный урон: " + computedDamage);
        
        console.log("Урон:", damage);
        console.log("HP цели после:", b.hp);
        console.log("MP цели после:", b.mp);
        console.log("Состояния цели:", b.states().map(state => state.name));
    };

    // Вывод информации о начале и конце хода
    var _BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        console.log("============ Начало хода ============");
        console.log("Номер хода:", this._turnCount + 1);
        _BattleManager_startTurn.call(this);
    };

    var _BattleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
        console.log("============ Конец хода ============");
        console.log("Номер хода:", this._turnCount);
        _BattleManager_endTurn.call(this);
    };
})();
