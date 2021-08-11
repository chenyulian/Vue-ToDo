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
                title : {
                text: '完成任务情况',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    // mark : {show: true},
                    // dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    // restore : {show: true},
                    // saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                // {
                //     name:'半径模式',
                //     type:'pie',
                //     roseType : 'radius',
                //     label: {
                //         normal: {
                //             show: false
                //         },
                //         emphasis: {
                //             show: true
                //         }
                //     },
                //     lableLine: {
                //         normal: {
                //             show: false
                //         },
                //         emphasis: {
                //             show: true
                //         }
                //     },
                //     data:[
                //         {value:10, name:'rose1'},
                //         {value:5, name:'rose2'},
                //         {value:15, name:'rose3'},
                //         {value:25, name:'rose4'},
                //         {value:20, name:'rose5'},
                //         {value:35, name:'rose6'},
                //         {value:30, name:'rose7'},
                //         {value:40, name:'rose8'}
                //     ]
                // },
                {
                    name:'面积模式',
                    type:'pie',
                    roseType : 'area',
                    data:[
                        {value:10, name:'rose1'},
                        {value:5, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                        {value:40, name:'rose8'}
                    ]
                }
            ]
            },
            media: [
                {
                    option: {
                        legend: {
                            right: 'center',
                            bottom: 0,
                            orient: 'horizontal'
                        },
                        series: [
                            // {
                            //     radius: [20, '50%'],
                            //     center: ['50%', '50%']
                            // },
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    },   
                },
                {
                    query: {
                        minAspectRatio: 1
                    },
                    option: {
                        legend: {
                            right: 'center',
                            bottom: 0,
                            orient: 'horizontal'
                        },
                        series: [
                            // {
                            //     radius: [20, '50%'],
                            //     center: ['25%', '50%']
                            // },
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        maxAspectRatio: 1
                    },
                    option: {
                        legend: {
                            right: 'center',
                            bottom: 0,
                            orient: 'horizontal'
                        },
                        series: [
                            // {
                            //     radius: [20, '50%'],
                            //     center: ['50%', '30%']
                            // },
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        maxWidth: 500
                    },
                    option: {
                        legend: {
                            right: 10,
                            top: '15%',
                            orient: 'vertical'
                        },
                        series: [
                            // {
                            //     radius: [20, '50%'],
                            //     center: ['50%', '30%']
                            // },
                            {
                                radius: [30, '50%'],
                                center: ['50%', '50%']
                            }
                        ]
                    }
                }
            ]
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