
const { ccclass, property } = cc._decorator;

@ccclass
export default class player_hit extends cc.Component {

    protected onLoad(): void {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }
}
