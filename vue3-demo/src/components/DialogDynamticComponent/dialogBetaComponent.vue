<template>
    <el-dialog @close="closeDialog" destroy-on-close append-to-body :title="title" v-model="visible" v-bind="dialogOption">
        <slot></slot>
    </el-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, defineExpose } from 'vue';
let title = '测试弹窗名称'
const emit = defineEmits(["close"])
const props = defineProps(["options"])
let visible = ref(true)
let dialogOption = {
    width: '600px'
}
const closeDialog = () => {
    console.log("当前el-dialog正在被关闭");
    emit("close")
    visible.value = false
}

const onClose = () => {
    console.log("当前是否回调了这里");
}

onMounted(() => {
    console.log("是否获取了组件传递进来的值", props.options)
    // component.value = props.options.children
})
defineExpose({ onClose })
</script>

<style scoped lang="scss"></style>