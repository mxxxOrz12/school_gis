<script setup>
    const defaultProps = {
        children: 'children',
        label: 'label',
    }
    const data = [
        {
            id: 1,
            label: '井盖',
            children: [
                {
                    id: 4,
                    label: '电力井盖',
                },
                {
                    id: 5,
                    label: '电信井盖',
                },
                {
                    id: 6,
                    label: '给水井盖',
                },
                {
                    id: 7,
                    label: '排水井盖',
                },
                {
                    id: 8,
                    label: '燃气井盖',
                },
            ],
        },
        {
            id: 2,
            label: '消防设施',

        },
        {
            id: 3,
            label: '路灯',

        },
    ]

</script>

<template>
    <div class="map-page">
        <el-header>
            <div class="header-left">
                <img id="logo" src="../assets/img/xiaohui2.png" />
                <p>校园地图信息管理平台</p>
            </div>
            <div class="header-right">
                <el-button type="primary">
                    <router-link to="/" class="header-link">返回首页</router-link>
                </el-button>
            </div>
        </el-header>


        <div class="map-container">
            <BMap :tilt="0" :height="850" :center="{ lng: 117.1502, lat: 34.2200 }" :zoom="16" :minZoom="3"
                enableScrollWheelZoom enableDragging />
        </div>

        <div class="map-on">
            <el-card style="width: 400px" shadow="always">
                <p>校园部件展示</p>
                <el-tree style="max-width: 600px" :data="data" show-checkbox node-key="id" :props="defaultProps" />
            </el-card>
        </div>

    </div>
</template>



<style scoped src="../assets/map.css">

</style>