

const { ccclass, property } = cc._decorator;

@ccclass
export default class player_hurt extends cc.Component {

    audio: cc.AudioSource = null;

    @property
    player_blood: number = 3;

    @property(cc.Node)
    player: cc.Node = null;

    player_state: string = "live";

    // player_die() {
    //     this.player_blood = 10;
    //     this.player.getComponent(cc.Animation).play("player_die");
    //     this.player.active = false;
    // }


    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.audio = this.node.getComponent(cc.AudioSource);
    }
    //发生碰撞时候的回调
    onCollisionEnter() {
        console.log("打到");

        this.audio.play();
        this.player_blood -= 1;
    }
    //碰撞结束时候的回调
    onCollisionExit() {

    }

    protected start(): void {
        setTimeout(() => {
            if (this.player_state == "die") {
                console.log("玩家死亡");
                this.player.getComponent(cc.Animation).play("player_die");
                this.player.active = false;
            }
        }, 3);
    }
    update(dt) {
        if (this.player_blood <= 0) {
            this.player_state = "die";
        }
    }
}
