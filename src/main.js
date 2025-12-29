import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the  prefix

kaplay({
    width: 1280,
    height: 720,
});



loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("sixUpgrade", "sprites/sixupgrade.png");
loadSprite("annoyingKid", "sprites/annoyingkid.png"); //tihami
loadSprite("sixSeven", "sprites/sixseven.png");
loadSprite("maxVerstappen", "sprites/maxverstappen.png");
loadSprite("tralaleroTralala", "sprites/tralalero_tralala.png");
loadSprite("annoyingKid2", "sprites/annoyingkid2.png"); //albert
loadSprite("910seal", "sprites/9_10_seal.png");
loadSprite("67lebron", "sprites/67lebron.png");

scene ("game", () => {
    var score = 0;

    function newUpgrade(upgradeName, upgradeCost, numberOfUpgrades, upgradeScoreBoost, upgradeX, upgradeY) {
        const upgrade = add([
            sprite(upgradeName),
            pos(upgradeX, upgradeY),
            scale(0.14),
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
                size: 24,
            }),
            pos(upgradeX, upgradeY + 95),
            anchor("center"),
            color(0, 0, 0),
        ]) //upgrade text
    
    }

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
    }) //opacity for the onscreen upgrade indicating whether or not buying a new one is possible

    onClick(() => {
        score += 6.7 * numberOfLebron;
    })

    add([
        text("+6.7 per click", {
            size: 24,
        }),
        anchor("center"),
        area(),
        pos(160, 645),
        color(0, 0, 0),
    ])

    add([
        text("price:" + lebronCost, {
            size: 24,
        }),
        anchor("center"),
        area(),
        pos(160, 675),
        color(0, 0, 0),
    ])

    const scoreText = add([
        text("", {
            size: 48,
        }), 
        color(0,0,0),
        pos(640, 600),
        anchor("center"),
        "scoreText"
    ])

    const sixSeven = add([
        sprite("sixSeven"),
        scale(0.25),
        anchor("center"),
        area(),
        pos(center()),
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
        sixSeven.tween(vec2(0.3, 0.3), vec2(0.25, 0.25), 1, (value) => (sixSeven.scale = value), easings.easeOutElastic);
    })

    newUpgrade("sixUpgrade", 6, 0, 0.167, 150, 100);
    newUpgrade("annoyingKid", 7, 0, 0.67, 350, 100);
    newUpgrade("maxVerstappen", 16, 0, 0.67, 550, 100);
    newUpgrade("tralaleroTralala", 67, 0, 67, 750, 100);
    newUpgrade("910seal", 910, 0, 21, 950, 100);
    newUpgrade("annoyingKid2", 1738, 0, 167, 1150, 100);

})

go("game");