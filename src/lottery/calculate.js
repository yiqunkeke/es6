class Calculate {

    //计算注数
    computeCount(active, play_name){
        // active--当前选中的号码，play_name当前的玩法标识，最后返回计算好的注数

        let count = 0; // 当前注数默认为0
        const exist = this.play_list.has(play_name); // 判断当前玩法列表中是否含有当前传进来的这个玩法
        // ES6中实例化数组：一行代码搞定
        const arr = new Array(active).fill('0'); // 重点：！！！！创建指定长度为active，每个元素为'0'的一个数组

        if(exist && play_name.at(0)==='r'){   // at()也是ES5中没有的方法
            // 注意：这里的combine方法是使用类名来调用的----注定了combine是一个静态方法
            count = Calculate.combine(arr, play_name.split('')[1]);
        }
        return count;
    }

    //奖金范围预测
    computeBonus(active,play_name){
        const play = play_name.split('');
        const self = this;
        let arr = new Array(play[1] * 1).fill(0); // 实例化数组
        let min,max;
        if(play[0]==='r') {
            let min_active = 5 - (11 - active);
            if(min_active > 0){
                if(min_active - play[1] >= 0){
                    arr = new Array(min_active).fill(0);  // 实例化数组
                    min = Calculate.combine(arr, play[1]).length;
                } else {
                    if(play[1] - 5 > 0 && active - play[1] >= 0) {
                        arr = new Array(active - 5).fill(0);
                        min = Calculate.combine(arr, play[1] - 5).length;
                    } else {
                        min = active - play[1] > -1 ? 1 : 0
                    }
                }
            } else {
                min = active - play[1] > -1 ? 1 : 0
            }

            let max_active = Math.min(active, 5);
            if(play[1] - 5 > 0){
                if(active - play[1] >=0) {
                    arr = new Array(active - 5).fill(0); // 初始化数组
                    max = Calculate.combine(arr,play[1]-5).length;
                } else {
                    max = 0;
                }
            } else if (play[1] - 5 < 0) {
                arr = new Array(Math.min(active, 5)).fill(0);
                max = Calculate.combine(arr, play[1]).length;
            } else {
                max = 1;
            }
        }
        return [min, max].map(item => item * self.play_list.get(play_name).bonus);  // 使用map和箭头函数以及集合中的get()方法
    }

    // 组合运算
    static combine(arr,size){
        // arr--参与组合运算的数组，size组合运算的基数
        let allResult = [];

        (function f(arr, size, result) {
            // 立即执行函数
            let arrLen = arr.length;
            if(size > arrLen) {
                return;
            }
            if(size === arrLen) {
                allResult.push([].concat(result, arr));
            } else {
                for(let i = 0; i < arrLen; i++) {
                    let newResult = [].concat(result);
                    newResult.push(arr[i]);
                    if(size === 1) {
                        allResult.push(newResult);
                    }else {
                        let newArr = [].concat(arr);
                        newArr.splice(0, i+1);
                        f(newArr, size-1, newResult)
                    }
                }
            }
        })(arr,size,[])
    }
}

export default Calculate