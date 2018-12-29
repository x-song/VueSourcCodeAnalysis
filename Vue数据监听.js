

//observe方法遍历对象的key和value
function observe(obj,fn) {
    Object.keys(obj).forEach((keys)=>{ defaultReative(obj,keys,obj[keys],fn ) })
}

//defaultReative方法通过Object.defineProperty监听对象的变化
function  defaultReative(obj,keys,val,fn){
    Object.defineProperty(obj,keys,{
        enumerable:true,
        configurable:true,
        get(){
          return  val;
        },
        set(newVal){
            val = newVal;
            fn();
        }

    })
}

//每实例化一次Vue，都调用一次observe方法监听对象属性有没有变化
class  Vue {
    constructor(options){
        this.data = options.data;
        observe(this.data ,options.render);
    }

}

const vm = new Vue({
    data:{
        name:"Jack"
    },
    render(){
        console.log("数据发生变化了")
    }
})

//test
vm.data.name = 'x-song';
//对象发生变化，触发render方法