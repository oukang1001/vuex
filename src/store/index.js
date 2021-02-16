import Vue from "vue"

import Vuex from "./resource"
Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        msg:"hello world",
        count:0
    },
    getters:{
        getmsg(state){
            return state.msg+" oyk" ;
        }
    },
    mutations:{
        updatemsg(state,payload){
            state.msg="hello "+payload
        },
        increateCount(state,payload){
            state.count=payload;
        }
    },
    actions:{
        updateCount({commit},payload){
            commit("increateCount",payload);
        }
    }
})