/*
 初期化です。
 app.enableStats();
 app.fitWindow();
 */

// tmlib.jsのメイン処理
tm.main(function(){
    // CanvasへのID
    app = tm.app.CanvasApp("#world");

    // 背景の色
    app.background = "black";

    // FPS表示
    app.enableStats();

    // 表示領域をブラウザのサイズに合わせる
    app.fitWindow();

    // 実行
    app.run();
});

/*
もくじ
01: 初期化
02: シーン
03: シーンクラス化
04: 画像の読み込み表示/移動
05: 当たり判定/タッチ
06: 自機の生成/キーイベント
07: 敵の生成
08: 自機と敵の当たり判定
09: 弾の実装
10: ラベル / スコア(DataManager)
11: ラベルのUI化
12: ポーズの実装
13: サウンドの追加
14: ツイート
Ex: フェード / iPhoneでの操作対応 / 爆発演出 / クラス内に独自の関数
Tips:

宿題1: タイムの実装、敵が弾を撃つように変更、残機、弾のパワーアップ
宿題2: ファイル分け
*/
