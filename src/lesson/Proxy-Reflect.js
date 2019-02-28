/*
* Proxy对象（代理） 和 Reflect对象（反射）
*   1. Proxy 和 Reflect 的概念
*           注意：Reflect 反射的是对象
*                 Proxy 和 Reflect 的方法是一模一样的
*                 区别是使用Proxy时，是 new Proxy。而Reflect是直接使用Reflect
*   2. Proxy 和 Reflect 的适用场景
*
* */

{
    // 创建原始对象来存储原始数据（供应商）
    let obj = {
        time: '2017-03-11',
        name: 'test',
        _r: 123
    };

    //  new Proxy()--参数为要代理的对象（供应商）
    // 来创建一个代理对象（代理商）
    let monitor = new Proxy(obj, {
        // 拦截对象属性的读取
        get(target, key) {
            // target 指的就是 obj 对象，
            // key 指的是 obj 中的属性名
            return target[key].replace('2017', '2018');
        },
        // 拦截对象设置属性
        set(target, key, value) {
            // value 指的是要设置的值
            if(key==='name') {
                return target[key] = value;
            } else {
                return target[key];
            }
        },
        // 拦截 key in object操作----判断一个属性，是不是在对象中
        has(target, key){
            if(key==='name') {
                return target[key]
            } else {
                return false
            }
        },
        // 拦截delete
        deleteProperty(target, key){
            if(key.indexOf('_') > -1) {
                delete target[key];
                return true
            } else {
                return target[key];
            }
        },
        // 拦截 Object.keys(),Object.getOwnPropertySymbols(),Object.getOwnPropertyNames()
        ownKeys(target){
            return Object.keys(target).filter(item => item != 'time');
        }
    });

    // 用户直接操作 monitor对象（代理商）
    console.log('get', monitor.time);

    monitor.time = '2019';
    monitor.name = 'mukewang';
    console.log('set', monitor.time);   // 2018-03-11
    console.log('set', monitor.name);  // mukewang

    console.log('has','name' in monitor);   // true
    console.log('has','time' in monitor);   // false

    // delete monitor.time;
    // console.log('delete', monitor);
    // delete monitor._r;
    // console.log('delete', monitor);

    console.log('ownKeys',Object.keys(monitor)); //  ["name", "_r"]
}

// Reflect 的 get(),set(),has(),deleteProperty(),ownKeys()与 Proxy是一模一样的
{
    let obj = {
        time: '2017-03-11',
        name: 'test',
        _r: 123
    };

    // ES5
    console.log(obj.time);
    // ES6--大家注意，这里直接使用 Reflect，不是 new Reflect
    // 第一个参数是 target,第二个参数是 key
    console.log(Reflect.get(obj, 'time')); // 2017-03-11

    Reflect.set(obj,'name','mukewang');
    console.log(obj);

    console.log(Reflect.has(obj,'name'));// true
}

// 使用场景---数据类型校验---通过使用Proxy和Reflect实现和业务解耦
{
    function validator(target, validator) {
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                if(target.hasOwnProperty(key)) {
                    let va = this._validator[key];
                    if(!!va(value)){
                        return Reflect.set(target, key, value, proxy)
                    }else{
                        throw Error(`不能设置${key}到${value}`)
                    }
                }else {
                    throw Error(`${key} 不存在`)
                }
            }
        })
    }

    const personValidators = {
        name(val) {
            return typeof val === 'string'
        },
        age(val){
            return typeof val === 'number' && val > 18
        }
    };

    class Person {
        constructor(name,age) {
            this.name = name;
            this.age= age;
            return validator(this, personValidators)
        }
    }

    const person = new Person('lilei', 30);
    console.log(person);
    // person.name = 48;
    person.name = 'han mei mei';
    console.log(person);
}