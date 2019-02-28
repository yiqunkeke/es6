import $ from 'jquery'
class Base {
    // 奖金，玩法，说明
    // 采用map结构存储数据
    initPlayList(){
        this.play_list.set('r2',{
            bonus: 6,
            tip:'从0~11中任选2个或者多个号码，所选号码与开奖号码任意两个号码相同，即中奖6元',
            name:'任二'
        })
            // map集合是可以级联操作的
            .set('r3',{
                bonus: 19,
                tip:'从0~11中任选3个或者多个号码，所选号码与开奖号码任意三个号码相同，即中奖19元',
                name:'任三'
            })
            .set('r4',{
                bonus: 78,
                tip:'从0~11中任选4个或者多个号码，所选号码与开奖号码任意四个号码相同，即中奖78元',
                name:'任四'
            })
            .set('r5',{
                bonus: 540,
                tip:'从0~11中任选5个或者多个号码，所选号码与开奖号码任意五个号码相同，即中奖540元',
                name:'任五'
            })
            .set('r6',{
                bonus: 90,
                tip:'从0~11中任选6个或者多个号码，所选号码与开奖号码任意六个号码相同，即中奖90元',
                name:'任六'
            })
            .set('r7',{
                bonus: 26,
                tip:'从0~11中任选7个或者多个号码，所选号码与开奖号码任意七个号码相同，即中奖26元',
                name:'任五'
            })
            .set('r8',{
                bonus: 9,
                tip:'从0~11中任选8个或者多个号码，所选号码与开奖号码任意八个号码相同，即中奖9元',
                name:'任八'
            })
    }

    // 初始化号码，单位数字前补0----使用set结构
    initNumber(){
        for(let i = 1; i<12; i++) {
            this.number.add((''+ i).padStart(2,'0'))   // 一行代码，补全0！
        }
    }

    // 遗漏数据----map结构
    setOmit(omit) {
        let self = this;
        self.omit.clear();
        for(let [index, item] of omit.entries) {   // let...of 遍历接口和entries
            self.omit.set(index, item)
        }
        $(self.omit_el).each(function (index,item) {  // jquery用法
            $(item).text(self.omit.get(index))
        })
    }

    // 设置开奖 ---set结构
    setOpenCode(code) {
        let self = this;
        self.open_code.clear();
        for(let item of code.values()) {    // values
            self.open_code.add(item);
        }
        self.updateOpenCode && self.updateOpenCode.call(self, code);
    }

    // 号码选中取消
    toggleCodeActive(e) {
        let self = this;
        let $cur = $(e.currentTarget); // 获取当前被选中的dom---使用e.currentTarget
        $cur.toggleClass('btn-boll-active'); // jquery用法
        self.getCount();
    }

    // 切换玩法
    changePlayNav(e) {
        let self = this;
        let $cur = $(e.currentTarget);  // 注意 currentTarget和 Target 的区别
        //事件绑定在父元素上，点击的是子元素，则currentTarget代表的是子元素
        $cur.addClass('active').siblings().removeClass('active');
        self.cur_play = $cur.attr('desc').toLocaleLowerCase();
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();
    }

    // 操作区：大、小、奇、偶、全、清除
    assistHandle(e) {
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        let index = $cur.index();
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        if(index===0) {
            // 全
            $('.boll-list .btn-boll').addClass('btn-boll-active');
        }
        if(index===1) {
            $('.boll-list .btn-boll').each(function (i, t) {
                if(t.textContent-5>0) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        if(index===2) {
            $('.boll-list .btn-boll').each(function (i, t) {
                if(t.textContent-6<0) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        if(index===3) {
            // 奇
            $('.boll-list .btn-boll').each(function (i, t) {
                if(t.textContent%2===1) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        if(index===4) {
            // 偶
            $('.boll-list .btn-boll').each(function (i, t) {
                if(t.textContent%2===0) {
                    $(t).addClass('btn-boll-active');
                }
            });
        }
        self.getCount();
    }

    // 获取当前彩票名称
    getName(){
        return this.name;
    }

    // 添加号码--类似于购物车
    addCode(){
        let self = this;
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active = $active ? $active.length : 0;
        let count = self.computeCount(active, self.cur_play);
        if(count) {
            self.addCodeItem($active.join(''), self.cur_play, self.play_list.get(self.cur_play).name, count);
        }
    }

    // 添加单次号码
    addCodeItem(code, type, typeName, count){
        let self = this;
        const tpl= `
            <li codes="${type}|${code}" bonus="${count*2}" count="${count}">
                <div class="code">
                    <b>${typeName}${count>1 ? '复式': '单式'}</b>
                    <b class="em">${code}</b>
                    [${count}注，<em class="code-list-money">${count*2}</em>元]
                </div>
            </li>
        `;
        $(self.cart_el).append(tpl);
        self.getTotal();
    }

    getCount(){
        let self = this;
        let active = $('.boll-list .btn-boll-active').length;
        let count = self.computeCount(active, self, cur_play);
        let range = self.computeBonus(active, self, cur_play);
        let money = count * 2;
        let win1 = range[0] - money;
        let win2 = range[1] - money;
        let tpl;
        let c1 = (win1<0 && win2<0) ? Math.abs(win1): win1;
        let c2 = (win1<0 && win2<0) ? Math.abs(win2): win2;
        if(count===0) {
            tpl=`
                您选了 <b class="red">${count}</b>注，共 <b>${count*2}</b>元
            `
        } else if(range[0]===range[1]){
            tpl = `
            您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元  <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 元，
			您将${win1>=0?'盈利':'亏损'}
			<strong class="${win1>=0?'red':'green'}">${Math.abs(win1)} </strong> 元</em>
            `
        }else {
            tpl=`您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元  <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 至 <strong class="red">${range[1]}</strong> 元，
			您将${(win1<0&&win2<0)?'亏损':'盈利'}
			<strong class="${win1>=0?'red':'green'}">${c1} </strong>
			至 <strong class="${win2>=0?'red':'green'}"> ${c2} </strong>
			元</em>`
        }
        $('.sel_info').html(tpl);
    }

    /**
     * [getTotal 计算所有金额]
     * @return {[type]} [description]
     */
    getTotal(){
        let count=0;
        $('.codelist li').each(function(index,item){
            count+=$(item).attr('count')*1;
        })
        $('#count').text(count);
        $('#money').text(count*2);
    }

    /**
     * [getRandom 生成随机数]
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getRandom(num){
        let arr=[],index;
        let number=Array.from(this.number); // 把类似数组的，转成真正的数组
        while(num--){
            index=Number.parseInt(Math.random()*number.length);
            arr.push(number[index]);
            number.splice(index,1);
        }
        return arr.join(' ')
    }

    /**
     * [getRandomCode 添加随机号码]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    getRandomCode(e){
        e.preventDefault();
        let num=e.currentTarget.getAttribute('count');
        let play=this.cur_play.match(/\d+/g)[0];
        let self=this;
        if(num==='0'){
            $(self.cart_el).html('')
        }else{
            for(let i=0;i<num;i++){
                self.addCodeItem(self.getRandom(play),self.cur_play,self.play_list.get(self.cur_play).name,1);
            }
        }
    }

}

export default Base
