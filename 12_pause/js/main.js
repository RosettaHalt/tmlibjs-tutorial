/*
 ポーズ画面
 app.start
 app.stop
 */

// スクリーンのサイズ
var SCREEN_WIDTH = 480;
var SCREEN_HEIGHT= 720;

// ユーザーのデータ
tm.util.DataManager.set("userData", {
    score: 0
});

tm.main(function(){
    app = tm.app.CanvasApp("#world");
    app.background = "black";
    // app.enableStats();
    app.fitWindow();

	// ユーザーデータの生成
    userData = tm.util.DataManager.get("userData");

    app.replaceScene(TitleScene());

    app.run();
});

// タイトルシーン
(function(ns){

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [
                {
                    type:"Label", name:"titleLabel",
                    x:SCREEN_WIDTH/2, y:SCREEN_HEIGHT/2, width:SCREEN_WIDTH, fillStyle:"white",
                    text:"Title", fontSize:64, align: "center"
                }
            ]
        }
    };

    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // ラベルを追加
            this.fromJSON(UI_DATA.LABELS);
        },

        update: function(){
            if( app.keyboard.getKeyDown("Z") || app.pointing.getPointingEnd() ){
                app.replaceScene(MainScene());
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

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [
                {
                    type:"Label", name:"scoreLabel",
                    x:240, y:128, width:SCREEN_WIDTH, fillStyle:"white",
                    text:"dummy", fontSize:64, align: "center"
                }
            ]
        }
    };

    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(){
            this.superInit();

            // ラベルを追加
            this.fromJSON(UI_DATA.LABELS);

            // ラベルのテキストを更新
            this.scoreLabel.text = "score : " + userData.score;

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

                        // スコアを更新
                        ++userData.score;
                        this.scoreLabel.text = "score : " + userData.score;
                    }
                }
            }

            // ショット
            if( (app.keyboard.getKey("Z") || app.pointing.getPointing() == true) && this.waitTimeBullet < 0){
                this.waitTimeBullet = 10;
                var bullet = Bullet(bulletImage);
                bullet.position.set(this.player.x, this.player.y-20);
                this.bulletGroup.addChild( bullet );
            }
            --this.waitTimeBullet;
        },

        // ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時
        onblur: function(){
            app.pushScene(PauseScene());
        }
    });
})(window);

// ポーズシーン
(function(ns){
    ns.PauseScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(audio){
            this.superInit();
            this.interaction;

            // 全画面にちょっと透ける黒いレイヤーを被せる
            var filter = tm.app.Shape(app.width, app.height);
            filter.setPosition(app.width/2, app.height/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);

            app.stop();

            // サウンドが流れていたら止める(サウンドについては後の章で)
            this.audio = audio;
            if(this.audio){ this.audio.pause(); }
        },

        // フォーカスが合えばアプリを動かす
        onfocus: function(){
            app.start();    // アプリ自体の更新を再開する
        },

        // フォーカスが外れたらアプリを止める
        onblur: function(){
            app.stop();    // アプリ自体の更新を止める
        },

        // クリックでポーズ画面を終了
        onmousedown: function(){
            // サウンドが流れていたらサウンドも再開
            if(this.audio){ this.audio.play(); }
            app.popScene();
        },
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

        if(this.y <= -this.height){ this.remove(); }
    }
});
