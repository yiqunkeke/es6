{
    // ES3数据保护
    // 使用构造函数
    var Person = function () {
        var data = {
            name: 'es3',
            sex: 'male',
            age: 15
        }
        this.get = function (key) {
            return data[key]
        }
        this.set = function (key, value) {
            // 不能修改性别，这样判断，来达到数据保护
            if(key!=='sex') {
                data[key] = value
            }
        }
    }
    // 声明一个实例
    var person = new Person();
    console.table({
        name: person.get('name'),
        sex: person.get('sex'),
        age: person.get('age')
    });

    // 修改名称
    person.set('name','es3-cname');
    console.table({
        name: person.get('name'),
        sex: person.get('sex'),
        age: person.get('age')
    });

    // 修改性别
    person.set('sex','female');
    console.table({
        name: person.get('name'),
        sex: person.get('sex'),
        age: person.get('age')
    });
}


{
    // ES5
    // 直接声明对象,利用Object.defineProperty声明要保护的数据
    var Person = {
        name:'es5',
        age:15
    };

    Object.defineProperty(Person, 'sex', {
        writable: false,
        value: 'male'
    })

    console.table({
        name: Person.name,
        age: Person.age,
        sex: Person.sex
    })

    // 修改名称
    Person.name = 'es5-cname'
    console.table({
        name: Person.name,
        age: Person.age,
        sex: Person.sex
    })

    // 修改性别---无效
    try {
        Person.sex = 'female'
        console.table({
            name: Person.name,
            age: Person.age,
            sex: Person.sex
        })
    } catch (e) {
        console.log(e)
    }

}

{
    // ES6 对象代理
    // 保护数据
    let Person = {
        name: 'es6',
        sex: 'male',
        age: 15
    };

    let person = new Proxy(Person, {
        get(target, key) {
            // target指的是代理的数据 Person
            // key指的是要读取的属性
            return target[key]
        },
        set(target, key, value){
            if(key!=='sex') {
                target[key] = value
            }
        }
    });

    console.table({
        name: person.name,
        sex: person.sex,
        age:person.age
    })

    try {
        person.sex ='female';
    }catch (e) {
        console.log(e)
    }

}

// 进阶指导
/*
*  1.解构赋值
*  2.模板字符串
*  3.正则扩展
*   4.数字扩展
*   5.对象扩展
*   6.函数扩展
*   7.Iterator
*   8.Set 和 Map
*   9.Generator
*   10.Symbol
*   11.Module
*   12.Class
*
* */