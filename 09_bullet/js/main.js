/*
 弾の実装
 bulletGroupをPlayer内に持つとbulletGroupの座標がPlayerとリンクしてしまう。
 */

// リソースの読み込み
tm.preload(function(){
    tm.graphics.TextureManager.add("kenkyo", "img/kenkyo.jpg");
});

tm.main(function(){
    app = tm.app.CanvasApp("#world");
    app.background = "black";
    // app.enableStats();
    app.fitWindow();

    app.replaceScene(TitleScene());  // 毎回タイトルシーンを経由するのはめんどうなので最初からメインシーンへ

    app.run();
});

// タイトルシーン
(function(ns){
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // 画像の読み込み
            this.sprite = tm.app.Sprite(128, 128, "kenkyo");
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

    // 弾のイメージ
    var bulletImage = (function(){
        var c = tm.graphics.Canvas();
        c.width = c.height = 10;
        c.setTransformCenter();
        c.setColorStyle("white", "white");
        c.fillCircle(0, 0, 5);

        return c;
    })();

    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // 自機
            this.player = Player(playerImage);
            this.player.position.set( app.width/2, 600 );
            this.addChild(this.player);

            // 敵用グループ
            this.enemyGroup = null;
            this.enemyGroup = tm.app.CanvasElement();
            this.addChild(this.enemyGroup);
            this.enemyGroup.update = function(app){
                if(app.frame % 30 == 0){
                    var enemy = Enemy(enemyImage);
                    enemy.position.set(Math.rand(40, app.height-40), -20);
                    this.addChild( enemy );
                }
            }

            // 弾の次弾発射までの待ち時間
            this.waitTimeBullet = 0;

            // 弾用グループ
            this.bulletGroup = null;
            this.bulletGroup = tm.app.CanvasElement();
            this.addChild(this.bulletGroup);
        },

        update: function(){
            // プレイヤーとエネミーの衝突判定
            for(var i = 0; i < this.enemyGroup.children.length; ++i){
                var enemy = this.enemyGroup.children[i];
                if(this.player.isHitElement(enemy) == true){
                    console.log("hit");
                    enemy.remove();
                }
                // エネミーと弾の判定
                for(var j = 0; j < this.bulletGroup.children.length; ++j){
                    var bullet = this.bulletGroup.children[j];
                    if(enemy.isHitElement(bullet) == true){
                        console.log("bullet hit");
                        enemy.remove();
                        bullet.remove();
                    }
                }
            }

            // ショット
            // Zキーとマウスを押している間ショットを発射する。
            // ただしwaitTimeBullet(次弾発射までの時間)が0以下の時
            if( (app.keyboard.getKey("Z") || app.pointing.getPointing() == true) && this.waitTimeBullet < 0){
                this.waitTimeBullet = 10;   // 次弾発射までの待ち時間をセット
                var bullet = Bullet(bulletImage);
                bullet.position.set(this.player.x, this.player.y-20);
                this.bulletGroup.addChild( bullet );
            }
            --this.waitTimeBullet;  // 次弾発射までの待ち時間を減らす
        }
    });
})(window);

/*
 * プレイヤークラス
 */
var Player = tm.createClass({
    superClass: tm.app.Shape,

    init: function(img){
        this.superInit(40, 40);
        this.canvas = img;
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
    superClass: tm.app.Shape,

    init: function(img){
        this.superInit(40, 40);
        this.canvas = img;
    },

    update: function(){
        this.y += 4;
        this.rotation -= 4; // 回転

        if(this.y > app.height+this.height){ this.remove(); }
    }

});

/*
 * 弾クラス
 */
var Bullet = tm.createClass({
    superClass: tm.app.Shape,

    init: function(img){
        this.superInit(10, 10);
        this.canvas = img;
    },

    update: function(){
        this.y -= 16;

        // 画面外に出たら this.remove(); で自分を削除
        if(this.y <= -this.height){ this.remove(); }
    }
});
