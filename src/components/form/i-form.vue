<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
// 1. 对form-item进行数据校验
export default {
  name:"iForm",
  // 向下注入form的实例不可能吧
  provide() {
    return {
      form:this,
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
  },
  methods: {
    // 全部数据重置
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      })
    },
    // 校验
    validate(callback) {
      return new Promise((resolve,reject) => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('',errors => {
            if (errors) {
              valid = false;
              reject(errors)
            }
            if (++count === this.fields.length) {
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}
</script>