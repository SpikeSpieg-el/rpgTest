// Переопределение метода drawActorIcons
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    const states = actor.states();
    let iconX = x;
    const iconWidth = ImageManager.iconWidth;
    
    for (const state of states) {
        if (state.iconIndex > 0) {
            // Рисуем иконку состояния
            this.drawIcon(state.iconIndex, iconX, y);
            
            // Если это состояние яда, добавляем текст с оставшимися ходами
            if (state.id === 13 && actor._poisonTurnsRemaining > 0) { // Замените 10 на ID состояния яда
                this.drawText(actor._poisonTurnsRemaining, iconX + iconWidth - 8, y + iconWidth - 24, 24, 'right');
            }
            
            iconX += iconWidth + 4;
            if (iconX >= x + width) {
                break;
            }
        }
    }
};
