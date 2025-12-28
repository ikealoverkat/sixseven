import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the  prefix

kaplay({
    width: 1280,
    height: 720,
});



loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("sixUpgrade", "sprites/sixupgrade.png");
loadSprite("annoyingKid", "sprites/annoyingkid.png");
loadSprite("sixSeven", "sprites/sixseven.png");
loadSprite("maxVerstappen", "sprites/maxverstappen.png");
loadSprite("tralaleroTralala", "sprites/tralalero_tralala.png");

scene ("game", () => {
    var score = 0;

    function newUpgrade(upgradeName, upgradeCost, numberOfUpgrades, upgradeScoreBoost, upgradeX, upgradeY) {
        const upgrade = add([
            sprite(upgradeName),
            pos(upgradeX, upgradeY),
            scale(0.2),
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
                upgrade.tween(vec2(0.22, 0.22), vec2(0.2, 0.2), 0.5, (value) => (upgrade.scale = value), easings.easeOutBounce); //play nice animation
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
            pos(upgradeX, upgradeY + 120),
            anchor("center"),
            color(0, 0, 0),
        ]) //upgrade text
    
    }

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

    newUpgrade("sixUpgrade", 6, 0, 0.167, 150, 120);
    newUpgrade("annoyingKid", 7, 0, 0.67, 430, 120);
    newUpgrade("maxVerstappen", 16, 0, 0.67, 700, 120);
    newUpgrade("tralaleroTralala", 67, 67, 0.67, 1000, 120);

})

go("game");