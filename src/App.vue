<template>
  <div id="title">suduko</div>
  <div
    class="wrap theme-light"
    ref="wrap"
  >
    <div
      class="content_wrap"
      v-for="(item,x) in sudukoBox"
      :key="x"
    >
      <suduko-item
        v-for="(block,y) in item"
        :key="y"
        :block="block"
        @swop="swopBox"
      ></suduko-item>
    </div>
  </div>
  <switch-theme
    @cutTheme='cutTheme'
    :curTheme='theme'
  />
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import switchTheme from "./components/switchTheme.vue";
import sudukoItem from "./components/sudukoItem.vue";

interface Box {
  value: number;
  x: number;
  y: number;
}

class Block implements Box {
  value: number;
  x: number;
  y: number;
  constructor(value: number, x: number, y: number) {
    this.value = value;
    this.x = x;
    this.y = y;
  }
}
let arr: number[][] = reactive([
  [1, 2, 3],
  [4, 5, 6],
  [7, 0, 8],
]);
let sudukoBox: Box[][] = reactive([[], [], []]);
// let result=ref('你会玩不啊~');
let targetCoord: Box = reactive({}) as Box;
onMounted(() => {
  // 初始化
  nextTick(() => {
    console.log(document.querySelector(".block"));
  });
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      sudukoBox[i][j] = new Block(arr[i][j], i, j);
      if (sudukoBox[i][j].value == 0) {
        targetCoord = sudukoBox[i][j];
      }
    }
  }
  console.log(sudukoBox);
});
function shake(node) {
  node.classList.add("shake");
  setTimeout(() => {
    node.classList.remove("shake");
  }, 800);
}
function swopBox(block, box) {
  console.log(box);
  if (block.x == targetCoord.x) {
    if (block.y == targetCoord.y + 1 || block.y == targetCoord.y - 1) {
      exchange(block, targetCoord);
    } else {
      shake(box);
    }
  } else if (block.y == targetCoord.y) {
    if (block.x == targetCoord.x + 1 || block.x == targetCoord.x - 1) {
      exchange(block, targetCoord);
    } else {
      shake(box);
    }
  } else {
    shake(box);
  }
}
watch(sudukoBox, () => {
  // console.log(value);
  console.log("改变了");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (sudukoBox[i][j].value == 0) {
        targetCoord = sudukoBox[i][j];
      }
    }
  }
});
function exchange(s: Box, t: Box) {
  let num = sudukoBox[s.x][s.y].value;
  sudukoBox[s.x][s.y].value = sudukoBox[t.x][t.y].value;
  sudukoBox[t.x][t.y].value = num;
}

let wrap: object = ref(null);
let theme = ref("light");
function cutTheme(color: string) {
  theme.value = color;
  if (theme.value == "light") {
    wrap.value.classList.replace("theme-dark", "theme-light");
  } else {
    wrap.value.classList.replace("theme-light", "theme-dark");
  }
}

watch(sudukoBox, () => {
  let str = "";
  sudukoBox.flat().forEach((el) => {
    str += el.value;
  });
  // console.log(arr.flat().reduce((pre, cur) => { console.log(cur); }));
  if (str == "123456780") {
    console.log("成功了");
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
$dark: rgb(44, 54, 79);
$light: rgb(119, 123, 168);
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
.theme-light {
  background-color: $dark;
}

.theme-dark {
  background-color: $light;
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
