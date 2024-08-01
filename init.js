// 読み込みが終わってから初期化
//window.addEventListener("load", init);

let manifest = [
    { src: "image/background.jpg", id: "background" },
    { src: "image/man.png", id: "man" }, 
    { src: "image/woman.png", id: "woman"},
]

loader = new createjs.LoadQueue(true);
loader.installPlugin(createjs.Sound);
loader.addEventListener("complete", init);
loader.loadManifest(manifest, true, "./");

function init() {

    // canvasを取得
    canvas = new createjs.Stage("myCanvas");

    scene_id = 0;
    frame_cnt = 0;

    currentTextIndex = 0;
    displayingText = false;

    // 背景を作成
    bg = new createjs.Shape();
    let bgImg = loader.getResult("background");
    bg.graphics.beginBitmapFill(bgImg).drawRect(0, 0, bgImg.width, bgImg.height);
    bg.scaleX = WINDOW_W / bgImg.width;
    bg.scaleY = WINDOW_H / bgImg.height;
    canvas.addChildAt(bg, 0);

    // キャラクターの立ち絵を作成
    displayCharacter("man", WINDOW_W / 4, WINDOW_H / 5);
    displayCharacter("woman", 3 * WINDOW_W / 4, WINDOW_H / 5);

    // メッセージボックスを作成
    message_box = createMessageBox();
    canvas.addChild(message_box);



    initTitle();
    textParts = sampleTexts.split('\n').filter(text => text.trim().length > 0);
    
    initRevealTextMessage(canvas, textParts[currentTextIndex]);

    // tickイベントの登録
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

    // 画面上のクリックイベントを登録する
    canvas.addEventListener("click", handleCanvasClick);
}

function initTitle() 
{
    // タイトル
    titleText = new createjs.Text("Novel Game", "40px sans-serif", "white");
    titleText.x = WINDOW_W / 2 - titleText.getMeasuredWidth() / 2;
    titleText.y = 50;
    canvas.addChild(titleText);
}
