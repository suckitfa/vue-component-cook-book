<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter';
import { findComponentsDownward } from '@/utils/assist';
export default {
    name:"iCheckboxGroup",
    mixins:[Emitter],
    props: {
        value: {
            type:Array,
            default:() => []
        }
    },  
    data() {
        return {
            currentValue:this.value,
            children:[]
        }
    },
    methods: {
        updateModel(update) {
            this.childrens = findComponentsDownward(this,'iCheckbox')
            if(this.childrens) {
                const {value} = this;
                this.childrens.forEach(child => {
                    child.model = value;
                    if(update) {
                        child.currentValue = value.indexOf(child.label) >= 0;
                        child.group = true;
                    }
                })
            }
        },
        change(data) {
            this.currentValue = data;
            this.$emit('input',data);
            this.$emit('on-change',data);
            this.dispatch('iFormItem','on-form-change',data);
        }
    },
    mounted() {
        this.updateModel(true)
    },
    watch: {
        value() {
            this.updateModel(true)
        }
    }
}
</script>