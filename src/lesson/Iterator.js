/*
*   1.什么是 Iterator接口？
*       某些数据结构（比如数组，对象，Set、Map）,都可以理解为是一种数据集合。
*       Iterator接口，用来处理不同的数据结构。
*
*       遍历器（Iterator）就是这样一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。
*       任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
*
*  2.Iterator的基本用法
*
*  3. for ... of
*
* */

{
    let arr = ['hello','world'];
    let map = arr[Symbol.iterator]();
    console.log(map.next());
    console.log(map.next());
    console.log(map.next());
}

{
    // 对象不具备Iterator接口，但是可以自己部署-----手写方式
    let obj = {
        start: [1,3,2],
        end: [7,9,8],
        [Symbol.iterator](){
            let self = this;
            let index = 0;
            let arr = self.start.concat(self.end);
            let len = arr.length;
            return {
                next(){
                    if(index<len) {
                        return {
                            value: arr[index++],
                            done:false
                        }
                    } else {
                        return {
                            value: arr[index++],
                            done: true
                        }
                    }
                }
            }
        }
    }

    for(let key of obj) {
        console.log(key);
    }

}
