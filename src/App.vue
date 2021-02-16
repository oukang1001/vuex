<template>
  <div id="app">
   <div>{{$store.getters.getmsg}}</div>
   <div>{{$store.state.count}}</div>
   <button @click="handleUpdateClick">点击修改</button>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  mounted(){
    // console.log(this.$store)
    this.$store.dispatch("updateCount",123);
  },
   methods:{
     handleUpdateClick(){
       this.$store.commit("updatemsg","你好");
     }
   }
}
</script>

<style scoped  lang="scss">
   
</style>
