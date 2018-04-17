/**
 * 使用方法 <view-img :img-src="" @clickShow=""></view-img>
 */
const imgViewer = {
    utils:null,//写一些install用到的工具方法
    install(vm, options) {
        vm.component('img-viewer', {
            //接口
            props: {
                imgSrc: {
                    type: String
                },
                isShow: {
                    type: Boolean,
                    default: false
                },
                width: {
                    type: String,
                    default: '60%'
                }
            },
            data() {
                return {
                    style: {
                        scale:'scale(0, 0)'//默认值
                        ,scaleTime: 'all .5s'
                    }
                }
            },
            methods: {
                /**
                 * 切换显示状态时， 初始化样式
                 */
                toggleStyle() {
                    document.body.style.overflow = this.isShow ?
                        'hidden' :
                        null;
                    this.isShow ? null : this.style.scale = 'scale(0, 0)'
                },
                /**
                 * 父子交互接口
                 */
                clickShow() {
                    
                    this.$emit('clickShow', !this.isShow);
                },
                /**
                 * 阻止冒泡
                 * @param {event} e 
                 */
                stopPropg(e){
                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                },
                /**
                 * 延时改变样式加载动画
                 */
                transTimeout(){
                    if (!this.isShow) return;
                    if(window.scaleTimer)clearTimeout(window.scaleTimer);
                    window.scaleTimer = setTimeout(() => {
                        this.style.scale = 'scale(1, 1)';
                    }, 100)
                }
            },
            render(h) {
                const self = this;
                const imgsrc = self.imgSrc,
                    clickShow = self.clickShow;

                self.toggleStyle();//无论isShow是否为true 都需要toggle
                if (!self.isShow) return;
                self.transTimeout();//isShow 为true 动态改样式
                return h('div',

                    // {Object}
                    // 一个包含模板相关属性的数据对象
                    // 这样，您可以在 template 中使用这些属性。可选参数。
                    {
                        class:{

                        },
                        style: {
                            position    : 'fixed'
                            ,overflow    : 'hidden'
                            ,top     : 0
                            ,left    : 0
                            ,right   : 0
                            ,bottom  : 0
                            ,'z-index'   : 1001
                            ,'background': 'rgba(0, 0, 0, .4)'
                            ,transition  : self.style.scaleTime
                            ,'-moz-transition'   :  self.style.scaleTime /* Firefox 4 */
                            ,'-webkit-transition':  self.style.scaleTime /* Safari and Chrome */
                            ,'-o-transition'     :  self.style.scaleTime /* Opera */
                            ,transform      : self.style.scale
                            ,'-ms-transform':self.style.scale	/* IE 9 */
                            ,'-moz-transform'    :self.style.scale 	/* Firefox */
                            ,'-webkit-transform' :self.style.scale/* Safari 和 Chrome */
                            ,'-o-transform'      :self.style.scale 	/* Opera */
                        },
                        on: {
                            'click': clickShow
                        }
                    },

                    // {String | Array}
                    // 子节点 (VNodes)，由 `createElement()` 构建而成，
                    // 或使用字符串来生成“文本节点”。可选参数。
                    [
                        h('img', {
                            style: {
                                width   : self.width
                                ,position   : 'absolute'
                                ,top    : '50%'
                                ,left   : '50%'
                                ,transform  : 'translate(-50%, -50%)'
                            },
                            attrs: {
                                src: imgsrc
                            },
                            on: {
                                'click': self.stopPropg
                            }
                        }, ),
                        //   h('span', {
                        //     props: {
                        //       someProp: 'foobar'
                        //     }
                        //   })
                    ])
            }
        })


        // vm.prototype.$view_img = {
        //     // vm.test();
        //     show: () => {
        //         document.body.style.overflow = 'hidden';
        //         console.log(vm.$methods)
        //         vm.show();
        //     },
        //     hide: () => {
        //         document.body.style.overflow = null;                                        
        //         vm.hide();
        //     }
        // }
    }

}
export default imgViewer