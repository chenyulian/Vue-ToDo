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
            const wrapper = this.$refs.wrapper as HTMLDivElement;
            let myChart = echarts.init(wrapper);
            if(this.option !== undefined) {
                myChart.setOption(this.option);
            }

            window.onresize = () => {
                myChart.resize();
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 60%;
    border-radius: 10px;

    @media (max-width: 500px) {
        height: 55%;
    }
}
</style>