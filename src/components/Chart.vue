<template>
    <div class="wrapper" ref="wrapper">
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import * as echarts from 'echarts';
    import {EChartsOption} from 'echarts'
    import { Prop } from "vue-property-decorator";    

    @Component
    export default class Chart extends Vue{
        @Prop()
        option?: EChartsOption;

        mounted():void {
            const width = document.documentElement.clientWidth;
            const wrapper = this.$refs.wrapper as HTMLDivElement;
            wrapper.style.width = `${width - 40}px`
            wrapper.style.height = `${(width - 40) * 1.2}px`
            
            let myChart = echarts.init(wrapper);
            if(this.option !== undefined) {
                myChart.setOption(this.option);
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
}
</style>