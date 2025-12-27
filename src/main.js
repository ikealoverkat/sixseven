import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the  prefix

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("bean", "sprites/bean.png");

scene ("game", () => {
    var score = 0;
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
        scoreText.text = score.toString();
    })
    var scoreIncreaseAmount = 1;
    onClick(() => {
        score += scoreIncreaseAmount;
    })
    add([
        
    ])
})

go("game");