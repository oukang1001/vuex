import Vue from "vue"

class Store {
    constructor(options) {
        let This = this;
        //通过创建一个vue实例将state加入到响应式系统中
        This.vm = new Vue({
            data() {
                return {
                    state: options.state
                }
            }
        });
        //将vm中的state对象应用到store中，从而直接使用this.$store.state,也可以在类中创建一个state属性接口获取引用vm.state;
        This.state = This.vm.state;

        //将options.getters的每一个key存入到一个数组中并且遍历每一个key,通过Object.defineProperty依次定义store.getters的属性,并且定义每一个属性的get接口用于将来回去属性时自动调用对应的getter函数
        let getters = options.getters || {}
        This.getters = {};
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(This.getters, getterName, {
                get: () => {
                    return options.getters[getterName](This.state, This.getters);
                }
            })
        });

        //mutations
        This.mutations = {};
        let mutations = options.mutations || {}
        Object.keys(mutations).forEach(mutationName => {
            This.mutations[mutationName] = (arg) => {
                options.mutations[mutationName](This.state, arg);
            }
        });

        //actions
        This.actions = {};
        let actions = options.actions || {}
        Object.keys(actions).forEach(actionName => {
            This.actions[actionName] = (arg) => {
                options.actions[actionName](This, arg);
            }
        });

    }
    //commit函数定义
    commit =(mutationName, payload)=> {
        this.mutations[mutationName](payload);
    }
    //dispatch函数定义
    dispatch = (actionName, payload) => {
        this.actions[actionName](payload);
    }


    //定义一个get接口,类似于object.defineProperty,引用vm.state到store.state中
    // get state(){
    //     return this.vm.state;
    // }


}
//定义一个install函数，在插件挂载时调用,作用是全局混入beforecreate到每一个组件中，在组件生命周期内依次挂载store对象到每一个组件中
function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else if (this.$parent && this.$parent.$store) {
                this.$store = this.$parent.$store;
            }
        }
    })
}

export default {
    Store,
    install
}