<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import xiaohui1 from "../assets/img/xiaohui1.png";
    import xiaohui2 from "../assets/img/xiaohui2.png";

    const handleScroll = () => {
        let header = document.querySelector('.el-header');
        let logoP = document.getElementById('logo');
        let start = document.querySelector('.header-link');
        if (window.scrollY > 0) {
            header.style.backgroundColor = '#fff';
            start.style.color = '#000';
            document.getElementById('logo').src = xiaohui2;
        } else {
            header.style.backgroundColor = 'transparent';
            start.style.color = '#fff';
            document.getElementById('logo').src = xiaohui1;
        }
    };

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll);
    });

    onMounted(() => {
        window.addEventListener("scroll", reveal);
    });

    const reveal = () => {
        let reveals = document.querySelectorAll(".page-right");
        let reveals1 = document.querySelectorAll(".page-left img");
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let revealTop = reveals[i].getBoundingClientRect().top;
            let revealPoint = -250;
            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add("active");
                reveals1[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
                reveals1[i].classList.remove("active");
            }
        }
    };
</script>



<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="header-left">
                    <img id="logo" src="../assets/img/xiaohui1.png" />
                    <p>校园地图信息管理平台</p>
                </div>
                <div class="header-right">
                    <el-button type="primary">
                        <router-link to="/map" class="header-link">现在开始</router-link>
                    </el-button>
                </div>
            </el-header>
            <el-carousel interval="3500" indicator-position="outside" height="700px" trigger="click" motion-blur>
                <el-carousel-item v-for="item in 3" :key="item">
                </el-carousel-item>
            </el-carousel>

            <div class="main-page">
                <div class="first-page">
                    <div class="page-left">
                        <img src="../assets/img/map.png" alt="">
                    </div>
                    <div class="page-right">
                        <h1>中国矿业大学校园地图信息管理平台</h1>
                        <p>利用RTK获取校园标志物点坐标，并进行内业处理，实现标志物可视化</p>
                        <p>标志物如：电力井盖、热力井盖、网络井盖、消防设施、路灯等</p>
                        <div class="page-right-icons">
                            <img src="../assets/icons/电力井盖.png">
                            <img src="../assets/icons/热力井盖.png">
                            <img src="../assets/icons/路灯.png">
                            <img src="../assets/icons/消防设施.png">
                            <img src="../assets/icons/省略.png">
                        </div>
                        <el-button type="primary">
                            <router-link to="/map" class="custom-link">现在开始</router-link>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>中国矿业大学地信劳动教育实践</p>
                <p>外业组：蔡浩天，张倩，周迅，李奕辰，左广煜，王鹤瑾，杨铭，李玉栋</p>
                <p>内业组：谢思雨，张秦羽，马骁</p>
            </div>
        </el-container>
    </div>
</template>

<style scoped src="../assets/home.css"></style>