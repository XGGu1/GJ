
import { Uinfo } from './Uinfo'

const { ccclass, property } = cc._decorator

@ccclass
export default class player extends cc.Component {

    isFinish: boolean = false;//是否未完成攻击，false为可以攻击
    player: number = 1;
    player_animation: cc.Animation = null;
    jumpSpeed: number = 0;
    fallSpeed: number = 9.8;
    jumpNum: number = 0;//跳跃次数
    player_audio: cc.AudioSource



    fall() {
        if (Uinfo.player_state == "fall") {
            this.player_animation.play("fall");

        }
    }
    landing() {
        //着陆状态
        if (Uinfo.player_state == "landing") {
            this.jumpSpeed = 50;
            this.player_animation.play("landing");
            // Uinfo.player_dir = "noMove"
            this.jumpNum = 0;
            setTimeout(() => {
                this.player_animation.play("stand");
                Uinfo.player_state = "normal";
                this.isNormal();
            }, 100);
        }
    }
    jump() {
        //跳跃状态
        if (Uinfo.player_state == 'jump') {
            this.node.y += this.jumpSpeed;
            this.jumpSpeed -= 5;
            this.player_animation.play("jump");
            if (this.jumpSpeed < 0) {
                this.jumpSpeed = 0;
                Uinfo.player_state = "fall"
                this.fall();
            }
        }
        //降落状态
        if (Uinfo.player_state == "fall") {
            this.node.y -= this.fallSpeed;
            if (this.node.y < -155) {
                this.node.y = -155;
                Uinfo.player_state = "landing"
                this.landing();
            }
        }
    }

    finish() {
        this.isFinish = false;
        this.player_animation.play("stand");
    }

    isNormal() {
        if ((Uinfo.player_state == "normal" && Uinfo.player_dir == "right") || (Uinfo.player_state == "normal" && Uinfo.player_dir == "left")) {
            this.node.getComponent(cc.Animation).play("run");
        }
    }


    onLoad() {
        this.player_animation = this.node.getComponent(cc.Animation);
    }

    update(dt) {
        if (Uinfo.player_dir == 'left') {
            this.node.scaleX = -Math.abs(this.node.scaleX)
            this.node.x -= 5;
            // this.player_animation.play('run')
        } else if (Uinfo.player_dir == 'right') {
            this.node.scaleX = Math.abs(this.node.scaleX)
            this.node.x += 5;
            // this.player_animation.play('run');
        }
        this.jump();
        if (this.node.x <= -460) {
            this.node.x = -460;
        }

    }
}
