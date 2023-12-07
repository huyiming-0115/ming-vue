<template>
  <el-dialog append-to-body :title="title" v-model="visible" v-bind="dialogOption">
    <!--     <component
      :is="component"
      v-bind="props"
      @cancel="cancel"
      @confirm="confirm"
    ></component> -->
    <slot></slot>
  </el-dialog>
</template>
<script>
import { ElDialog } from 'element-plus'
let resolve = null;
export default {
  name:'DialogComponent',
  data() {
    return {
      props: {},
      title: "",
      dialogOption: {},
      children: null,
      visible: true,
      onClose: () => { },
    };
  },
  components: { ElDialog },
  methods: {
    open({ title, dialogOption, children, props, onClose }) {
      this.title = title;
      this.dialogOption = dialogOption;
      this.children = children;
      this.props = props;
      this.visible = true;
      this.onClose = onClose;
      console.log("传入的onClose方法", this.onClose);
      return new Promise((resolse, reject) => {
        resolve = resolse;
      });
    },
    confirm(arg) {
      this.close();
      resolve(arg);
    },
    cancel() {
      this.close();
      resolve();
    },
    close() {
      console.log("当前组件外部的关闭事件正在被回调");
      this.visible = false;
      this.$emit("close");
      this.onClose();
      //this.visible = false
    },
  },
};
</script>
