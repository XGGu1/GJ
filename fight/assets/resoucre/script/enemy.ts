import { Uinfo } from './Uinfo'

const { ccclass, property } = cc._decorator

@ccclass
export default class enemy extends cc.Component {
    @property(cc.Node)
    player: cc.Node = null

    randomNumber: number = 0; //随机增加或减少的巡逻范围
    max_distance: number = 0; //自动巡逻的最大距离
    min_distance: number = 0; //自动巡逻的最小距离
    //全局
    random_dir = {
        [1]: 'left',
        [2]: 'right',
    }
    monster_dir: any;
    player_positionX; //玩家的位置
    enemy_positionX; //敌人的位置
    distance: number = 0; //玩家与敌人的位置
    enemy_animation: cc.Animation = null;
    enemy_state: string = "move";

    //初始化
    onInit(): void {
        this.randomNumber = Math.random() * 100;
        this.max_distance = 1400 + this.randomNumber;
        this.min_distance = 500 + this.randomNumber;
        let random = Math.ceil(Math.random() * 2);
        this.enemy_animation = this.node.getComponent(cc.Animation);

        this.monster_dir = this.random_dir[random];
        this.play_Animation();
    }

    play_Animation() {
        if (this.monster_dir == 'noMove') {
            // this.node.getComponent(cc.Animation).play("stand");
        } else {
            this.enemy_animation.play('enemy_move');
        }
    }
    getPos() {
        //每帧获取玩家的位置
        this.player_positionX = this.player.x;
        this.enemy_positionX = this.node.x;
        this.distance = Math.abs(this.player_positionX - this.enemy_positionX);
    }
    enemy_move() {
        //巡逻状态
        if (this.monster_dir == 'left') {
            this.node.x -= 5;
            if (this.node.x < this.min_distance) {
                this.monster_dir = 'right';
                this.node.x += 5;
            }
            if (this.distance < 200) {
                //切换到追赶玩家状态
                this.monster_dir = 'chase';
            }
        }

        if (this.monster_dir == 'right') {
            this.node.x += 5;
            if (this.node.x > this.max_distance) {
                this.monster_dir = 'left';
                this.node.x -= 5;
            }
            if (this.distance < 200) {
                //切换到追赶玩家状态
                this.monster_dir = 'chase';
            }
        }
        if (this.monster_dir == 'left') {
            this.node.scaleX = 1.5;
        } else if (this.monster_dir == 'right') {
            this.node.scaleX = -1.5;
        }
    }

    enemy_stop() {
        this.enemy_animation.play('enemy_move')
        this.monster_dir = 'chase';
    }
    enemy_chase() {
        //追赶状态
        if (this.monster_dir == 'chase') {
            if (this.player_positionX - this.enemy_positionX > 0) {
                this.node.x += 5;
                this.node.scaleX = -1.5;
            } else if (this.player_positionX - this.enemy_positionX < 0) {
                this.node.x -= 5;
                this.node.scaleX = 1.5;
            } else if (this.player_positionX - this.enemy_positionX == 0) {
                console.log(1);
            }
            if (this.distance < 100) {
                //切换到攻击状态，然后不动
                this.monster_dir = 'attack';
                this.enemy_animation.play('enemy_attack');
                // this.monster_dir="chase";
                setTimeout(() => {
                    if (this.enemy_state == "die") {
                        return;
                    }
                    this.enemy_stop();

                }, 1000)
            }
        }
    }
    onLoad() {
        this.onInit();
    }
    update(dt) {
        this.getPos();
        this.enemy_chase();
        this.enemy_move();
    }
}
