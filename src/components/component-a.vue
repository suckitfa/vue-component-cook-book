<template>
  <div>组件 A<component-b></component-b></div>
</template>
<script>
    import componentB from './component-b.vue';
  
    export default {
      name: 'componentA',
      components: { componentB },
      data () {
        return {
          name: 'Aresn'
        }
      },
      methods: {
        sayHello () {
          console.log('Hello, Vue.js');
        }
      }
    }
</script>