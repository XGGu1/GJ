
const { ccclass, property } = cc._decorator;

@ccclass
export default class player_follower extends cc.Component {

    @property(cc.Node)
    player: Node = null;

    player_x = this.player;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        this.node.x = this.player.x;
    }
}
