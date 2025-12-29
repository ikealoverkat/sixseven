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
        go("game");
    })
})

layers(["obj", "spawns"], "obj")

scene ("game", () => {
    var score = 0;

    let hasSixSeven;
    let wobbling = false;
    let wobbleTime = 0;

    onUpdate(() => {
        let scoreString = score.toFixed(4);
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
        randomSixSevenKidNumber = randi(4); 
    })

    onKeyPressRepeat("6", () => {
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
    })
    //6 7 kid jumpscares

    function newUpgrade(upgradeName, upgradeCost, numberOfUpgrades, upgradeScoreBoost, upgradeX, upgradeY, upgradeSpawn) {
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
            }        
        }) //buy a new upgrade on click

        onUpdate (() => {
            upgradeText.text = "price:" + upgradeCost.toString();
            upgradeBoostAmountText.text = "+ " + upgradeScoreBoost.toString() + " per second";
            if (score < upgradeCost) {
                upgrade.opacity = 0.5;
            } else {
                upgrade.opacity = 1;
            }
        }) //opacity for the onscreen upgrade indicating whether or not buying a new one is possible

        loop(1, () => {
            score += numberOfUpgrades * upgradeScoreBoost;
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

    function addLebron() {
        add([
            sprite("67background", {
                tiled: true,
                width: width(),
                height: height(),
            }),
            pos(0,0),
            opacity(0.4),
        ])

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
                lebronCost += lebronCost;
                lebron.tween(vec2(0.78, 0.78), vec2(0.75, 0.75), 0.5, (value) => (lebron.scale = value), easings.easeOutBounce); //play nice animation
            }        
        }) //buy a new upgrade on click

        onUpdate (() => {
            // upgradeText.text = "price:" + lebronCost.toString();
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

        add([
            text("price:" + lebronCost, {
                size: 36,
                font: "nat29",
            }),
            anchor("center"),
            area(),
            pos(160, 675),
            color(64, 28, 101),
        ])

        onClick(() => {
            scoreIncreaseAmount += lebronScoreBoost * numberOfLebron;
        })
    }
    addLebron();

    const scoreText = add([
        text("", {
            size: 96,
            font: "nat29",
        }), 
        color(64, 28, 101),
        pos(640, 641),
        anchor("center"),
        "scoreText"
    ])

    const sixSevenScale = 0.22;
    const sixSeven = add([
        sprite("67popup"),
        scale(sixSevenScale),
        anchor("center"),
        area(),
        pos(640, 410),
        rotate(0),
        timer(),
        animate(),
    ])

    onUpdate(() => {
        scoreText.text = score.toFixed(4).replace(/\.?0+$/, "");
        sixSeven.animate("angle", [0, 360], { 
            duration: 67,
            direction: "forward",
            loop: true,
        });
    })
    
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
    })

    sixseventext.onClick (() => {
        sixseventextbox.opacity = 0;
        sixseventext.opacity = 0;
    })

    newUpgrade("sixUpgrade", 6, 0, 0.167, 150, 80);
    newUpgrade("annoyingKid", 7, 0, 0.67, 350, 80);
    newUpgrade("maxVerstappen", 16, 0, 3.3, 550, 80);
    newUpgrade("tralaleroTralala", 67, 0, 16.7, 750, 80);
    newUpgrade("910seal", 910, 0, 21, 950, 80);
    newUpgrade("annoyingKid2", 1738, 0, 167, 1150, 80);

})

go("game");