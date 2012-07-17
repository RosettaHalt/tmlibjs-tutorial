/*
 プレイヤーの生成
 tm.graphics.Canvas();
 app.keyboard.getKeyDown
 app.keyboard.getKeyAngle
 tm.geom.Vector2
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

    app.replaceScene(MainScene());  // 毎回タイトルシーンを経由するのはめんどうなので最初からメインシーンへ

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
            
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                if(this.sprite.isHitPoint(app.pointing.x, app.pointing.y)){
                    console.log("Hit");
                    app.replaceScene(MainScene());
                }
            }
        }
    });
})(window);

// メインシーン
(function(ns){

    // プレイヤーのイメージ
    var playerImage = (function(){
        var c = tm.graphics.Canvas();
        c.width = c.height = 40;    // サイズをセット
        c.setTransformCenter(); // 座標を中心にセット
        c.setLineStyle(2, "round", "round");    // ラインの描画スタイルをセット
        c.setColorStyle("white", "rgba(200, 200, 200, 0.9)");   // 色をセット
        c.fillPolygon(0, 0, 20, 3, 270);    // n角形の塗り潰し描画
        c.strokePolygon(0, 0, 20, 3, 270);  // ラインの描画
    
        return c;
    })();

    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // 自機
            var player = Player(playerImage);
            player.position.set( app.width/2, 600 );
            this.addChild(player);
        },

        update: function(){
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(TitleScene());
            }
        
            if( app.keyboard.getKeyDown("A") ){
                console.log("Aキーを押したよ！");
            }
            else if( app.keyboard.getKeyUp("A") ){
                console.log("Aキーを離したよ！");
            }
            if( app.keyboard.getKey("A") ){
                console.log("Aキーを押してるよ！");
            }
        }
    });
})(window);

/*
 * プレイヤークラス
 */
var Player = tm.createClass({
    superClass: tm.app.Sprite,  // tm.app.Spriteを継承

    init: function(img){
        this.superInit(40, 40, img);    // tm.app.Spriteを継承している場合はイメージを引数で渡せる
        this.speed = 0;
        this.velocity = tm.geom.Vector2(0, 0);  // ベクトルをセット
    },

    update: function(){
        var angle = app.keyboard.getKeyAngle(); // キーの方向を角度で取得
        if(angle != null){
            this.velocity.setDegree( angle, 1 );    // this.velocity.x と this.velocity.y に度をセット。 
            this.velocity.y *= -1;
            this.speed = 10;

/*
            switch(angle){
                case 0:
                    console.log("右");
                    break;
                case 45:
                    console.log("右上");
                    break;
                case 90:
                    console.log("上");
                    break;
                case 135:
                    console.log("左上");
                    break;
                case 180:
                    console.log("左");
                    break;
                case 225:
                    console.log("左下");
                    break;
                case 270:
                    console.log("下");
                    break;
                case 315:
                    console.log("右下");
                    break;
                default :
                    break;
            }
*/

        }

        // 移動
        // 移動した方向と速度を渡し、移動量(vx, vy)を受け取る
        // 受け取った移動量をposition(x, y)に足す。
        this.position.add( tm.geom.Vector2.mul(this.velocity, this.speed) );

        // 摩擦
        this.speed *= 0.7;
    }
});