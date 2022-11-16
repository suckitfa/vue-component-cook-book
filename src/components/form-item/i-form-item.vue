<template>
  <div>
    <label v-if="label" :class="{'i-form-item-label-required':isRequired}">{{label}}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter'
import AsyncValidator from 'async-validator';
export default {
  name:"iFormItem",
  mixins:[Emitter],
  // 导入form实例
  inject:['form'],
  props: {
    label: {
      type:String,
      default:""
    },
    prop: {
      type:String,
    }
  },
  data() {
    return {
      isRequired:false, // 是否为必填
      validateState:'',
      validateMessage:''
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop]
    }
  },
  // form-item组件渲染时候将自己缓存在form组件中
  mounted() {
    if (this.prop) {
      this.dispatch('iForm','on-form-item-add',this)

      // 设置初始值，在重置的时候回复默认值
      this.initValue = this.fieldValue;

      this.setRules()
    }
  },
  // form-item组件在销毁前，将实力从Form中移除
  beforeDestroy() {
    this.dispatch('iForm','on-form-item-remove',this)
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        // 当前校验中的必填项，标记出来
        rules.every(rule => {
          this.isRequired = rule.required;
        })
      }
      this.$on('on-form-blur',this.onFieldBlur);
      this.$on('on-form-change',this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    // 过滤出对应触发器的rule规则
    getFilterRules(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    // 封装应付对应的trigger的方法来搞定
    validate(trigger,callback = function(){}) {
      let rules = this.getFilterRules(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }

      this.validateState = 'validating';

      let descriptor = {};
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model,{firstFields:true},errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
        callback(this.validateMessage);
      })
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      this.validate('change')
    }
  }
}
</script>

<style scoped>
  .i-form-item-label-required:before {
    content: "*";
  }
  .i-form-item.message {
    color:red;
  }
</style>