<template>
    <div id="theme-wrap">
        <div class="theme-item light" @click="switchTheme" ref="theme"></div>
        <div class="theme-item github" @click="toGithub"></div>
    </div>
</template>

<script setup>
import {ref,defineEmits,defineProps} from 'vue'
// let themeColor=ref('orange');
let theme=ref();
const emit=defineEmits(['cutTheme']);
const props=defineProps({
    curTheme:{
        type:String
    }
})
console.log(props);
function switchTheme(){
    if(props.curTheme=='light'){
        theme.value.classList.replace('light','dark');
        emit('cutTheme','dark');
    }else{
        theme.value.classList.replace('dark','light');
        emit('cutTheme','light');
    }
}
function toGithub(){
    window.open('https://github.com/mdd-xin/vue-suduko.git')
}
</script>

<style lang="scss" scoped>

#theme-wrap {
    height: 12vh;
    width: 8%;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // transition: width .3s ease-in-out;
    position: relative;

    .theme-item {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 1px solid black;
    }

    // &:hover {
    //     width: 10%;
    // }

    .light {
        background:no-repeat center/100% url('../assets/img/light.png');
    }
    .dark{
        background:no-repeat center/80% url('../assets/img/dark.png');
    }
    .github{
        background:no-repeat center/100% url('../assets/img/github-fill.png');
    }
}
</style>