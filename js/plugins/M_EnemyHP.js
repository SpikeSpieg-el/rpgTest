//===========================================================================
// M_EnemyHP.js
//===========================================================================

/*:
 * @plugindesc (v1.5) Показывает HP врага при атаке с отображением чисел.
 * @author Roman
 *
 * @param EHP Fade Duration
 * @desc Время для активации затухания.
 * (По умолчанию = 120)
 * @default 120
 *
 * @param EHP Layout X-Axis
 * @desc Положение по оси X для макета.
 * @default 0
 *
 * @param EHP Layout Y-Axis
 * @desc Положение по оси Y для макета.
 * @default 0
 *
 * @param EHP Meter X-Axis
 * @desc Положение по оси X для индикатора.
 * @default 4
 *
 * @param EHP Meter Y-Axis
 * @desc Положение по оси Y для индикатора.
 * @default 2
 *
 * @param EHP Text X-Axis
 * @desc Положение по оси X для текста HP.
 * @default 0
 *
 * @param EHP Text Y-Axis
 * @desc Положение по оси Y для текста HP.
 * @default -20
 *
 * @help
 * ===========================================================================
 * +++  Enemy HP Meter (v1.5) +++
 * Автор: Roman
 * 
 * ===========================================================================
 * Показывает HP врага при атаке, отображая числовое значение HP.
 * Необходимы файлы. (img/system/)
 *
 * EnemyHP_A.png
 * EnemyHP_B.png
 *
 * Чтобы скрыть HP врага, используйте следующую метку в блокноте
 *
 * Hide HP
 *
 * ===========================================================================
 * ** История изменений **
 * ===========================================================================
 * (v1.5) Добавлено отображение числового значения HP.
 * ===========================================================================
 * +++ MOG - Enemy HP Meter (v1.5) +++
 * ===========================================================================
 */

//===========================================================================
// ** PLUGIN PARAMETERS
//===========================================================================

var Imported = Imported || {};
Imported.MOG_EnemyHP = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('M_EnemyHP');
Moghunter.enemyhp_a_x = Number(Moghunter.parameters['EHP Layout X-Axis'] || 0);
Moghunter.enemyhp_a_y = Number(Moghunter.parameters['EHP Layout Y-Axis'] || 0);
Moghunter.enemyhp_b_x = Number(Moghunter.parameters['EHP Meter X-Axis'] || 4);
Moghunter.enemyhp_b_y = Number(Moghunter.parameters['EHP Meter Y-Axis'] || 2);
Moghunter.enemyhp_text_x = Number(Moghunter.parameters['EHP Text X-Axis'] || 0);
Moghunter.enemyhp_text_y = Number(Moghunter.parameters['EHP Text Y-Axis'] || -20);
Moghunter.enemyhp_duration = Number(Moghunter.parameters['EHP Fade Duration'] || 120);

//===========================================================================
// ** Game Battler
//===========================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function () {
	if (this.isEnemy()) { return this.enemy().note.split(/[\r\n]+/) };
	if (this.isActor()) { return this.actor().note.split(/[\r\n]+/) };
};

//===========================================================================
// ** Game_Enemy
//===========================================================================

//==============================
// * Setup
//==============================
var _alias_mog_gba_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
	_alias_mog_gba_setup.call(this, enemyId, x, y);
	this._hp_meter = true
	for (var i = 0; i < this.notetags().length; i++) {
		if (this.notetags()[i] == "Hide HP") { this._hp_meter = false };
	};
};

//===========================================================================
// ** Spriteset_Battle
//===========================================================================

//==============================
// * CreateLowerLayer
//==============================
var _alias_mog_enemyhp_createUpperLayer = Spriteset_Battle.prototype.createUpperLayer
Spriteset_Battle.prototype.createUpperLayer = function () {
	this.create_ehp_sprites();
	_alias_mog_enemyhp_createUpperLayer.call(this);
};

//==============================
// * Update
//==============================
var _alias_mog_enemyhp_update = Spriteset_Battle.prototype.update
Spriteset_Battle.prototype.update = function () {
	_alias_mog_enemyhp_update.call(this);
	this.update_ehp_sprites();
};

//==============================
// * Create EHP Sprites
//==============================
Spriteset_Battle.prototype.create_ehp_sprites = function () {
	this._ehp_sprites_a = [];
	this._ehp_sprites_b = [];
	this._ehp_sprites_c = [];
	this._ehp_sprites_text = [];
	this._ehp_sprites_data = [];
	for (var i = 0; i < this._enemySprites.length; i++) {
		if (this._enemySprites[i]._battler == null) { return; };
		this._ehp_sprites_a[i] = new Sprite(ImageManager.loadSystem("EnemyHP_A"));
		this._ehp_sprites_b[i] = new Sprite(ImageManager.loadSystem("EnemyHP_B"));
		this._ehp_sprites_c[i] = new Sprite(ImageManager.loadSystem("EnemyHP_B"));
		this._ehp_sprites_text[i] = new Sprite(new Bitmap(120, 32)); // Создаем текстовый спрайт
		this._ehp_sprites_a[i].opacity = 0;
		this._ehp_sprites_b[i].opacity = 0;
		this._ehp_sprites_c[i].opacity = 0;
		this._ehp_sprites_text[i].opacity = 0; // Устанавливаем начальную прозрачность
		this._ehp_sprites_a[i].z = 50;
		this._ehp_sprites_b[i].z = 51;
		this._ehp_sprites_c[i].z = 52;
		this._ehp_sprites_text[i].z = 53; // Устанавливаем z-координату для текста
		if (!this._enemySprites[i]._battler._hp_meter) { this._ehp_sprites_a[i].visible = false };
		this._ehp_sprites_b[i].visible = this._ehp_sprites_a[i].visible
		this._ehp_sprites_c[i].visible = this._ehp_sprites_a[i].visible
		this._ehp_sprites_text[i].visible = this._ehp_sprites_a[i].visible; // Включаем видимость текста, если включена полоска
		this._battleField.addChild(this._ehp_sprites_a[i]);
		this._battleField.addChild(this._ehp_sprites_b[i]);
		this._battleField.addChild(this._ehp_sprites_c[i]);
		this._battleField.addChild(this._ehp_sprites_text[i]); // Добавляем текстовый спрайт на экран
		this._ehp_sprites_data[i] = [this._enemySprites[i]._battler.hp, 0, 0, Math.max(Moghunter.enemyhp_duration, 32), this._enemySprites[i]._battler.hp,];
	};
};

//==============================
// * Update EHP Sprites
//==============================
Spriteset_Battle.prototype.update_ehp_sprites = function () {
	for (var i = 0; i < this._enemySprites.length; i++) {
		if (this._ehp_sprites_a[i] == null) { return; };
		if (!this._ehp_sprites_a[i].bitmap.isReady()) { return };
		this._ehp_sprites_a[i].x = this._enemySprites[i].x + Moghunter.enemyhp_a_x + this._ehp_sprites_data[i][1] - (this._ehp_sprites_a[i].bitmap.width / 2);
		this._ehp_sprites_a[i].y = this._enemySprites[i].y + Moghunter.enemyhp_a_y;
		this._ehp_sprites_b[i].x = this._ehp_sprites_a[i].x + Moghunter.enemyhp_b_x;
		this._ehp_sprites_b[i].y = this._ehp_sprites_a[i].y + Moghunter.enemyhp_b_y;
		this._ehp_sprites_c[i].x = this._ehp_sprites_a[i].x + Moghunter.enemyhp_b_x;
		this._ehp_sprites_c[i].y = this._ehp_sprites_a[i].y + Moghunter.enemyhp_b_y;
		this._ehp_sprites_text[i].x = this._ehp_sprites_a[i].x + Moghunter.enemyhp_text_x;
		this._ehp_sprites_text[i].y = this._ehp_sprites_a[i].y + Moghunter.enemyhp_text_y;
		this._ehp_sprites_b[i].opacity = this._ehp_sprites_a[i].opacity;
		this._ehp_sprites_c[i].opacity = this._ehp_sprites_a[i].opacity;
		this._ehp_sprites_text[i].opacity = this._ehp_sprites_a[i].opacity; // Синхронизируем прозрачность текста с полоской
		this.update_ehp_red_bar(i);
		this.update_ehp_blue_bar(i);
		this.update_ehp_text(i); // Обновляем текст HP
	};
};

//==============================
// * Update EHP Blue Bar
//==============================
Spriteset_Battle.prototype.update_ehp_blue_bar = function (i) {
	if (this._enemySprites[i]._battler.isDead()) {
		this._ehp_sprites_a[i].opacity -= 2;
	};
	if (this._ehp_sprites_data[i][2] > 0) {
		this._ehp_sprites_data[i][2] -= 1
	};
	if (this._ehp_sprites_data[i][2] > this._ehp_sprites_data[i][3]) {
		this._ehp_sprites_data[i][1] += 2;
		this._ehp_sprites_a[i].opacity += 17
	} else {
		if (this._ehp_sprites_data[i][1] < 30 && this._ehp_sprites_data[i][2] <= 15) {
			this._ehp_sprites_data[i][1] += 2; this._ehp_sprites_a[i].opacity -= 17
		};
	}
	if (this._ehp_sprites_data[i][0] != this._enemySprites[i]._battler.hp) {

		if (this._ehp_sprites_data[i][2] > 15 && this._ehp_sprites_data[i][2] <= this._ehp_sprites_data[i][3]) {
			this._ehp_sprites_data[i][2] = this._ehp_sprites_data[i][3]
		} else {
			this._ehp_sprites_data[i][1] = -30;
			this._ehp_sprites_data[i][2] = this._ehp_sprites_data[i][3] + 15;
		}
	}
	this._ehp_sprites_data[i][0] = this._enemySprites[i]._battler.hp;
	var meter_rate = this._ehp_sprites_c[i].bitmap.width * this._enemySprites[i]._battler.hp / this._enemySprites[i]._battler.mhp;
	this._ehp_sprites_c[i].setFrame(0, 0, meter_rate, this._ehp_sprites_c[i].bitmap.height / 2);
};

//==============================
// * Update EHP Red Bar
//==============================
Spriteset_Battle.prototype.update_ehp_red_bar = function (i) {
	if (this._ehp_sprites_data[i][4] != this._enemySprites[i]._battler.hp) {
		var dnspeed = 1 + (Math.abs(this._ehp_sprites_data[i][4] - this._enemySprites[i]._battler.hp) / (Moghunter.enemyhp_duration / 2));
		if (this._ehp_sprites_data[i][4] > this._enemySprites[i]._battler.hp) {
			this._ehp_sprites_data[i][4] -= dnspeed;
			if (this._ehp_sprites_data[i][4] < this._enemySprites[i]._battler.hp) {
				this._ehp_sprites_data[i][4] = this._enemySprites[i]._battler.hp
			};
		}
		else if (this._ehp_sprites_data[i][4] < this._enemySprites[i]._battler.hp) {
			this._ehp_sprites_data[i][4] += dnspeed;
			if (this._ehp_sprites_data[i][4] > this._enemySprites[i]._battler.hp) {
				this._ehp_sprites_data[i][4] = this._enemySprites[i]._battler.hp
			};
		}
		var meter_rate = this._ehp_sprites_b[i].bitmap.width * this._ehp_sprites_data[i][4] / this._enemySprites[i]._battler.mhp;
		this._ehp_sprites_b[i].setFrame(0, this._ehp_sprites_b[i].bitmap.height / 2, meter_rate, this._ehp_sprites_b[i].bitmap.height / 2);
	};
};

//==============================
// * Update EHP Text
//==============================
Spriteset_Battle.prototype.update_ehp_text = function (i) {
	var currentHp = this._enemySprites[i]._battler.hp;
	var maxHp = this._enemySprites[i]._battler.mhp;
	this._ehp_sprites_text[i].bitmap.clear();
	this._ehp_sprites_text[i].bitmap.drawText(currentHp + " / " + maxHp, 0, 0, 120, 32, 'center');
};