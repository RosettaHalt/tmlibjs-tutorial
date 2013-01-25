/*
 シーンのクラス化です
 毎回クラスを保持せずにシーンの切替時に新しく生成
 tm.createClass
 */

tm.main(function(){
    app = tm.app.CanvasApp("#world");
    app.background = "black";
    // app.enableStats();
    app.fitWindow();

    // シーンの切り替え
    app.replaceScene(TitleScene());

    app.run();
});

// タイトルシーン
(function(ns){
    // タイトルシーンクラスの定義
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,    // tm.app.Sceneを継承

        // 初期化(コンストラクタ)
        init: function(){
            this.superInit();
        },

        // 更新
        update: function(){
            console.log("title");
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(MainScene());
            }
        }
    });
})(window);

// メインシーン
(function(ns){
    // メインシーンクラスの定義
    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,    // tm.app.Sceneを継承

        // 初期化(コンストラクタ)
        init: function(){
            this.superInit();
        },

        // 更新
        update: function(){
            console.log("main");
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(TitleScene());
            }
        }
    });
})(window);
