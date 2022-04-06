

const { ccclass, property } = cc._decorator;

@ccclass
export default class bg extends cc.Component {

    @property(cc.Node)
    btn_start: cc.Node = null;

    protected onLoad(): void {
        // this.btn_start.on(cc.Node.EventType.TOUCH_START, () => {
        //     cc.director.loadScene("fight");
        // }, this)
    }

    click(event?) {
        if (event.name == "abc") {
            console.log("aaa");
            console.log(1);

        }
    }
}
