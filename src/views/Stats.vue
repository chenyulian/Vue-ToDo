<template>
    <div class="stats">
        <Chart :option="option" />
        <div class="infos"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Chart from "@/components/Chart.vue"
    @Component(
        {components: {Chart}
    })
    export default class Stats extends Vue{
        option = {
            baseOption: {
                legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    // mark: {show: true},
                    // dataView: {show: true, readOnly: true},
                    // restore: {show: true},
                    // saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [50, 250],
                    top: '50%',
                    center: ['50%', '0'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        {value: 40, name: 'rose 1'},
                        {value: 38, name: 'rose 2'},
                        {value: 32, name: 'rose 3'},
                        {value: 30, name: 'rose 4'},
                        {value: 28, name: 'rose 5'},
                        {value: 26, name: 'rose 6'},
                        {value: 22, name: 'rose 7'},
                        {value: 18, name: 'rose 8'}
                    ]
                }
                ]
            },
            
        }
    }
</script>

<style lang="scss" scoped>
.stats {
    // padding-top: 36px;
    margin-left: auto;
    margin-right: auto;
    // border: 1px solid red;
}
</style>