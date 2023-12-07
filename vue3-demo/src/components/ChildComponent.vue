<template>
  <div>
    测试组件信息
    <ElButton @click="innerCompFunc">测试嵌套弹窗</ElButton>
    <ElButton @click="close">取消</ElButton>
    <ElButton @click="confirm">确认</ElButton>
    <ElInput v-model="inputValue"></ElInput>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import ChildComponent from './ChildComponent.vue';
import DialogBeta from './DialogDynamticComponent/dialogBeta'
import { h, onMounted, ref, defineProps, defineEmits } from 'vue'
const props = defineProps(["id"])
const emit = defineEmits(["close"])
let inputValue = ref('')
const close = () => {
  console.log("当前取消按钮正在被点击");
  emit("close");
}
const confirm = () => {
  ElMessage.info(`当前弹窗组件内的相关填写信息为--${inputValue.value}----当前内部弹窗三秒后自动关闭`)
  setTimeout(() => { emit("close") }, 3000)
}
const innerCompFunc = () => {
  let win = new DialogBeta();
  win.open({
    title: '测试内部重新调起弹窗',
    children: h(ChildComponent, {
      dataSource: '1',
      onOkay: () => {
      },
      onClose: () => {
        console.log("当前是否到内部嵌套弹窗里面");
        win.close();
      },
    })
  });
}

onMounted(() => {
  console.log("组件内部信息", props.id);
})

</script>
