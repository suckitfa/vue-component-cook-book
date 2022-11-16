<template>
  <h1>form</h1>
</template>
<script>
// 1. 对form-item进行数据校验
export default {
  name:"iForm",
  // 向下注入form的实例
  provide() {
    return {
      form:this
    }
  },
  // Form组件的接口
  props: {
    model: {
      type:Object,
      default: () => {}
    },
    rules: {
      type:Object,
      default:() => {}
    }
  },
  data(){
    return {
      fields:[]
    }
  },
  created() {
    this.$on('on-form-item-add',(field) => {
      if(field) this.fields.push(field)
    });

    this.$on('on-form-item-remove',(field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field),1)
    })
  }
}
</script>