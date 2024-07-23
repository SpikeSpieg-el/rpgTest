/*:
 * @plugindesc Генерация случайных путей и комнат с возможностью вызова по команде. Все параметры можно настроить в меню плагинов.
 * @author Roman Ch
 *
 * @param RoomList
 * @text Список комнат
 * @type text
 * @desc Укажите список комнат в формате: Название1,ID1,Вес1;Название2,ID2,Вес2;...
 * @default Магазин,1,10;Сундук,2;Битва,3,30;Прокачка,4
 *
 * @param -------------------------------
 * @text -------------------------------
 * @type test
 * @default -------------------------------
 * @desc 
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
 * @param -------------------------------
 * @text -------------------------------
 * @type test
 * @default -------------------------------
 * @desc
 *
 * @param DefaultRoomWeight
 * @text Вес по умолчанию
 * @type number
 * @default 1
 * @desc Вес, который будет присвоен комнате, если вес не указан
 *
 * @help
 * Этот плагин позволяет создать случайные пути и комнаты. 
 * Можно вызвать создание путей и комнат по команде из событий или скриптов.
 * Все настройки можно изменить в меню плагинов.
 * 
 * // Вызываем функцию выбора путей в скрипт

        requestPathSelection();

                    
 */

(function() {
    // Получаем параметры из меню плагинов
    const parameters = PluginManager.parameters('RandomPaths');
    const roomList = String(parameters['RoomList'] || 'Магазин,1,10;Сундук,2,20;Битва,3,30;Прокачка,4,40');
    const pathCount = Math.max(Number(parameters['PathCount'] || 2), 1);
    const pathRoomCounts = String(parameters['PathRoomCounts'] || '4,4').split(',').map(Number);
    const defaultRoomWeight = Number(parameters['DefaultRoomWeight'] || 1);

    // Разбираем список комнат
    function parseRoomList(roomList) {
        return roomList.split(';').map(entry => {
            const [name, id, weight] = entry.split(',');
            return {
                name: name.trim(),
                id: Number(id.trim()),
                weight: weight ? Number(weight.trim()) : defaultRoomWeight
            };
        });
    }

    const rooms = parseRoomList(roomList);

    // Глобальная функция для создания случайных путей и комнат
    window.requestPathSelection = function() {
        createRandomPathsAndRooms();
    };

    // Функция для выбора случайной комнаты на основе весов
    function getRandomRoom() {
        const totalWeight = rooms.reduce((sum, room) => sum + room.weight, 0);
        let random = Math.random() * totalWeight;
        for (const room of rooms) {
            random -= room.weight;
            if (random <= 0) {
                return room;
            }
        }
        return rooms[0]; // На случай, если что-то пошло не так
    }

    // Создаем случайные пути и комнаты
    function createRandomPathsAndRooms() {
        console.log(`Доступные комнаты: ${JSON.stringify(rooms)}`);

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
                roomChoice.push(getRandomRoom());
            }
            pathChoices.push(roomChoice);
        }

        console.log(`Выбор для путей: ${JSON.stringify(pathChoices)}`);

        // Случайный выбор комнаты для каждого пути
        const randomPathChoices = pathChoices.map(pathChoice => pathChoice[Math.floor(Math.random() * pathChoice.length)]);
        $gameSystem.pathChoices = randomPathChoices;

        // Показать выбор пути игроку
        showPathChoice();
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

    // Перехватываем завершение боя
    const _Scene_Battle_endBattle = Scene_Battle.prototype.endBattle;
    Scene_Battle.prototype.endBattle = function(result) {
        _Scene_Battle_endBattle.call(this, result);
        createRandomPathsAndRooms();
    };

})();
