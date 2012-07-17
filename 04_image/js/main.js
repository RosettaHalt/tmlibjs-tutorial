/*
 リソースの読み込み
 画像の表示
 tm.preload(function(){ });
 tm.graphics.TextureManager.add();
 tm.graphics.TextureManager.get();
 
 画像の移動
 反射させる
 app.width
 */

// リソースの読み込み
tm.preload(function(){
    tm.graphics.TextureManager.add("kenkyo", "img/kenkyo.jpg");
});

tm.main(function(){
    app = tm.app.CanvasApp("#world");
    app.background = "black";
    app.enableStats();
    app.fitWindow();

    app.replaceScene(TitleScene());

    app.run();
});

// タイトルシーン
(function(ns){
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // 画像の読み込み
            this.sprite = tm.app.Sprite(128, 128);  // 引数は幅と高さ(width, height)
            this.sprite.setImage(tm.graphics.TextureManager.get("kenkyo"));   // 画像を読み込む
            this.sprite.setPosition(240, 360);  // 位置(x, y)を格納
            this.sprite.speed = 5;  // 移動量を設定
            this.addChild(this.sprite); // 親要素(この場合はTitleSceneクラス)に追加
        },

        update: function(){
            this.sprite.x += this.sprite.speed;    // 画像を移動
             // 画面外に出ようとしたら進む方向を反対にする
            if(this.sprite.x < 0 || this.sprite.x > app.width){ this.sprite.speed *= -1; }

            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(MainScene());
            }
        }
    });
})(window);

// メインシーン
(function(ns){
    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();
        },

        update: function(){
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(TitleScene());
            }
        }
    });
})(window);