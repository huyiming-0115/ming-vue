import component from './dialogComponent.vue'
import { h, render } from "vue"


class Dialog {
  instance = null;
  open(props) {
    this.container = document.createElement("div")
    console.log("props =>", props)

    document.body.appendChild(this.container)

    const el = h(component, {
      title: props.title,
      zIndex: props.zIndex,
      onClose: () => {
        console.log('关闭时调用方法==>',props.children)
        props.children.props.onClose()
      }
    }, { default: () => props.children }/* props.children */)
    render(el, this.container)
  }
  close() {
    if (this.container != undefined) {
      document.body.removeChild(this.container)
    }
    this.container = undefined

  }
}

export default Dialog