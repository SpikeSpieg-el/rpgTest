/*:
 * @plugindesc Генерация случайных путей и комнат с возможностью вызова по команде. Все параметры можно настроить в меню плагинов.
 * @author Roman Ch
 *
 * @param RoomList
 * @text Список комнат
 * @type text[]
 * @desc Укажите список комнат в формате: Название,ID,Вес (Пример: Магазин,1,10)
 * @default ["Магазин,1,10","Сундук,2,20","Битва,3,30","Прокачка,4,40"]
 *
 * @param PathCount
 * @text Количество путей
 * @type number
 * @default 2
 * @desc Количество путей, которые могут быть выбраны
 *
 * @param PathRoomCounts
 * @text Количество комнат для каждого пути
 * @type text
 * @desc Укажите количество комнат для каждого пути в формате: 4,4,4 (где 4 - количество комнат для первого пути, 4 - для второго и т.д.)
 * @default 4,4
 * 
 * @param DefaultRoomWeight
 * @text Вес по умолчанию
 * @type number
 * @default 1
 * @desc Вес, который будет присвоен комнате, если вес не указан
 *
 * @param MinChoicesBeforeAllow
 * @text Мин. количество выборов для разрешенных комнат
 * @type text[]
 * @desc Список комнат в формате Название,Мин.КоличествоВыборов (Пример: Магазин,4)
 * @default ["Магазин,4"]
 *
 * @param SingleUseRooms
 * @text Комнаты одноразового использования
 * @type text[]
 * @desc Укажите список комнат, которые могут появиться только один раз (Пример: Босс,5,50)
 * @default ["Босс,5,50"]
 *
 *
 * @help
 * Этот плагин позволяет создать случайные пути и комнаты. 
 * Можно вызвать создание путей и комнат по команде из событий или скриптов.
 * Все настройки можно изменить в меню плагинов.
 * 
 * // Вызываем функцию выбора путей в скрипте:
 * requestPathSelection();
 */
(function() {
    // Получаем параметры из меню плагинов
    const parameters = PluginManager.parameters('RandomPaths');
    const roomList = JSON.parse(parameters['RoomList'] || '[]');
    const pathCount = Math.max(Number(parameters['PathCount'] || 2), 1);
    const pathRoomCounts = String(parameters['PathRoomCounts'] || '4,4').split(',').map(Number);
    const defaultRoomWeight = Number(parameters['DefaultRoomWeight'] || 1);
    const minChoicesBeforeAllow = JSON.parse(parameters['MinChoicesBeforeAllow'] || '[]');
    const singleUseRooms = JSON.parse(parameters['SingleUseRooms'] || '[]');
    const roomCounterVariable = Number(parameters['RoomCounterVariable'] || 1);

    // Разбираем список комнат
    function parseRoomList(roomList) {
        return roomList.map(entry => {
            const [name, id, weight] = entry.split(',');
            return {
                name: name.trim(),
                id: Number(id.trim()),
                weight: weight ? Number(weight.trim()) : defaultRoomWeight
            };
        });
    }

    // Разбираем минимальные выборы для комнат
    function parseMinChoicesBeforeAllow(minChoicesBeforeAllow) {
        return minChoicesBeforeAllow.map(entry => {
            const [name, minChoices] = entry.split(',');
            return {
                name: name.trim(),
                minChoices: Number(minChoices.trim())
            };
        });
    }

    const rooms = parseRoomList(roomList);
    const restrictedRooms = parseMinChoicesBeforeAllow(minChoicesBeforeAllow);
    const singleUseRoomList = parseRoomList(singleUseRooms);
    let lastSelectedRooms = [];
    let totalChoicesMade = 0;
    let usedSingleUseRooms = [];

    // Глобальная функция для создания случайных путей и комнат
    window.requestPathSelection = function() {
        createRandomPathsAndRooms();
    };

    // Функция для выбора случайной комнаты на основе весов с исключением предыдущих выборов и запрещенных комнат
    function getRandomRoom(excludeRooms = [], totalChoicesMade) {
        const availableRooms = rooms.concat(singleUseRoomList.filter(room => !usedSingleUseRooms.includes(room.name)))
            .filter(room => {
                const restriction = restrictedRooms.find(restriction => restriction.name === room.name);
                if (restriction && totalChoicesMade < restriction.minChoices) {
                    return false;
                }
                return !excludeRooms.includes(room.name);
            });

        const totalWeight = availableRooms.reduce((sum, room) => sum + room.weight, 0);
        let random = Math.random() * totalWeight;
        for (const room of availableRooms) {
            random -= room.weight;
            if (random <= 0) {
                if (singleUseRoomList.some(singleUseRoom => singleUseRoom.name === room.name)) {
                    usedSingleUseRooms.push(room.name);
                }
                return room;
            }
        }
        return availableRooms[0]; // На случай, если что-то пошло не так
    }

    // Создаем случайные пути и комнаты
    function createRandomPathsAndRooms() {
        console.log(`Доступные комнаты: ${JSON.stringify(rooms.concat(singleUseRoomList.filter(room => !usedSingleUseRooms.includes(room.name))))}`);

        // Проверяем наличие достаточного количества комнат
        const totalRoomCount = pathRoomCounts.reduce((a, b) => a + b, 0);
        if (rooms.length < Math.max(...pathRoomCounts)) {
            console.error(`Недостаточно комнат для выбора. Всего комнат: ${rooms.length}, Максимальное количество комнат для одного пути: ${Math.max(...pathRoomCounts)}`);
            return;
        }

        // Определяем комнаты для путей
        const pathChoices = [];
        for (let pathIndex = 0; pathIndex < pathCount; pathIndex++) {
            const roomCount = pathRoomCounts[pathIndex] || 0;
            const roomChoice = [];
            for (let i = 0; i < roomCount; i++) {
                const previousRoom = i > 0 ? roomChoice[i - 1].name : null;
                const newRoom = getRandomRoom(lastSelectedRooms.concat(previousRoom ? [previousRoom] : []), totalChoicesMade);
                roomChoice.push(newRoom);
            }
            pathChoices.push(roomChoice);
        }

        console.log(`Выбор для путей: ${JSON.stringify(pathChoices)}`);

        // Случайный выбор комнаты для каждого пути
        const randomPathChoices = pathChoices.map(pathChoice => pathChoice[Math.floor(Math.random() * pathChoice.length)]);
        $gameSystem.pathChoices = randomPathChoices;

        // Обновление списка последних выбранных комнат
        lastSelectedRooms = randomPathChoices.map(choice => choice.name);
        totalChoicesMade++;

        // Показать выбор пути игроку после следующего кадра
        setTimeout(() => {
            showPathChoice();
        }, 0);
    }

    function showPathChoice() {
        if (!$gameSystem.pathChoices) {
            console.error('Ошибка: Не удалось определить выбор путей.');
            return;
        }

        const choices = $gameSystem.pathChoices.map((path, index) => `${index + 1}: ${path.name}`);
        
        $gameMessage.setChoices(choices, 0, $gameSystem.pathChoices.length - 1);
        $gameMessage.setChoiceCallback(index => {
            if (index >= 0 && index < $gameSystem.pathChoices.length) {
                transferToRoom($gameSystem.pathChoices[index]);
                incrementRoomCounter();
            } else {
                console.error('Ошибка: Неверный выбор пути.');
            }
        });
        $gameMessage.add("Выберите путь:");
    }

    function transferToRoom(room) {
        // Начальная позиция игрока
        const x = 9;
        const y = 14;

        // Перемещение игрока в выбранную комнату
        if (room && room.id) {
            $gamePlayer.reserveTransfer(room.id, x, y);
        } else {
            console.error('Ошибка: Не удалось переместить игрока. Комната не определена.');
        }
    }

    function incrementRoomCounter() {
        const currentCount = $gameVariables.value(roomCounterVariable);
        $gameVariables.setValue(roomCounterVariable, currentCount + 1);
    }

    // Перехватываем завершение боя
    const _Scene_Battle_endBattle = Scene_Battle.prototype.endBattle;
    Scene_Battle.prototype.endBattle = function(result) {
        _Scene_Battle_endBattle.call(this, result);
        createRandomPathsAndRooms();
    };

    // Создаем счетчик комнат и добавляем его на экран
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        this.createRoomCounter();
    };

    Scene_Map.prototype.createRoomCounter = function() {
        this._roomCounterSprite = new Sprite(new Bitmap(200, 50));
        this._roomCounterSprite.bitmap.fontSize = 28;
        this._roomCounterSprite.bitmap.textColor = '#FFFFFF';
        this._roomCounterSprite.x = 10; // Позиция слева
        this._roomCounterSprite.y = 10; // Позиция сверху
        this.addChild(this._roomCounterSprite);
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.updateRoomCounter();
    };

    Scene_Map.prototype.updateRoomCounter = function() {
        const roomsCount = $gameVariables.value(roomCounterVariable);
        this._roomCounterSprite.bitmap.clear();
        this._roomCounterSprite.bitmap.drawText(`Комнат пройдено: ${roomsCount}`, 0, 0, 200, 50, 'left');
    };

})();

