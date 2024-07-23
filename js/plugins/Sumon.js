/*:
 * @target MZ
 * @author Aerosys
 * @plugindesc [Tier 1] [Version 1.4.2] [MV & MZ]
 * 
 * @help
 * 
 * ----------------------------------------------------------------------------
 * Rules
 * ----------------------------------------------------------------------------
 * 
 * 1. This Plugin is free of charge and can be used in any kind of game.
 * 
 * 2. You may not redistribute this Plugin or claim it as your own.
 *    
 *    a) Exception: You may redistribute this plugin as part of your game when
 *       releasing it.
 *    b) Exception: You may send this plugin to another person when you hire
 *       them for personal modifications.
 * 
 * 3. You may modify this plugin's source code for your needs but cannot
 *    redistribute your modifications.
 * 
 * 4. You may create plugins based on this (e.g. addon or extension) for your
 *    needs but you cannot redistribute them.
 * 
 * 
 * ----------------------------------------------------------------------------
 * Required Settings
 * ----------------------------------------------------------------------------
 * 
 * Please set all the Required Parameters on the right.
 * 
 * - The Summon Skill Type
 * You need a Skill Type that is exclusively used for the Summon Commands.
 * It can have any name.
 * You may add or seal this Skill Type by using e.g. Traits, Equipment, States,
 * etc. to control whether an Actor may summon Pets.
 * 
 * 
 * ----------------------------------------------------------------------------
 * Quickstart
 * ----------------------------------------------------------------------------
 * 
 * This plugin implements a Summon System into RPG Maker!
 * By adding <Pet> to an Actor's or their Classes' Notetag box, this actor is
 * transformed into a Pet.
 * 
 * Pets are not ready on battle start - they need to be summoned during battle.
 * 
 * Note!
 * Pets consume a battler slot just the same as ordinary actors. When your
 * Party is maxed out, you cannot summon Pets into battle until there's a free
 * Slot available.
 * 
 * There's a Plugin Parameter that allows to bypass this limitation, however,
 * there's some risk this feature will not work with other plugins.
 * 
 * 
 * ----------------------------------------------------------------------------
 * Promoting Actors to become a Summoner
 * ----------------------------------------------------------------------------
 * 
 * By default, any actor having access to the dedicated Skill Type can summon
 * any Pet the Party owns right now. The Plugin automatically adds the Skills
 * for you, so you don't need to do that.
 * 
 * Alternatively, when you want to use a different set of rules, you may
 * disable the automatic addition of Skills.
 * 
 * This Plugin allows the usage of Notetags. The Notetag <Summon: x> can be
 * applied on Skills, Items, Actors, Classes, Equip, and States. So you may
 * create your own Skills and Items in the Database and/or bind Pets to e.g.
 * Accessories.
 * 
 * <Summon: x>
 * - can be applied on Skills & Items
 * - summons Pet the Actor Id x, regardless of their existence in the Party
 * 
 * <Summon: x, y, z, ...>
 * - can be applied on Actor, Class, Equip, & States
 * - multiple values are allowed
 * - allows the Actor to summon Pets with the Actor Id x, y, z, ... regardless
 *   of their existence in the Party
 * 
 * Now, it's up to you how your heroes should be granted access to Pets.
 * - Auto-learn by level up?
 * - Bound to Class?
 * - Bound to Equip?
 * - Skill Shop?
 * - Magic Books or Scrolls?
 * - ...
 * 
 * 
 * ----------------------------------------------------------------------------
 * Notetags
 * ----------------------------------------------------------------------------
 * 
 * <Pet>
 * - can be applied on Actors & Classes
 * - turns this Actor into a Pet
 * 
 * <Summon Icon: x>
 * - can be applied on Actors (Pets) & Classes
 * - overrides the default Icon of the Pet's Summon Command
 * 
 * <Summon MP Cost: x>
 * - can be applied on Actors (Pets) & Classes
 * - overrides the default cost value to summon this Pet
 * 
 * <Summon TP Cost: x>
 * - can be applied on Actors (Pets) & Classes
 * - overrides the default cost value to summon this Pet
 * 
 * <Summon TP Gain: x>
 * - can be applied on Actors (Pets) & Classes
 * - overrides the default TP gain value when summoning this Pet
 * 
 * <Summon Speed: x>
 * - can be applied on Actors (Pets) & Classes
 * - overrides the default Speed value of the Pet's Summon Skill
 * 
 * <Auto Summon>
 * - can be applied on Actors, Classes, Equip, & States
 * - Pets having this Notetag will be ready on battle start
 * 
 * <Summon Turns: x>
 * - can be applied on Actors (Pets) & Classes
 * - Overrides the default value how many turns this Pet will be active
 * 
 * <Summon: x>
 * - can be applied on Skills & Items
 * - Immediately summons the Pet when skill is chanted or item is used
 * - Bypasses common restriction rules, i.e. it's not required for the Pet
 *   to be included in the Party
 * - However, the Skill or Item is not usable when e.g. the Pet is already
 *   summoned or the Party is full
 * 
 * <Summon: x, y, z, ...>
 * - can be applied on Actor, Class, Equip, & States
 * - multiple values are allowed
 * - allows the Actor to summon Pets with the Actor Id x, y, z, ... regardless
 *   of their existence in the Party
 * 
 * <On Summon Animation Id: x>
 * - can be applied on Actors (Pets) & Classes
 * - Changes the default animation when this Pet appears
 * 
 * <On Unsummon Animation Id: x>
 * - can be applied on Actors (Pets) & Classes
 * - Changes the default animation the this Pet disappears
 * 
 * <On Knockout Animation Id: x>
 * - can be applied on Actors (Pets) & Classes
 * - Changes the default animation when the Pet is knocked out
 * 
 * @endofhelp
 * 
 * 
 * @command summonPet
 * @text Summon Pet
 * 
 * @arg actorId
 * @text Pet
 * @type actor
 * @default 1
 * 
 * @arg summonerId
 * @text Summoner (can be null)
 * @type actor
 * @default 1
 * 
 * @command summonPetByVariable
 * @text Summon Pet (by Variable)
 * 
 * @arg variableId
 * @text Variable
 * @type variable
 * @default 1
 * 
 * @arg summonerId
 * @text Summoner (can be null)
 * @type actor
 * @default 1
 * 
 * @command unsummonPet
 * @text Unsummon Pet
 * 
 * @arg actorId
 * @text Pet
 * @type actor
 * @default 1
 * 
 * @arg knockout
 * @text Knockout?
 * @type boolean
 * @default false
 * 
 * @command unsummonPetByVariable
 * @text Unsummon Pet (by Variable)
 * 
 * @arg variableId
 * @text Variable
 * @type variable
 * @default 1
 * 
 * @arg knockout
 * @text Knockout?
 * @type boolean
 * @default false
 * 
 * @command unsummonAll
 * @text Unsummon all Pets
 * 
 * 
 * @param important
 * @text [!] REQUIRED SETTINGS [!]
 * 
 * @param stypeId
 * @parent important
 * @text Skill Type
 * @type number
 * @desc You must have a dedicated Skill Type to promote Actors to "Summoners"; e.g. with a "Add Skill Type" trait.
 * @default REQUIRED
 * 
 * @param a
 * @text _
 * 
 * @param commands
 * @text Commands
 *
 * @param summonSkill
 * @parent commands
 * @text Summon Command (default)
 * @type struct<SummonSkill>
 * @default {"name":"Summon %1","iconIndex":"79","description":"Summons %1","message":"%1 summons %2!","mpCost":"0","tpCost":"0","tpGain":"0","speed":"0"}
 *
 * @param unsummonSkill
 * @parent commands
 * @text Retreat Command (default)
 * @type struct<UnsummonSkill>
 * @default {"showCommand":"true","name":"Retreat","iconIndex":"82","showIcon":"automatic","message":"%1 retreats!","mpCost":"0","tpCost":"0","speed":"2000"}
 * 
 * @param summonState
 * @parent commands
 * @text Summon State
 * @type struct<SummonState>
 * @default {"name":"Summoned","iconIndex":"79","priority":"1"}
 * 
 * @param b
 * @text _
 * 
 * @param gameplay
 * @text Gameplay
 * 
 * @param automaticSkillInjection
 * @parent gameplay
 * @text Auto add Summon Skills?
 * @type boolean
 * @default true
 * @desc When enabled, every summoner can automatically summon any Pet that the Party owns.
 * 
 * @param limitPets
 * @parent gameplay
 * @text limit number of active Pets?
 * @type boolean
 * @default false
 * 
 * @param petLimit
 * @parent limitPets
 * @text when true: max Number of active Pets
 * @type number
 * @default 1
 * 
 * @param increaseMaxBattlers
 * @parent gameplay
 * @text Exceed Party Limit?
 * @type boolean
 * @default false
 * @desc When true, Pets can be summoned even even when your Party is full. Warning: May cause trouble with other Plugins!
 * 
 * @param autoUnsummonAfterXTurns
 * @parent gameplay
 * @text unsummon after x turns
 * @type number
 * @desc 0 or blank to disable auto-unsummon after x turns
 * 
 * @param petsCanUseItems
 * @parent gameplay
 * @text Pets may use Items
 * @type boolean
 * @default false
 * 
 * @param petsEquipmentMode
 * @parent gameplay
 * @text Pets' Equipment Slots
 * @type select
 * @option No Equipment
 * @option Same as Actors
 * @option Custom
 * @default No Equipment
 * 
 * @param actorsEquipmentEval
 * @parent petsEquipmentMode
 * @text when custom: Actors' Equipment Slots (JS)
 * @type note
 * @default "const slots = [];\nfor (let i = 1; i < $dataSystem.equipTypes.length; i++) {\n    slots.push(i);\n}\nif (slots.length >= 2 && this.isDualWield()) {\n    slots[1] = 1;\n}\nreturn slots;"
 * 
 * @param petsEquipmentEval
 * @parent petsEquipmentMode
 * @text when custom: Pets' Equipment Slots (JS)
 * @type note
 * @default "return [$dataSystem.equipTypes.length - 1]"
 * 
 * @param onlyPetsMeansDefeat
 * @parent gameplay
 * @text Defeat if only Pets are alive
 * @type boolean
 * @default true
 * 
 * @param syncLevel
 * @parent gameplay
 * @text Sync Pet's Level?
 * @type select
 * @option disabled
 * @option with Summoner's level
 * @value summoner
 * @option with Party's level
 * @value party level
 * @default party level
 * @desc Pet's level is adjusted when being summoned. Party Level: Highest Level of all the available Members
 * 
 * @param c
 * @text _
 * 
 * @param lookAndFeel
 * @text Look & Feel
 * 
 * @param followerMode
 * @parent lookAndFeel
 * @text Followers
 * @type select
 * @option Hide Pets
 * @option Show Pets
 * @option Show Pets with Auto-Summon
 * @option Show 1 Pet
 * @option Show 1 Pet with Auto-Summon
 * @default Show Pets
 * @desc Map Followers. Note: The default maximum of 3 Followers is not extended
 * 
 * @param d
 * @text _
 * 
 * @param animations
 * @text Animations
 * 
 * @param onSummonAnimationId
 * @parent animations
 * @text on Summon
 * @type animation
 * @default 117
 * 
 * @param onUnsummonAnimationId
 * @parent animations
 * @text on Retreat
 * @type animation
 * @default
 * 
 * @param onKnockoutAnimationId
 * @parent animations
 * @text on Knockout
 * @type animation
 * @default 101
 * 
 * @param isMagicSkill
 * @parent animations
 * @text [SV] is Magic Skill?
 * @type boolean
 * @default true
 * @desc When enabled, Chanting animation is displayed on Actor
 * 
 * @param e
 * @text _
 * 
 * @param sprites
 * @text Sprites (Sideview Battle only)
 * 
 * @param spriteMode
 * @parent sprites
 * @text Mode
 * @type select
 * @option Same as Actors
 * @option Relocate (Actor's Line)
 * @option Relocate (individual Line)
 * @default Relocate (individual Line)
 * 
 * @param spritePosEval
 * @parent sprites
 * @text when Relocate: JS
 * @type note
 * @default "// constants\nconst index = arguments[0];\nconst sprite = this;\nconst pet = sprite._actor;\n\n// custom Code below:\nsprite.setHome(520 + index * 32, 280 + index * 48 + 24);"
 * 
 * @param f
 * @text _
 * 
 * @param events
 * @text Events
 * 
 * @param onSummonEvents
 * @parent events
 * @text on Summon
 * @type struct<SummonEvents>
 * @default {"recoverHP":"true","recoverMP":"true","clearStates":"true","a":"_","opt":"","commonEventId":"","actorVariableId":"","customFunction":"\"// constants\\nconst pet = this;\\n\\n// custom code below:\""}
 * 
 * @param onUnsummonEvents
 * @parent events
 * @text on Retreat
 * @type struct<SummonEvents>
 * @default {"recoverHP":"true","recoverMP":"true","clearStates":"true","a":"_","opt":"","commonEventId":"","actorVariableId":"","customFunction":"\"// constants\\nconst pet = this;\\n\\n// custom code below:\""}
 * 
 * @param onKnockoutEvents
 * @parent events
 * @text on Knockout
 * @type struct<OnKnockoutEvents>
 * @default {"hpRecovery":"25","recoverMP":"false","clearStates":"false","opt":"","commonEventId":"","actorVariableId":"","customFunction":"\"// constants\\nconst pet = this;\\n\\n// custom code below:\""}
 * 
 */

/*~struct~SummonSkill:
 *
 * @param name
 * @text Name
 * @desc Name of a Summon Command. Use %1 as a placeholder.
 * @default Summon %1
 * 
 * @param iconIndex
 * @text Icon
 * @type icon
 * @desc Icon of a Summon Command
 * @default 79
 * 
 * @param description
 * @text Description
 * @desc Text in the Helper Window. Use %1 as a placeholder.
 * @default Summons %1
 * 
 * @param message
 * @text Message
 * @desc Text in the Battle Log. Use %1 (actor) and %2 (pet).
 * @default %1 summons %2!
 * 
 * @param mpCost
 * @text MP Cost
 * @type number
 * @default 0
 * 
 * @param tpCost
 * @text TP Cost
 * @type number
 * @default 0
 * 
 * @param tpGain
 * @text TP Gain
 * @type number
 * @default 0
 * 
 * @param speed
 * @text Speed
 * @type number
 * @min -2000
 * @max 2000
 * @default 0
 */

/*~struct~UnsummonSkill:
 *
 * @param showCommand
 * @text Show Command?
 * @type boolean
 * @default true
 * 
 * @param name
 * @text Name
 * @desc Name of the Retreat Command
 * @default Retreat
 * 
 * @param iconIndex
 * @text Icon
 * @type icon
 * @desc Icon of a Summon Command
 * @default 82
 * 
 * @param showIcon
 * @parent iconIndex
 * @text showCommand Icon?
 * @type select
 * @option Yes
 * @value true
 * @option No
 * @value false
 * @option If Visustella Plugins are active
 * @value automatic
 * @default automatic
 * 
 * @param message
 * @text Message
 * @desc Text in the Battle Log. You may use %1 (actor).
 * @default %1 retreats!
 * 
 * @param mpCost
 * @text MP Cost
 * @type number
 * @default 0
 * 
 * @param tpCost
 * @text TP Cost
 * @type number
 * @default 0
 * 
 * @param speed
 * @text Speed
 * @type number
 * @default 2000
 */

/*~struct~SummonState:
 *
 * @param name
 * @text Name
 * @default Summoned
 * 
 * @param iconIndex
 * @text Icon
 * @type icon
 * @min 0
 * @default 79
 * @desc May be empty
 * 
 * @param priority
 * @text Priority
 * @type number
 * @min 0
 * @max 100
 * @default 1
 * 
 * @param overlay
 * @text [SV] Overlay
 * @type select
 * @option None
 * @value 0
 * @option Poison
 * @value 1
 * @option Blind
 * @value 2
 * @option Silence
 * @value 3
 * @option Rage
 * @value 4
 * @option Confusion
 * @value 5
 * @option Charme
 * @value 6
 * @option Sleep
 * @value 7
 * @option Paralysis
 * @value 8
 * @option Curse
 * @value 9
 * @option Fear
 * @value 10
 * @default 0
 */

/*~struct~SummonEvents:
 *
 * @param recoverHP
 * @text recover HP?
 * @type boolean
 * @default true
 * 
 * @param recoverMP
 * @text recover MP?
 * @type boolean
 * @default true
 * 
 * @param clearStates
 * @text clear States?
 * @type boolean
 * @default true
 * 
 * @param a
 * @text _
 * @default _
 * 
 * @param opt
 * @text Advanced
 * 
 * @param commonEventId
 * @parent opt
 * @text run Common Event
 * @type common_event
 * @desc Run this Common Event
 * 
 * @param actorVariableId
 * @parent opt
 * @text Actor -> Variable
 * @type variable
 * @desc Actor Id of the Pet is stored into this Variable for later retrieval.
 * 
 * @param customFunction
 * @parent opt
 * @text Custom JS function
 * @type note
 * @default "// constants\nconst pet = this;\n\n// custom code below:"
 */

/*~struct~OnKnockoutEvents:
 *
 * @param hpRecovery
 * @text hp Recovery (%)
 * @type number
 * @min 1
 * @max 100
 * @desc HP that the pet gets when being summoned again.
 * @default 25
 * 
 * @param recoverMP
 * @text recover MP?
 * @type boolean
 * @default false
 * 
 * @param clearStates
 * @text clear States?
 * @type boolean
 * @default false
 * 
 * @param opt
 * @text Optional
 * 
 * @param commonEventId
 * @parent opt
 * @text run Common Event
 * @type common_event
 * @desc Run this Common Event
 * 
 * @param actorVariableId
 * @parent opt
 * @text Actor -> Variable
 * @type variable
 * @desc Actor Id of the Pet is stored into this Variable for later retrieval.
 * 
 * @param customFunction
 * @parent opt
 * @text Custom JS function
 * @type note
 * @default "// constants\nconst pet = this;\n\n// custom code below:"
 */

var MK = MK || { };
MK.Summoning = { };

(function() {

const PLUGIN_NAME = 'MK_Summon';

const reject = (reason) => {
    const message = (
        "An Error has occurred in the Plugin %1: %2 " +
        "If the problem persists, contact the Plugin Creator."
    ).format(PLUGIN_NAME, reason);
    throw Error(message);
}

if (!PluginManager._parameters[PLUGIN_NAME.toLowerCase()]) {
    reject((
        "Please check that this plugin's filename is \"%1.js\". " +
        "Subdirectories (e.g.: js/plugins/xy/thisPlugin.js) are not allowed."
    ).format(PLUGIN_NAME));
}

const structure = (serialized, parameterName) => {
    if (!serialized) {
        reject((
            "The Plugin Parameter \"%1\" is missing. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
    try {
        return JSON.parse(serialized);
    
    } catch (e) {
        reject((
            "The Plugin Parameter \"%1\" is corrupted. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
}

const customFunction = (body, parameterName) => {
    if (!body) {
        reject((
            "The Plugin Parameter \"%1\" is missing. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
    try {
        return new Function(JSON.parse(body));
    
    } catch (e) {
        reject((
            "The Plugin Parameter \"%1\" contains an error and could not be interpreted. " +
            "Please check it in the Plugin Manager. It may also help to re-install this Plugin (i.e.: remove, re-add). " +
            "Cause: %2"
        ).format(parameterName, e));
    }
}

const requirePluginParameter = (value, parameterName) => {
    if (!value) {
        reject("The Plugin Parameter \"%1\" is missing. Please set it in the Plugin Manager.".format(parameterName));
    }
}

const requirePlugin = (plugin, pluginName) => {
    if (!plugin) reject("The Plugin \"%1\" is missing. Please add it to the Plugin Manager.".format(pluginName));
}

const params = PluginManager.parameters(PLUGIN_NAME);

MK.Summoning.summonSkill                        = structure(params.summonSkill, 'Summon Command');
MK.Summoning.summonSkill.iconIndex              = Number(MK.Summoning.summonSkill.iconIndex);
MK.Summoning.summonSkill.mpCost                 = Number(MK.Summoning.summonSkill.mpCost);
MK.Summoning.summonSkill.tpCost                 = Number(MK.Summoning.summonSkill.tpCost);
MK.Summoning.summonSkill.tpGain                 = Number(MK.Summoning.summonSkill.tpGain);
MK.Summoning.summonSkill.speed                  = Number(MK.Summoning.summonSkill.speed);
MK.Summoning.summonSkill.stypeId                = Number(params.stypeId);
MK.Summoning.unsummonSkill                      = structure(params.unsummonSkill, 'Retreat Command');
MK.Summoning.unsummonSkill.showCommand          = 'true' == MK.Summoning.unsummonSkill.showCommand;
MK.Summoning.unsummonSkill.mpCost               = Number(MK.Summoning.unsummonSkill.mpCost);
MK.Summoning.unsummonSkill.tpCost               = Number(MK.Summoning.unsummonSkill.tpCost);
MK.Summoning.unsummonSkill.speed                = Number(MK.Summoning.unsummonSkill.speed);
MK.Summoning.unsummonSkill.iconIndex            = Number(MK.Summoning.unsummonSkill.iconIndex);
MK.Summoning.summonState                        = structure(params.summonState, 'Summon State');
MK.Summoning.summonState.iconIndex              = Number(MK.Summoning.summonState.iconIndex);
MK.Summoning.summonState.priority               = Number(MK.Summoning.summonState.priority);
MK.Summoning.summonState.overlay                = Number(MK.Summoning.summonState.overlay);
MK.Summoning.automaticSkillInjection            = 'true' == params.automaticSkillInjection;
MK.Summoning.syncLevel                          = params.syncLevel;
MK.Summoning.followerMode                       = params.followerMode;
MK.Summoning.onSummonAnimationId                = Number(params.onSummonAnimationId);
MK.Summoning.onUnsummonAnimationId              = Number(params.onUnsummonAnimationId);
MK.Summoning.onKnockoutAnimationId              = Number(params.onKnockoutAnimationId);
MK.Summoning.isMagicSkill                       = 'true' == params.isMagicSkill;
MK.Summoning.spriteMode                         = params.spriteMode;
MK.Summoning.spritePosEval                      = customFunction(params.spritePosEval, 'spritePosEval');

MK.Summoning.onSummonEvents                     = structure(params.onSummonEvents || { }, 'Summon Events');
MK.Summoning.onSummonEvents.recoverHP           = 'true' == MK.Summoning.onSummonEvents.recoverHP;
MK.Summoning.onSummonEvents.recoverMP           = 'true' == MK.Summoning.onSummonEvents.recoverMP;
MK.Summoning.onSummonEvents.clearStates         = 'true' == MK.Summoning.onSummonEvents.clearStates;
MK.Summoning.onSummonEvents.commonEventId       = Number(MK.Summoning.onSummonEvents.commonEventId);
MK.Summoning.onSummonEvents.actorVariableId     = Number(MK.Summoning.onSummonEvents.actorVariableId);

if (MK.Summoning.onSummonEvents.customFunction)
    MK.Summoning.onSummonEvents.customFunction = customFunction(MK.Summoning.onSummonEvents.customFunction, 'on Summon, custom Function');

MK.Summoning.onUnsummonEvents                   = structure(params.onUnsummonEvents || { }, 'Retreat Events');
MK.Summoning.onUnsummonEvents.recoverHP         = 'true' == MK.Summoning.onUnsummonEvents.recoverHP;
MK.Summoning.onUnsummonEvents.recoverMP         = 'true' == MK.Summoning.onUnsummonEvents.recoverMP;
MK.Summoning.onUnsummonEvents.clearStates       = 'true' == MK.Summoning.onUnsummonEvents.clearStates;
MK.Summoning.onUnsummonEvents.commonEventId     = Number(MK.Summoning.onUnsummonEvents.commonEventId);
MK.Summoning.onUnsummonEvents.actorVariableId   = Number(MK.Summoning.onUnsummonEvents.actorVariableId);

if (MK.Summoning.onUnsummonEvents.customFunction)
    MK.Summoning.onUnsummonEvents.customFunction = customFunction(MK.Summoning.onUnsummonEvents.customFunction, 'on Retreat, custom Function');

MK.Summoning.onKnockoutEvents                   = structure(params.onKnockoutEvents || { }, 'Knockout Events');
MK.Summoning.onKnockoutEvents.hpRecovery        = Number(MK.Summoning.onKnockoutEvents.hpRecovery);
MK.Summoning.onKnockoutEvents.recoverMP         = 'true' == MK.Summoning.onKnockoutEvents.recoverMP;
MK.Summoning.onKnockoutEvents.clearStates       = 'true' == MK.Summoning.onKnockoutEvents.clearStates;
MK.Summoning.onKnockoutEvents.commonEventId     = Number(MK.Summoning.onKnockoutEvents.commonEventId);
MK.Summoning.onKnockoutEvents.actorVariableId   = Number(MK.Summoning.onKnockoutEvents.actorVariableId);

if (MK.Summoning.onKnockoutEvents.customFunction)
    MK.Summoning.onKnockoutEvents.customFunction = customFunction(MK.Summoning.onKnockoutEvents.customFunction, 'on Knockout, custom Function');

MK.Summoning.limitPets                          = 'true' == params.limitPets;
MK.Summoning.petLimit                           = Number(params.petLimit);
MK.Summoning.increaseMaxBattlers                = 'true' == params.increaseMaxBattlers;
MK.Summoning.autoUnsummonAfterXTurns            = Number(params.autoUnsummonAfterXTurns);
MK.Summoning.petsCanUseItems                    = 'true' == params.petsCanUseItems;
MK.Summoning.petsEquipmentMode                  = params.petsEquipmentMode;
MK.Summoning.actorsEquipmentEval                = customFunction(params.actorsEquipmentEval, 'actorsEquipEval');
MK.Summoning.petsEquipmentEval                  = customFunction(params.petsEquipmentEval, 'petsEquipEval');
MK.Summoning.onlyPetsMeansDefeat                = 'true' == params.onlyPetsMeansDefeat;

if (MK.Summoning.automaticSkillInjection) {
    requirePluginParameter(MK.Summoning.summonSkill.stypeId, 'Skill Type Id');
}


const alias_SceneBoot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    alias_SceneBoot_start.call(this);

    const extractTier = (pluginDescription) => {
        const match = /\[Tier\s+\d+\]/g.exec(pluginDescription);
        if (match && match[0]) {
            const number = /\d+/.exec(match[0])[0];
            return Number(number);
        }
        return null;
    }

    const isListSorted = (list) => {
        if (list && list.length > 1) {
            for (let i = 1; i < list.length; i++) {
                if (list[i] < list[i - 1]) {
                    return false;
                }
            }
        }
        return true;
    }

    const getAllIndexesFromPlugins = (prefix) =>
        $plugins
            .filter(plugin => plugin && plugin.status)
            .map((plugin, index) => ({ plugin: plugin, index: index }))
            .filter(item => item.plugin.name.startsWith(prefix))
            .map(item => item.index);

    const mkTiers = $plugins
        .filter(Boolean)
        .filter(plugin => plugin.status)
        .filter(plugin => plugin.name.startsWith('MK_'))
        .map(plugin => extractTier(plugin.description))
        .filter(tier => tier === 0 || tier > 0);
    
    if (!isListSorted(mkTiers)) {
        reject("MK Plugins are not in correct order. "
            + "Please go into the Plugin Manager and sort all the Plugins starting with \"MK\" "
            + "according to their tiers (Tier 0, Tier 1, ...)"
        );
    }
    
    const yepIndexes = getAllIndexesFromPlugins('YEP');
    const vsIndexes = getAllIndexesFromPlugins('VisuMZ');
    const mkIndexes = getAllIndexesFromPlugins('MK_');

    if (yepIndexes.length > 0 && Math.max(...yepIndexes) > Math.min(...mkIndexes)) {
        reject("All YEP Plugins must be above all MK Plugins");
    }
    
    if (vsIndexes.length > 0 && Math.max(...vsIndexes) > Math.min(...mkIndexes)) {
        reject("All Visustella Plugins must be above all MK Plugins, like this: VS Tier0, VS Tier1, VS Tier2, ..., MK Tier0, MK Tier1, MK Tier2, ...");
    }

    // preload Actors
    for (let i = 0; i < $dataActors.length; i++) {
        $gameActors.actor(i);
    }
}


function Notetag() {
    this.initialize(...arguments);
}

Notetag.prototype.initialize = function(value) {
    this.value = value;
}

Notetag.of = function(object, notetag) {
    const value = object && object.meta
        ? object.meta[notetag]
        : undefined;

    if (value === null)         return new Notetag(null);
    if (value === undefined)    return new Notetag(null);
    if (value === true)         return new Notetag(true);
    if (isNaN(Number(value)))   return new Notetag(value);
    else                        return new Notetag(Number(value));
}

Notetag.prototype.exists = function() {
    return this.value !== undefined && this.value !== null;
}

Notetag.prototype.isTrue = function() {
    return this.value === true;
}

Notetag.prototype.isNumber = function() {
    return this.exists() && !isNaN(this.value);
}

Notetag.prototype.asNumber = function() {
    return this.isNumber() ? this.value : undefined;
}

Notetag.prototype.includesNumber = function(number) {
    return (
        (this.asNumber() == number) ||
        (this.value && this.value.split && this.value.split(',').map(Number).includes(number))
    );
}


const coalesce = (...items) => {
    return items.find(item => item !== undefined && item !== null);
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function(element) {
        for (;;) {
            const index = this.indexOf(element);
            if (index >= 0) {
                this.splice(index, 1);
            } else {
                return this;
            }
        }
    };
}


// =====================================================================================
// Game Actor
// =====================================================================================

Game_Battler.prototype.isPet = function() {
    return false;
}

Game_Actor.prototype.isPet = function() {
    return this.actor().meta.Pet || this.currentClass().meta.Pet;
}

Game_Actor.prototype.isSummoned = function() {
    return $gameParty.activePets().includes(this);
}

Game_Actor.prototype.isSummoner = function() {
    return this.addedSkillTypes().includes(MK.Summoning.summonSkill.stypeId);
}

Game_Actor.prototype.summoner = function() {
    return $gameActors.actor(this._summonerId);
}

Game_Actor.prototype.setSummoner = function(summoner) {
    this._summonerId = summoner ? summoner.actorId() : null;
}

const alias_GameActor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
    const skills = alias_GameActor_skills.call(this);

    if (!this.isSummoner()) {
        return skills;
    }

    const alreadyIncluded = (pet) =>
        skills.some(skill => skill && skill.meta && skill.meta.Summon == pet.actorId());

    this.pets()
        .filter(pet => !alreadyIncluded(pet))
        .map(pet => MK.Summoning.createDummySkill(pet))
        .forEach(skill => skills.push(skill));
    
    return skills;
}

Game_Actor.prototype.pets = function() {
    return $dataActors
        .filter(Boolean)
        .map(dataActor => $gameActors.safelyGetActor(dataActor.id))
        .filter(actor => actor && actor.isPet())
        .filter(pet => this.includesPet(pet));
}

Game_Actor.prototype.includesPet = function(pet) {
    const id = typeof pet == 'number' ? pet : pet.actorId();

    return (
        (MK.Summoning.automaticSkillInjection && $gameParty.includesPet(pet)) ||
        this.traitObjects().some(object => Notetag.of(object, 'Summon').includesNumber(id))
    );
}

const alias_GameActor_skillTypes = Game_Actor.prototype.skillTypes;
Game_Actor.prototype.skillTypes = function() {
    const skillTypes = alias_GameActor_skillTypes.call(this);

    const needsSummonSkillType = (
        this.traitObjects().some(object => Notetag.of(object, 'Summon').exists()) &&
        !skillTypes.includes(MK.Summoning.summonSkill.stypeId)
    );

    if (needsSummonSkillType) {
        skillTypes.push(MK.Summoning.summonSkill.stypeId);
    }
    return skillTypes;
}

Game_Actors.prototype.safelyGetActor = function(actorId) {
    return this._data[actorId];
}

const alias_GameActor_resetStateCounts = Game_Actor.prototype.resetStateCounts;
Game_Actor.prototype.resetStateCounts = function(stateId) {

    if (stateId == MK.Summoning.PET_STATE_ID) {
        this._stateTurns[stateId] = this.getSummonTurns();
    } else {
        alias_GameActor_resetStateCounts.call(this, stateId);
    }
}

Game_Actor.prototype.getSummonTurns = function() {
    return coalesce(
        Notetag.of(this.actor(), 'Summon Turns').value,
        Notetag.of(this.currentClass(), 'Summon Turns').value,
        MK.Summoning.autoUnsummonAfterXTurns,
    );
}

const alias_GameActor_removeState = Game_Actor.prototype.removeState;
Game_Actor.prototype.removeState = function(stateId) {
    if (MK.Summoning.PET_STATE_ID == stateId) {
        $gameParty.unsummonPet(this.actorId());
    }
    alias_GameActor_removeState.call(this, stateId);
}

// method called by Game_Party
Game_Actor.prototype.unsummon = function() {
    if (MK.Summoning.onUnsummonEvents.recoverHP) this.setHp(this.mhp);
    if (MK.Summoning.onUnsummonEvents.recoverMP) this.setMp(this.mmp);
    if (MK.Summoning.onUnsummonEvents.clearStates) this.clearStates();
    if (MK.Summoning.onUnsummonEvents.actorVariableId) {
        $gameVariables.setValue(MK.Summoning.onUnsummonEvents.actorVariableId, this.actorId());
    }
    if (MK.Summoning.onUnsummonEvents.commonEventId) {
        $gameTemp.reserveCommonEvent(MK.Summoning.onUnsummonEvents.commonEventId);
    }
    if (MK.Summoning.onUnsummonAnimationId && $gameParty.inBattle()) {
        requestAnimation(this, this.onUnsummonAnimationId());
    }
    if (MK.Summoning.onUnsummonEvents.customFunction) {
        MK.Summoning.onUnsummonEvents.customFunction.call(this);
    }
}

// method called by Game_Party
Game_Actor.prototype.unsummonByKnockout = function() {
    const hpRecovery = MK.Summoning.getHpRecovery(this);
    this.gainHp(hpRecovery);

    if (MK.Summoning.onKnockoutEvents.recoverMP) this.setMp(this.mmp);
    if (MK.Summoning.onKnockoutEvents.clearStates) this.clearStates();
    if (MK.Summoning.onKnockoutEvents.actorVariableId) {
        $gameVariables.setValue(MK.Summoning.onKnockoutEvents.actorVariableId, this.actorId());
    }
    if (MK.Summoning.onKnockoutEvents.commonEventId) {
        $gameTemp.reserveCommonEvent(MK.Summoning.onKnockoutEvents.commonEventId);
    }
    if (MK.Summoning.onKnockoutAnimationId && $gameParty.inBattle()) {
        requestAnimation(this, this.onKnockoutAnimationId());
    }
    if (MK.Summoning.onKnockoutEvents.customFunction) {
        MK.Summoning.onKnockoutEvents.customFunction.call(this);
    }
}

MK.Summoning.getHpRecovery = function(pet) {
    const hpRecoveryRate = MK.Summoning.onKnockoutEvents.hpRecovery;
    return Math.floor(hpRecoveryRate * pet.mhp / 100).clamp(1, pet.mhp);
}

const alias_GameActor_canUse = Game_Actor.prototype.canUse;
Game_Actor.prototype.canUse = function(item) {

    if (item && item.unsummonActorId) {
        return true;
    }
    const summonId = Notetag.of(item, 'Summon').asNumber();

    if (DataManager.isSkill(item) && summonId) {
        return alias_GameActor_canUse.call(this, item) && this.canSummon(summonId);
    }
    if (DataManager.isItem(item) && summonId) {
        return true;
    }
    return alias_GameActor_canUse.call(this, item);
}

// called by Game_Actor.prototype.canUse
Game_Actor.prototype.canSummon = function(summonActorId) {
    return $gameParty.canSummon(summonActorId);
}

const alias_GameActor_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    
    if (this.isPet()) {
        $gameParty.unsummonPet(this.actorId(), true);
    }
    alias_GameActor_performCollapse.call(this);
}

if ('No Equipment' == MK.Summoning.petsEquipmentMode) {    
    const alias_GameActor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        return this.isPet()
            ? [ ]
            : alias_GameActor_equipSlots.call(this);
    }
}

if ('Custom' == MK.Summoning.petsEquipmentMode) {
    
    // Override
    Game_Actor.prototype.equipSlots = function() {
        return this.isPet()
            ? MK.Summoning.petsEquipmentEval.call(this)
            : MK.Summoning.actorsEquipmentEval.call(this);
    }
}

Game_Actor.prototype.onSummonAnimationId = function() {
    return coalesce(
        Notetag.of(this.actor(), 'On Summon Animation Id').value,
        Notetag.of(this.currentClass(), 'On Summon Animation Id').value,
        MK.Summoning.onSummonAnimationId,
    );
}

Game_Actor.prototype.onUnsummonAnimationId = function() {
    return coalesce(
        Notetag.of(this.actor(), 'On Unsummon Animation Id').value,
        Notetag.of(this.currentClass(), 'On Unsummon Animation Id').value,
        MK.Summoning.onUnsummonAnimationId,
    );
}

Game_Actor.prototype.onKnockoutAnimationId = function() {
    return coalesce(
        Notetag.of(this.actor(), 'On Knockout Animation Id').value,
        Notetag.of(this.currentClass(), 'On Knockout Animation Id').value,
        MK.Summoning.onKnockoutAnimationId,
    );
}


// =====================================================================================
// Game Party
// =====================================================================================

const alias_GameParty_allMembers = Game_Party.prototype.allMembers;
Game_Party.prototype.allMembers = function() {
    return alias_GameParty_allMembers.call(this).concat(this.pets());
}


if (Utils.RPGMAKER_NAME == 'MZ' && MK.Summoning.increaseMaxBattlers) {
    const alias_GameParty_allBattleMembers = Game_Party.prototype.allBattleMembers;
    Game_Party.prototype.allBattleMembers = function() {
        return alias_GameParty_allBattleMembers.call(this)
            .filter(member => !member.isPet())
            .slice(0, this.maxBattleMembers())
            .concat(this.activePets());
    }
}
if (Utils.RPGMAKER_NAME == 'MZ' && !MK.Summoning.increaseMaxBattlers) {
    const alias_GameParty_allBattleMembers = Game_Party.prototype.allBattleMembers;
    Game_Party.prototype.allBattleMembers = function() {
        return alias_GameParty_allBattleMembers.call(this)
            .filter(member => !member.isPet())
            .concat(this.activePets())
            .slice(0, this.maxBattleMembers());
    }
}
if (Utils.RPGMAKER_NAME == 'MV' && MK.Summoning.increaseMaxBattlers) {
    const alias_GameParty_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function() {
        return alias_GameParty_battleMembers.call(this)
            .filter(member => !member.isPet())
            .slice(0, this.maxBattleMembers())
            .concat(this.activePets())
            .filter(actor => actor.isAppeared());
    }
}
if (Utils.RPGMAKER_NAME == 'MV' && !MK.Summoning.increaseMaxBattlers) {
    const alias_GameParty_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function() {
        return alias_GameParty_battleMembers.call(this)
            .filter(member => !member.isPet())
            .concat(this.activePets())
            .slice(0, this.maxBattleMembers())
            .filter(actor => actor.isAppeared());
    }
}

Game_Party.prototype.pets = function() {
    return (this._petIds || []).map(id => $gameActors.actor(id));
}

Game_Party.prototype.activePets = function() {
    return (this._activePetIds || []).map(id => $gameActors.actor(id));
}

Game_Party.prototype.includesPet = function(petOrPetId) {
    const petId = petOrPetId && petOrPetId.actorId
        ? petOrPetId.actorId()
        : petOrPetId;
    
    return (this._petIds || []).includes(petId);
}

const alias_GameParty_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    this._petIds = this._petIds || [ ];
    const actor = $gameActors.actor(actorId);
    
    if (actor && actor.isPet()) {
        if (!this.includesPet(actor)) {
            this._petIds.push(actorId);
            $gamePlayer.refresh();
            $gameMap.requestRefresh();
        }
    } else {
        alias_GameParty_addActor.call(this, actorId);
    }
}

const alias_GameParty_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    this._petIds = this._petIds || [ ];
    const actor = $gameActors.actor(actorId);

    if (actor && actor.isPet()) {
        this._petIds.remove(actorId);
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
    } else {
        alias_GameParty_removeActor.call(this, actorId);
    }
}

Game_Party.prototype.summonPet = function(petId, summonerId = 0, autoSummon = false) {
    if (!this.canSummon(petId, autoSummon)) {
        return;
    }
    
    this._activePetIds = this._activePetIds || [ ];
    this._activePetIds.push(petId);
    
    const pet = $gameActors.actor(petId);
    const summoner = $gameActors.actor(summonerId);
    pet.setSummoner(summoner);
    this.syncLevel(pet, summoner, autoSummon);
    
    if (pet.initTp) pet.initTp();
    if (MK.Summoning.onSummonEvents.recoverHP) pet.setHp(pet.mhp);
    if (MK.Summoning.onSummonEvents.recoverMP) pet.setMp(pet.mmp);
    if (MK.Summoning.onSummonEvents.clearStates) pet.clearStates();

    pet.addState(MK.Summoning.PET_STATE_ID);
    pet.onBattleStart();
    
    if ($gameTemp.requestBattleRefresh) {
        $gameTemp.requestBattleRefresh();
    }
    if (this.inBattle() && pet.onSummonAnimationId() && !autoSummon) {
        pet._requestSummonAnimation = true;
    }
    if (MK.Summoning.onSummonEvents.actorVariableId) {
        $gameVariables.setValue(MK.Summoning.onSummonEvents.actorVariableId, petId);
    }
    if (MK.Summoning.onSummonEvents.commonEventId) {
        $gameTemp.reserveCommonEvent(MK.Summoning.onSummonEvents.commonEventId);
    }
    if (MK.Summoning.onSummonEvents.customFunction) {
        MK.Summoning.onSummonEvents.customFunction.call(pet);
    }
}

Game_Party.prototype.canSummon = function(petOrPetId, autoSummon) {
    const pet = typeof petOrPetId == 'number'
        ? $gameActors.actor(petOrPetId)
        : petOrPetId;

    return pet
        && pet.isPet()
        && !pet.isSummoned()
        && (this.inBattle() || autoSummon)
        && this.petSlotAvailable()
        && this.battlerSlotAvailable()
}

Game_Party.prototype.petSlotAvailable = function() {
    return !MK.Summoning.limitPets || this.activePets().length < MK.Summoning.petLimit;
}

Game_Party.prototype.battlerSlotAvailable = function() {
    return (
        MK.Summoning.increaseMaxBattlers ||
        $gameParty.battleMembers().length < $gameParty.maxBattleMembers()
    );
}

Game_Party.prototype.unsummonPet = function(actorId, byKnockout) {
    const actor = $gameActors.actor(actorId);
    
    if (actor && actor.isPet() && actor.isSummoned()) {
        this._activePetIds = this._activePetIds || [ ];
        this._activePetIds.remove(actorId);

        if (byKnockout)
            actor.unsummonByKnockout();
        else
            actor.unsummon();
        
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        if ($gameTemp.requestBattleRefresh)
            $gameTemp.requestBattleRefresh();
    }
}

Game_Party.prototype.unsummonAll = function() {
    this._activePetIds = [ ];
    this.pets().forEach(pet => pet.unsummon());
    $gamePlayer.refresh();
    $gameMap.requestRefresh();

    if ($gameTemp.requestBattleRefresh)
        $gameTemp.requestBattleRefresh();
}

Game_Party.prototype.onlyPetsAlive = function() {
    return !this.battleMembers().some(actor => actor.isAlive() && !actor.isPet());
}

const alias_GameParty_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    
    alias_GameParty_setupStartingMembers.call(this);

    this._actors = this._actors
        .map(actorId => $gameActors.actor(actorId))
        .filter(actor => !actor.isPet())
        .map(actor => actor.actorId());
    
    this._petIds = this._actors
        .map(actorId => $gameActors.actor(actorId))
        .filter(actor => actor.isPet())
        .map(actor => actor.actorId());
}

Game_Party.prototype.syncLevel = function(pet, summoner, autoSummon) {
    if ('summoner' == MK.Summoning.syncLevel && summoner) {
        const level = summoner.level;
        pet.changeLevel(level);
    }
    if ('party level' == MK.Summoning.syncLevel || ('summoner' == MK.Summoning.syncLevel && autoSummon)) {
        const level = this.highestLevel();
        pet.changeLevel(level);
    }
}


// =====================================================================================
// Game Item
// =====================================================================================

const alias_GameItem_object = Game_Item.prototype.object;
Game_Item.prototype.object = function() {
    if (this._summonActorId) {
        const actor = $gameActors.actor(this._summonActorId);
        return MK.Summoning.createDummySkill(actor);
    }
    if (this._unsummonActorId) {
        const actor = $gameActors.actor(this._unsummonActorId);
        return createUnsummonSkill(actor);
    }
    return alias_GameItem_object.call(this);
}

const alias_GameItem_setObject = Game_Item.prototype.setObject;
Game_Item.prototype.setObject = function(item) {
    alias_GameItem_setObject.call(this, item);
    
    const summonActorId = Notetag.of(item, 'Summon').asNumber();
    
    // is summon command?
    if (summonActorId && (DataManager.isItem(item) || DataManager.isSkill(item))) {
        this._dataClass = '_summon';
        this._itemId = '_summon';
        this._summonActorId = summonActorId;
    } else {
        this._summonActorId = undefined;
    }

    // is retreat command?
    if (item && item.unsummonActorId) {
        this._dataClass = '_unsummon';
        this._itemId = '_unsummon';
        this._unsummonActorId = item.unsummonActorId;
    } else {
        this._unsummonActorId = undefined;
    }
}

const alias_GameAction_setSkill = Game_Action.prototype.setSkill;
Game_Action.prototype.setSkill = function(skillId) {
    if ('_summon' == skillId) {
        const data = MK.Summoning.nextActorToSummonSkillData;
        this._item.setObject(data);
    } else {
        alias_GameAction_setSkill.call(this, skillId);
    }
}

Game_Action.prototype.setUnsummon = function(actorId) {
    const actor = $gameActors.actor(actorId);
    const data = createUnsummonSkill(actor);
    this._item.setObject(data);
}

const alias_GameAction_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function() {
    const summonActorId = Notetag.of(this.item(), 'Summon').asNumber();

    if (summonActorId) {
        $gameParty.summonPet(summonActorId, this._subjectActorId);
    }
    if (this.item().unsummonActorId) {
        $gameParty.unsummonPet(this.item().unsummonActorId);
    }
    alias_GameAction_applyGlobal.call(this);
}

const alias_GameAction_isMagicSkill = Game_Action.prototype.isMagicSkill;
Game_Action.prototype.isMagicSkill = function() {
    if (this.isSummonSkill()) {
        return MK.Summoning.isMagicSkill;
    }
    return alias_GameAction_isMagicSkill.call(this);
}

Game_Action.prototype.isSummonSkill = function() {
    return Notetag.of(this.item(), 'Summon').isNumber();
}


// =====================================================================================
// Window Actor Command
// =====================================================================================

// Add [Retreat] Command
const alias_WindowActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    alias_WindowActorCommand_makeCommandList.call(this);

    const showRetreatCommand = MK.Summoning.unsummonSkill.showCommand && this._actor && this._actor.isPet();
    if (showRetreatCommand) {
        const iconIndex = MK.Summoning.unsummonSkill.iconIndex;
        const name      = MK.Summoning.unsummonSkill.name;
        const showIcon  =
            ('automatic' == MK.Summoning.unsummonSkill.showIcon && Imported.VisuMZ_1_BattleCore)
            || 'true' == MK.Summoning.unsummonSkill.showIcon;
        const commandName = showIcon
            ? '\\I[%1]%2'.format(iconIndex, name)
            : MK.Summoning.unsummonSkill.name;
        this.addCommand(commandName, 'unsummon');
    }
}

// Remove [Use Items] Command
const alias_WindowActorCommand_addItemCommand = Window_ActorCommand.prototype.addItemCommand;
Window_ActorCommand.prototype.addItemCommand = function() {
    if (MK.Summoning.petsCanUseItems || !this._actor.isPet()) {
        alias_WindowActorCommand_addItemCommand.call(this);
    }
}


// =====================================================================================
// Sprites
// =====================================================================================

const alias_SpriteActor_startEntryMotion = Sprite_Actor.prototype.startEntryMotion;
Sprite_Actor.prototype.startEntryMotion = function() {
    const actor = this._actor;
    
    if (actor && actor.canMove() && actor.isPet && actor.isPet() && actor._requestSummonAnimation) {
        this.startMotion('walk');
        this.startMove(0, 0, 0);
        
        requestAnimation(actor, actor.onSummonAnimationId());
        actor._requestSummonAnimation = undefined;
    } else {
        alias_SpriteActor_startEntryMotion.call(this);
    }
}

if ('Relocate (Actor\'s Line)' == MK.Summoning.spriteMode) {
    const alias_SpriteActor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        
        if (this._actor && this._actor.isPet() && !this._actor.isGiant()) {
            MK.Summoning.spritePosEval.call(this, index);
        } else {
            alias_SpriteActor_setActorHome.call(this, index);
        }
    }
}

if ('Relocate (individual Line)' == MK.Summoning.spriteMode) {
    const alias_SpriteActor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        
        if (this._actor && this._actor.isPet() && !this._actor.isGiant()) {
            const petIndex = $gameParty.activePets()
                .findIndex(pet => pet.actorId() == this._actor.actorId());
            
            MK.Summoning.spritePosEval.call(this, petIndex);
        } else {
            alias_SpriteActor_setActorHome.call(this, index);
        }
    }
}


// =====================================================================================
// Exceed Party Size
// =====================================================================================

if (MK.Summoning.increaseMaxBattlers) {
    
    const alias_SpritesetBattle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        
        alias_SpritesetBattle_createActors.call(this);
        if ($gameSystem.isSideView()) {
            for (let i = 0; i < 10; i++) {
                const sprite = new Sprite_Actor();
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
        }
    }

    if (Utils.RPGMAKER_NAME == 'MZ') {
        const alias_WindowBattleStatus_maxCols = Window_BattleStatus.prototype.maxCols;
        Window_BattleStatus.prototype.maxCols = function() {
            return Math.max(
                alias_WindowBattleStatus_maxCols.call(this),
                $gameParty.battleMembers().length
            );
        };
    }
}


// =====================================================================================
// Auto Summon
// =====================================================================================

const alias_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    $gameParty.summonAutoSummons();
    
    alias_BattleManager_setup.call(this, troopId, canEscape, canLose);
}

Game_Party.prototype.summonAutoSummons = function() {
    for (let pet of this.autoSummonedPets()) {
        this.summonPet(pet.actorId(), undefined, autoSummon = true);
    }
}

Game_Party.prototype.autoSummonedPets = function() {
    return this.pets().filter(pet => pet.isAutoSummoned());
}

Game_Battler.prototype.isAutoSummoned = function() {
    return false;
}

Game_Actor.prototype.isAutoSummoned = function() {
    return (
        this.isPet() &&
        this.traitObjects().some(object => Notetag.of(object, 'Auto Summon').isTrue())
    );
}

const alias_GameActor_clearStates = Game_Actor.prototype.clearStates;
Game_Actor.prototype.clearStates = function() {
    const statesToKeep = (this._states || [ ])
        .map(id => $dataStates[id])
        .filter(state => state && 'Auto Summon' in state.meta)
        .map(state => state.id);
    
    alias_GameActor_clearStates.call(this);
    statesToKeep.forEach(state => this.addNewState(state));
}


// =====================================================================================
// Scene Battle
// =====================================================================================

const alias_SceneBattle_onSkillOk = Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
    MK.Summoning.nextActorToSummonSkillData = this._skillWindow.item(); // returns data
    alias_SceneBattle_onSkillOk.call(this);
}

const alias_SceneBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    alias_SceneBattle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('unsummon', this.commandUnsummon.bind(this));
}

Scene_Battle.prototype.commandUnsummon = function() {
    const action = BattleManager.inputtingAction();
    action.setUnsummon(BattleManager.actor().actorId());
    this.onSelectAction();
}

const alias_BattleManager_endBattle = Game_Party.prototype.onBattleEnd;
Game_Party.prototype.onBattleEnd = function() {
    alias_BattleManager_endBattle.call(this);

    this.unsummonAll();
}

if (MK.Summoning.onlyPetsMeansDefeat) {
    const alias_BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    
    BattleManager.checkBattleEnd = function() {
        if ($gameParty.onlyPetsAlive()) {
            this.processDefeat();
            return true;
        }
        return alias_BattleManager_checkBattleEnd.call(this);
    }
}


// =====================================================================================
// Formation
// =====================================================================================

const alias_WindowMenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
Window_MenuCommand.prototype.isFormationEnabled = function() {
    return $gameParty.members().filter(actor => !actor.isPet()).length > 1
        && alias_WindowMenuCommand_isFormationEnabled.call(this);
}

const alias_GameActor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
    return !this.isPet() && alias_GameActor_isFormationChangeOk.call(this);
}


// =====================================================================================
// Custom Item
// =====================================================================================

// Make Summon Item always visible in battle menus
const alias_WindowBattleItem_includes = Window_BattleItem.prototype.includes;
Window_BattleItem.prototype.includes = function(item) {
    return (
        alias_WindowBattleItem_includes.call(this, item) ||
        this.isSummonItem(item)
    );
}

Window_BattleItem.prototype.isSummonItem = function(item) {
    return DataManager.isItem(item) && Notetag.of(item, 'Summon').isNumber();
}

// Disable Summon Items when not usable right now
const alias_GameParty_canUse = Game_Party.prototype.canUse;
Game_Party.prototype.canUse = function(item) {
    const isSummonItem = DataManager.isItem(item) && Notetag.of(item, 'Summon').isNumber();

    return alias_GameParty_canUse.call(this, item) && (
        !isSummonItem || this.canSummon(Notetag.of(item, 'Summon').asNumber())
    );
}


// =====================================================================================
// Followers
// =====================================================================================

if ('Show Pets' == MK.Summoning.followerMode) {
    Game_Follower.prototype.actor = function() {
        return $gameParty
            .battleMembers()
            .concat($gameParty.pets())
            [this._memberIndex];
    }
}

if ('Show Pets with Auto-Summon' == MK.Summoning.followerMode) {
    Game_Follower.prototype.actor = function() {
        return $gameParty
            .battleMembers()
            .concat($gameParty.autoSummonedPets())
            [this._memberIndex];
    }
}

if ('Show 1 Pet' == MK.Summoning.followerMode) {
    Game_Follower.prototype.actor = function() {
        return $gameParty
            .battleMembers()
            .concat($gameParty.pets().slice(0, 1))
            [this._memberIndex];
    }
}

if ('Show 1 Pet with Auto-Summon' == MK.Summoning.followerMode) {
    Game_Follower.prototype.actor = function() {
        return $gameParty
            .battleMembers()
            .concat($gameParty.autoSummonedPets().slice(0, 1))
            [this._memberIndex];
    }
}

const alias_SceneMap_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    alias_SceneMap_start.call(this);

    if ($gamePlayer && $gamePlayer.followers()) {
        $gamePlayer.followers().refresh();
    }
}


const alias_DataManager_isSkill = DataManager.isSkill;
DataManager.isSkill = function(item) {
    return (
        (item && item.summonSkill) ||
        (item && item.unsummonActorId) ||
        alias_DataManager_isSkill.call(this, item)
    );
}


MK.Summoning.createDummySkill = function(pet) {
    const skill = MK.Summoning.summonSkill;
    
    const getFromActorOrClassMeta = (notetag) =>
        coalesce(
            Notetag.of(pet.actor(), notetag).asNumber(),
            Notetag.of(pet.currentClass(), notetag).asNumber(),
        );
    
    return {
        id: '_summon',
        summonSkill: true,
        animationId: 0,
        damage: {
            critical: false,
            elementId: 0,
            formula: '',
            type: 0,
            variance: 0
        },
        description: skill.description.format(pet.name()),
        effects: [ ],
        hitType: 0,
        iconIndex: getFromActorOrClassMeta("Summon Icon") || skill.iconIndex,
        message1: skill.message.replace('%2', pet.name()),
        message2: '',
        messageType: 1,
        meta: {
            Summon: pet.actorId()
        },
        mpCost: getFromActorOrClassMeta("Summon MP Cost") || skill.mpCost,
        name: skill.name.format(pet.name()),
        note: '',
        occasion: 1,
        repeats: 1,
        requiredWtypeId1: 0,
        requiredWtypeId2: 0,
        scope: 0,
        speed: getFromActorOrClassMeta("Summon Speed") || skill.speed,
        stypeId: MK.Summoning.summonSkill.stypeId,
        successRate: 100,
        tpCost: getFromActorOrClassMeta("Summon TP Cost") || skill.tpCost,
        tpGain: getFromActorOrClassMeta("Summon TP Gain") || skill.tpGain,
        traits: [ ],
    }
}

createUnsummonSkill = function(actor) {
    return {
        id: 1,
        animationId: 0,
        damage: {
            critical: false,
            elementId: 0,
            formula: '',
            type: 0,
            variance: 0
        },
        description: '', // TODO
        effects: [ ],
        hitType: 0,
        iconIndex: MK.Summoning.unsummonSkill.iconIndex,
        message1: MK.Summoning.unsummonSkill.message,
        message2: '',
        messageType: 1,
        meta: { },
        mpCost: MK.Summoning.unsummonSkill.mpCost,
        name: MK.Summoning.unsummonSkill.name,
        note: '',
        occasion: 1,
        repeats: 1,
        requiredWtypeId1: 0,
        requiredWtypeId2: 0,
        scope: 0,
        speed: MK.Summoning.unsummonSkill.speed,
        stypeId: MK.Summoning.summonSkill.stypeId,
        successRate: 100,
        tpCost: MK.Summoning.unsummonSkill.tpCost,
        tpGain: 0,
        unsummonActorId: actor.actorId(),
    }
}

createDummyState = function(id) {
    return {
        id: id,
        autoRemovalTiming: MK.Summoning.autoUnsummonAfterXTurns ? 1 : 0,
        chanceByDamage: 100,
        iconIndex: MK.Summoning.summonState.iconIndex,
        maxTurns: 10,
        minTurns: 10,
        motion: 0,
        name: MK.Summoning.summonState.name,
        note: '',
        meta: { },
        overlay: MK.Summoning.summonState.overlay,
        priority: MK.Summoning.summonState.priority,
        releaseByDamage: false,
        removeAtBattleEnd: false, // TODO
        removeByDamage: false,
        removeByRestriction: false,
        removeByWalking: false,
        restriction: 0,
        stepsToRemove: 0,
        traits: [ ],
        messageType: 1,
        message1: '',
        message2: '',
        message3: '',
        message4: '',
    }
}

const isDataStates = (object) => object && object.length > 1 && object[1] && typeof object[1].autoRemovalTiming !== 'undefined';

const alias_DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    
    if (!MK.Summoning.PET_STATE_ID && isDataStates(object)) {
        const id = object.length;
        const state = createDummyState(id);
        object[id] = state;
        MK.Summoning.PET_STATE_ID = id;
    }
    alias_DataManager_onLoad.call(this, object);
}

const requestAnimation = (target, animationId) => {
    if (!target || !animationId || !$dataAnimations[animationId])
        return;
    
    if (Utils.RPGMAKER_NAME == 'MZ') {
        $gameTemp.requestAnimation([target], animationId);
    }
    if (Utils.RPGMAKER_NAME == 'MV') {
        target.startAnimation(animationId);
    }
}

if (PluginManager.registerCommand) {

    PluginManager.registerCommand(PLUGIN_NAME, 'summonPet', args => {
        const actorId = Number(args.actorId);
        const summonerId = Number(args.summonerId);
        $gameParty.summonPet(actorId, summonerId);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'summonPetByVariable', args => {
        const actorId = $gameVariables.value(Number(args.variableId));
        const summonerId = Number(args.summonerId);
        $gameParty.summonPet(actorId, summonerId);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'unsummonPet', args => {
        $gameParty.unsummonPet(Number(args.actorId), 'true' == args.knockout);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'unsummonPetByVariable', args => {
        const actorId = $gameVariables.value(Number(args.variableId));
        $gameParty.unsummonPet(actorId, 'true' == args.knockout);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'unsummonAll', _ => {
        $gameParty.unsummonAll();
    });
}

// Compatibility
Game_Actor.prototype.isGiant = function() {
    return false;
}

const alias_WindowEquipSlot_isEnabled = Window_EquipSlot.prototype.isEnabled;
Window_EquipSlot.prototype.isEnabled = function(index) {
    return this.maxItems() > 0 && alias_WindowEquipSlot_isEnabled.call(this, index);
}

})();