<template>
    <div class="emes-dialog">
        <div class="mask" :style="{ 'z-index': zIndex }">
            <div class="window" :style="{ left: position[0] + 'px', top: position[1] + 'px' }">
                <div class="drag-box" @mousedown="onDragMouseDown"></div>
                <div class="title">
                    <div class="title-content">
                        <span>{{ title }}</span>
                        <!--               <EmesIcon class="close" type="icon-close" size="normal" color="#FFFFFF" @click.stop="onCloseClick">
              </EmesIcon> -->
                    </div>
                </div>
                <div class="empty-row"></div>
                <div class="content">
                    <slot></slot>
                </div>
                <div class="empty-row"></div>
            </div>
        </div>
    </div>
</template>
<script>
/*   import { Options, Emit, Prop, Vue } from 'vue-property-decorator'
  import EmesIcon from '../../icon/EmesIcon' */

/**
 * EmesDialogWindow  弹窗组件
 * 保证窗体路径=> div[class=emes-dialog]->div[class=mask]->div[class=window]
 */

export default {
    name: 'dialogDiyComponent',
    props: {
        title: {
            type: String,
            default: ''
        },
        zIndex: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            position: [0, 0],
            size: [0, 0]
        }
    },
    methods: {
        /**
         * 拖动事件处理
         * @param down_event 事件
         */
        onDragMouseDown(down_event) {
            const vueIns = this

            const origin = [down_event.clientX - down_event.offsetX, down_event.clientY - down_event.offsetY]
            console.log("down_event =>", down_event, origin)

            document.onmousemove = function (move_event) {
                let moveX = origin[0] + (move_event.clientX - down_event.clientX)
                let moveY = origin[1] + (move_event.clientY - down_event.clientY)

                if (0 >= moveX) {
                    moveX = 0
                }
                if (0 >= moveY) {
                    moveY = 0
                }
                vueIns.position = [moveX, moveY]
            }
            document.onmouseup = function () {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    },

    /**
     * 初始加载设置大小和位置
     */
    mounted() {
        if (this.$el && this.$el.children[0] && this.$el.children[0].children[0]) {
            this.size = [this.$el.children[0].children[0].clientWidth, this.$el.children[0].children[0].clientHeight]
            const positon = [(window.innerWidth - this.size[0]) / 2, (window.innerHeight - this.size[1]) / 2]
            this.position = [positon[0] <= 0 ? 0 : positon[0], positon[1] <= 0 ? 0 : positon[1]]
        }
    }
}
</script>
<style lang="less" scoped>
// 弹窗遮罩大小
@emes-dialog-mask-size: 100%;

@emes-dialog-border-radius: 24px;

// 默认间隔大小
@emes-dialog-content-split-size: 24px;

// 标题高度
@emes-dialog-head-height: 50px;
// 图标大小
@emes-dialog-icon-size: 18px;

@emes-dialog-title-font-size: 18px;

@emes-dialog-title-background-color: #1569AC;

.emes-dialog {
    .mask {
        position: fixed;
        width: @emes-dialog-mask-size;
        height: @emes-dialog-mask-size;
        left: 0px;
        top: 0px;
        background-color: rgba(75, 75, 75, 0.4);
        z-index: inherit;
        overflow: auto;
        user-select: none;
    }

    // .mask-no-drag {
    //   display: flex;
    //   align-items: center;

    //   .window {
    //     position: relative;
    //     margin: 0 auto;
    //   }
    // }

    // .mask-has-drag {
    //   .window {
    //     position: absolute;
    //     margin: unset;
    //   }
    // }

    .window {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: inherit;
        background-color: #ffffff;
        border-radius: @emes-dialog-border-radius;
        min-width: min-content;
        min-height: min-content;
    }

    .title {
        height: @emes-dialog-head-height;
        width: @emes-dialog-mask-size;
        line-height: @emes-dialog-head-height;
        border-radius: @emes-dialog-border-radius @emes-dialog-border-radius 0 0;
        background-color: @emes-dialog-title-background-color;
        font-size: @emes-dialog-title-font-size;
        color: #ffffff;
        letter-spacing: 2px;
        user-select: none;

        .title-content {
            height: @emes-dialog-head-height;
            width: calc(@emes-dialog-mask-size - @emes-dialog-content-split-size * 2);
            margin: 0 auto;
        }

        .close {
            float: right;
            margin-top: calc((@emes-dialog-head-height - @emes-dialog-icon-size) / 2);
            cursor: pointer;
        }
    }

    .drag-box {
        background-color: transparent;
        cursor: all-scroll;
        position: absolute;
        width: calc(100%);
        border-radius: @emes-dialog-border-radius @emes-dialog-border-radius 0 0;
        top: 0;
        left: 0;
        height: 50px;
    }

    .content {
        margin-left: @emes-dialog-content-split-size;
        margin-right: @emes-dialog-content-split-size;
        line-height: 20px;
    }


    .empty-row {
        height: @emes-dialog-content-split-size;
    }
}
</style>