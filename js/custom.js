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
	var healingStatsOutput = $('#healing_stats');
	var simTimer = $('#sim_timer');
	var raid_size = 40;
	var healing_frame = $('#healing_frame');
	var start = $('.start');
	var healingPower;
	var buttonActive = false;
	var crit;
	var lmb_spell = "";
	var rmb_spell = "";
	var shift_lmb_spell = "";
	var shift_rmb_spell = "";
	var isRunning = false;
	var isCasting = false;
	var isCancelled = false;
	var castingSpell = "";
	var singleTargetInterval;
	var allTargetsInterval;
	var multiTargetInterval;
	var healing_interval;
	var warning_interval;
	var target = "";
	var playerHealingDone = 0;
	var fightTimer = 120;
	var players = 
	[
		{id: '0', name: 'Madwall', class:'warrior', role: 'mt', status:'alive', health: 8000, healthMax: 8000},
		{id: '1', name: 'Paris', class:'warrior', role: 'tank', status:'alive', health: 7500, healthMax: 7500},
		{id: '2', name: 'Flowerboi', class:'warrior', role: 'tank', status:'alive', health: 7500, healthMax: 7500},
		{id: '3', name: 'Kungfupro', class:'warlock', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '4', name: 'Lustnerd', class:'hunter', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '5', name: 'Stylecop', class:'warrior', role: 'tank', status:'alive', health: 7500, healthMax: 7500},
		{id: '6', name: 'Windgod', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '7', name: 'Cultnuker', class:'hunter', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '8', name: 'Gravecake', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '9', name: 'Leetqueen', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '10', name: 'Coolbreaker', class:'hunter', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '11', name: 'Fatwinner', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '12', name: 'Warflame', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '13', name: 'Goreking', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '14', name: 'Wishball', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '15', name: 'Kungfupally', class:'paladin', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '16', name: 'Wurstman', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '17', name: 'Lostminion', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '18', name: 'Startaste', class:'warlock', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '19', name: 'Vengeance', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		// {id: '20', name: 'Facepriest', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 100, isHealing: false, healingDone: 0},
		{id: '20', name: 'Parsegod', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 20, isHealing: false, healingDone: 0, healingPower: 1300},
		{id: '21', name: 'Paris', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '22', name: 'Evilguru', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '23', name: 'Caveruler', class:'druid', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '24', name: 'Oddwarf', class:'hunter', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '25', name: 'Hiddenstar', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '26', name: 'Madpro', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 450, isHealing: false, healingDone: 0, healingPower: 900},
		{id: '27', name: 'Magicpet', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '28', name: 'Flywaker', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 1500, isHealing: false, healingDone: 0, healingPower: 910},
		{id: '29', name: 'Player', class:'druid', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 600, isHealing: false, healingDone: 0, healingPower: 1000},
		{id: '30', name: 'Paris', class:'warlock', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '31', name: 'Icecaller', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '32', name: 'Stormcake', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 500, isHealing: false, healingDone: 0, healingPower: 850},
		{id: '33', name: 'Pestbender', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '34', name: 'Fancyboi', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 500, isHealing: false, healingDone: 0, healingPower: 700},
		{id: '35', name: 'Legion', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '36', name: 'Orcmelter', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '37', name: 'Coolblade', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '38', name: 'Icepanda', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 150, isHealing: false, healingDone: 0, healingPower: 1100},
		{id: '39', name: 'Firepro', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 1000, isHealing: false, healingDone: 0, healingPower: 1100}
	];
	var healers;
	var boss = 
	{
		time: 60
	};
	var boss_abilities = 
	[
		{name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 700, crit: 20, targets: 1, targetRole: "", warning: false},
		{name: 'cleave', start: 1, time: 1.5, delay: 0, dmg: 1200, crit: 20, targets: 2, targetRole: "melee", warning: false},
		{name: 'Impending Doom', start: 10, time: 20, delay: 10, dmg: 1000, crit: 0, targets: "all", targetRole: "", warning: true}
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
		{class: 'priest', name: 'Greater Heal (Rank 1)', castTime: 2500, min: 924, max: 1039, mana: 370},
		{class: 'priest', name: 'Greater Heal (Rank 2)', castTime: 2500, min: 1178, max: 1318, mana: 455},
		{class: 'priest', name: 'Greater Heal (Rank 3)', castTime: 2500, min: 1470, max: 1642, mana: 545},
		{class: 'priest', name: 'Greater Heal (Rank 4)', castTime: 2500, min: 1813, max: 2021, mana: 655},
		{class: 'priest', name: 'Greater Heal (Rank 5)', castTime: 2500, min: 1966, max: 2194, mana: 710},
		{class: 'priest', name: 'Renew (Rank 1)', castTime: 0, min: 45, max: 45, duration: 15, mana: 30},
		{class: 'priest', name: 'Renew (Rank 2)', castTime: 0, min: 100, max: 100, duration: 15, interval: 3, mana: 65},
		{class: 'priest', name: 'Renew (Rank 3)', castTime: 0, min: 175, max: 175, duration: 15, interval: 3, mana: 105},
		{class: 'priest', name: 'Renew (Rank 4)', castTime: 0, min: 245, max: 245, duration: 15, interval: 3, mana: 140},
		{class: 'priest', name: 'Renew (Rank 5)', castTime: 0, min: 315, max: 315, duration: 15, interval: 3, mana: 170},
		{class: 'priest', name: 'Renew (Rank 6)', castTime: 0, min: 400, max: 400, duration: 15, interval: 3, mana: 205},
		{class: 'priest', name: 'Renew (Rank 7)', castTime: 0, min: 510, max: 510, duration: 15, interval: 3, mana: 250},
		{class: 'priest', name: 'Renew (Rank 8)', castTime: 0, min: 650, max: 650, duration: 15, interval: 3, mana: 305},
		{class: 'priest', name: 'Renew (Rank 9)', castTime: 0, min: 810, max: 810, duration: 15, interval: 3, mana: 365},
		{class: 'priest', name: 'Renew (Rank 10)', castTime: 0, min: 970, max: 970, duration: 15, interval: 3, mana: 410}
	];
	var panels;

	initClass();
	initSpells();
	initHealingFrame();
	initFight();
	initAI();
	initButton();

	// Cancel Heals
	$(document).keydown(function(event)
	{
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
						$('#shift_left_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_right_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
					}

					$('#left_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#right_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_left_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_right_mouse_button').append($('<option></option>').val(text.name).html(text.name));

					spellCount++;
				}
			}));
			initSpells();
		});
	}

	function clearSpells()
	{
		$('#left_mouse_button').find('option').remove();
		$('#right_mouse_button').find('option').remove();
		$('#shift_left_mouse_button').find('option').remove();
		$('#shift_right_mouse_button').find('option').remove();
	}

	function initSpells()
	{
		var lmb_val = $('#left_mouse_button').val();
		var rmb_val = $('#right_mouse_button').val();
		var shift_lmb_val = $('#shift_left_mouse_button').val();
		var shift_rmb_val = $('#shift_right_mouse_button').val();
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
			if(s.name === shift_lmb_val)
			{
				shift_lmb_spell = s;
			}
			if(s.name === shift_rmb_val)
			{
				shift_rmb_spell = s;
			}
		});

		console.log("Spells set to: \n");
		console.log("Left Mouse Button: "+lmb_spell.name);
		console.log("Right Mouse Button: "+rmb_spell.name);
		console.log(lmb_spell.castTime);

		var apply = $('.apply_spells');
		apply.on('click', function()
		{
			if(apply.hasClass('active'))
			{
				lmb_val = $('#left_mouse_button').val();
				rmb_val = $('#right_mouse_button').val();
				shift_lmb_val = $('#shift_left_mouse_button').val();
				shift_rmb_val = $('#shift_right_mouse_button').val();
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
					if(s.name === shift_lmb_val)
					{
						shift_lmb_spell = s;
					}
					if(s.name === shift_rmb_val)
					{
						shift_rmb_spell = s;
					}
				});
			}	
		});
	}

	function initButton()
	{
		$('#healer_class_dropdown, #left_mouse_button').change(function()
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
							healAmount = getHealAmount(shift_lmb_spell);
							initHeal(pnl, i, castTime, healAmount, fullSpell);
						}
						else
						{
							fullSpell = lmb_spell;
							castingSpell = lmb_spell.name;
							castTime = lmb_spell.castTime;
							healAmount = getHealAmount(lmb_spell);
							initHeal(pnl, i, castTime, healAmount, fullSpell);
						}	
					}
					break;
				case 2:
					// Middle Mouse Button

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
							healAmount = getHealAmount(shift_rmb_spell);
							initHeal(pnl, i, castTime, healAmount, fullSpell);
						}
						else
						{
							fullSpell = rmb_spell;
							castingSpell = rmb_spell.name;
							castTime = rmb_spell.castTime;
							healAmount = getHealAmount(rmb_spell);
							initHeal(pnl, i, castTime, healAmount, fullSpell);
						}	
					}
					break;
			}
		});
	}

	function getHealAmount(spell)
	{
		var min = spell.min;
		var max = spell.max;
		var coef;
		var bonusHealing;
		var avg;
		var healAmount;
		var returnHeal;
		var crt;

		// If spell is Flash of Light
		if(spell.name.indexOf("Flash of Light") >= 0)
		{
			coef = 0.4285;
			bonusHealing = Math.ceil(healingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Holy Light
		if(spell.name.indexOf("Holy Light") >= 0)
		{
			coef = 0.71;
			bonusHealing = Math.ceil(healingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			crt = isCrit();
			if(crt)
			{
				healAmount = healAmount * 1.5;
			}
			returnHeal = {heal: healAmount, crit: crt};
		}

		// If spell is Flash Heal
		if(spell.name.indexOf("Flash Heal") >= 0)
		{
			coef = 0.4285;
			bonusHealing = Math.ceil(healingPower * coef);
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
			bonusHealing = Math.ceil(healingPower * coef);
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
			bonusHealing = Math.ceil(healingPower * coef);
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
		if(rnd < crit)
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
				setTimeout(function()
				{
					clearInterval(warning_interval);
					clearInterval(singleTargetInterval);
					clearInterval(allTargetsInterval);
					clearInterval(multiTargetInterval);
					clearInterval(healing_interval);
					isRunning = false;
				}, sim_timer * 1000);
				startAIHealing();
				initHealingStats();
				bossPickTarget();
				$.each(boss_abilities, function(x, val)
				{
					setTimeout(startAbilityInterval(val), val.delay * 1000);
				});
			}	
		});
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
		}, val.delay * 1000, function()
		{
			warning_div.remove();
		});
	}

	function removeWarnings()
	{
		$('.warning').remove();
	}

	function startAbilityInterval(val)
	{
		var targetCount = val.targets;
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
			}, val.start * 1000);
		}

		// Single target
		if(targetCount === 1)
		{
			singleTargetInterval = setInterval(function()
			{
				if(target !== "")
				{
					var hp = target.health - val.dmg;
					target.health = hp;
					output.prepend(target.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

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
							// console.log("Target is Dead!");
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

	function initHeal(pnl, i, castTime, healAmount, fullSpell)
	{
		if(!isCasting)
		{
			// If cast time is 0, it's a HoT
			if(castTime === 0)
			{
				addHot(pnl, i, healAmount, fullSpell);
			}
			else
			{
				var player = players[i];
				isCasting = true;
				var cTime = (castTime / 1000) + "s";
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

	function addHot(pnl, i, healAmount, fullSpell)
	{
		var player = players[i];
		if(player.status === "alive")
		{
			// Create hot icon and add it to the panel if hot does not already exist
			var hotClass = 'hot';
			var hotName = fullSpell.name.split(' ')[0].toLowerCase();
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
				isCasting = true;
				var hotIcon = '<div class="' + hotClass + ' ' + hotName + '"></div>';
				$(pnl).append(hotIcon);
				setTimeout(function()
				{
					isCasting = false;
				}, 1500);
				setTimeout(function()
				{
					pnl.find('.' + hotName).remove();
				}, fullSpell.duration * 1000);

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

		healing_interval = setInterval(function()
		{
			if(i.isHealing === false && i.status === "alive" && isRunning)
			{
				if(i.name === "Parsegod")
				{
					var healTarget = getHealTargetAILevel10();
				}
				else
				{
					var healTarget = getHealTarget();
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
					var healAmount = getHealAmount(s).heal;
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

});