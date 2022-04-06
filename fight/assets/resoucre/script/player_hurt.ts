

const { ccclass, property } = cc._decorator;

@ccclass
export default class player_hurt extends cc.Component {

    audio: cc.AudioSource = null;

    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.audio = this.node.getComponent(cc.AudioSource);
    }
    //发生碰撞时候的回调
    onCollisionEnter() {
        console.log("达到");

        this.audio.play();
    }
    //碰撞结束时候的回调
    onCollisionExit() {

    }
}
