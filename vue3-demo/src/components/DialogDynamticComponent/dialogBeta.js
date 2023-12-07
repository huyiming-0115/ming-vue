import { createApp, h } from 'vue'
import dialog from './dialogBetaComponent.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ElMessage} from 'element-plus'

class Dialog {

    mountNode = undefined
    Instance = undefined

    open(options) {
        this.mountNode = document.createElement('div')
        console.log("当前点击open方法传入的相关参数信息==>", options)
        const el = h(dialog, {
            title: options.title,
            options: options.children.props,
            zIndex: options.zIndex,
            onClose: () => {
                console.log("beta内部是否调用了相关销毁方法", options)
                options.children.props.onClose()
            }
        }, { default: () => options.children }/* props.children */)

        console.log("当前生成的元素信息展示==>", el);
        this.Instance = createApp(el)
        document.body.appendChild(this.mountNode)
        
        this.Instance.use(ElementPlus)
        this.Instance.$message = ElMessage
        this.Instance.mount(this.mountNode)
    }

    close() {
        console.log("当前可能是通过回调函数调用的销毁方法");
        this.clearNode()

    }

    clearNode() {

        this.Instance.unmount(this.mountNode)
        document.body.removeChild(this.mountNode)

        //mountNode = undefined
    }




}

export default Dialog