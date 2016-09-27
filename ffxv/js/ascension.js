$(document).ready(function() {
    var charactersTemplate = $('div.characters');
    var characterTemplate = $('div.character').hide();

    var characters = [
        {
            name: 'Noctis',
            skills: [{
                    name: 'Master-at-Arms', ap: 0,
                    description: 'Conjure and wield weapons of all kinds.',
                    children: [{
                            name: 'Phase', ap: 4,
                            description: 'Automatically evade attacks while holding down the defend button (costs MP).',
                            children: [{
                                    name: 'Airstep', ap: 8,
                                    description: 'Use jump button and left joystick to take a step in mid-air after attacking (costs MP), one time only.',
                                    children: [{
                                            name: 'Airslip', ap: 20,
                                            description: 'Dodge enemy attacks in mid-air by pressing the jump button.',
                                            children: [{
                                                    name: 'Airstride',
                                                    ap: 38,
                                                    description: 'Perform a second Airstep after a second attack (costs MP).',
                                                    children: [{
                                                            name: 'Airdance',
                                                            ap: 80,
                                                            description: 'Airstep after attacks an unlimited number of times (costs MP).',
                                                            children: [],
                                                        }
                                                    ],
                                                }, {
                                                    name: 'Death Drop', ap: 26,
                                                    description: 'From afar, press the jump button in mid-air to warp into range and strike down from above.',
                                                    children: [],
                                                }, 
                                            ],
                                        }
                                    ],
                                }, {
                                    name: 'Rapid Regen', ap: 8,
                                    description: 'Raise HP and MP recovery rate while in cover.',
                                    children: [{
                                        name: 'Blink', ap: 16,
                                        description: "Phase an enemy's attack without using MP by pressing the jump button at the last second",
                                        children: [],
                                    }],
                                }, {
                                    name: 'Polearm Link', ap: 8,
                                    description: 'Perform link-strikes with polearms',
                                    children: [{
                                        name: 'Greatsword Link', ap: 12,
                                        description: 'Perform link-strikes with greatswords.',
                                        children: [{
                                            name: 'Upcharger', ap: 20,
                                            description: 'Raise the charging limit on charged attacks.',
                                            children: [],
                                        }],
                                    }, {
                                        name: 'Warp Decoy', ap: 20,
                                        description: 'Leave a hologram to divert enemies after a point-warp.',
                                        children: [{
                                            name: '?', ap: '',
                                            description: '',
                                            children: [],
                                        }, {
                                            name: '?', ap: '',
                                            description: '',
                                            children: [],
                                        }],
                                    }, {
                                        name: '?', ap: '',
                                        description: '',
                                        children: [{
                                            name: '?', ap: '',
                                            description: '',
                                            children: [],
                                        }],
                                    }],
                                }

                            ],
                        }, {
                            name: 'Accessory Slot', ap: 24,
                            description: '',
                            children: [{
                                name: '?', ap: '',
                                description: 'Equip two accessories',
                                children: [],
                            }],
                        }, {
                            name: 'Libra', ap: 12,
                            description: 'Lock on to an enemy while in cover to scan for weaknesses.',
                            children: [{
                                name: 'Libra: Pinpoint', ap: 14,
                                description: "Boost damage inflicted on a scanned enemy's appendages.",
                                children: [{
                                    name: '?', ap: '',
                                    description: 'Equip two accessories',
                                    children: [],
                                }],
                            }, {
                                name: 'Enhanced Libra', ap: 16,
                                description: "Scan for stronger enemies' weakness and identify daemon appendages that can be destroyed.",
                                children: [{
                                    name: '?', ap: '',
                                    description: 'Equip two accessories',
                                    children: [],
                                }],
                            }],
                        }

                    ],
                }
            ],
        }, {
            name: 'Gladiolus',
            skills: [{
                    name: 'Tempest', ap: 0,
                    description: 'Unleash a sweaping area attack with a greatsword. Can create openings.',
                    children: [{
                            name: 'Engage', ap: 6,
                            description: 'Gain first strike with a greatsword. Adds to tech bar.',
                            children: [
                            ],
                        }, {
                            name: 'Reflex', ap: 10,
                            description: 'Counterattack using a greatsword just before taking a hit.',
                            children: [
                            ],
                        }, {
                            name: 'Sentinel', ap: 12,
                            description: 'Equip shields.',
                            children: [],
                        }
                    ],
                }
            ],
        }, {
            name: 'Ignis',
            skills: [{
                    name: 'Mark', ap: 0,
                    description: 'Set up Noctis to warp-strike multiple enemies in succession with a dagger. Can create openings.',
                    children: [{
                            name: 'Analyze', ap: 6,
                            description: 'Automatically scan most enemies with Libra. Adds to tech bar.',
                            children: [{
                                name: 'Lancer', ap: 12,
                                description: 'Equip polearms.',
                                children: [],
                            }],
                        }, {
                            name: 'Regenerate', ap: 8,
                            description: 'Heal an ally with a hidden item when HP is high.',
                            children: [{
                                name: 'First aid', ap: 12,
                                description: 'Recover a bit of HP when HP is low.',
                                children: [],
                            }],
                        }
                    ],
                }
            ],
        }, {
            name: 'Prompto',
            skills: [{
                    name: 'Piercer', ap: 0,
                    description: 'Pierce target with a firearm to hit multiple enemies in a line. Reduces enemy defense. Can destroy appendages and create openings.',
                    children: [{
                            name: 'First Aid', ap: 12,
                            description: 'Recover a bit of HP when HP is low.',
                            children: [{
                                    name: 'Machinist', ap: 12,
                                    description: 'Equip machinery.',
                                    children: [{
                                            name: 'Fatal Blast', ap: 12,
                                            description: "Weaken a scanned enemy's defense with a critical machinery hit.",
                                            children: [{
                                                name: 'Gravisphere', ap: '30 (?)',
                                                description: "Draw enemies in an area closer together with machinery.",
                                                children: [],
                                            }],
                                        }
                                    ],
                                }
                            ],
                        }, {
                            name: 'Fatal Shot', ap: 8,
                            description: "Weaken a scanned enemy's attack with a critical firearm hit.",
                            children: [{
                                name: '?', ap: '',
                                description: "",
                                children: [{
                                    name: '?', ap: '',
                                    description: "",
                                    children: [],
                                }],
                            }, {
                                name: 'First Shot', ap: 12,
                                description: "Gain first strike with a firearm. Adds to tech bar.",
                                children: [],
                            }, {
                                name: 'Scintilla', ap: 10,
                                description: "Make an enemy flinch with a firearm attack after dodging",
                                children: [{
                                    name: '?', ap: '',
                                    description: "",
                                    children: [{
                                        name: '?', ap: '',
                                        description: "",
                                        children: [],
                                    }],
                                }, {
                                    name: '?', ap: '',
                                    description: "",
                                    children: [],
                                }],
                            }],
                        }
                    ],
                }
            ],
        },
    ];

    function getAscensionMarkup(skill, template) {
        var skillMarkup = template.clone();

        var skillName = skillMarkup.find('h4');
        var skillAp = skillName.find('small');
        var skillDescription = skillMarkup.find('p');
        var skillChildren = skillMarkup.find('ul');

        skillAp.text(skill.ap + ' AP');
        skillName.html(skill.name + ' ' + skillAp[0].outerHTML);
        skillDescription.text(skill.description);

        skill.children.forEach(function(skillChild) {
            skillChildren.append(getAscensionMarkup(skillChild, template));
        });

        return skillMarkup;
    }

    characters.forEach(function(character) {
        var characterMarkup = characterTemplate.clone().show();
        var characterAscension = characterMarkup.find('ul.ascension');
        var ascensionTemplate = characterAscension.find('li:first');

        characterMarkup.find('h1').text(character.name);

        character.skills.forEach(function(skill) {
            characterAscension.append(getAscensionMarkup(skill, ascensionTemplate));
        });
        
        characterAscension.find('li:first').remove();

        charactersTemplate.append(characterMarkup);
    });
});
