<script setup>
    import data from '../assets/js/data.js'
    const defaultProps = {
        children: 'children',
        label: 'label',
    }
    import axios from 'axios'
    import { ref, onMounted, watch, nextTick } from 'vue'

    import cgcs2000ToBaidu from '../assets/js/transform.js'
    import * as echarts from 'echarts';


    const features = ref([]);

    const handleChange = (data, checkedNodes) => {
        if (checkedNodes == true) {
            let label = data.label
            axios.get(`../../public/data/FeaturesToJSON_OutJsonFile_${label}_turned.json`).then(res => {
                const newFeatures = res.data.features.map(feature => {
                    const bdCoords = cgcs2000ToBaidu(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
                    return {
                        ...feature,
                        id: data.id,
                        lng: bdCoords.lng,
                        lat: bdCoords.lat
                    };
                });
                features.value.push(...newFeatures);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        } else {
            features.value = features.value.filter(feature => feature.id !== data.id);
        }
    }

    const show = ref(false);
    const info = ref({ feature: null });
    const position = ref({ lng: 0, lat: 0 });
    const showInfoWindow = (feature) => {
        show.value = true;
        position.value = { lng: feature.lng, lat: feature.lat };
        console.log(feature);
        info.value = { feature };
        console.log(info.value.feature);

    }
    const drawer = ref(false);
    const initChart = () => {
        var chartDom = document.getElementById('map-info-left');
        console.log(chartDom);
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
        console.log(chartDom);
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
    watch(drawer, (newValue) => {
        if (newValue) {
            nextTick().then(() => {
                initChart();
                initChart1();
            });
        }
    });

</script>

<template>
    <div class="map-page">
        <el-header>
            <div class="header-left">
                <img id="logo" src="../assets/img/xiaohui2.png" />
                <p>校园地图信息管理平台</p>
            </div>
            <div class="header-right">
                <el-button type="primary" class="header-link-left" @click="drawer = true">
                    统计图表 </el-button>
                <el-button type="primary">
                    <router-link to="/" class="header-link">返回首页</router-link>
                </el-button>
            </div>
        </el-header>


        <div class="map-container">
            <BMap :tilt="0" :height="850" :center="{ lng: 117.1502, lat: 34.2200 }" :zoom="16" :minZoom="3"
                enableScrollWheelZoom enableDragging ref="map">
                <BMarker v-for="(feature, index) in features" :key="index"
                    :position="{ lat: feature.lat, lng: feature.lng }"
                    :icon="{ imageUrl: 'https://mxorz12.cn/point.png', imageSize: { width: 30, height: 30 } }"
                    @click="showInfoWindow(feature)" />

                <BInfoWindow v-model:show="show" :position="position" :enableCloseOnClick="true" :offset="{
                      x: 0,
                      y: -10
                }">
                    <div v-if="show" class="info-window">
                        <p class="info-title">校园部件信息展示</p>
                        <div class="info-text"></div>

                        <p class="info-item"> 部件大类：{{info.feature.properties.大类}}</p>
                        <p class="info-item">部件小类：{{info.feature.properties.小类}}</p>
                        <p class="info-item"> 分类号：{{ info.feature.properties.分类号 }} </p>

                        <p class="info-item"> 代码：{{ info.feature.properties.名称righ }} </p>

                        <p class="info-item"> 纬度：{{ info.feature.lat.toFixed(6) }} </p>
                        <p class="info-item"> 经度：{{ info.feature.lng.toFixed(6) }} </p>
                        <div class="info-image-container">
                            <p class="info-item">部件照片：</p>
                            <img :src="info.feature.properties.ImageUrl" alt="部件照片" class="info-image">
                        </div>

                    </div>
                </BInfoWindow>
            </BMap>
        </div>


        <el-drawer v-model="drawer" title="校园地图信息统计" direction="btt" size="50%">
            <div class="map-info">
                <div id="map-info-left"></div>
                <div id="map-info-right"></div>
            </div>

        </el-drawer>

        <div class="map-on" style="max-height: 600px; overflow: auto;">
            <el-card style="width: 400px" shadow="always">
                <p>校园部件展示</p>
                <el-tree ref="treeRef" style="max-width: 600px" :data="data" show-checkbox node-key="id"
                    default-expand-all :props="defaultProps" @check-change="handleChange" />
            </el-card>
        </div>

    </div>
</template>



<style scoped src="../assets/map.css">

</style>