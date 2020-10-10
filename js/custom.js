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
	var raid_size = 40;
	var healing_frame = $('#healing_frame');
	var start = $('.start');
	var healingPower;
	var crit;
	var lmb_spell = "";
	var rmb_spell = "";
	var isRunning = false;
	var isCasting = false;
	var singleTargetInterval;
	var allTargetsInterval;
	var multiTargetInterval;
	var warning_interval;
	var target = "";
	var playerHealingDone = 0;
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
		{id: '20', name: 'Facepriest', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 100, isHealing: false, healingDone: 0},
		{id: '21', name: 'Paris', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '22', name: 'Evilguru', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '23', name: 'Caveruler', class:'druid', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '24', name: 'Oddwarf', class:'hunter', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '25', name: 'Hiddenstar', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '26', name: 'Madpro', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 450, isHealing: false, healingDone: 0},
		{id: '27', name: 'Magicpet', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '28', name: 'Flywaker', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 1500, isHealing: false, healingDone: 0},
		{id: '29', name: 'Player', class:'druid', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 600, isHealing: false, healingDone: 0},
		{id: '30', name: 'Paris', class:'warlock', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '31', name: 'Icecaller', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '32', name: 'Stormcake', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 500, isHealing: false, healingDone: 0},
		{id: '33', name: 'Pestbender', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '34', name: 'Fancyboi', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 500, isHealing: false, healingDone: 0},
		{id: '35', name: 'Legion', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '36', name: 'Orcmelter', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '37', name: 'Coolblade', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '38', name: 'Icepanda', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 150, isHealing: false, healingDone: 0},
		{id: '39', name: 'Firepro', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000, reaction: 1000, isHealing: false, healingDone: 0}
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
		{class: 'paladin', name: 'Flash of Light (Rank 1)', castTime: 1500, min: 67, max: 77},
		{class: 'paladin', name: 'Flash of Light (Rank 2)', castTime: 1500, min: 102, max: 117},
		{class: 'paladin', name: 'Flash of Light (Rank 3)', castTime: 1500, min: 153, max: 171},
		{class: 'paladin', name: 'Flash of Light (Rank 4)', castTime: 1500, min: 206, max: 231},
		{class: 'paladin', name: 'Flash of Light (Rank 5)', castTime: 1500, min: 278, max: 310},
		{class: 'paladin', name: 'Flash of Light (Rank 6)', castTime: 1500, min: 348, max: 389},
		{class: 'paladin', name: 'Holy Light (Rank 1)', castTime: 2500, min: 42, max: 51},
		{class: 'paladin', name: 'Holy Light (Rank 2)', castTime: 2500, min: 81, max: 96},
		{class: 'paladin', name: 'Holy Light (Rank 3)', castTime: 2500, min: 167, max: 196},
		{class: 'paladin', name: 'Holy Light (Rank 4)', castTime: 2500, min: 322, max: 368},
		{class: 'paladin', name: 'Holy Light (Rank 5)', castTime: 2500, min: 506, max: 569},
		{class: 'paladin', name: 'Holy Light (Rank 6)', castTime: 2500, min: 717, max: 799},
		{class: 'paladin', name: 'Holy Light (Rank 7)', castTime: 2500, min: 968, max: 1076},
		{class: 'paladin', name: 'Holy Light (Rank 8)', castTime: 2500, min: 1272, max: 1414},
	];
	var panels;

	initHealingFrame();
	initSpells();
	initFight();
	initAI();

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
			// var pnl = event.target;
			var pnl = $(this);
			var i = $(this).index();
			var healAmount;
			var castTime;

			switch(event.which)
			{
				case 1:
					// Left Mouse Button

					if(players[i].status === "alive")
					{
						castTime = lmb_spell.castTime;
						healAmount = getHealAmount(lmb_spell);
						console.log(healAmount);
						initHeal(pnl, i, castTime, healAmount);
					}
					break;
				case 2:
					// Middle Mouse Button

					break;
				case 3:
					// Right Mouse Button

					if(players[i].status === "alive")
					{
						castTime = rmb_spell.castTime;
						healAmount = getHealAmount(rmb_spell);
						console.log(healAmount);
						initHeal(pnl, i, castTime, healAmount);
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

	function initSpells()
	{
		var lmb_val = $('#left_mouse_button').val();
		var rmb_val = $('#right_mouse_button').val();
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
		});

		console.log("Spells set to: \n");
		console.log("Left Mouse Button: "+lmb_spell.name);
		console.log("Right Mouse Button: "+rmb_spell.name);
		console.log(lmb_spell.castTime);

		var apply = $('.apply_spells');
		apply.on('click', function()
		{
			lmb_val = $('#left_mouse_button').val();
			rmb_val = $('#right_mouse_button').val();
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
			});
		});
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
					console.log("Target: " + target.name)
					console.log("Target health: "+hp);
					console.log("Target takes "+ val.dmg + "damage from " + val.name + "!");
					output.prepend(target.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

					if(target.health > 0)
					{
						updatePanels(target);
					}
					else
					{
						target.status = "dead";
						target.health = 0;
						console.log("Target is Dead!");
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
							console.log("Target: " + player.name)
							console.log("Target health: "+hp);
							console.log("Target takes "+ val.dmg + "damage from " + val.name + "!");
							output.prepend(player.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");
							if(player.health > 0)
							{
								updatePanels(player);
							}
							else
							{
								player.status = "dead";
								player.health = 0;
								console.log("Target is Dead!");
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
						console.log(b);
						var plr = b;
						var hp = plr.health - val.dmg;
						plr.health = hp;
						console.log("Target: " + plr.name)
						console.log("Target health: "+hp);
						console.log("Target takes "+ val.dmg + "damage from " + val.name + "!");
						output.prepend(plr.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

						if(plr.health > 0)
						{
							updatePanels(plr);
						}
						else
						{
							plr.status = "dead";
							plr.health = 0;
							console.log("Target is Dead!");
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
		console.log(p.name);
		var hp = p.health - val.dmg;
		p.health = hp;
		console.log("Target: " + p.name)
		console.log("Target health: "+hp);
		console.log("Target takes "+ val.dmg + "damage from " + val.name + "!");
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

		console.log(isAliveId);
		
		var arr = [];
		var a = isAlive.length;
		console.log(a);
		while(arr.length < isAlive.length)
		{
		    var r = Math.floor(Math.random() * a - 1) + 1;
		    if(arr.indexOf(r) === -1) arr.push(r);
		}

		var returnArr = [];
		for(var yyy = 0; yyy < t; yyy++)
		{
			var yNum = arr[yyy];
			console.log(yNum);
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

	function initHeal(pnl, i, castTime, healAmount)
	{
		if(!isCasting)
		{
			var player = players[i];
			isCasting = true;
			var cTime = (castTime / 1000) + "s";


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
				actualHealAmount = healAmount.heal;
				newHealth = currentHealth + healAmount.heal;
			}

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
			var incPerc = (((healAmount.heal / maxHealth) * 100) + "px");
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
					$('.cast_bar_text').text("Casting Flash of Light " + cTime);
				},
				step: function()
				{
					if(player.status !== "alive")
					{
						$('.cast_bar_progress').css({width: 0});
						$('.cast_bar_text').text("");
						$('.cast_bar').css({background: 'transparent'});
						isCasting = false;
						pnl.find('.incoming').remove();
						$(this).stop(false, false);
					}
				},
				complete: function()
				{
					isCasting = false;
					$('.cast_bar_progress').css({width: 0});
					if(player.status === "alive")
					{
						playerHealingDone = playerHealingDone + actualHealAmount;
						players[29].healingDone = playerHealingDone;
						player.health = newHealth;
						var isCrit = healAmount.crit;
						var outputLine = "";
						if(!isCrit)
						{
							outputLine = player.name + " got healed for " + actualHealAmount;
						}
						else
						{
							outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!)";
						}
						updatePanels(player);
						$('.cast_bar_text').text("");
						$('.cast_bar').css({background: 'transparent'});
						if(overheal > 0)
						{
							output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n");
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

		var healing_interval = setInterval(function()
		{
			if(i.isHealing === false && i.status === "alive")
			{
				var healTarget = getHealTarget();

				if(healTarget !== "")
				{
					var pnl = panels.get(healTarget.id);
					var targetID = healTarget.id;
					var spell = aiPickSpell(targetID);
					var s = spells.find(x => x.name === spell);
					// var healAmount = 850;
					var healAmount = getHealAmount(s).heal;
					console.log("--------------"+healAmount);
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

	function aiPickSpell(targetID)
	{
		var targetHP = players[targetID].health;
		var targetMissingHP = players[targetID].healthMax - targetHP;
		var spell = "";
		if(targetMissingHP > 1000)
		{
			spell = "Holy Light (Rank 6)";
		}
		else
		{
			spell = "Flash of Light (Rank 4)";
		}
		return spell;
	}

	function initAIHeal(pnl, targetID, castTime, healAmount, i)
	{
		var player = players[targetID];
		var currentHealth = player.health;
		var maxHealth = player.healthMax;
		var overheal = 0;
		var actualHealAmount = 0;
		var newHealth = currentHealth + healAmount;

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
		var incPerc = (((healAmount / maxHealth) * 100) + "px");
		inc.css('width', incPerc);


		setTimeout(function()
		{
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
				var isCrit = healAmount.crit;
				var outputLine = "";
				if(!isCrit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount;
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!)";
				}
				updatePanels(player);
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}
				i.isHealing = false;
				incDivToRemove.remove();
			}
			else
			{
				incDivToRemove.remove();
			}
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