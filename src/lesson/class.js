{
    // 类的定义和实例化----class 关键字
    class Parent {
        // constructor 构造方法
        constructor(name = 'mukewang') {
            // this关键字则代表实例对象
            this.name = name;
        }
    }
    // 实例化 ---- new 关键字
    let v_parent = new Parent('v');
    console.log(v_parent); // {name: "v"}
}

{
    // 继承
    class Parent {
        constructor(name = 'mukewang') {
            this.name = name;
        }
    }

    // 使用 extends
    class Child extends Parent {

    }

    console.log(new Child()); // {name: "mukewang"}
}

{
    // 继承传递参数
    class Parent {
        constructor(name = 'mukewang') {
            this.name = name;
        }
    }

    class Child extends Parent {
        constructor(name='child'){
            // 使用 super()--关键字
            // 注意：super必须放在子类构造函数中的第一行，来向父类中传递参数 name
            super(name);
            this.type='child'
        }
    }

    console.log(new Child('hello')); // {name: "hello", type: "child"}
}

{
    // 类中的getter 和 setter
    class Parent {
        constructor(name = 'mukewang') {
            this.name = name;
        }

        // 注意：这里一定不要理解为是一个方法，它其实是一个属性-----千万要注意这点
        get longName(){
            return 'mk' + this.name;
        }

        set longName(value){
            this.name=value;
        }
    }

    let v = new Parent();
    console.log(v.longName); // mkmukewang
    v.longName = 'hello';
    console.log(v.longName); // mkhello
}

{
    // 静态方法
    class Parent {
        constructor(name = 'mukewang') {
            this.name = name;
        }

        // 使用 static 关键字，后面加上方法名称(){}
        static tell(){
            console.log('tell');
        }
        // 静态方法表示的含义：该方法不会被实例继承，而是直接通过类来调用，所以如果静态方法包含this关键字，这个this指的是类，而不是实例
    }

    Parent.tell(); // tell
}

{
    // 静态属性
    class Parent {
        constructor(name = 'mukewang') {
            this.name = name;
        }

        static tell(){
            console.log('tell');
        }
    }

    // 直接在类定义完之后，使用 . 给类添加静态属性
    Parent.type='test';
    console.log(Parent.type); // test

    // 静态属性的含义：该属性是类本身的属性，即Class.propName，而不是定义在实例对象(this)上的属性
}

// 注意事项 ：
/*      1. 定义“类”的方法时，前面不需要加 function关键字，直接把函数定义放进去就可以了。
        2. 方法之间不需要逗号分隔，加了会报错
*       3. constructor方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。
*       一个类必须有constructor方法。如果没有显示定义，一个空的constructor方法会被默认添加。
*       4. 类的方法内部如果含有this，它默认指向类的实例
* */
