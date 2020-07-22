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
	var raid_size = 40;
	var healing_frame = $('#healing_frame');
	var start = $('.start');
	var isRunning = false;
	var isCasting = false;
	var target = "";
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
		{id: '20', name: 'Facepriest', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '21', name: 'Paris', class:'rogue', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '22', name: 'Evilguru', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '23', name: 'Caveruler', class:'druid', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '24', name: 'Oddwarf', class:'hunter', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '25', name: 'Hiddenstar', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '26', name: 'Madpro', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '27', name: 'Magicpet', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '28', name: 'Flywaker', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '29', name: 'Paris', class:'druid', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '30', name: 'Paris', class:'warlock', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '31', name: 'Icecaller', class:'mage', role: 'ranged', status:'alive', health: 4000, healthMax: 4000},
		{id: '32', name: 'Stormcake', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '33', name: 'Pestbender', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '34', name: 'Fancyboi', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '35', name: 'Legion', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '36', name: 'Orcmelter', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '37', name: 'Coolblade', class:'warrior', role: 'melee', status:'alive', health: 4500, healthMax: 4500},
		{id: '38', name: 'Icepanda', class:'paladin', role: 'healer', status:'alive', health: 4000, healthMax: 4000},
		{id: '39', name: 'Firepro', class:'priest', role: 'healer', status:'alive', health: 4000, healthMax: 4000}
	];
	var boss = 
	{
		time: 60
	};
	var boss_abilities = 
	[
		{name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 1500, crit: 20, targets: 1},
		{name: 'Impending Doom', start: 10, time: 20, delay: 10, dmg: 2000, crit: 0, targets: "all"}
	];
	var spells = 
	[
		{name: 'Flash of Light', rank: 1, castTime: 1.5, healing: 350}
	];
	var panels;

	initHealingFrame();
	initBoss();
	initFight();

	/* 

	2. Init Healing Frame

	*/

	function initHealingFrame()
	{
		for(var x = 0; x < raid_size; x++)
		{
			var newPanel = '<div class="h_panel '+ players[x].class +'"><div class="health_overlay"></div><span>'+ players[x].name +'</span></div>';
			healing_frame.append(newPanel);

			$('.h_panel').on('click', function(event)
			{
				event.stopPropagation();
    			event.stopImmediatePropagation();
				var pnl = event.target;
				var i = $(this).index();
				if(players[i].status === "alive")
				{
					initHeal(pnl, i);
				}
			});
		}
		panels = $('.h_panel');
	}

	/* 

	3. Init Boss

	*/

	function initBoss()
	{

	}

	/* 

	4. Init Fight

	*/

	function initFight()
	{
		start.on('click', function()
		{
			bossPickTarget();
			$.each(boss_abilities, function(x, val)
			{
				setTimeout(startAbilityInterval(val), val.delay * 1000);
			});
		});
	}

	function startAbilityInterval(val)
	{
		var targetCount = val.targets;
		if(targetCount === 1)
		{
			setInterval(function()
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
		else if(targetCount === "all")
		{
			setInterval(function()
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
							player = "";
							bossPickTarget();
							clearInterval();
						}
						updatePanels(player);
					}
				});
				if(target !== "")
				{
					
				}
					
			}, val.time*1000);
		}
		else
		{
			setInterval(function()
			{
				var targets = getTargets(targetCount);
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

	function getTargets(targetCount)
	{
		var targets = [];
		var targetsAlive = getLiving();
		if(targetCount > targetsAlive)
		{
			targetCount = targetsAlive;
		}
		while(targets.length < targetCount)
		{
			var r = Math.floor(Math.random() * 40) + 1;
    		if(targets.indexOf(r) === -1) targets.push(r);
		}
		console.log(targets);
		return targets;
	}

	function getLiving()
	{
		var count = 0;
		$.each(players, function(x, val)
		{
			if(val.status === "alive")
			{
				count++;
			}
		});
		return count;
	}

	function initHeal(pnl, i)
	{
		if(!isCasting)
		{
			var player = players[i];
			var currentHealth = players[i].health;
			var maxHealth = players[i].healthMax;
			var healAmount = 2500;
			var newHealth = currentHealth + healAmount;
			if(newHealth > maxHealth)
			{
				newHealth = maxHealth;
			}
			isCasting = true;
			$('.cast_bar')
			$('.cast_bar_progress').animate(
			{
				width: '100%'
			},
			{
				duration: 1500,
				easing: 'linear',
				done: function()
				{
					isCasting = false;
					$('.cast_bar_progress').css({width: 0});
					if(players[i].status === "alive")
					{
						players[i].health = newHealth;
						updatePanels(players[i]);
						output.prepend(players[i].name + " got healed for " + healAmount + "\n");
					}
						
				}
			});
		}
	}

});