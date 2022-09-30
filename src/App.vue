<template>
  <div id="title">suduko</div>
  <div class="wrap theme-light" ref="wrap">
    <div class="content_wrap" v-for="(item,x) in arr" :key="x">
      <div :class="{'block':'true','target_block':block.value==0}" v-for="(block,y) in item" :id="'item-'+x+y"
        @click="moveBlock(block)" :key="y">
        <!-- {{x}}{{y}} -->
        {{block.value}}
      </div>
    </div>
  </div>
  <switch-theme @cutTheme='cutTheme' :curTheme='theme'/>
</template>

<script setup>
import {ref,reactive, watch, onMounted, watchEffect } from 'vue';
import switchTheme from './components/switchTheme.vue';
class Block {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.el = document.querySelector(`#item-${this.x}${this.y}`);
  }
  shake() {
    this.el.classList.add('shake');
    setTimeout(() => {
      this.el.classList.remove('shake');
    }, 800)
  }
}
let arr = reactive([
  [1, 2, 3],
  [4, 5, 6],
  [7, 0, 8],
])
// let result=ref('你会玩不啊~');
let targetCoord = reactive({})

onMounted(() => {
  watchEffect(() => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (typeof arr[i][j] == 'number') {
          arr[i][j] = new Block(arr[i][j], i, j);
        }
        if (arr[i][j].value == 0) {
          targetCoord = arr[i][j];
        }
      }
    }
  })
})

function exchange(s, t) {
  let num = arr[s.x][s.y].value;
  arr[s.x][s.y].value = arr[t.x][t.y].value;
  arr[t.x][t.y].value = num;
}

function moveBlock(block) {
  if (block.x == targetCoord.x) {
    if (block.y == targetCoord.y + 1 || block.y == targetCoord.y - 1) {
      exchange(block, targetCoord)
    } else {
      block.shake();
    }
  }
  else if (block.y == targetCoord.y) {
    if (block.x == targetCoord.x + 1 || block.x == targetCoord.x - 1) {
      exchange(block, targetCoord)
    } else {
      block.shake();
    }
  }
  else {
    block.shake();
  }
}
let wrap=ref(null);
let theme=ref('light')
function cutTheme(color){
  theme.value=color;
  if(theme.value=='light'){
    wrap.value.classList.replace('theme-dark','theme-light');
  }else{
    wrap.value.classList.replace('theme-light','theme-dark');
  }
}

watch(arr, () => {
  let str = ''
  arr.flat().forEach(el => { str += el.value })
  // console.log(arr.flat().reduce((pre, cur) => { console.log(cur); }));
  if (str == '123456780') {
    console.log('成功了');
  }
})
</script>

<style>
  * {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.wrap {
  height: 300px;
  width: 300px;
  background-color: dark;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px auto;
}
// switch theme
.theme-light{
  background-color: rgb(119, 123, 168);
}

.theme-dark{
  background-color: rgb(44,54,79);
}

.content_wrap {
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content_wrap:nth-child(2) {
  margin: 10px 0;
}

.block {
  font-size: 3em;
  flex: 1 1 auto;
  height: 100%;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.block:nth-child(2) {
  margin: 0 10px;
}

.target_block {
  opacity: 0.6;
}

.shake {
  animation: shake 800ms ease-in-out;
}

#title {
  width: 100%;
  text-align: center;
  margin: 15px 0;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(+2px, 0, 0);
  }

  30%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(+4px, 0, 0);
  }

  50% {
    transform: translate3d(-4px, 0, 0);
  }
}
</style>
