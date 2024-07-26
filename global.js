// 画面サイズ
const WINDOW_W = 960;
const WINDOW_H = 540;

// 画面構成に関する変数
let canvas; // キャンバス

// ゲームロジックに関する変数
let scene_id;  // シーンID
let frame_cnt; // フレーム番号

let titleText;  // タイトル
let bg; // 背景
let man; // 男性キャラクター
let woman; // 女性キャラクター

let message_box; // メッセージボックス

// 入力に関する変数
let isPressSpace = false;
let isPressEnter = false;

let loader;