<template>
  <div
    :class="{'block':'true','target_block':props.block.value==0}"
    @click="swop(props.block,blockBox)"
    ref="blockBox"
  >
    {{props.block.value}}
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {Box} from '../utils/Block'
const props = defineProps({
  block: Object as ()=>Box,
});
const emits = defineEmits(["swop"]);
function swop(block:Box,box:HTMLDivElement) {
  emits("swop", block, box);
}
let blockBox = ref(null);
let config = {
    characterData: true,
    characterDataOldValue: true,
    subtree: true,
  };
  let mo = new MutationObserver((mutationList:MutationRecord[]) => {
    for (let mutation of mutationList) {
      if (mutation.type == "characterData") {
        blockBox.value.innerText = mutation.oldValue;
      }
    }
  });
onMounted(() => {
  mo.observe(blockBox.value, config);
});
onUnmounted(()=>{
  mo.disconnect();
})
</script>

<style lang="scss" scoped>
</style>