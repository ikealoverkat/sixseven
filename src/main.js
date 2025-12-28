import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the  prefix

kaplay({
    width: 1280,
    height: 720,
});



loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("sixupgrade", "sprites/sixupgrade.png");
loadSprite("annoyingkid", "sprites/annoyingkid.png");

scene ("game", () => {
    var score = 0;
    var numberOfSixUpgrades = 0;
    var numberOfAnnoyingKidUpgrades = 0;

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
    const sixupgrade = add([
        sprite("sixupgrade"),
        pos(150, 120),
        scale(0.2),
        opacity(1),
        area(),
        anchor("center"),
        "sixupgrade",
    ])
    const annoyingkidupgrade = add([
        sprite("annoyingkid"),
        pos(430, 120),
        scale(0.2),
        opacity(1),
        area(),
        anchor("center"),
        "annoyingkidupgrade",
    ])

    onClick("sixupgrade", () => {
        if (score >= 6) {
            score = score - 6;
            numberOfSixUpgrades++;
        }
    })

    onClick("annoyingkidupgrade", () => {
        if (score >= 7) {
            score = score - 7;
            numberOfAnnoyingKidUpgrades++;
        }
    })

    loop(1, () => {
        score += numberOfSixUpgrades * 0.167;
        score += numberOfAnnoyingKidUpgrades * 0.67;
    })

    onUpdate (() => {
        // debug.log(score);
        if (score < 6) {
            sixupgrade.opacity = 0.5;
        } else {
            sixupgrade.opacity = 1;
        }
        if (score < 7) {
            annoyingkidupgrade.opacity = 0.5;
        } else {
            annoyingkidupgrade.opacity = 1;
        }
    })


})

go("game");