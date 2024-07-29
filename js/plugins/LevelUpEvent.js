/*:
 * @plugindesc Позволяет настраивать увеличение характеристик персонажей при прокачке и вызывать события изменения характеристик через команду плагина.
 * @help
 * Эта команда плагина используется для изменения характеристик персонажа при прокачке:
 * 
 * Команда: LevelUpEvent [индекс_персонажа] [random|specific] [характеристика] [увеличение]
 * 
 * - индекс_персонажа: индекс персонажа в команде (0 для первого, 1 для второго и т.д.)
 * - random|specific: используйте 'random' для случайного увеличения или 'specific' для конкретного значения
 * - характеристика: конкретная характеристика для увеличения (если используется 'specific'), можно пропустить для случайного увеличения
 * - увеличение: значение увеличения (если используется 'specific')
 * 
 * @param HPIncreaseMin
 * @text Минимум увеличения HP
 * @type number
 * @default 10
 *
 * @param HPIncreaseMax
 * @text Максимум увеличения HP
 * @type number
 * @default 15
 *
 * @param MPIncreaseMin
 * @text Минимум увеличения MP
 * @type number
 * @default 5
 *
 * @param MPIncreaseMax
 * @text Максимум увеличения MP
 * @type number
 * @default 10
 *
 * @param ATKIncreaseMin
 * @text Минимум увеличения ATK
 * @type number
 * @default 1
 *
 * @param ATKIncreaseMax
 * @text Максимум увеличения ATK
 * @type number
 * @default 3
 *
 * @param DEFIncreaseMin
 * @text Минимум увеличения DEF
 * @type number
 * @default 1
 *
 * @param DEFIncreaseMax
 * @text Максимум увеличения DEF
 * @type number
 * @default 3
 *
 * @param MATIncreaseMin
 * @text Минимум увеличения MAT
 * @type number
 * @default 1
 *
 * @param MATIncreaseMax
 * @text Максимум увеличения MAT
 * @type number
 * @default 3
 *
 * @param MDFIncreaseMin
 * @text Минимум увеличения MDF
 * @type number
 * @default 1
 *
 * @param MDFIncreaseMax
 * @text Максимум увеличения MDF
 * @type number
 * @default 3
 *
 * @param AGIIncreaseMin
 * @text Минимум увеличения AGI
 * @type number
 * @default 1
 *
 * @param AGIIncreaseMax
 * @text Максимум увеличения AGI
 * @type number
 * @default 3
 *
 * @param LUKIncreaseMin
 * @text Минимум увеличения LUK
 * @type number
 * @default 1
 *
 * @param LUKIncreaseMax
 * @text Максимум увеличения LUK
 * @type number
 * @default 3
 */

(function() {
    // Получаем параметры из меню плагинов
    var parameters = PluginManager.parameters('LevelUpEvent');
    var hpIncreaseRange = [Number(parameters['HPIncreaseMin'] || 10), Number(parameters['HPIncreaseMax'] || 15)];
    var mpIncreaseRange = [Number(parameters['MPIncreaseMin'] || 5), Number(parameters['MPIncreaseMax'] || 10)];
    var atkIncreaseRange = [Number(parameters['ATKIncreaseMin'] || 1), Number(parameters['ATKIncreaseMax'] || 3)];
    var defIncreaseRange = [Number(parameters['DEFIncreaseMin'] || 1), Number(parameters['DEFIncreaseMax'] || 3)];
    var matIncreaseRange = [Number(parameters['MATIncreaseMin'] || 1), Number(parameters['MATIncreaseMax'] || 3)];
    var mdfIncreaseRange = [Number(parameters['MDFIncreaseMin'] || 1), Number(parameters['MDFIncreaseMax'] || 3)];
    var agiIncreaseRange = [Number(parameters['AGIIncreaseMin'] || 1), Number(parameters['AGIIncreaseMax'] || 3)];
    var lukIncreaseRange = [Number(parameters['LUKIncreaseMin'] || 1), Number(parameters['LUKIncreaseMax'] || 3)];

    console.log(`Плагин загружен. Пулы увеличений настроены: 
        HP: ${hpIncreaseRange[0]}-${hpIncreaseRange[1]}, 
        MP: ${mpIncreaseRange[0]}-${mpIncreaseRange[1]}, 
        ATK: ${atkIncreaseRange[0]}-${atkIncreaseRange[1]}, 
        DEF: ${defIncreaseRange[0]}-${defIncreaseRange[1]}, 
        MAT: ${matIncreaseRange[0]}-${matIncreaseRange[1]}, 
        MDF: ${mdfIncreaseRange[0]}-${mdfIncreaseRange[1]}, 
        AGI: ${agiIncreaseRange[0]}-${agiIncreaseRange[1]}, 
        LUK: ${lukIncreaseRange[0]}-${lukIncreaseRange[1]}`);

    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'LevelUpEvent') {
            if (args.length < 1) {
                console.error('Недостаточно аргументов для команды LevelUpEvent');
                return;
            }

            // Выбор персонажа по индексу (начиная с 0)
            var actorIndex = parseInt(args[0]);
            var isRandom = args[1] === 'random';
            var specificStat = args[2]; // Опционально: конкретная характеристика для увеличения
            var specificAmount = args[3]; // Опционально: количество увеличения для конкретной характеристики

            console.log(`Команда LevelUpEvent вызвана. Индекс персонажа: ${actorIndex}, Используется случайный прирост: ${isRandom}, Конкретная характеристика: ${specificStat}, Количество увеличения: ${specificAmount}`);

            var actor = $gameParty.members()[actorIndex];
            if (!actor) {
                console.error('Персонаж с индексом ' + actorIndex + ' не найден');
                return;
            }

            var statType;
            var increaseAmount;

            if (isRandom) {
                var stats = ['hp', 'mp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk'];
                statType = stats[Math.floor(Math.random() * stats.length)];

                switch (statType) {
                    case 'hp':
                        increaseAmount = Math.floor(Math.random() * (hpIncreaseRange[1] - hpIncreaseRange[0] + 1)) + hpIncreaseRange[0];
                        break;
                    case 'mp':
                        increaseAmount = Math.floor(Math.random() * (mpIncreaseRange[1] - mpIncreaseRange[0] + 1)) + mpIncreaseRange[0];
                        break;
                    case 'atk':
                        increaseAmount = Math.floor(Math.random() * (atkIncreaseRange[1] - atkIncreaseRange[0] + 1)) + atkIncreaseRange[0];
                        break;
                    case 'def':
                        increaseAmount = Math.floor(Math.random() * (defIncreaseRange[1] - defIncreaseRange[0] + 1)) + defIncreaseRange[0];
                        break;
                    case 'mat':
                        increaseAmount = Math.floor(Math.random() * (matIncreaseRange[1] - matIncreaseRange[0] + 1)) + matIncreaseRange[0];
                        break;
                    case 'mdf':
                        increaseAmount = Math.floor(Math.random() * (mdfIncreaseRange[1] - mdfIncreaseRange[0] + 1)) + mdfIncreaseRange[0];
                        break;
                    case 'agi':
                        increaseAmount = Math.floor(Math.random() * (agiIncreaseRange[1] - agiIncreaseRange[0] + 1)) + agiIncreaseRange[0];
                        break;
                    case 'luk':
                        increaseAmount = Math.floor(Math.random() * (lukIncreaseRange[1] - lukIncreaseRange[0] + 1)) + lukIncreaseRange[0];
                        break;
                }
            } else {
                // Если не случайный прирост, берем конкретное значение и характеристику
                statType = specificStat;
                increaseAmount = parseInt(specificAmount);

                if (isNaN(increaseAmount)) {
                    console.error('Некорректное значение увеличения: ' + specificAmount);
                    return;
                }
            }

            // Увеличение характеристики
            var oldValue, newValue;
            switch (statType.toLowerCase()) {
                case 'hp':
                    oldValue = actor.mhp;
                    actor._paramPlus[0] += increaseAmount; // Увеличение HP
                    newValue = actor.mhp;
                    break;
                case 'mp':
                    oldValue = actor.mmp;
                    actor._paramPlus[1] += increaseAmount; // Увеличение MP
                    newValue = actor.mmp;
                    break;
                case 'atk':
                    oldValue = actor.atk;
                    actor._paramPlus[2] += increaseAmount; // Увеличение ATK
                    newValue = actor.atk;
                    break;
                case 'def':
                    oldValue = actor.def;
                    actor._paramPlus[3] += increaseAmount; // Увеличение DEF
                    newValue = actor.def;
                    break;
                case 'mat':
                    oldValue = actor.mat;
                    actor._paramPlus[4] += increaseAmount; // Увеличение MAT
                    newValue = actor.mat;
                    break;
                case 'mdf':
                    oldValue = actor.mdf;
                    actor._paramPlus[5] += increaseAmount; // Увеличение MDF
                    newValue = actor.mdf;
                    break;
                case 'agi':
                    oldValue = actor.agi;
                    actor._paramPlus[6] += increaseAmount; // Увеличение AGI
                    newValue = actor.agi;
                    break;
                case 'luk':
                    oldValue = actor.luk;
                    actor._paramPlus[7] += increaseAmount; // Увеличение LUK
                    newValue = actor.luk;
                    break;
                default:
                    console.error('Неизвестный тип характеристики: ' + statType);
                    return;
            }

            console.log(`Изменение характеристики ${statType.toUpperCase()}. Старое значение: ${oldValue}, Новое значение: ${newValue}`);

            $gameMessage.add('Характеристика ' + statType.toUpperCase() + ' персонажа ' + actor.name() + ' увеличена на ' + increaseAmount + '!');
            $gameMessage.add('Старое значение: ' + oldValue);
            $gameMessage.add('Новое значение: ' + newValue);
        }
    };
})();
