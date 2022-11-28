<template>
    <div>
      组件 B
    </div>
  </template>
  <script>
    import { findComponentUpward } from '../utils/assist.js';
  
    export default {
      name: 'componentB',
      mounted () {
        const comA = findComponentUpward(this, 'componentA');
        
        if (comA) {
          console.log(comA.name);  // Aresn
          comA.sayHello();  // Hello, Vue.js
        }
      }
    }
  </script>