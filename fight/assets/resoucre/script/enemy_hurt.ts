import enemy from "./enemy";
import { Uinfo } from "./Uinfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class enemy_hurt extends cc.Component {

    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.enemy_script = this.enemy.getComponent(enemy);
    }
    @property
    enemy_blood: number = 3;

    @property(cc.Node)
    enemy: cc.Node = null;

    enemy_script: enemy;

    enemy_die() {

        this.enemy.getComponent(cc.Animation).play("enemy_die");
        this.enemy_blood = 1;
        //队列  动作队列
        cc.tween(this.enemy)
            .to(0.5, { position: cc.v3(this.enemy.x + 80, this.enemy.y) })
            .start()
        setTimeout(() => {
            cc.tween(this.enemy)
                .to(1, { opacity: 0 })
                .call(() => {
                    this.enemy.destroy();
                })
                .start()
        }, 1000);

        // this.enemy.active = false;

    }

    onCollisionEnter() {
        this.node.getComponent(cc.AudioSource).play();
        this.enemy_blood -= 1;

    }

    onCollisionExit() {

    }

    update(dt) {
        if (this.enemy_blood <= 0) {
            this.enemy_script.enemy_state = "die";
            // this.enemy_die();
            if (this.enemy_script.enemy_state == "die") {
                this.enemy_die();
            }
        }
    }
}
