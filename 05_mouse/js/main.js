/*
 マウスとの判定
 Hitしたら反対方向へ
 isHitPoint();+
 app.pointing
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
            this.sprite = tm.app.Sprite(128, 128);
            this.sprite.setImage(tm.graphics.TextureManager.get("kenkyo"));
            this.sprite.setPosition(240, 360);
            this.sprite.speed = 5;
            this.addChild(this.sprite);
        },

        update: function(){
            this.sprite.x += this.sprite.speed;
            if(this.sprite.x < 0 || this.sprite.x > app.width){ this.sprite.speed *= -1; }

            // クリックなどの判定
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                console.log("クリック終了 or Zキー押したよ！ 位置は(" + "x: " + app.pointing.x + ", y: " + app.pointing.y + ")");
                // 画像とクリックの判定
                if(this.sprite.isHitPoint(app.pointing.x, app.pointing.y)){
                    console.log("Hit");
                    app.replaceScene(MainScene());
                }
            }
            else if( app.pointing.getPointingStart() ){
                console.log("クリック開始したよ！ 位置は(" + "x: " + app.pointing.x + ", y: " + app.pointing.y + ")");
            }

            if( app.pointing.getPointing() ){
                console.log("クリックしてるよ！");
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
