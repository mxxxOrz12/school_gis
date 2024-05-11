
import * as echarts from 'echarts';

const initChart = () => {
    var chartDom = document.getElementById('map-info-left');
    if (chartDom) {
        var myChart = echarts.init(chartDom);
        const option = {
            title: {
                text: '大类统计图',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 495, name: '公共设施' },
                        { value: 6, name: '房屋土地' },
                        { value: 7, name: '道路交通' },
                        { value: 31, name: '园林绿化' },
                        { value: 27, name: '市容环境' },
                        { value: 2, name: '其他' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    };
}
const initChart1 = () => {
    var chartDom = document.getElementById('map-info-right');
    if (chartDom) {
        var myChart = echarts.init(chartDom);
        const option = {
            title: {
                text: '公共设施统计图',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 139, name: '井盖' },
                        { value: 45, name: '雨水箅子' },
                        { value: 1, name: '信息亭' },
                        { value: 8, name: '消防设施' },
                        { value: 8, name: '立杆' },
                        { value: 275, name: '路灯' },
                        { value: 18, name: '监控电子眼' },
                        { value: 1, name: '邮筒' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    };
}
export { initChart, initChart1 };