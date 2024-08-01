function initRevealTextMessage(canvas, text) {
    displayingText = true;
    const textContainer = new createjs.Container();
    textContainer.name = 'textContainer';
    canvas.addChild(textContainer);

    const chars = [];
    const maxWidth = WINDOW_W - 100; // テキストエリアの最大幅
    let line = 0;
    let currentLineWidth = 0;

    text.split("").forEach((char, i) => {
        let charText = new createjs.Text(char, "24px sans-serif", "#ffffff");
        charText.name = 'text';

        const charWidth = charText.getMeasuredWidth();
        if (currentLineWidth + charWidth > maxWidth) {
            line++;
            currentLineWidth = 0;
        }

        charText.x = 50 + currentLineWidth; // メッセージボックスの左端からの位置
        charText.y = 2 * WINDOW_H / 3 + 30 + (line * 30); // メッセージボックスの上端からの位置
        charText.alpha = 0;
        textContainer.addChild(charText);

        chars.push({
            charText,
            delayAfter: char === " " ? 0 : 60
        });

        currentLineWidth += charWidth;
    });

    revealTextMessage(chars);
}

function revealTextMessage(list) {
    if (list.length === 0) {
        displayingText = false;
        return;
    }

    const next = list.shift();
    createjs.Tween.get(next.charText)
        .to({ alpha: 1 }, 50)
        .call(() => {
            setTimeout(() => {
                revealTextMessage(list);
            }, next.delayAfter);
        });
}

function displayFullText() {
    const textContainer = canvas.getChildByName("textContainer");
    if (textContainer) {
        textContainer.children.forEach(child => {
            if (child.name === 'text') {
                createjs.Tween.removeTweens(child);
                child.alpha = 1;
            }
        });
    }
    displayingText = false;
}

let isClickProcessing = false;
function handleCanvasClick(event) {
    event.preventDefault();
    isClickProcessing = true;
    setTimeout(() => {
        isClickProcessing = false;
    }, 500); // 200msのデバウンス
    if (displayingText) {
        displayFullText();
    } else {
        currentTextIndex++;
        if (currentTextIndex < textParts.length) {
            clearText();
            initRevealTextMessage(canvas, textParts[currentTextIndex]);
        }
    }
}

function clearText() {
    const textContainer = canvas.getChildByName("textContainer");
    if (textContainer) {
        textContainer.removeAllChildren();
        canvas.removeChild(textContainer);
    }
}


// キャラクターを表示する
function displayCharacter(characterName, x, y) {
    let character_img = loader.getResult(characterName);
    let character = new createjs.Bitmap(character_img);
    character.scaleX = 0.5;
    character.scaleY = 0.5;
    character.x = x - (character_img.width * character.scaleX) / 2;
    character.y = y;
    canvas.addChild(character);
}

// メッセージボックスを作成する
function createMessageBox() {
    let box = new createjs.Shape();
    box.graphics.beginFill("black").drawRect(0, 0, WINDOW_W, WINDOW_H / 3);
    box.alpha = 0.5;
    box.y = 3 * WINDOW_H / 4.5;
    return box;
}
