<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <p><el-button type="primary">测试弹窗按钮</el-button></p>
    <p><el-button type="primary">测试弹窗按钮</el-button></p>
    <p><el-button type="primary" @click="dialogBetaFunc">测试弹窗按钮CreateApp</el-button></p>
    <p><el-button type="primary" @click="dialogDynamticFunc">测试2023-12-06组件抽取函数按钮</el-button></p>
  </div>
</template>

<script >
import ChildComponent from './ChildComponent.vue'
import Dialog from './DialogDynamticComponent/dialog'
import DialogBeta from './DialogDynamticComponent/dialogBeta'
import { h } from 'vue'
export default {
  name: "HelloWorld",

  props: {
    msg: String,
  },
  methods: {
    dialogBetaFunc() {
      let win = new DialogBeta()
      win.open({
        title: '测试弹窗',
        children: h(ChildComponent, {
          id: '1',
          onOkay: () => {

          },
          onClose: () => {
            win.close()
          },
        })
      })
    },
    dialogDynamticFunc() {
      let win = new Dialog()
      win.open({
        title: '选择用户',
        dialogOption: { width: '600px' },
        children: h(ChildComponent, {
          dataSource: '1',
          onOkay: () => {

          },
          onClose: () => {
            console.log("当前是否到helloworld里面");
            win.close()
          },
        }),
        props: {
          id: 1
        },
        onClose: () => {
          win.close()
          console.log("当前正在进行关闭操作")
        }
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
