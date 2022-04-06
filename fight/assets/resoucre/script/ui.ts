import player from "./player";
import { Uinfo } from "./Uinfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ui extends cc.Component {

    @property(cc.Node)
    btn_right: cc.Node = null;

    @property(cc.Node)
    btn_left: cc.Node = null;

    @property(cc.Node)
    btn_attack: cc.Node = null;

    @property(cc.Node)
    btn_up: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;


    player_script: player;
    player_move() {
        // 右移
        this.btn_right.on(cc.Node.EventType.TOUCH_START, () => {
            if (Uinfo.player_state == "jump" || Uinfo.player_state == "fall") {
                // this.player.scaleX = 1.7;
                Uinfo.player_dir = "right";
            } else if (Uinfo.player_state == "normal") {
                // this.player.scaleX = 1.7;
                this.player.getComponent(cc.Animation).play("run")
                Uinfo.player_dir = "right";
            } else {
                // this.player.scaleX = 1.7;
                this.player.getComponent(cc.Animation).play("run")
                Uinfo.player_dir = "right";
            }
        })
        this.btn_right.on(cc.Node.EventType.TOUCH_END, () => {
            this.player.getComponent(cc.Animation).play("stand")
            Uinfo.player_dir = "noMove";
        })
        this.btn_right.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.player.getComponent(cc.Animation).play("stand")
            Uinfo.player_dir = "noMove";
        })

        // 左移
        this.btn_left.on(cc.Node.EventType.TOUCH_START, () => {
            if (Uinfo.player_state == "jump" || Uinfo.player_state == "fall") {
                // this.player.scaleX = -2;
                Uinfo.player_dir = "left";
            } else if (Uinfo.player_state == "normal") {
                // this.player.scaleX = -2;
                this.player.getComponent(cc.Animation).play("run")
                Uinfo.player_dir = "left";
            } else {
                // this.player.scaleX = -2;
                this.player.getComponent(cc.Animation).play("run")
                Uinfo.player_dir = "left";
            }
        })
        this.btn_left.on(cc.Node.EventType.TOUCH_END, () => {
            this.player.getComponent(cc.Animation).play("stand")
            Uinfo.player_dir = "noMove";
        })
        this.btn_left.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.player.getComponent(cc.Animation).play("stand")
            Uinfo.player_dir = "noMove";
        })

    }

    player_attack() {
        this.btn_attack.on(cc.Node.EventType.TOUCH_START, () => {
            if (Uinfo.player_state == "fall" || Uinfo.player_state == "jump" || Uinfo.player_state == "landing") {
                return
            }
            if (this.player.getComponent(player).isFinish == false) {
                this.player.getComponent(cc.Animation).play("attack")
                this.player.getComponent(cc.AudioSource).play();
                this.player.getComponent(player).isFinish = true;
            }

        })
    }

    player_jump() {
        this.btn_up.on(cc.Node.EventType.TOUCH_START, () => {
            //给它跳力
            if (this.player_script.jumpNum == 0 || this.player_script.jumpNum == 1) {
                this.player_script.jumpSpeed = 50;
                Uinfo.player_state = "jump"
                this.player_script.jumpNum++;
            }


            // this.player.getComponent(player).jumpSpeed += 50;
            // Uinfo.player_state = "jump"
        })
    }

    onLoad() {
        this.player_script = this.player.getComponent(player);
    }

    start() {
        this.player_move();
        this.player_attack();
        this.player_jump();
    }

    update(dt) {
        this.node.x = this.player.x - 480;

    }
}
