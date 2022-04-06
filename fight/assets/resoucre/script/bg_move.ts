

const { ccclass, property } = cc._decorator;

@ccclass
export default class bg_move extends cc.Component {



    @property(cc.Node)
    sky: Node = null;

    @property(cc.Node)
    ground: Node = null;



    onLoad() { }

    start() {

    }

    update(dt) { }
}
