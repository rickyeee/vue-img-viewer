<template>
  <div id="app">
    <img src="./assets/images/timg.jpg" @click="openModel">
    <img-viewer
      :img-src="imgSrc"
      :is-show = "isShow"
      @clickShow = "clickShow"
    ></img-viewer>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      isShow: false
    }
  },
  methods: {
    clickShow(bool){
      this.isShow = bool;
    },
    openModel(e){
      const event = e || window.event,
        target = event.target || event.srcElement;
        this.imgSrc = target.src;
        this.isShow = true;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
