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
import { onMounted, ref } from "vue";
const props = defineProps({
  block: Object,
});
const emits = defineEmits(["swop"]);
function swop(block) {
  emits("swop", block, blockBox.value);
}
let blockBox = ref(null);
onMounted(() => {
  let config = {
    characterData: true,
    characterDataOldValue: true,
    subtree: true,
  };
  let mo = new MutationObserver((mutationList) => {
    for (let mutation of mutationList) {
      console.log(mutation);
      if (
        mutation.type == "characterData" &&
        mutation.target.data != mutation.oldValue
      ) {
        blockBox.value.innerText = mutation.oldValue;
      }
    }
  });
  mo.observe(blockBox.value, config);
});
</script>

<style lang="scss" scoped>
</style>