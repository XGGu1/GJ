
const { ccclass, property } = cc._decorator;

@ccclass
export default class player_follower extends cc.Component {

    @property(cc.Node)
    player: Node = null;

    @property
    sceneWidth: number = 3000;

    @property
    cameraWidth: number = 960;

    // player_x = this.player;


    onLoad() { }

    start() {

    }

    update(dt) {
        if (this.node.x >= 0 && this.node.x <= 2100) {
            this.node.x = this.player.x;
        }
        if (this.node.x < 0) {
            this.node.x = 0;
        }
        if (this.node.x > 2100) {
            this.node.x = 2100;
        }

    }
}
