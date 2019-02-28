/*
数据结构--主要是增、删、改、查
   1. Map 与 Array 的对比
   2. Set 与 Array 的对比
*/

{
    // 数据结构的横向对比，增，删，改，查
    let map = new Map();
    let arr = [];

    // 增
    map.set('t',1);
    arr.push({t:1});
    console.info('增', map, arr);  // {'t' => 1}、 [{t:1}]

    // 查
    let map_exist = map.has('t');   // has() 返回的是布尔值
    let arr_exist = arr.find(item => item.t);  // find() 返回的是当前项
    console.info('查', map_exist, arr_exist); // true、{t:1}

    // 改
    map.set('t', 2);
    arr.forEach(item => {
        item.t ? item.t = 2: ''
    });
    console.info('改', map, arr); // {'t' => 2}、[{t:2}]

    // 删除
    map.delete('t');
    let index = arr.findIndex(item => item.t);
    arr.splice(index,1);
    console.info('删', map, arr);    // {}, []
}

{
    // set和array的对比
    let set = new Set();
    let arr = [];

    // 增
    set.add({t:1});
    arr.push({t:1});
    console.info('增-',set,arr);

    // 查
    let set_exist = set.has({t:1}); // false
    // 一般情况下，我们需要把要查询的那一项，保存成一个变量，才能正确返回true
    // 否则直接写{t:1}，则它是新生成的一个对象，肯定会返回false
    let arr_exist = arr.find(item => item.t);
    console.log('查-',set_exist,arr_exist)   // false {t:1}

    // 改
    set.forEach(item => item.t ? item.t = 2 : '');
    arr.forEach(item => item.t ? item.t = 2 : '');
    console.log('改-',set,arr);

    // 删
    set.forEach(item => item.t ? set.delete(item) : '');
    let index = arr.findIndex(item => item.t);
    arr.splice(index,1);
    console.log('删-',set,arr);  // {}  []
}

/*
* 1.Map与Object对比
* 2.Set与Object对比
*
* */

{
    // map, set, object 对比
    let item = {t: 1};  // 保存当前项数据

    let map = new Map();
    let set = new Set();
    let obj = {};

    // 增
    map.set('t',1);
    set.add(item);
    obj['t']=1;
    console.info('map-set-obj',map,set,obj); // {'t' => 1}、 {{t:1}}、 {t:1}

    // 查
    console.info({
        map_exist: map.has('t'),
        set_exist: set.has(item),   // 注意这里使用的是item，已经保存过的变量，这样才能查到true
        obj_exist: 't' in obj
    }); // 三个都返回true

    // 改
    map.set('t',2);
    // 修改 Set 有两种方式：
    // 1.如果存储了数据，则直接修改数据本身。
    // 2.如果没有，则需要去forEach()遍历,拿到那个数据元素，再去做修改
    item.t = 2;
    obj['t'] = 2;
    console.info('map-set-obj',map,set,obj);

    // 删除
    map.delete('t');
    set.delete(item);
    delete obj['t'];
    console.info('删除',map,set,obj);
}

// 总结：
// 建议：优先使用 Map,如果对数据要求比较高，也就是说要保证数据唯一性，则使用Set
//        放弃使用传统的 Object 和 Array

