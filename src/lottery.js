import 'babel-polyfill'
// 这个模块要引入其它模块
import Base from './lottery/base';
import Calculate from './lottery/calculate';
import Interface from './lottery/interface';
import Timer from './lottery/timer';
import $ from 'jquery'

const copyProperties = function (target, source) {
    for(let key of Reflect.ownKeys(source)) {
        // Reflect.ownKeys方法用于返回对象的所有属性
        if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

const mix = function (...mixins) {
    class Mix {}
    for (let mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
    }
    return Mix
}

// 实现了多个类的继承
class Lottory extends mix(Base,Calculate,Interface,Timer) {
    constructor(name='syy',cname='11选5', issue='**',state='**'){
        super();
        this.name=name;
        this.cname=cname;
        this.issue=issue;
        this.state=state;
        this.el='';
        this.omit=new Map();
        this.open_code=new Set();
        this.open_code_list=new Set();
        this.play_list=new Map();
        this.number=new Set();
        this.issue_el='#curr_issue';
        this.countdown_el='#countdown';
        this.state_el='.state_el';
        this.cart_el='.codelist';
        this.omit_el='';
        this.cur_play='r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * [updateState 状态更新]
     * @return {[type]} [description]
     */
    updateState(){
        let self=this;
        this.getState().then(function(res){
            self.issue=res.issue;
            self.end_time=res.end_time;
            self.state=res.state;
            $(self.issue_el).text(res.issue);
            self.countdown(res.end_time,function(time){
                $(self.countdown_el).html(time)
            },function(){
                setTimeout(function () {
                    self.updateState();
                    self.getOmit(self.issue).then(function(res){

                    });
                    self.getOpenCode(self.issue).then(function(res){

                    })
                }, 500);
            })
        })
    }

    /**
     * [initEvent 初始化事件]
     * @return {[type]} [description]
     */
    initEvent(){
        let self=this;
        $('#plays').on('click','li',self.changePlayNav.bind(self));
        $('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));
        $('#confirm_sel_code').on('click',self.addCode.bind(self));
        $('.dxjo').on('click','li',self.assistHandle.bind(self));
        $('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self));
    }

}

export default Lottery;