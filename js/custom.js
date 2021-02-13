/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var output = $('#output');
	var playerClass = "Paladin";
	var healingStatsOutput = $('#healing_stats');
	var simTimer = $('#sim_timer');
	var raid_size = 40;
	var healing_frame = $('#healing_frame');
	var start = $('.start');
	var healingPower;
	var buttonActive = false;
	var crit;
	var maxMana;
	var mana;
	var mp5;
	var mp5Timer = 0;
	var manaPot = $('.manaPot');
	var rune = $('.rune');
	var lmb_spell = "";
	var rmb_spell = "";
	var mmb_spell = ""
	var shift_lmb_spell = "";
	var shift_rmb_spell = "";
	var shift_mmb_spell = "";
	// Cooldowns
	var cooldown1 = "Scrolls of Blinding Light";
	var cooldown2 = "Zandalarian Hero Charm";
	var scrollsOfBlindingLightActive = false;
	var scrollsOfBlindingLightCD = false;
	var zandalarianHeroCharmActive = false;
	var zandalarianHeroCharmCD = false;
	var isRunning = false;
	var isCasting = false;
	var isCancelled = false;
	var castingSpell = "";
	var meleeTargetInterval;
	var singleTargetInterval;
	var allTargetsInterval;
	var multiTargetInterval;
	var healing_interval;
	var warning_interval;
	var mp5_interval;
	var mp5_global;
	var target = "";
	var playerHealingDone = 0;
	var fightTimer = 120;
	var powerInfusionActive = false;
	var players = 
	[
		{id: '0', name: 'Madwall', class:'warrior', role: 'mt', status:'alive', health: 12000, healthMax: 12000, avoidance: 35},
		{id: '1', name: 'Paris', class:'warrior', role: 'tank', status:'alive', health: 10000, healthMax: 10000, avoidance: 30},
		{id: '2', name: 'Flowerboi', class:'warrior', role: 'tank', status:'alive', health: 10000, healthMax: 10000, avoidance: 30},
		{id: '3', name: 'Kungfupro', class:'warlock', role: 'ranged', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '4', name: 'Lustnerd', class:'hunter', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '5', name: 'Stylecop', class:'warrior', role: 'tank', status:'alive', health: 10000, healthMax: 10000, avoidance: 30},
		{id: '6', name: 'Windgod', class:'rogue', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 25},
		{id: '7', name: 'Cultnuker', class:'hunter', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '8', name: 'Gravecake', class:'warrior', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '9', name: 'Leetqueen', class:'warrior', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '10', name: 'Coolbreaker', class:'hunter', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '11', name: 'Fatwinner', class:'warrior', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '12', name: 'Warflame', class:'warrior', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '13', name: 'Goreking', class:'rogue', role: 'melee', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '14', name: 'Wishball', class:'rogue', role: 'melee', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '15', name: 'Kungfupally', class:'paladin', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '16', name: 'Wurstman', class:'warrior', role: 'melee', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '17', name: 'Lostminion', class:'mage', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '18', name: 'Startaste', class:'warlock', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '19', name: 'Vengeance', class:'mage', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		// {id: '20', name: 'Facepriest', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 100, isHealing: false, healingDone: 0},
		{id: '20', name: 'Parsegod', class:'priest', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 20, isHealing: false, healingDone: 0, healingPower: 1300, avoidance: 5, focus: 'raid'},
		// {id: '21', name: 'Paris', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500, avoidance: 5},
		{id: '21', name: 'Paris', class:'priest', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 500, isHealing: false, healingDone: 0, healingPower: 950, avoidance: 5, focus: 'raid'},
		{id: '22', name: 'Evilguru', class:'mage', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '23', name: 'Caveruler', class:'druid', role: 'melee', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '24', name: 'Oddwarf', class:'hunter', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		// {id: '25', name: 'Hiddenstar', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500, avoidance: 5},
		{id: '25', name: 'Hiddenstar', class:'paladin', role: 'healer', status:'alive', health: 6500, healthMax: 6500, reaction: 200, isHealing: false, healingDone: 0, healingPower: 1100, avoidance: 5, focus: 'mt'},
		{id: '26', name: 'Madpro', class:'paladin', role: 'healer', status:'alive', health: 6500, healthMax: 6500, reaction: 450, isHealing: false, healingDone: 0, healingPower: 900, avoidance: 5, focus: 'raid'},
		{id: '27', name: 'Magicpet', class:'paladin', role: 'healer', status:'alive', health: 6500, healthMax: 6500, reaction: 450, isHealing: false, healingDone: 0, healingPower: 900, avoidance: 5, focus: 'mt'},
		{id: '28', name: 'Flywaker', class:'priest', role: 'healer', status:'alive', health: 6500, healthMax: 6500, reaction: 1000, isHealing: false, healingDone: 0, healingPower: 910, avoidance: 5, focus: 'raid'},
		{id: '29', name: 'Player', class:'druid', role: 'healer', status:'alive', health: 6500, healthMax: 6500, reaction: 600, isHealing: false, healingDone: 0, healingPower: 1000, avoidance: 5, focus: 'raid'},
		{id: '30', name: 'Paris', class:'warlock', role: 'ranged', status:'alive', health: 6500, healthMax: 6500, avoidance: 5},
		{id: '31', name: 'Icecaller', class:'mage', role: 'ranged', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '32', name: 'Stormcake', class:'priest', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 500, isHealing: false, healingDone: 0, healingPower: 850, avoidance: 5, focus: 'raid'},
		{id: '33', name: 'Pestbender', class:'warrior', role: 'melee', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '34', name: 'Fancyboi', class:'paladin', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 500, isHealing: false, healingDone: 0, healingPower: 700, avoidance: 5, focus: 'raid'},
		{id: '35', name: 'Legion', class:'warrior', role: 'melee', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		{id: '36', name: 'Orcmelter', class:'warrior', role: 'melee', status:'alive', health: 6000, healthMax: 6000, avoidance: 5},
		// {id: '37', name: 'Coolblade', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500, avoidance: 5},
		{id: '37', name: 'Coolblade', class:'paladin', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 370, isHealing: false, healingDone: 0, healingPower: 930, avoidance: 5, focus: 'raid'},
		{id: '38', name: 'Icepanda', class:'paladin', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 350, isHealing: false, healingDone: 0, healingPower: 1100, avoidance: 5, focus: 'raid'},
		{id: '39', name: 'Firepro', class:'priest', role: 'healer', status:'alive', health: 6000, healthMax: 6000, reaction: 1000, isHealing: false, healingDone: 0, healingPower: 1100, avoidance: 5, focus: 'raid'}
	];
	var healers;
	var boss = 
	{
		time: 60
	};
	var boss_abilities = 
	[
		{bossname: 'type1', name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 2200, crit: 12, targets: 1, targetRole: "mt", warning: false},
		{bossname: 'type1', name: 'cleave', start: 1, time: 1.5, delay: 0, dmg: 1200, crit: 20, targets: 4, targetRole: "melee", warning: false},
		{bossname: 'type1', name: 'Impending Doom', start: 10, time: 20, delay: 10, dmg: 2000, crit: 0, targets: "all",miss: 0,  targetRole: "", warning: true},
		{bossname: 'type2', name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 1500, crit: 5, targets: 1, targetRole: "mt", warning: false},
		{bossname: 'type2', name: 'Frost Aura', start: 1, time: 2, delay: 0, dmg: 250, crit: 0, targets: "all", targetRole: "", warning: false},
		{bossname: 'type2', name: 'Icebolt1', start: 5, time: 60, delay: 3, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt2', start: 5, time: 60, delay: 6, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt3', start: 5, time: 60, delay: 9, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt4', start: 5, time: 60, delay: 12, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt5', start: 5, time: 60, delay: 15, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true}
	];
	var spells = 
	[
		{class: 'paladin', name: 'Flash of Light (Rank 1)', castTime: 1500, min: 67, max: 77, mana: 35},
		{class: 'paladin', name: 'Flash of Light (Rank 2)', castTime: 1500, min: 102, max: 117, mana: 50},
		{class: 'paladin', name: 'Flash of Light (Rank 3)', castTime: 1500, min: 153, max: 171, mana: 70},
		{class: 'paladin', name: 'Flash of Light (Rank 4)', castTime: 1500, min: 206, max: 231, mana: 90},
		{class: 'paladin', name: 'Flash of Light (Rank 5)', castTime: 1500, min: 278, max: 310, mana: 115},
		{class: 'paladin', name: 'Flash of Light (Rank 6)', castTime: 1500, min: 348, max: 389, mana: 140},
		{class: 'paladin', name: 'Holy Light (Rank 1)', castTime: 2500, min: 42, max: 51, mana: 35},
		{class: 'paladin', name: 'Holy Light (Rank 2)', castTime: 2500, min: 81, max: 96, mana: 60},
		{class: 'paladin', name: 'Holy Light (Rank 3)', castTime: 2500, min: 167, max: 196, mana: 110},
		{class: 'paladin', name: 'Holy Light (Rank 4)', castTime: 2500, min: 322, max: 368, mana: 190},
		{class: 'paladin', name: 'Holy Light (Rank 5)', castTime: 2500, min: 506, max: 569, mana: 275},
		{class: 'paladin', name: 'Holy Light (Rank 6)', castTime: 2500, min: 717, max: 799, mana: 365},
		{class: 'paladin', name: 'Holy Light (Rank 7)', castTime: 2500, min: 968, max: 1076, mana: 465},
		{class: 'paladin', name: 'Holy Light (Rank 8)', castTime: 2500, min: 1272, max: 1414, mana: 580},
		{class: 'paladin', name: 'Holy Light (Rank 9)', castTime: 2500, min: 1590, max: 1770, mana: 660},
		{class: 'priest', name: 'Flash Heal (Rank 1)', castTime: 1500, min: 202, max: 247, mana: 125},
		{class: 'priest', name: 'Flash Heal (Rank 2)', castTime: 1500, min: 269, max: 325, mana: 155},
		{class: 'priest', name: 'Flash Heal (Rank 3)', castTime: 1500, min: 339, max: 406, mana: 185},
		{class: 'priest', name: 'Flash Heal (Rank 4)', castTime: 1500, min: 414, max: 492, mana: 215},
		{class: 'priest', name: 'Flash Heal (Rank 5)', castTime: 1500, min: 534, max: 633, mana: 265},
		{class: 'priest', name: 'Flash Heal (Rank 6)', castTime: 1500, min: 662, max: 783, mana: 315},
		{class: 'priest', name: 'Flash Heal (Rank 7)', castTime: 1500, min: 828, max: 975, mana: 380},
		{class: 'priest', name: 'Greater Heal (Rank 1)', castTime: 2500, min: 924, max: 1039, mana: 314},
		{class: 'priest', name: 'Greater Heal (Rank 2)', castTime: 2500, min: 1178, max: 1318, mana: 387},
		{class: 'priest', name: 'Greater Heal (Rank 3)', castTime: 2500, min: 1470, max: 1642, mana: 463},
		{class: 'priest', name: 'Greater Heal (Rank 4)', castTime: 2500, min: 1813, max: 2021, mana: 557},
		{class: 'priest', name: 'Greater Heal (Rank 5)', castTime: 2500, min: 1966, max: 2194, mana: 604},
		{class: 'priest', name: 'Renew (Rank 1)', castTime: 0, min: 45, max: 45, duration: 15, mana: 30},
		{class: 'priest', name: 'Renew (Rank 2)', castTime: 0, min: 100, max: 100, duration: 15, interval: 3, mana: 65},
		{class: 'priest', name: 'Renew (Rank 3)', castTime: 0, min: 175, max: 175, duration: 15, interval: 3, mana: 105},
		{class: 'priest', name: 'Renew (Rank 4)', castTime: 0, min: 245, max: 245, duration: 15, interval: 3, mana: 140},
		{class: 'priest', name: 'Renew (Rank 5)', castTime: 0, min: 315, max: 315, duration: 15, interval: 3, mana: 170},
		{class: 'priest', name: 'Renew (Rank 6)', castTime: 0, min: 400, max: 400, duration: 15, interval: 3, mana: 205},
		{class: 'priest', name: 'Renew (Rank 7)', castTime: 0, min: 510, max: 510, duration: 15, interval: 3, mana: 250},
		{class: 'priest', name: 'Renew (Rank 8)', castTime: 0, min: 650, max: 650, duration: 15, interval: 3, mana: 305},
		{class: 'priest', name: 'Renew (Rank 9)', castTime: 0, min: 810, max: 810, duration: 15, interval: 3, mana: 365},
		{class: 'priest', name: 'Renew (Rank 10)', castTime: 0, min: 970, max: 970, duration: 15, interval: 3, mana: 410},
		{class: 'priest', name: 'Prayer of Healing (Rank 1)', castTime: 3000, min: 312, max: 333, mana: 328},
		{class: 'priest', name: 'Prayer of Healing (Rank 2)', castTime: 3000, min: 458, max: 487, mana: 448},
		{class: 'priest', name: 'Prayer of Healing (Rank 3)', castTime: 3000, min: 675, max: 713, mana: 616},
		{class: 'priest', name: 'Prayer of Healing (Rank 4)', castTime: 3000, min: 939, max: 991, mana: 824},
		{class: 'priest', name: 'Prayer of Healing (Rank 5)', castTime: 3000, min: 1041, max: 1099, mana: 1070}
	];
	// Cooldowns list
	var cooldowns =
	[
		{class: 'paladin', name: 'Scrolls of Blinding Light', duration: 20, cooldown: 3600},
		{class: 'paladin,priest,druid', name: 'Zandalarian Hero Charm', duration: 20, cooldown: 120},
		{class: 'priest', name: 'Power Infusion'}
	];
	var panels;

	initClass();
	initSpells();
	initHealingFrame();
	initFight(); //starts the fight
	initAI();
	initButton();
	initCDs();

	// Handle Keyboard inputs
	$(document).keydown(function(event)
	{
		console.log(event.which);
		// Prevent f1
		if(event.which === 112)
		{
			event.preventDefault();
		}

		// Cancel Heals
		if(event.which === 87)
		{
			isCancelled = true;
		}
		if(event.which === 65)
		{
			isCancelled = true;
		}
		if(event.which === 83)
		{
			isCancelled = true;
		}
		if(event.which === 68)
		{
			isCancelled = true;
		}
		// Use Cooldowns
		if(event.which === 112)
		{
			if(isRunning)
			{
				if(cooldown1 === "Scrolls of Blinding Light" && !scrollsOfBlindingLightCD)
				{
					scrollsOfBlindingLightActive = true;
					setTimeout(function()
					{
						scrollsOfBlindingLightActive = false;
					}, 20000);
					if(!scrollsOfBlindingLightCD)
					{
						scrollsOfBlindingLightCD = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightCD = false;
						}, 120000);
					}
				}
				if(cooldown1 === "Zandalarian Hero Charm")
				{
					zandalarianHeroCharmActive = true;
					setTimeout(function()
					{
						zandalarianHeroCharmActive = false;
					}, 20000);
					if(!zandalarianHeroCharmActive)
					{
						zandalarianHeroCharmActive = true;
						setTimeout(function()
						{
							zandalarianHeroCharmActive = false;
						}, 120000);
					}
				}
			}
		}
		if(event.which === 113)
		{
			if(isRunning)
			{
				if(cooldown1 === "Scrolls of Blinding Light")
				{
					if(!scrollsOfBlindingLightActive)
					{
						scrollsOfBlindingLightActive = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightActive = false;
						}, 20000);
					}
					if(!scrollsOfBlindingLightCD)
					{
						scrollsOfBlindingLightCD = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightCD = false;
						}, 120000);
					}
				}
				if(cooldown1 === "Zandalarian Hero Charm")
				{
					if(!zandalarianHeroCharmActive)
					{
						zandalarianHeroCharmActive = true;
						setTimeout(function()
						{
							zandalarianHeroCharmActive = false;
						}, 20000);
					}
					if(!zandalarianHeroCharmActive)
					{
						zandalarianHeroCharmActive = true;
						setTimeout(function()
						{
							zandalarianHeroCharmActive = false;
						}, 120000);
					}
				}
			}
		}
	});

	function initClass()
	{
		var classDropdown = $('#healer_class_dropdown');
		//When class dropdown changes clear spell dropdowns and add seleced class spells
		classDropdown.change(function(e, a)
		{
			var selectedClass = classDropdown.find(':selected').val();
			clearSpells();
			var spellCount = 0;
			$.each(spells, (function(val, text)
			{
				var spell = text.class;
				if(spell === selectedClass)
				{
					if(spellCount === 0)
					{
						$('#left_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#right_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#middle_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_left_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_right_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_middle_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
					}

					$('#left_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#right_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#middle_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_left_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_right_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_middle_mouse_button').append($('<option></option>').val(text.name).html(text.name));

					spellCount++;
				}
			}));

			// Handle Cooldowns
			$('#cooldown1').find('option').remove();
			$('#cooldown2').find('option').remove();
			cooldown1 = "";
			cooldown2 = "";

			var cooldownCount = 0;
			$.each(cooldowns, function(val, text)
			{
				if(text.class.indexOf(selectedClass) >= 0)
				{
					if(cooldownCount === 0)
					{
						$('#cooldown1').append($('<option selected></option>').val(text.name).html(text.name));
						$('#cooldown2').append($('<option selected></option>').val(text.name).html(text.name));
					}
					else
					{
						$('#cooldown1').append($('<option></option>').val(text.name).html(text.name));
						$('#cooldown2').append($('<option></option>').val(text.name).html(text.name));
					}
					cooldownCount++;
				}
			});

			initSpells();
		});
	}

	function clearSpells()
	{
		$('#left_mouse_button').find('option').remove();
		$('#right_mouse_button').find('option').remove();
		$('#middle_mouse_button').find('option').remove();
		$('#shift_left_mouse_button').find('option').remove();
		$('#shift_right_mouse_button').find('option').remove();
		$('#middle_right_mouse_button').find('option').remove();
	}

	function initSpells()
	{
		var lmb_val = $('#left_mouse_button').val();
		var rmb_val = $('#right_mouse_button').val();
		var mmb_val = $('#middle_mouse_button').val();
		var shift_lmb_val = $('#shift_left_mouse_button').val();
		var shift_rmb_val = $('#shift_right_mouse_button').val();
		var shift_mmb_val = $('#shift_middle_mouse_button').val();
		var key1 = $('#cooldown1').val();
		var key2 = $('#cooldown2').val();
		healingPower = $('.healing_input').val();
		crit = $('.crit_input').val();

		$.each(spells, function(i, s)
		{
			if(s.name === lmb_val)
			{
				lmb_spell = s;
			}
			if(s.name === rmb_val)
			{
				rmb_spell = s;
			}
			if(s.name === mmb_val)
			{
				mmb_spell = s;
			}
			if(s.name === shift_lmb_val)
			{
				shift_lmb_spell = s;
			}
			if(s.name === shift_rmb_val)
			{
				shift_rmb_spell = s;
			}
			if(s.name === shift_mmb_val)
			{
				shift_mmb_spell = s;
			}
		});

		var apply = $('.apply_spells');
		apply.on('click', function()
		{
			if(apply.hasClass('active'))
			{
				lmb_val = $('#left_mouse_button').val();
				rmb_val = $('#right_mouse_button').val();
				mmb_val = $('#middle_mouse_button').val();
				shift_lmb_val = $('#shift_left_mouse_button').val();
				shift_rmb_val = $('#shift_right_mouse_button').val();
				shift_mmb_val = $('#shift_middle_mouse_button').val();
				healingPower = $('.healing_input').val();

				$.each(spells, function(i, s)
				{
					if(s.name === lmb_val)
					{
						lmb_spell = s;
					}
					if(s.name === rmb_val)
					{
						rmb_spell = s;
					}
					if(s.name === mmb_val)
					{
						mmb_spell = s;
					}
					if(s.name === shift_lmb_val)
					{
						shift_lmb_spell = s;
					}
					if(s.name === shift_rmb_val)
					{
						shift_rmb_spell = s;
					}
					if(s.name === shift_mmb_val)
					{
						shift_mmb_spell = s;
					}
				});
			}	
		});
	}

	function initButton()
	{
		$('select').change(function()
		{
			$('.apply_spells').addClass('active');
		});

		$('input').on('change paste keyup', function()
		{
			$('.apply_spells').addClass('active');
		});

		$('.apply_spells').on('click', function()
		{
			$('.apply_spells').removeClass('active');
		});
	}

	/* 

	2. Init Healing Frame

	*/

	function initHealingFrame()
	{
		for(var x = 0; x < raid_size; x++)
		{
			var newPanel = '<div class="h_panel d-flex flex-row '+ players[x].class +'"><div class="health_overlay"><div class="incoming_container d-flex flex-row"></div></div><span>'+ players[x].name +'</span></div>';
			healing_frame.append(newPanel);

			$('.h_panel').bind('contextmenu', function(e)
			{
				return false;
			});
		}
		panels = $('.h_panel');

		// Spells/Keybinds
		$('.h_panel').on('mousedown', function(event)
		{
			event.stopPropagation();
			event.stopImmediatePropagation();
			var pnl = $(this);
			var i = $(this).index();
			var healAmount;
			var castTime;
			var fullSpell;

			switch(event.which)
			{
				case 1:
					// Left Mouse Button

					if(players[i].status === "alive" && isRunning)
					{
						if(event.shiftKey)
						{
							fullSpell = shift_lmb_spell;
							castingSpell = shift_lmb_spell.name;
							castTime = shift_lmb_spell.castTime;
							healAmount = getHealAmount(shift_lmb_spell, "player");
							if(fullSpell.name.indexOf("Prayer") >= 0)
							{
								initPoH(pnl, i, castTime, healAmount, fullSpell);
							}
							else
							{
								initHeal(pnl, i, castTime, healAmount, fullSpell);
							}
						}
						else
						{
							fullSpell = lmb_spell;
							castingSpell = lmb_spell.name;
							castTime = lmb_spell.castTime;
							healAmount = getHealAmount(lmb_spell, "player");
							if(fullSpell.name.indexOf("Prayer") >= 0)
							{
								initPoH(pnl, i, castTime, healAmount, fullSpell);
							}
							else
							{
								initHeal(pnl, i, castTime, healAmount, fullSpell);
							}
						}	
					}
					break;
				case 2:
					// Middle Mouse Button

					if(players[i].status === "alive" && isRunning)
					{
						if(event.shiftKey)
						{
							fullSpell = shift_mmb_spell;
							castingSpell = shift_mmb_spell.name;
							castTime = shift_mmb_spell.castTime;
							healAmount = getHealAmount(shift_mmb_spell, "player");
							if(fullSpell.name.indexOf("Prayer") >= 0)
							{
								initPoH(pnl, i, castTime, healAmount, fullSpell);
							}
							else
							{
								initHeal(pnl, i, castTime, healAmount, fullSpell);
							}
						}
						else
						{
							fullSpell = mmb_spell;
							castingSpell = mmb_spell.name;
							castTime = mmb_spell.castTime;
							healAmount = getHealAmount(mmb_spell, "player");
							if(fullSpell.name.indexOf("Prayer") >= 0)
							{
								initPoH(pnl, i, castTime, healAmount, fullSpell);
							}
							else
							{
								initHeal(pnl, i, castTime, healAmount, fullSpell);
							}
						}	
					}
					break;
				case 3:
					// Right Mouse Button

					if(players[i].status === "alive" && isRunning)
					{
						if(event.shiftKey)
						{
							fullSpell = shift_rmb_spell;
							castingSpell = shift_rmb_spell.name;
							castTime = shift_rmb_spell.castTime;
							healAmount = getHealAmount(shift_rmb_spell, "player");
							if(fullSpell.name.indexOf("Prayer") >= 0)
							{
								initPoH(pnl, i, castTime, healAmount, fullSpell);
							}
							else
							{
								initHeal(pnl, i, castTime, healAmount, fullSpell);
							}
						}
						else
						{
							fullSpell = rmb_spell;
							castingSpell = rmb_spell.name;
							castTime = rmb_spell.castTime;
							healAmount = getHealAmount(rmb_spell, "player");
							if(fullSpell.name.indexOf("Prayer") >= 0)
							{
								initPoH(pnl, i, castTime, healAmount, fullSpell);
							}
							else
							{
								initHeal(pnl, i, castTime, healAmount, fullSpell);
							}
						}	
					}
					break;
			}
		});
	}

	function getHealAmount(spell, healer)
	{
		var min = spell.min;
		var max = spell.max;
		var coef;
		var healerHealingPower;
		var bonusHealing;
		var avg;
		var healAmount;
		var returnHeal;
		var crt;

		if(healer === "player")
		{
			healerHealingPower = parseInt(healingPower);
		}
		else
		{
			healerHealingPower = parseInt(healer.healingPower);
		}

		// If spell is Flash of Light
		if(spell.name.indexOf("Flash of Light") >= 0)
		{
			// Apply healing light talent (+12% bonus healing to base values)
			min = min + ((min * 12) / 100);
			max = max + ((max * 12) / 100);
			coef = 0.4285;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			// Blessing of Light
			healAmount = healAmount + 115;
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Holy Light
		if(spell.name.indexOf("Holy Light") >= 0)
		{
			coef = 0.71;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			// Blessing of Light
			healAmount = healAmount + 400;
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Flash Heal
		if(spell.name.indexOf("Flash Heal") >= 0)
		{
			coef = 0.4285;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Greater Heal
		if(spell.name.indexOf("Greater Heal") >= 0)
		{
			coef = 0.8571;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Renew
		if(spell.name.indexOf("Renew") >= 0)
		{
			coef = 1;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Prayer of Healing
		if(spell.name.indexOf("Prayer of Healing") >= 0)
		{
			coef = 0.2857;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			returnHeal = {heal: healAmount, crit: crt};
		}

		return returnHeal;
	}

	function isCrit()
	{
		var retValue = false;
		var rnd = Math.floor(Math.random() * 101);
		if(rnd <= crit)
		{
			retValue = true;
		}
		return retValue;
	}

	/* 

	4. Init Fight

	*/

	function initFight()
	{
		start.on('click', function()
		{
			if(!isRunning)
			{
				isRunning = true;
				var sim_timer = simTimer.val();
				startMainTimer(sim_timer);
				playerClass = $('#healer_class_dropdown').val();
				maxMana = $('#mana').val();
				mana = maxMana;
				setTimeout(function()
				{
					clearInterval(warning_interval);
					clearInterval(meleeTargetInterval);
					clearInterval(singleTargetInterval);
					clearInterval(allTargetsInterval);
					clearInterval(multiTargetInterval);
					clearInterval(healing_interval);
					clearInterval(mp5_interval);
					clearInterval(mp5_global);
					isRunning = false;
				}, sim_timer * 1000);
				startAIHealing();
				initHealingStats();
				bossPickTarget();
				initMp5();
				$.each(boss_abilities, function(x, val)
				{
					var selected_boss = $('#bosses').val();
					if(val.bossname === selected_boss)
					{
						setTimeout(function(){startAbilityInterval(val)}, val.delay * 1000);
					}
				});
			}	
		});
	}

	function startMainTimer(sim_timer)
	{
		var secs = 0;
		var fight_progress = $('.fight_progress');
		var fight_progress_text = $('.fight_percent');
		setInterval(function()
		{
			if(secs > 0 && isRunning)
			{
				var hps = Math.floor(playerHealingDone / (secs/10));
				$('.player_hps').text(hps.toString() + "HPS");
				var fight_percent = (((sim_timer - (secs / 10)) / sim_timer) * 100);
				fight_progress.width(fight_percent + "%");
				fight_progress_text.text(Math.floor(fight_percent) + "%");
			}
			secs++;
		}, 100);
	}

	function startWarning(val)
	{
		var warnings_container = $('.warnings_container');
		var warning_class = val.name.replace(/ /g, '_').toLowerCase();
		var new_warning_div = '<div class="warning '+ warning_class +'"><div>'+ val.name +'</div><div class="warning_progress"></div></div>';
		warnings_container.append(new_warning_div);
		var warning_div = $('.' + warning_class);
		var warning_progress = warning_div.find('.warning_progress');
		warning_progress.animate(
		{
			width: '100%',
			easing: 'linear'
		}, 10000, function()
		{
			warning_div.remove();
		});
	}

	function removeWarnings()
	{
		$('.warning').remove();
	}

	// Handle abilities
	function startAbilityInterval(val)
	{
		var targetCount = val.targets;
		var targetRole = val.targetRole;
		var warning = val.warning;
		if(warning)
		{
			setTimeout(function()
			{
				warning_interval = setInterval(function()
				{
					startWarning(val);
				}, val.time * 1000);
				startWarning(val);
			}, (val.time - 10) * 1000);
		}

		// Single target melee
		if(targetCount === 1 && val.name === "melee")
		{
			meleeTargetInterval = setInterval(function()
			{
				if(target !== "")
				{
					if(targetRole === "mt")
					{
						// Hit check
						var avo = target.avoidance;
						var hit = isHit(avo);
						var bossDmg = val.dmg;
						// var bossCrit = val.crit;
						if(hit)
						{
							// if(isAttackCrit(bossCrit))
							// {
							// 	bossDmg = bossDmg * 2;
							// }
							var hp = target.health - bossDmg;
							target.health = hp;
							output.prepend(target.name + " takes "+ bossDmg + "damage from " + val.name + "!" + "\n");

							if(target.health > 0)
							{
								updatePanels(target);
							}
							else
							{
								target.status = "dead";
								target.health = 0;
								updatePanels(target);
								target = "";
								bossPickTarget();
								clearInterval();
							}
							updatePanels(target);
						}
						else
						{
							output.prepend(target.name + " takes "+ bossDmg + "damage from " + val.name + "!" + "\n");
							output.prepend(val.name + " miss " + target.name + "\n");
						}
					}	
				}
					
			}, val.time*1000);
		}

		// Single Target but not melee
		else if(targetCount === 1 && val.name !== "melee")
		{
			var targets;
			singleTargetInterval = setInterval(function()
			{
				var targetCount = val.targets;
				var alivePlayersCount = getAlivePlayersCount();

				if(alivePlayersCount > 0)
				{
					if(alivePlayersCount < targetCount)
					{
						targetCount = alivePlayersCount;
					}
					var selected = getTargets(targetCount)
					$.each(selected, function(a, b)
					{
						var plr = b;
						var hp = plr.health - val.dmg;
						plr.health = hp;
						output.prepend(plr.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

						if(plr.health > 0)
						{
							updatePanels(plr);
						}
						else
						{
							plr.status = "dead";
							plr.health = 0;
							updatePanels(plr);
							plr = "";
							bossPickTarget();
							clearInterval();
						}
						updatePanels(plr);
					});
				}
				else
				{
					clearInterval(singleTargetInterval);
					clearInterval(warning_interval);
					removeWarnings();
				}	
				
			}, val.time*1000);
		}

		// All targets
		else if(targetCount === "all")
		{
			allTargetsInterval = setInterval(function()
			{
				var c = getAlivePlayersCount();
				if(c > 0)
				{
					$.each(players, function(x, player)
					{
						if(player.status === "alive")
						{
							var hp = player.health - val.dmg;
							player.health = hp;
							output.prepend(player.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");
							if(player.health > 0)
							{
								updatePanels(player);
							}
							else
							{
								player.status = "dead";
								player.health = 0;
								updatePanels(player);
							}
							updatePanels(player);
						}
					});
				}
				else
				{
					clearInterval(allTargetsInterval);
					clearInterval(warning_interval);
					removeWarnings();
				}
			}, val.time*1000);
		}
		// Multi target
		else
		{
			var targets;
			multiTargetInterval = setInterval(function()
			{
				var targetCount = val.targets;
				var alivePlayersCount = getAlivePlayersCount();

				if(alivePlayersCount > 0)
				{
					if(alivePlayersCount < targetCount)
					{
						targetCount = alivePlayersCount;
					}
					var selected = getTargets(targetCount)
					$.each(selected, function(a, b)
					{
						var plr = b;
						var hp = plr.health - val.dmg;
						plr.health = hp;
						output.prepend(plr.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

						if(plr.health > 0)
						{
							updatePanels(plr);
						}
						else
						{
							plr.status = "dead";
							plr.health = 0;
							updatePanels(plr);
							plr = "";
							bossPickTarget();
							clearInterval();
						}
						updatePanels(plr);
					});
				}
				else
				{
					clearInterval(multiTargetInterval);
					clearInterval(warning_interval);
					removeWarnings();
				}	
				
			}, val.time*1000);
		}
	}

	function isHit(avo)
	{
		var rnd = Math.floor((Math.random() * 100) + 1);
		var returnValue = false;
		if(rnd <= avo)
		{
			returnValue = false
		}
		else
		{
			returnValue = true
		}
		return returnValue;
	}

	function isAttackCrit(bossCrit)
	{
		var rnd = Math.floor((Math.random() * 100) + 1);
		var returnValue = false;
		if(rnd <= bossCrit)
		{
			returnValue = false
		}
		else
		{
			returnValue = true
		}
		return returnValue;
	}

	function processDmg(p, val)
	{
		var hp = p.health - val.dmg;
		p.health = hp;
		output.prepend(p.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");
		updatePanels(p);
	}

	function getAlivePlayersCount()
	{
		var retValue = 0;
		$.each(players, function(x, player)
		{
			if(player.status === "alive")
			{
				retValue++;
			}
		});
		return retValue;
	}

	function getTargets(t)
	{
		var isAlive = [];
		var isAliveId = [];
		$.each(players, function(x, val)
		{
			if(val.status === "alive")
			{
				isAlive.push(val);
				isAliveId.push(val.id);
			}
		});
		
		var arr = [];
		var a = isAlive.length;
		while(arr.length < isAlive.length)
		{
		    var r = Math.floor(Math.random() * a - 1) + 1;
		    if(arr.indexOf(r) === -1) arr.push(r);
		}

		var returnArr = [];
		for(var yyy = 0; yyy < t; yyy++)
		{
			var yNum = arr[yyy];
			returnArr.push(isAlive[yNum]);
		}

		return returnArr;
	}

	function updatePanels(tgt)
	{
		var i = tgt.id;
		var health = tgt.health;
		var healthMax = tgt.healthMax;
		var healthPerc;
		if(health === 0)
		{
			healthPerc = 0;
		}
		else
		{
			healthPerc = ((health / healthMax) * 100) + "%";
		}
		$(panels[i]).find('.health_overlay').css('width', healthPerc);
	}

	function bossPickTarget()
	{
		if(target === "")
		{
			getMT();
		}
		if(target === "")
		{
			getTank();
		}
		if(target === "")
		{
			getNextTarget();
		}
	}

	function getMT()
	{
		$.each(players, function(x, val)
		{
			if(val.role === "mt" && val.status === "alive")
			{
				target = val;
				return false;
			}
		});
	}

	function getTank()
	{
		$.each(players, function(x, val)
		{
			if(val.role === "tank" && val.status === "alive")
			{
				target = val;
				return false;
			}
		});
	}

	// If MT and tanks are dead pick next random target for boss (not random atm, just next alive target)
	function getNextTarget()
	{
		$.each(players, function(x, val)
		{
			if(val.status === "alive")
			{
				target = val;
				return false;
			}
		});
	}

	// Prayer of Healing
	function initPoH(p, ind, castTime, healAmount, fullSpell)
	{
		if(!isCasting)
		{
			if(mana > fullSpell.mana)
			{
				var pnls = [$($('.h_panel')[25]), $($('.h_panel')[26]), $($('.h_panel')[27]), $($('.h_panel')[28]), $($('.h_panel')[29])];
				var ids = [25, 26, 27, 28, 29];
				var plyrs = [players[25], players[26], players[27], players[28], players[29]];

				var player = players[ind];
				isCasting = true;

				if(scrollsOfBlindingLightActive)
				{
					castTime = (((castTime / 1000) / ((33 / 100) + 1)) * 1000);
				}

				var manaCost = fullSpell.mana;
				var cTime = (castTime / 1000).toFixed(2) + "s";

				var pnl1 = $(pnls[0].find('.incoming_container'));
				var pnl2 = pnls[1].find('.incoming_container');
				var pnl3 = pnls[2].find('.incoming_container');
				var pnl4 = pnls[3].find('.incoming_container');
				var pnl5 = pnls[4].find('.incoming_container');

				var incDivCount1 = pnl1.find('.incoming').length;
				var incDivCount2 = pnl2.find('.incoming').length;
				var incDivCount3 = pnl3.find('.incoming').length;
				var incDivCount4 = pnl4.find('.incoming').length;
				var incDivCount5 = pnl5.find('.incoming').length;

				var incDivClass1 = "incoming"+incDivCount1.toString();
				var incDivClass2 = "incoming"+incDivCount2.toString();
				var incDivClass3 = "incoming"+incDivCount3.toString();
				var incDivClass4 = "incoming"+incDivCount4.toString();
				var incDivClass5 = "incoming"+incDivCount5.toString();

				var incDivClassFinal1 = "incoming "+incDivClass1;
				var incDivClassFinal2 = "incoming "+incDivClass2;
				var incDivClassFinal3 = "incoming "+incDivClass3;
				var incDivClassFinal4 = "incoming "+incDivClass4;
				var incDivClassFinal5 = "incoming "+incDivClass5;

				var incDiv1 = '<div class="' + incDivClassFinal1 +'"></div>';
				var incDiv2 = '<div class="' + incDivClassFinal2 +'"></div>';
				var incDiv3 = '<div class="' + incDivClassFinal3 +'"></div>';
				var incDiv4 = '<div class="' + incDivClassFinal4 +'"></div>';
				var incDiv5 = '<div class="' + incDivClassFinal5 +'"></div>';

				var incDivToRemove1;
				var incDivToRemove2;
				var incDivToRemove3;
				var incDivToRemove4;
				var incDivToRemove5;

				pnl1.append(incDiv1);
				pnl2.append(incDiv2);
				pnl3.append(incDiv3);
				pnl4.append(incDiv4);
				pnl5.append(incDiv5);

				var inc1 = pnl1.find('.'+incDivClass1);
				var inc2 = pnl2.find('.'+incDivClass2);
				var inc3 = pnl3.find('.'+incDivClass3);
				var inc4 = pnl4.find('.'+incDivClass4);
				var inc5 = pnl5.find('.'+incDivClass5);

				incDivToRemove1 = inc1;
				incDivToRemove2 = inc2;
				incDivToRemove3 = inc3;
				incDivToRemove4 = inc4;
				incDivToRemove5 = inc5;

				var incPerc1 = (((healAmount.heal / plyrs[0].healthMax) * 50) + "%");
				var incPerc2 = (((healAmount.heal / plyrs[1].healthMax) * 50) + "%");
				var incPerc3 = (((healAmount.heal / plyrs[2].healthMax) * 50) + "%");
				var incPerc4 = (((healAmount.heal / plyrs[3].healthMax) * 50) + "%");
				var incPerc5 = (((healAmount.heal / plyrs[4].healthMax) * 50) + "%");

				inc1.css('width', incPerc1);
				inc2.css('width', incPerc2);
				inc3.css('width', incPerc3);
				inc4.css('width', incPerc4);
				inc5.css('width', incPerc5);

				$('.cast_bar_progress').animate(
				{
					width: '100%'
				},
				{
					duration: castTime,
					easing: 'linear',
					start: function()
					{
						$('.cast_bar').css({background: '#000000'});
						$('.cast_bar_text').text("Casting " + castingSpell + " - " + cTime);
					},
					step: function()
					{
						
					},
					// Cancel Cast
					progress: function()
					{
						if(isCancelled)
						{
							$('.cast_bar_progress').css({width: 0});
							$('.cast_bar_text').text("");
							$('.cast_bar').css({background: 'transparent'});
							isCasting = false;
							pnl1.find('.incoming').remove();
							pnl2.find('.incoming').remove();
							pnl3.find('.incoming').remove();
							pnl4.find('.incoming').remove();
							pnl5.find('.incoming').remove();
							$(this).stop(false, false);
							isCancelled = false;
						}
					},
					complete: function()
					{
						isCasting = false;
						$('.cast_bar_progress').css({width: 0});

						//Mana
						mana = mana - manaCost;
						updateMana();
						clearInterval(mp5_global);
						startMp5Rule();

						$.each(plyrs, function(plID, pl)
						{
							player = pl;
							if(player.status === "alive")
							{
								var currentHealth = player.health;
								var maxHealth = player.healthMax;
								var overheal = 0;
								var actualHealAmount = 0;
								var newHealth = currentHealth + healAmount.heal;
								if(newHealth > maxHealth)
								{
									overheal = newHealth - maxHealth;
									actualHealAmount = healAmount.heal - overheal;
									newHealth = maxHealth;
								}
								else
								{
									actualHealAmount = Math.ceil(healAmount.heal);
									newHealth = currentHealth + healAmount.heal;
								}

								playerHealingDone = playerHealingDone + actualHealAmount;
								players[29].healingDone = playerHealingDone;
								player.health = newHealth;
								updatePanels(player);
								showMyHeal(actualHealAmount, healAmount.crit);
								var isCrit = healAmount.crit;
								var outputLine = "";
								if(!isCrit)
								{
									outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
								}
								else
								{
									outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
								}
								$('.cast_bar_text').text("");
								$('.cast_bar').css({background: 'transparent'});
								if(overheal > 0)
								{
									output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
								}
								else
								{
									output.prepend(outputLine + "\n");
								}

								incDivToRemove1.remove();
								incDivToRemove2.remove();
								incDivToRemove3.remove();
								incDivToRemove4.remove();
								incDivToRemove5.remove();
							}
						});	
					}
				})
				.animate(
				{
					width: '0%'
				},
				{
					duration: 0
				});	
			}	
		}
	}

	function initHeal(pnl, i, castTime, healAmount, fullSpell)
	{
		if(!isCasting)
		{
			if(mana > fullSpell.mana)
			{
				// If cast time is 0, it's a HoT
				if(castTime === 0)
				{
					addHot(pnl, i, healAmount, fullSpell, true);
				}
				else
				{
					var player = players[i];
					isCasting = true;

					if(scrollsOfBlindingLightActive)
					{
						castTime = (((castTime / 1000) / ((33 / 100) + 1)) * 1000);
					}

					var originalPnl = pnl;
					var manaCost = fullSpell.mana;
					var cTime = (castTime / 1000).toFixed(2) + "s";
					var tempMaxHealth = player.healthMax;
					pnl = pnl.find('.incoming_container');
					var currentInc = 0;
					var incDivCount = pnl.find('.incoming').length;
					var incDivClass = "incoming"+incDivCount.toString();
					var incDivClassFinal = "incoming "+incDivClass;
					var incDiv = '<div class="' + incDivClassFinal +'"></div>';
					var incDivToRemove;
					pnl.append(incDiv);
					var inc = pnl.find('.'+incDivClass);
					incDivToRemove = inc;
					var incPerc = (((healAmount.heal / tempMaxHealth) * 50) + "%");
					inc.css('width', incPerc);

					$('.cast_bar_progress').animate(
					{
						width: '100%'
					},
					{
						duration: castTime,
						easing: 'linear',
						start: function()
						{
							$('.cast_bar').css({background: '#000000'});
							$('.cast_bar_text').text("Casting " + castingSpell + " - " + cTime);
						},
						step: function()
						{
							// if(player.status !== "alive")
							// {
							// 	$('.cast_bar_progress').css({width: 0});
							// 	$('.cast_bar_text').text("");
							// 	$('.cast_bar').css({background: 'transparent'});
							// 	isCasting = false;
							// 	pnl.find('.incoming').remove();
							// 	$(this).stop(false, false);
							// }
						},
						// Cancel Cast
						progress: function()
						{
							if(isCancelled || player.status !== "alive")
							{
								$('.cast_bar_progress').css({width: 0});
								$('.cast_bar_text').text("");
								$('.cast_bar').css({background: 'transparent'});
								isCasting = false;
								pnl.find('.incoming').remove();
								$(this).stop(false, false);
								isCancelled = false;
							}
						},
						complete: function()
						{
							isCasting = false;
							$('.cast_bar_progress').css({width: 0});
							if(player.status === "alive")
							{
								var currentHealth = player.health;
								var maxHealth = player.healthMax;
								var overheal = 0;
								var actualHealAmount = 0;
								var newHealth = currentHealth + healAmount.heal;
								if(newHealth > maxHealth)
								{
									overheal = newHealth - maxHealth;
									actualHealAmount = healAmount.heal - overheal;
									newHealth = maxHealth;
								}
								else
								{
									actualHealAmount = Math.ceil(healAmount.heal);
									newHealth = currentHealth + healAmount.heal;
								}

								// No mana cost for paladin crits (--fix to add mana after cast instead)
								if(playerClass === "paladin" && healAmount.crit)
								{

								}
								else
								{
									mana = mana - manaCost;
									updateMana();
								}

								clearInterval(mp5_global);
								startMp5Rule();
								playerHealingDone = playerHealingDone + actualHealAmount;
								players[29].healingDone = playerHealingDone;
								player.health = newHealth;
								updatePanels(player);
								showMyHeal(actualHealAmount, healAmount.crit);
								var isCrit = healAmount.crit;
								var outputLine = "";
								if(!isCrit)
								{
									outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
								}
								else
								{
									outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
								}
								$('.cast_bar_text').text("");
								$('.cast_bar').css({background: 'transparent'});
								if(overheal > 0)
								{
									output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
								}
								else
								{
									output.prepend(outputLine + "\n");
								}

								incDivToRemove.remove();

								// if Greater heal add rank 5 renew
								if(fullSpell.name.indexOf("Greater Heal") >= 0)
								{
									var xSpell = {class: 'priest', name: 'Renew (Rank 5)', castTime: 0, min: 315, max: 315, duration: 15, interval: 3, mana: 170};
									addHot(originalPnl, i, getHealAmount(xSpell, "player"), xSpell, false);
								}
							}
								
						}
					})
					.animate(
						{
							width: '0%'
						},
						{
							duration: 0
						});
				}
			}	
		}
	}

	function addHot(pnl, i, healAmount, fullSpell, gcd)
	{
		var player = players[i];
		if(player.status === "alive")
		{
			// Create hot icon and add it to the panel if hot does not already exist
			var hotClass = 'hot';
			var hotName = fullSpell.name.split(' ')[0].toLowerCase();
			if(!gcd)
			{
				hotName = "gh";
			}
			healAmount.heal = Math.ceil(healAmount.heal / (fullSpell.duration / fullSpell.interval));
			if($(pnl).find('.' + hotName).length > 0)
			{
				isCasting = true;
				setTimeout(function()
				{
					isCasting = false;
				}, 1500);
			}
			else
			{
				if(gcd)
				{
					isCasting = true;
					setTimeout(function()
					{
						isCasting = false;
					}, 1500);
				}
				var hotIcon = '<div class="' + hotClass + ' ' + hotName + '"></div>';
				$(pnl).append(hotIcon);
				setTimeout(function()
				{
					pnl.find('.' + hotName).remove();
				}, fullSpell.duration * 1000);

				var manaCost = fullSpell.mana;
				var tempMaxHealth = player.healthMax;
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var pnl2 = pnl.find('.incoming_container');
				var incID = getRandomNum();
				var incDivClass = "incoming" + incID.toString();
				var incDivClassFinal = "incoming "+incDivClass;
				var incDiv = '<div class="' + incDivClassFinal +'"></div>';
				var incDivToRemove;
				pnl2.append(incDiv);
				var inc = pnl2.find('.'+incDivClass);
				incDivToRemove = inc;
				var incPerc = (((healAmount.heal / tempMaxHealth) * 50) + "%");
				inc.css('width', incPerc);

				//Mana - do not subtract if greater heal
				if(gcd)
				{
					mana = mana - manaCost;
					updateMana();
					clearInterval(mp5_global);
					startMp5Rule();
				}

				// HoT interval
				var hotInterval = setInterval(function()
				{
					if(player.status === "alive" && isRunning)
					{
						tempMaxHealth = player.healthMax;
						currentHealth = player.health;
						maxHealth = player.healthMax;
						var overheal = 0;
						var actualHealAmount = 0;
						var newHealth = currentHealth + healAmount.heal;
						if(newHealth > maxHealth)
						{
							overheal = newHealth - maxHealth;
							actualHealAmount = healAmount.heal - overheal;
							newHealth = maxHealth;
						}
						else
						{
							actualHealAmount = healAmount.heal;
							newHealth = currentHealth + healAmount.heal;
						}

						playerHealingDone = playerHealingDone + actualHealAmount;
						players[29].healingDone = playerHealingDone;
						player.health = newHealth;
						updatePanels(player);
						showMyHeal(actualHealAmount, healAmount.crit);
						var isCrit = healAmount.crit;
						var outputLine = "";
						if(!isCrit)
						{
							outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
						}
						else
						{
							outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
						}
						if(overheal > 0)
						{
							output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
						}
						else
						{
							output.prepend(outputLine + "\n");
						}

						// Remove incoming heal
						setTimeout(function()
						{
							incDivToRemove.remove();
						}, fullSpell.interval * 1000);
					}
					else
					{
						incDivToRemove.remove();
					}

						
				}, fullSpell.interval * 1000);

				// Clear Interval
				setTimeout(function()
				{
					clearInterval(hotInterval);
				}, fullSpell.duration * 1000);
			}
		}	
	}

	function getRandomNum()
	{
		var x = Math.floor(1000 + Math.random() * 9000);

		return x;
	}

	function showMyHeal(heal, crit)
	{
		var critClass = "";
		if(crit)
		{
			critClass = "crit";
		}
		var newDiv = '<div class="show_my_heal '+ critClass +'">'+ heal +'</div>';
		
		$('.show_my_heal_container > div').append(newDiv);
		var newElement = $('.show_my_heal')[$('.show_my_heal').length - 1];
		$(newElement).animate(
		{
			bottom: '100%',
			opacity: '0'
		}, 3000, "linear",
			function()
			{
				$(newElement).remove();
			}
		);
	}

	/* 

	2. Init AI

	*/

	function initAI()
	{
		healers = getHealers();
	}

	function getHealers()
	{
		var healers = [];
		$.each(players, function()
		{
			if(this.role === "healer")
			{
				healers.push(this);
			}
		});
		return healers;
	}

	function startAIHealing()
	{
		$.each(healers, function(e, i)
		{
			if(i.name !== "Player")
			{
				initHealer(e, i);
			}
		});
	}

	function initHealer(e, i)
	{
		var hClass = i.class;
		var reaction = i.reaction;
		var healTarget = "";

		healing_interval = setInterval(function()
		{
			if(i.isHealing === false && i.status === "alive" && isRunning)
			{
				if(i.name === "Parsegod")
				{
					healTarget = getHealTargetAILevel10();
				}
				else
				{
					if(i.focus === "mt")
					{
						healTarget = target;
					}
					else
					{
						healTarget = getHealTarget();
					}
				}

				if(healTarget !== "")
				{
					var pnl = panels.get(healTarget.id);
					var targetID = healTarget.id;
					if(i.name === "Parsegod")
					{
						var spell = aiPickSpellLevel10(targetID);
					}
					else
					{
						var spell = aiPickSpell(targetID);
					}
					var s = spells.find(x => x.name === spell);
					var healAmount = getHealAmount(s, i).heal;
					var castTime = s.castTime;
					i.isHealing = true;
					initAIHeal($(pnl), targetID, castTime, healAmount, i);
				}
			}
			
		}, reaction);
	}

	function getHealTarget()
	{
		var healingTargets = [];
		$.each(players, function(e, i)
		{
			if(i.status === 'alive' && i.health < i.healthMax)
			{
				healingTargets.push(i);
			}
		});
		var healingTarget = "";

		if(healingTargets.length > 0)
		{
			healingTarget = healingTargets[Math.floor(Math.random() * healingTargets.length)];
		}
		return healingTarget;
	}

	function getHealTargetAILevel10()
	{
		var healingTargets = [];
		$.each(players, function(e, i)
		{
			if(i.status === 'alive' && i.health < i.healthMax)
			{
				var missingHP = i.healthMax - i.health;
				var asd = {missingHP: missingHP};
				$.extend(i, asd);
				healingTargets.push(i);
			}
		});
		var healingTarget = "";

		if(healingTargets.length > 0)
		{
			healingTargets = healingTargets.sort(function (a, b)
			{
			    return b.missingHP - a.missingHP;
			});
			healingTarget = healingTargets[0];
		}
		return healingTarget;
	}

	function aiPickSpell(targetID)
	{
		// var targetHP = players[targetID].health;
		// var targetMissingHP = players[targetID].healthMax - targetHP;
		// var spell = "";
		// if(targetMissingHP > 1000)
		// {
		// 	spell = "Holy Light (Rank 6)";
		// }
		// else
		// {
		// 	spell = "Flash of Light (Rank 4)";
		// }
		// return spell;

		return "Flash of Light (Rank 5)";
	}

	function aiPickSpellLevel10(targetID)
	{
		var targetHP = players[targetID].health;
		var targetMissingHP = players[targetID].healthMax - targetHP;
		var spell = "";
		if(targetMissingHP > 2000)
		{
			spell = "Holy Light (Rank 7)";
		}
		else
		{
			spell = "Flash of Light (Rank 6)";
		}
		return spell;
	}

	function initAIHeal(pnl, targetID, castTime, healAmount, i)
	{
		var player = players[targetID];
		var tempMaxHealth = player.healthMax;

		pnl = pnl.find('.incoming_container');
		var currentInc = 0;
		var incDivCount = pnl.find('.incoming').length;
		var incDivClass = "incoming"+incDivCount.toString();
		var incDivClassFinal = "incoming "+incDivClass;
		var incDiv = '<div class="' + incDivClassFinal +'"></div>';
		var incDivToRemove;

		pnl.append(incDiv);
		var inc = pnl.find('.'+incDivClass);
		incDivToRemove = inc;
		var incPerc = (((healAmount / tempMaxHealth) * 50) + "%");
		inc.css('width', incPerc);


		setTimeout(function()
		{
			var currentHealth = player.health;
			var maxHealth = player.healthMax;
			var overheal = 0;
			var actualHealAmount = 0;
			var newHealth = currentHealth + healAmount;
			if(player.status === "alive")
			{
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = healAmount - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = healAmount;
					newHealth = currentHealth + healAmount;
				}
				var healingSoFar = i.healingDone;
				i.healingDone = healingSoFar + actualHealAmount;
				player.health = newHealth;
				updatePanels(player);
				var isCrit = healAmount.crit;
				var outputLine = "";
				if(!isCrit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by " + i.name;
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by " + i.name;
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n by" + i.name);
				}
				else
				{
					output.prepend(outputLine + "\n");
				}
				incDivToRemove.remove();
			}
			else
			{
				incDivToRemove.remove();
			}
			i.isHealing = false;
		}, castTime);	
	}

	function initHealingStats()
	{
		var healingOutputText = "";
		var player_h;
		setInterval(function()
		{
			healingOutputText = "";
			healers.sort((a, b) => parseFloat(b.healingDone) - parseFloat(a.healingDone));
			$.each(healers, function(e, i)
			{
				healingOutputText = healingOutputText + i.name + ": " + i.healingDone + "\n";
				healingStatsOutput.text(healingOutputText);
			});
		}, 1000);
	}

	function initMp5()
	{
		mp5_interval = setInterval(function()
		{
			mana = mana + mp5;
			if(mana >= maxMana)
			{
				mana = maxMana;
			}
			updateMana();
		}, 5000);
	}

	function startMp5Rule()
	{
		if(playerClass === "priest")
		{
			mp5 = 160;
		}
		else
		{
			mp5 = 60;
		}
		mp5_global = setInterval(function()
		{
			if(playerClass === "priest")
			{
				mp5 = 400;
			}
			else
			{
				mp5 = 240;
			}
		}, 5000);
	}

	function updateMana()
	{
		$('.mana').text(mana);
		var manaPerc = (mana / maxMana) * 100;
		$('.mana_background').css("width", manaPerc + "%");
	}

	function initCDs()
	{
		manaPot.on('click', function()
		{
			var potMana = Math.floor(Math.random() * (2250 - 1350 + 1)) + 1350;
			mana = mana + potMana;
			if(mana >= maxMana)
			{
				mana = maxMana;
			}
			updateMana();
			manaPot.css("pointerEvents", "none");
			$('.mana_pot_cd').css("opacity", "1");
			var x = 120;
			var manaPotInterval = setInterval(function()
			{
				x--;
				$('.mana_pot_cd').text(x);
			}, 1000);
			setTimeout(function()
			{
				manaPot.css("pointerEvents", "auto");
				$('.mana_pot_cd').css("opacity", "0");
				clearInterval(manaPotInterval);
			},120000);
		});

		rune.on('click', function()
		{
			var runeMana = Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
			mana = mana + runeMana;
			if(mana >= maxMana)
			{
				mana = maxMana;
			}
			updateMana();
			rune.css("pointerEvents", "none");
			$('.rune_cd').css("opacity", "1");
			var x = 120;
			var runeInterval = setInterval(function()
			{
				x--;
				$('.rune_cd').text(x);
			}, 1000);
			setTimeout(function()
			{
				rune.css("pointerEvents", "auto");
				$('.rune_cd').css("opacity", "0");
				clearInterval(runeInterval);
			},120000);
		});
	}

});