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

    // 背景を作成
    bg = new createjs.Shape();
    let bgImg = loader.getResult("background");
    bg.graphics.beginBitmapFill(bgImg).drawRect(0, 0, bgImg.width, bgImg.height);
    bg.scaleX = WINDOW_W / bgImg.width;
    bg.scaleY = WINDOW_H / bgImg.height;
    canvas.addChildAt(bg, 0);

    // キャラクターの立ち絵を作成
    // 男性キャラクター
    man = new createjs.Shape();
    let man_img = loader.getResult("man");
    man.graphics.beginBitmapFill(man_img).drawRect(0, 0, man_img.width, man_img.height);

    // 女性キャラクター
    woman = new createjs.Shape();
    let woman_img = loader.getResult("woman");
    woman.graphics.beginBitmapFill(woman_img).drawRect(0, 0, woman_img.width, woman_img.height);

    // キャラクターの立ち絵のサイズを1/2倍にする
    man.scaleX = 1/2;
    man.scaleY = 1/2;
    woman.scaleX = 1/2;
    woman.scaleY = 1/2;
    
    // キャラクターの立ち絵の左右を設定
    man.x = WINDOW_W / 4 - (man_img.width * man.scaleX) / 2; // 左から1/4の位置
    man.y = WINDOW_H / 5;
    woman.x = 3 * WINDOW_W / 4 - (woman_img.width * woman.scaleX) / 2; // 右から1/4の位置
    woman.y = WINDOW_H / 5;

    // メッセージボックスを作成
    message_box = new createjs.Shape();
    message_box.graphics.beginFill("black").drawRect(0, 0, WINDOW_W, WINDOW_H / 3);
    message_box.alpha = 0.5;
    message_box.y = 3 * WINDOW_H / 4.5;

    initTitle();

    // tickイベントの登録
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function initTitle() 
{
    // タイトル
    titleText = new createjs.Text("Novel Game", "40px sans-serif", "white");
    titleText.x = WINDOW_W / 2 - titleText.getMeasuredWidth() / 2;
    titleText.y = 50;
    canvas.addChild(titleText);
}
