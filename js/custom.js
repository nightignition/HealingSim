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
	var singleTargetInterval;
	var allTargetsInterval;
	var multiTargetInterval;
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
		{name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 1500, crit: 20, targets: 1, targetRole: ""},
		{name: 'cleave', start: 1, time: 1.5, delay: 0, dmg: 750, crit: 20, targets: 2, targetRole: "melee"},
		{name: 'Impending Doom', start: 10, time: 20, delay: 10, dmg: 2000, crit: 0, targets: "all", targetRole: ""}
	];
	var spells = 
	[
		{name: 'Flash of Light', rank: 1, castTime: 1.5, healing: 350}
	];
	var panels;

	initHealingFrame();
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

			$('.h_panel').bind('contextmenu', function(e)
			{
				return false;
			});
		}
		panels = $('.h_panel');

		// $('.h_panel').on('click', function(event)
		// {
		// 	event.stopPropagation();
		// 	event.stopImmediatePropagation();
		// 	var pnl = event.target;
		// 	var i = $(this).index();
		// 	if(players[i].status === "alive")
		// 	{
		// 		initHeal(pnl, i);
		// 	}
		// });

		$('.h_panel').on('mousedown', function(event)
		{
			event.stopPropagation();
			event.stopImmediatePropagation();
			var pnl = event.target;
			var i = $(this).index();
			var healAmount;
			var castTime;

			switch(event.which)
			{
				case 1:
					if(players[i].status === "alive")
					{
						castTime = 1500;
						healAmount = 1500;
						initHeal(pnl, i, castTime, healAmount);
					}
					break;
				case 2:
					
					break;
				case 3:
					castTime = 2500;
					healAmount = 3500;
					initHeal(pnl, i, castTime, healAmount);
					break;
			}
		});
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
			$('.cast_bar')
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
						$(this).stop(false, false);
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
						// var healAmount = 2500;
						var overheal = 0;
						var actualHealAmount = 0;
						var newHealth = currentHealth + healAmount;
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
						player.health = newHealth;
						updatePanels(player);
						$('.cast_bar_text').text("");
						$('.cast_bar').css({background: 'transparent'});
						if(overheal > 0)
						{
							output.prepend(player.name + " got healed for " + actualHealAmount + " (" + overheal + " overhealed)" + "\n");
						}
						else
						{
							output.prepend(player.name + " got healed for " + actualHealAmount + "\n");
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

});