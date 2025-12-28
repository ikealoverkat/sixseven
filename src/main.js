import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the  prefix

kaplay({
    width: 1280,
    height: 720,
});



loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("sixUpgrade", "sprites/sixupgrade.png");
loadSprite("annoyingKid", "sprites/annoyingkid.png");

scene ("game", () => {
    var score = 0;
    
    function newUpgrade(upgradeName, upgradeCost, numberOfUpgrades, upgradeScoreBoost, upgradeX, upgradeY) {
        const upgrade = add([
            sprite(upgradeName),
            pos(upgradeX, upgradeY),
            scale(0.2),
            opacity(1),
            area(),
            anchor("center"),
            upgradeName,
        ]) //add the new upgrade onscreen
        
        onClick(upgradeName, () => {
            if (score >= upgradeCost) {
                score = score - upgradeCost;
                numberOfUpgrades++;
                upgradeCost += upgradeCost;
            }
        }) //buy a new upgrade on click

        onUpdate (() => {
            if (score < upgradeCost) {
                upgrade.opacity = 0.5;
            } else {
                upgrade.opacity = 1;
            }
        }) //opacity for the onscreen upgrade indicating whether or not buying a new one is possible

        loop(1, () => {
            score += numberOfUpgrades * upgradeScoreBoost;
        }) //increase score every second
    }

    const scoreText = add([
        text("", {
            size: 48,
        }), 
        color(0,0,0),
        pos(center()),
        anchor("center"),
        "scoreText"
    ])
    onUpdate(() => {
        scoreText.text = score.toFixed(4).replace(/\.?0+$/, "");
    })
    
    var scoreIncreaseAmount = 1;
    
    onClick(() => {
        score += scoreIncreaseAmount;
    })

    newUpgrade("sixUpgrade", 6, 0, 0.167, 150, 120);
    newUpgrade("annoyingKid", 7, 0, 0.67, 430, 120);

})

go("game");