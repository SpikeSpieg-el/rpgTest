/*:
 * @plugindesc Генератор случайного лута с настраиваемыми параметрами через вкладку плагинов.
 * @param WeaponIcon
 * @type number
 * @desc Иконка для оружия.
 * @default 1
 *
 * @param ArmorIcon
 * @type number
 * @desc Иконка для брони.
 * @default 2
 *
 * @param ItemIcon
 * @type number
 * @desc Иконка для предметов.
 * @default 3
 *
 * @param GoldIcon
 * @type number
 * @desc Иконка для золота.
 * @default 4
 *
 * @param MaxGold
 * @type number
 * @desc Максимальное количество золота.
 * @default 1000
 *
 * @param WeaponWeight
 * @type number
 * @desc Вес для оружия (чем выше значение, тем выше вероятность выпадения).
 * @default 25
 *
 * @param ArmorWeight
 * @type number
 * @desc Вес для брони.
 * @default 25
 *
 * @param ItemWeight
 * @type number
 * @desc Вес для предметов.
 * @default 25
 *
 * @param GoldWeight
 * @type number
 * @desc Вес для золота.
 * @default 25
 *
 * @param MinWeaponID
 * @type number
 * @desc Минимальный ID оружия.
 * @default 1
 *
 * @param MaxWeaponID
 * @type number
 * @desc Максимальный ID оружия.
 * @default 5
 *
 * @param MinArmorID
 * @type number
 * @desc Минимальный ID брони.
 * @default 1
 *
 * @param MaxArmorID
 * @type number
 * @desc Максимальный ID брони.
 * @default 5
 *
 * @param MinItemID
 * @type number
 * @desc Минимальный ID предмета.
 * @default 1
 *
 * @param MaxItemID
 * @type number
 * @desc Максимальный ID предмета.
 * @default 5
 *
 * @param WeaponIDs
 * @type string
 * @desc Список конкретных ID оружия через запятую.
 * @default
 *
 * @param ArmorIDs
 * @type string
 * @desc Список конкретных ID брони через запятую.
 * @default
 *
 * @param ItemIDs
 * @type string
 * @desc Список конкретных ID предметов через запятую.
 * @default
 *
 * @help
 * Этот плагин добавляет возможность генерации случайного лута в RPG Maker MV/MZ.
 * Параметры можно настроить через вкладку плагинов.
 */
(function() {
    // Получаем параметры из меню плагинов
    const parameters = PluginManager.parameters('LootGenerator');
    const weaponIcon = Number(parameters['WeaponIcon'] || 1);
    const armorIcon = Number(parameters['ArmorIcon'] || 2);
    const itemIcon = Number(parameters['ItemIcon'] || 3);
    const goldIcon = Number(parameters['GoldIcon'] || 4);
    const maxGold = Number(parameters['MaxGold'] || 1000);
    const weaponWeight = Number(parameters['WeaponWeight'] || 25);
    const armorWeight = Number(parameters['ArmorWeight'] || 25);
    const itemWeight = Number(parameters['ItemWeight'] || 25);
    const goldWeight = Number(parameters['GoldWeight'] || 25);
    const weaponRangeMin = Number(parameters['MinWeaponID'] || 1);
    const weaponRangeMax = Number(parameters['MaxWeaponID'] || 5);
    const armorRangeMin = Number(parameters['MinArmorID'] || 1);
    const armorRangeMax = Number(parameters['MaxArmorID'] || 5);
    const itemRangeMin = Number(parameters['MinItemID'] || 1);
    const itemRangeMax = Number(parameters['MaxItemID'] || 5);
    const weaponIds = (parameters['WeaponIDs'] || '').split(',').map(id => Number(id.trim())).filter(id => id > 0);
    const armorIds = (parameters['ArmorIDs'] || '').split(',').map(id => Number(id.trim())).filter(id => id > 0);
    const itemIds = (parameters['ItemIDs'] || '').split(',').map(id => Number(id.trim())).filter(id => id > 0);

    // Глобальная функция для генерации случайного лута
    window.requestLoot = function() {
        generateAndShowLoot();
    };

    // Функция для генерации и отображения случайного лута
    function generateAndShowLoot() {
        const totalWeight = weaponWeight + armorWeight + itemWeight + goldWeight;
        let random = Math.random() * totalWeight;
        let message = '';
        let iconIndex = 0;
        let amount = 0;
        let itemId = 0;

        if (random < weaponWeight) {
            // Оружие
            if (weaponIds.length > 0) {
                itemId = weaponIds[Math.floor(Math.random() * weaponIds.length)];
            } else {
                itemId = Math.floor(Math.random() * (weaponRangeMax - weaponRangeMin + 1)) + weaponRangeMin;
            }
            if (itemId >= weaponRangeMin && itemId <= weaponRangeMax && $dataWeapons[itemId]) {
                iconIndex = $dataWeapons[itemId].iconIndex || weaponIcon;
                message = `Вы нашли оружие: ${$dataWeapons[itemId].name} \\i[${iconIndex}]`;
                $gameParty.gainItem($dataWeapons[itemId], 1);
            } else {
                message = 'Не удалось найти оружие.';
            }
        } else if (random < weaponWeight + armorWeight) {
            // Броня
            if (armorIds.length > 0) {
                itemId = armorIds[Math.floor(Math.random() * armorIds.length)];
            } else {
                itemId = Math.floor(Math.random() * (armorRangeMax - armorRangeMin + 1)) + armorRangeMin;
            }
            if (itemId >= armorRangeMin && itemId <= armorRangeMax && $dataArmors[itemId]) {
                iconIndex = $dataArmors[itemId].iconIndex || armorIcon;
                message = `Вы нашли броню: ${$dataArmors[itemId].name} \\i[${iconIndex}]`;
                $gameParty.gainItem($dataArmors[itemId], 1);
            } else {
                message = 'Не удалось найти броню.';
            }
        } else if (random < weaponWeight + armorWeight + itemWeight) {
            // Предмет
            if (itemIds.length > 0) {
                itemId = itemIds[Math.floor(Math.random() * itemIds.length)];
            } else {
                itemId = Math.floor(Math.random() * (itemRangeMax - itemRangeMin + 1)) + itemRangeMin;
            }
            if (itemId >= itemRangeMin && itemId <= itemRangeMax && $dataItems[itemId]) {
                iconIndex = $dataItems[itemId].iconIndex || itemIcon;
                message = `Вы нашли предмет: ${$dataItems[itemId].name} \\i[${iconIndex}]`;
                $gameParty.gainItem($dataItems[itemId], 1);
            } else {
                message = 'Не удалось найти предмет.';
            }
        } else {
            // Золото
            amount = Math.floor(Math.random() * maxGold) + 1;
            iconIndex = goldIcon;
            message = `Вы нашли ${amount} золота \\i[${iconIndex}]`;
            $gameParty.gainGold(amount);
        }

        // Отображаем сообщение с иконкой
        $gameMessage.add(message);
    }

    // Перехватываем команды для отображения лута в событиях
    const _Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function(params) {
        if (params && params[0] === 'LootGenerator') {
            requestLoot();
            return true;
        }
        return _Game_Interpreter_command355.call(this, params);
    };
})();
