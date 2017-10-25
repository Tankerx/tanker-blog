<template>
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" class="swiper-box">
      <!-- slides -->
      <swiper-slide class="swiper-item" >
        <img src="/static/img/demo-2.jpg" alt="">
      </swiper-slide>
      <swiper-slide class="swiper-item" >
        slider1

      </swiper-slide>
      <swiper-slide class="swiper-item" >
        slider2

      </swiper-slide>
      <swiper-slide class="swiper-item" >
        slider3

      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--<div class="swiper-scrollbar" slot="scrollbar"></div>-->
    </swiper>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          autoplay: false,
          grabCursor: true,
          setWrapperSize: true,
          speed:1000,
//          slidesPerView: 3,
//          slidesOffsetBefore:100,
//          effect:'coverflow',
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          paginationType: 'progress',
          direction:'vertical',
          mousewheelControl: true,
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart (swiper) {
            console.log(swiper)
          }
          // more Swiper configs and callbacks...
          // ..
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-item img{
    width: 100%;
    height: 100%;
  }
</style>
