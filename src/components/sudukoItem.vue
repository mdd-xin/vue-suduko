<template>
  <!-- bolck对象 -->
  <div
    :class="{'block':'true','target_block':props.block.value==0}"
    @click="swop(props.block)"
    ref="block"
  >
    {{props.block.value}}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
const props = defineProps({
  block: Object,
});
const emits = defineEmits(["swop"]);
function swop(block) {
  emits("swop", block);
}
let block = ref(null);
onMounted(() => {
  let config = {
    characterData: true,
    characterDataOldValue: true,
    subtree: true,
  };
  let mo = new MutationObserver((mutationList, observer) => {
    for (let mutation of mutationList) {
      console.log(mutation);
      if (
        mutation.type == "characterData" &&
        mutation.target.data != mutation.oldValue
      ) {
        block.value.innerText = mutation.oldValue;
      }
    }
  });
  mo.observe(block.value, config);
});
</script>

<style lang="scss" scoped>
</style>