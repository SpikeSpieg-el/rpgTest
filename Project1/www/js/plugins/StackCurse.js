// Установить начальные значения
let duration = 3; // Начальная продолжительность
let damage = 10; // Начальный урон

// Проверить, был ли навык уже применен к цели
if ($gameActors.actor(target).hasState('Poison')) {
  // Увеличить продолжительность
  duration += 2;

  // Увеличить урон
  damage *= 2;
}

// Добавить состояние "Яд"
$gameActors.actor(target).addState('Poison', duration);

// Нанести урон каждый ход
for (let i = 0; i < duration; i++) {
  $gameActors.actor(target).damage(damage);
  $gameMessage.add('Цель получает урон от яда!');
  // (Необязательно) Добавить анимацию или визуальный эффект
}