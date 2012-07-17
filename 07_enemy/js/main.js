/*
 エネミーの生成
 enemyGroup
 this.rotation
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
        c.width = c.height = 40;
        c.setTransformCenter();
        c.setLineStyle(2, "round", "round");
        c.setColorStyle("white", "rgba(200, 200, 200, 0.9)");
        c.fillPolygon(0, 0, 20, 3, 270);
        c.strokePolygon(0, 0, 20, 3, 270);
    
        return c;
    })();
    
    // エネミーのイメージ
    var enemyImage = (function(){
        var c = tm.graphics.Canvas();
        c.width = c.height = 40;
        c.setTransformCenter();
        c.setLineStyle(1.5, "round", "round");
        c.setColorStyle("white", "rgb(255, 50, 50)");
        c.fillStar(0, 0, 20, 16, 0.6);
        c.strokeStar(0, 0, 20, 16, 0.6);
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
            
            // 敵用グループ
            this.enemyGroup  = null;
            this.enemyGroup = tm.app.CanvasElement();
            this.addChild(this.enemyGroup);
            this.enemyGroup.update = function(app) {
                if (app.frame % 30 == 0) {
                    var enemy = Enemy(enemyImage);
                    enemy.position.set(Math.rand(40, app.height-40), -20);

                    // enemyGroupにenemyを追加
                    this.addChild( enemy );
                }
            }
        },

        update: function(){
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(TitleScene());
            }
        }
    });
})(window);

/*
 * プレイヤークラス
 */
var Player = tm.createClass({
    superClass: tm.app.Sprite,

    init: function(img){
        this.superInit(40, 40, img);
        this.speed = 0;
        this.velocity = tm.geom.Vector2(0, 0);
    },

    update: function(){
        var angle = app.keyboard.getKeyAngle();
        if(angle != null){
            this.velocity.setDegree( angle, 1 );
            this.velocity.y *= -1;
            this.speed = 10;
        }

        // 移動
        this.position.add( tm.geom.Vector2.mul(this.velocity, this.speed) );

        // 摩擦
        this.speed *= 0.7;
    }
});

/*
 * エネミークラス
 */
var Enemy = tm.createClass({
    superClass: tm.app.Sprite,

    init: function(img) {
        this.superInit(40, 40, img);
    },

    update: function() {
        this.y += 4;
        this.rotation -= 4; // 回転
        
        // 画面外に出たら this.remove(); で自分を削除
        if (this.y > app.height+40) { this.remove(); }
    }

});