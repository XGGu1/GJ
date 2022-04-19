
const { ccclass, property } = cc._decorator;

@ccclass
export default class pass extends cc.Component {

    // protected onLoad(): void {
    //     this.node.on(cc.Node.EventType.TOUCH_START, () => {
    //         cc.director.loadScene("test");
    //     }, this)
    // }

    onCollisionEnter() {
        cc.director.loadScene("test");
    }

    start() {

    }

    update(dt) { }
}
