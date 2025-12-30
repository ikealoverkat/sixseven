import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the  prefix

kaplay({
    width: 1280,
    height: 720,
    background: [255, 255, 255],
});



loadRoot("./"); // A good idea for Itch.io publishing later

loadSprite("67logo", "sprites/67logo.png");
loadFont("nat29", "sprites/Handwritten_Nat29_Font.ttf");
const darkpurple = [64, 28, 101]
loadSprite("67popup", "sprites/67popup.png");
loadSprite("textbox", "sprites/textbox.png");

loadSprite("sixUpgrade", "sprites/sixupgrade.png");
loadSprite("annoyingKid", "sprites/annoyingkid.png"); //tihami
loadSprite("sixSeven", "sprites/sixseven.png");
loadSprite("maxVerstappen", "sprites/maxverstappen.png");
loadSprite("tralaleroTralala", "sprites/tralalero_tralala.png");
loadSprite("annoyingKid2", "sprites/annoyingkid2.png"); //albert
loadSprite("910seal", "sprites/9_10_seal.png");
loadSprite("67lebron", "sprites/67lebron.png");
loadSprite("67background", "sprites/67background2.png");
loadSprite("sixSevenKid1", "sprites/sixsevenkid1.webp");
loadSprite("sixSevenKid2", "sprites/sixsevenkid2.jpg");
loadSprite("sixSevenKid3", "sprites/sixsevenkid3.jpg");
loadSprite("feedCreatureSprite", "sprites/feedcreature.png");
loadSprite("feedCreatureDisgustSprite", "sprites/feedcreature_disgust.png");

loadSound("diddyblud", "sounds/diddyblud.mp3");
loadSound("pop", "sounds/pop.mp3");
loadSound("maxverstappensound", "sounds/maxverstappensound.mp3");
loadSound("nineplusten", "sounds/nineplusten.mp3");
loadSound("sixsevensound", "sounds/sixsevensound.mp3");
loadSound("tralalerosound", "sounds/tralalerotralala.mp3");
loadSound("vineboom", "sounds/vineboom.mp3");
loadSound("1738", "sounds/1738.mp3");
loadMusic("brainrotpiano", "sounds/brainrotpiano.mp3");

layers(["bg", "spawns", "obj"], "obj")

const music = play("brainrotpiano", {
        paused: false,
    });

scene("menu", () => {
    add([
        sprite("67background", {
            tiled: true,
            width: width(),
            height: height(),
        }),
        pos(0,0),
        opacity(0.67),
    ])

    const logo = add([
        sprite("67logo"),
        scale(0.5),
        pos(640, 300),
        anchor("center"),
        area(),
        animate(),
        timer(),
        "logo"
    ])

    const gameStartText = add([
        text("click me to start game", {
            size: 72,
            font: "nat29",
        }),
        pos(620, 575),
        anchor("center"),
        area(),
        rotate(0),
        color(64, 28, 101), //dark purple color of the logo
        "gameStartText"
    ])

    logo.animate("angle", [-2.5, 2.5], { duration: 1.5, loop: true, direction: "ping-pong", easing: easings.easeInOutSine});
    
    var randomPosX;
    var randomPosY;

    onUpdate(() => {
        randomPosX = randi(41, 1067);
        randomPosY = randi(21, 670);
    })

    logo.onClick(() => {
        logo.tween(vec2(0.55, 0.55), vec2(0.5, 0.5), 1, (value) => (logo.scale = value), easings.easeOutElastic); //play nice animation
        play("pop");
        const sixsevenpopup = add([
            sprite("67popup"),
            scale(0.1),
            pos(randomPosX, randomPosY),
            opacity(1),
            anchor("center"),
            timer(),
            lifespan(0.5, {
                fade: 0.5,
            })
        ])
        sixsevenpopup.tween(vec2(0.12, 0.12), vec2(0.1, 0.1), 0.5, (value) => (sixsevenpopup.scale = value), easings.easeOutElastic);
    })

    gameStartText.onClick(() => {
        play("sixsevensound");
        go("game");
    })
})

    var score = 6767;
    let totalUpgradeScoreBoost = 0;

    let hasSixSeven;
    let wobbling = false;
    let wobbleTime = 0;

scene ("game", () => {
    music.paused = true;


    onUpdate(() => {
        let scoreString = score.toFixed();
        hasSixSeven = scoreString.includes("67")
        
        if (hasSixSeven == true) {
            wobbling = true;
        } else {
            wobbling = false;
            wobbleTime = 0;
            setCamRot(0);
            setCamScale(1);
        }

        if (wobbling) {
            wobbleTime += dt();
            setCamRot(Math.sin(wobbleTime*6) * 6);
            // setCamScale(Math.sin(wobbleTime*6)*0. + 1);
        }

        // if (hasSixSeven == true && tweenPlaying == false) {
        //     tweenPlaying = true;

        //     tween(
        //         camRot(), -6, 0.5, 
        //         (value) => camRot(value)
        //     )
        //     .then(() => {
        //         debug.log("wsg");
        //         return tween(
        //             camRot(), 70, 0.5,
        //             (value) => camRot(value))
        //         })
        //     .then(() => { 
        //         debug.log("yo");
        //         return tween(
        //             camRot(), 0, 0.5,
        //             (value) => camRot(value))
        //         })
        //     .then(() => { 
        //         tweenPlaying = false;
        //     })
        // }
    }) //67 wobble code

    let randomSixSevenKidNumber;
    let randomSixSevenKid;

    onUpdate(() => {
        randomSixSevenKidNumber = randi(0, 3); 
    })

    onKeyPressRepeat("6", () => {
        if (randomSixSevenKidNumber == 0) {
            randomSixSevenKid = "sixSevenKid1"
        } else if (randomSixSevenKidNumber == 1) {
            randomSixSevenKid = "sixSevenKid2"
        } else if (randomSixSevenKidNumber == 2) {
            randomSixSevenKid = "sixSevenKid3"
        }
        sixseventextbox.opacity = 0;
        sixseventext.opacity = 0;

        add([
            sprite(randomSixSevenKid),
            scale(2),
            anchor("center"),
            pos(center()),
            opacity(1),
            lifespan(0, {
                fade: 0.5
            })
        ])

        play("sixsevensound");
    })

    onKeyPressRepeat("7", () => {
        if (randomSixSevenKidNumber == 0) {
            randomSixSevenKid = "sixSevenKid1"
        } else if (randomSixSevenKidNumber == 1) {
            randomSixSevenKid = "sixSevenKid2"
        } else if (randomSixSevenKidNumber == 2) {
            randomSixSevenKid = "sixSevenKid3"
        }

        add([
            sprite(randomSixSevenKid),
            scale(2),
            anchor("center"),
            pos(center()),
            opacity(1),
            lifespan(0, {
                fade: 0.5
            })
        ])
        play("sixsevensound");
    })
    //6 7 kid jumpscares


    function newUpgrade(upgradeName, upgradeCost, numberOfUpgrades, upgradeScoreBoost, upgradeX, upgradeY, spawnSound) {
        const upgrade = add([
            sprite(upgradeName),
            pos(upgradeX, upgradeY),
            scale(0.12),
            opacity(1),
            area(),
            timer(),
            animate(),
            anchor("center"),
            upgradeName,
        ]) //add the new upgrade onscreen
        

        onClick(upgradeName, () => {
            if (score >= upgradeCost) {
                score = score - upgradeCost;
                numberOfUpgrades++;
                upgradeCost += upgradeCost;
                upgrade.tween(vec2(0.16, 0.16), vec2(0.14, 0.14), 0.5, (value) => (upgrade.scale = value), easings.easeOutBounce); //play nice animation
                const upgradeSpawn = add([
                    sprite(upgradeName),
                    pos(randi(41, 1067), 675),
                    anchor("center"),
                    area(),
                    timer(),
                    animate(),
                    scale(0.085),
                    "upgradeSpawn",
                    layer("spawns"),
                ])
                play(spawnSound);
                totalUpgradeScoreBoost += upgradeScoreBoost;
                upgradeSpawn.tween(650, 675, 0.5, (value) => (upgradeSpawn.pos.y = value), easings.easeOutBounce);
                loop(1, () => {
                    upgradeSpawn.tween(675, 655, 0.3, (value) => (upgradeSpawn.pos.y = value), easings.easeOutCirc).then(() => { upgradeSpawn.tween(655, 675, 0.25, (value) => (upgradeSpawn.pos.y = value), easings.easeInCirc)})
                    play("pop", {
                        volume: 0.1
                    });
                })
            }        
        }) //buy a new upgrade on click

        onUpdate (() => {
            upgradeText.text = "price:" + upgradeCost.toFixed();
            upgradeBoostAmountText.text = "+ " + upgradeScoreBoost.toString() + " per second";
            if (score < upgradeCost) {
                upgrade.opacity = 0.5;
            } else {
                upgrade.opacity = 1;
            }
        }) //opacity for the onscreen upgrade indicating whether or not buying a new one is possible

        loop(1, () => {
            score += numberOfUpgrades * upgradeScoreBoost;
            // upgradeSpawn.tween(675, 675, 0.5, (value) => (upgradeSpawn.pos.y = value), easings.easeOutBounce);
        }) //increase score every second
        
        const upgradeText = add([
            text(" ", {
                size: 30,
                font: "nat29",
            }),
            pos(upgradeX, upgradeY + 145),
            anchor("center"),
            color(64, 28, 101)
        ]) //upgrade text

        const upgradeBoostAmountText = add([
            text(" ", {
                size: 36,
                width: 150,
                lineSpacing: -15,
                align: "center",
                font: "nat29",
            }),
            pos(upgradeX, upgradeY + 105),
            anchor("center"),
            color(64, 28, 101)
        ]) //score boost text
    
    }

    add([
        sprite("67background", {
            tiled: true,
            width: width(),
            height: height(),
        }),
        pos(0,0),
        opacity(0.4),
        layer("bg"),
    ])

    let hasLebron = false; 

    function addLebron() {
        const lebron = add([
            sprite("67lebron"),
            scale(0.75),
            anchor("center"),
            area(),
            pos(160, 520),
            opacity(1),
            timer(),
            animate(),
        ])

        var numberOfLebron = 0;
        var lebronCost = 6767;
        var lebronScoreBoost = 67;

        lebron.onClick(() => {
            if (score >= lebronCost) {
                score = score - lebronCost;
                numberOfLebron++;
                hasLebron = true;
                lebronCost += lebronCost;
                play("sixsevensound");
                lebron.tween(vec2(0.78, 0.78), vec2(0.75, 0.75), 0.5, (value) => (lebron.scale = value), easings.easeOutBounce); //play nice animation
            }        
        }) //buy a new lebron on click

        onUpdate (() => {
            lebronPriceText.text = "price:" + lebronCost.toString();
            if (score < lebronCost) {
                lebron.opacity = 0.5;
            } else {
                lebron.opacity = 1;
            }
        }) //opacity for the onscreen upgrade indicating whether or not buying a new lebron is possible
        
        add([
            text("+" + lebronScoreBoost + " per click", {
                size: 48,
                font: "nat29",
            }),
            anchor("center"),
            area(),
            pos(160, 645),
            color(64, 28, 101),
        ])

        const lebronPriceText = add([
            text("", {
                size: 36,
                font: "nat29",
            }),
            anchor("center"),
            area(),
            pos(160, 675),
            color(64, 28, 101),
        ])

        function lebronParticleMaker(posX, posY) {
            const lebronParticles = add([
                pos(posX, posY),
                scale(0.4),
                particles({
                    max: 6 * numberOfLebron,
                    speed: [600, 700],
                    lifeTime: [1, 1.5],
                    opacities: [1.0, 0.0],
                    texture: getSprite("67lebron").data.tex,
                    quads: [getSprite("67lebron").data.frames[0]],
                    angularVelocity: [0, 100],
                    damping: [0, 10],
                    acceleration: [vec2(100), vec2(0, -100)],
                }, {
                    rate: 5,
                    direction: 90,
                    spread: 50,
                    lifetime: 0.5,
                }),
            ]);

            lebronParticles.emit(numberOfLebron);
        }

        onMousePress(() => {
            score += lebronScoreBoost * numberOfLebron;
            lebronParticleMaker(mousePos().x, mousePos().y);
        })
    }
    addLebron();

    if (hasLebron == true) {
        //add player character
        //make sixSeven draggable
        //drag the sixSeven to the player
        //unlock portal to 41 level
    }

    const scoreText = add([
        text("", {
            size: 150,
            font: "nat29",
        }), 
        color(64, 28, 101),
        pos(860, 420),
        anchor("center"),
        "scoreText"
    ])

    const perSecondText = add([
        text("", {
            size: 64,
            font: "nat29",
            width: 400,
        }),
        color(darkpurple),
        pos(880, 500),
        anchor("center"),
        "perSecondText"
    ])

    onUpdate(() => {
        scoreText.text = score.toFixed();
        perSecondText.text = totalUpgradeScoreBoost.toFixed(3).replace(/\.?0+$/, "") + " per second";
        
        perSecondText.pos = vec2(scoreText.pos.x + perSecondText.text.length * 3, scoreText.pos.y + 100);
        
        sixSeven.animate("angle", [0, 360], { 
            duration: 67,
            direction: "forward",
            loop: true,
        });
    })
    
    //draggable obj code
    let curDragging = null;
    function drag() {
        let offset = vec2(0); //dist between object pos and mouse pos
        return {
            id: "drag",
            require: ["pos", "area"],
            pick() {
                curDragging = this;
                offset = mousePos().sub(this.pos);
                this.trigger("drag");
            },
            update() {
                if (curDragging == this) {
                    this.pos = mousePos().sub(offset);
                    this.trigger("dragUpdate")
                }
            },
            onDrag(action) {
                return this.on("drag", action);
            },
            onDragUpdate(action) {
                return this.on("dragUpdate", action); 
            },
            onDragEnd(action) {
                return this.on("dragEnd", action)
            }
        }
    }
    onMousePress(() => { //check if an object is picked
        if (curDragging) {
            return;
        }
        //for all draggable objects
        for (const obj of get("drag").reverse()) {
            if (obj.isHovering()) {
                obj.pick();
                break;
            }
        }
    })

    onMouseRelease(() => {
        if (curDragging) {
            curDragging.trigger("dragEnd");
            curDragging = null;
        }
    })
    //drag code end

    onUpdate(() => setCursor("default")); 


    const sixSevenScale = 0.22;
    var sixSeven = add([
        sprite("67popup"),
        scale(sixSevenScale),
        anchor("center"),
        area(),
        pos(500, 410),
        rotate(0),
        timer(),
        animate(),
        "sixSeven"
    ])

    let eatingSixSeven = false;

    onUpdate(() => {
            if (hasLebron && !eatingSixSeven) {
            destroyAll("sixSeven");
            sixSeven = add([
                sprite("67popup"),
                scale(sixSevenScale),
                anchor("center"),
                area(),
                pos(500, 410),
                rotate(0),
                timer(),
                animate(),                
                drag(),
                "sixSeven"
            ])
            eatingSixSeven = true;    
            sixSeven.onDrag(() => {
                readd(sixSeven);
            })
            const feedCreature = add([
                sprite("feedCreatureSprite"),
                anchor("bot"),
                area(),
                pos(1050, 720),
                timer(),
                animate(),
            ])
            feedCreature.tween(vec2(feedCreature.pos.x, feedCreature.pos.y + feedCreature.height/7), vec2(feedCreature.pos.x, feedCreature.pos.y), 1.5, (v) => (feedCreature.pos = v), easings.easeOutElastic);
            const feedCreatureCaption = add([
                text("click me vvv", {
                    font: "nat29",
                    size: 48,
                    align: center,
                }),
                pos(feedCreature.pos.x, feedCreature.pos.y - 280),
                anchor("center"),
                opacity(),
                timer(),
                animate(),
                color(darkpurple),
            ])
            feedCreature.onClick(() => {
                feedCreatureCaption.tween(1, 0, 1, (v) => (feedCreatureCaption.opacity = v));
                addDialogue();
            })
        }
    })

    function addDialogue() {
        const characters = {
            "you": {
                "sprite": null,
                "name": "you",
                "sound": "playerVoice",
            },
            "feedCreature": {
                "sprite": "feedCreatureSprite",
                "name": "Creature",
                "sound": "creatureVoice",
            },
            "feedCreatureDisgust": {
                "sprite": "feedCreatureDisgustSprite",
                "name": "Creature",
                "sound": "creatureVoice",
            }            
        };
        //dialogue data: [character, text, effects, sfx]
        const dialogues = [
            ["feedCreatureDisgust", "feed me.", "shake"],
            ["you", "what the hell"],
            ["feedCreature", "what the helly..? wthelly? wthelliantte, wthellheon, wthelly berry...?", "wthelly"],
            ["you", "oh so ur brainrotted like the rest of this hell"],
            ["feedCreatureDisgust", "ts pmo icl sybau 😭 js feed me the 6 7 bro 😭✌️"],
            ["you", "???"],
            ["feedCreatureDisgust", "oh my gyat you dunce drag the 6 7 to me."],
            ["you", "damn dont talk to me like that you're literally a glutton 🥀"],
            ["feedCreature", "...", "shake", "ooo"],
        ];
        const effects = {
            "shake": () => {
                shake();
            }
        }
        const sounds = {
            "wthelly": () => {
                play(placeholderWthelly);
            },
            "ooo": () => {
                play(placeholderOOO);
            }
        };
        let curDialogue = 0;
        let isTalking = false;
        const feedTextbox = add([
            rect(width() - 250, 250, {radius: 6}),
            anchor("center"),
            pos(center().x, height() - 150),
            outline(6, darkpurple),
        ])
        const txt = add([
            text("", {
                size: 64,
                width: width() - 400,
                align: "center",
                color: Color.fromHex("#401c65"),
                transform: (index, character) => {
                    return {
                        opacity: index < txt.letterCount ? 1 : 0,
                    }
                },
            }),
            pos(feedTextbox.pos),
            anchor("center"),
            {
                letterCount: 0,
            }
        ]);
        const onscreenSprite = add([
            sprite("feedCreatureSpriteDisgust"),
            scale(3),
            anchor("center"),
            pos(480, 360)
        ])

        onMouseDown(() => {
            if (isTalking) return;
            curDialogue = (curDialogue + 1) % dialogues.length;
            updateDialogue();
        });

        function updateDialogue() {
            const [char, dialogue, eff] = dialogues[curDialogue];
            onscreenSprite.use(sprite(characters[char].sprite));
            startWriting(dialogue, char);
            if (eff) {
                effects[eff]();
            }
        }

        function startWriting(dialog, char) {
            isTalking = true;
            txt.letterCount = 0;
            txt.text = dialog;
            const textLength = txt.formattedText().renderedText.length; //total textlength it needs to type out

            const writing = loop(0.05, () => {
                txt.letterCount = Math.min(
                    txt.letterCount + 1,
                    textLength,
                );
                play(characters[char].sound, {
                    volume: 0.3,
                });
                if (txt.letterCount == textLength) {
                    isTalking = false;
                    writing.cancel();
                }
            })
        }

    };


    var scoreIncreaseAmount = 1;
    
    onClick(() => {
        score += scoreIncreaseAmount;
        sixSeven.tween(vec2(sixSevenScale + 0.04, sixSevenScale + 0.03), vec2(sixSevenScale, sixSevenScale), 1, (value) => (sixSeven.scale = value), easings.easeOutElastic);
    })

    const sixseventextbox = add([
        sprite("textbox"),
        anchor("center"),
        pos(1045, 550),
        area(),
    ])

    const sixseventext = add([
        text("pro tip: press 6 or 7 on your keyboard to see what happens!", {
            width: 300,
            font: "nat29",
            size: 48,
        }),
        anchor("center"),
        color(darkpurple),
        pos(1045, 550),
        area(),
        
    ])
    sixseventextbox.onClick(() => {
        sixseventextbox.opacity = 0;
        sixseventext.opacity = 0;
        play("pop");
    })

    sixseventext.onClick (() => {
        sixseventextbox.opacity = 0;
        sixseventext.opacity = 0;
    })

    newUpgrade("sixUpgrade", 6, 0, 0.167, 150, 80, "vineboom");
    newUpgrade("annoyingKid", 7, 0, 0.67, 350, 80, "diddyblud");
    newUpgrade("maxVerstappen", 16, 0, 3.3, 550, 80, "maxverstappensound");
    newUpgrade("tralaleroTralala", 67, 0, 16.7, 750, 80, "tralalerosound");
    newUpgrade("910seal", 910, 0, 21, 950, 80, "nineplusten");
    newUpgrade("annoyingKid2", 1738, 0, 167, 1150, 80, "1738");

})

go("menu");