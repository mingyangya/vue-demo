<template>
    <div class="tree font14">
        <div class="item">
            <div class="title">
                <div :class="['select selectItem','active_'+ctrlAll1]" :data-id="treedata.id"
                     @click="switchSectionActive(ctrlAll1,ctrlAll2)"></div>
                <span class="name">{{treedata.name}}</span>
                <div class="num">
                    <div class="text">{{treedata.chapter.length}}个</div>
                    <div @click='toggle'>{{down}}</div>
                </div>
            </div>
            <div class="list" v-for="(item,i) in treedata.chapter" :key="i" v-show="open">
                <div class="deviceItem">
                    <div class="title">
                        <div :class="['select selectDevice','active_'+ctrlAll2[i]]" :data-id="item.id"
                             @click="switchItemActive(ctrlAll1,ctrlAll2,i)"></div>
                        <span class="name">{{item.name}}</span>
                        <span class="num"> <span class="text">({{item.section.length}})</span> </span>
                        <div class="down" @click='toggleChild'>{{downChild}}</div>
                    </div>
                    <div class="ul" v-show="openChild">
                        <div class="li" v-for="(itemLable,j) in item.section" :key="j">
                            <div :class="['select selectSection',itemLable.action==='publish'?'active':'']"
                                 :data-id="itemLable.id" @click="switchActive(itemLable.action,i,j)"></div>
                            <span>{{itemLable.name}}</span>
                            <span class="duration">{{Math.round(itemLable.duration/60)+' min'}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tree",
        data() {
            return {
                treedata: this.itemData,
                ctrlAll1: 1,//一级全选 0,1,2 全选、全不选、部分选择
                ctrlAll2: [], //二级全选
                SectionAction: false,
                open:true,
                down:'▼',
                openChild:true,
                downChild:'﹀',
            }
        },
        props: {
            itemData: {
                type: Object,
                default() {
                    return {
                        id: '',
                        name: '',
                        chapter: []
                    }
                }
            },
            itemIndex: 0,
        },
        watch:{
            itemData (newVal) {
                this.treedata = newVal
            }
        },
        mounted() {
            this.initState();
        },
        methods: {
            toggleChild(){
                this.openChild = !this.openChild;
                if( this.openChild ){
                    this.downChild='﹀'
                }else {
                    this.downChild='︿'
                }
            },
            toggle(){
                this.open = !this.open;
                if( this.open ){
                    this.down='▼'
                }else {
                    this.down='▲'
                }
            },
            initState(status = 0) {
                //初始化 状态
                let _treedata = this.treedata && this.treedata.chapter;
                console.log( _treedata );
                _treedata.forEach((item, index) => {
                    const _section = item && item.section,
                        all = _section.length || 0;

                    let publicNum = 0; //发布节的个数

                    // 处理 二节点的发布状态
                    _section.forEach(itemJ => {
                        if (itemJ.action === 'publish') {
                            publicNum++;
                        }
                    });

                    if (all === 0) {
                        // 没有2节点
                        this.ctrlAll2.splice(index, 1, 0); // 不可选择
                    } else {
                        if (publicNum === 0) {
                            // 全部未发布
                            this.ctrlAll2.splice(index, 1, 0)
                        } else if (publicNum === all) {
                            // 全部发布
                            this.ctrlAll2.splice(index, 1, 1)
                        } else {
                            // 部分发布
                            this.ctrlAll2.splice(index, 1, 2)
                        }

                    }
                });
                let publicSum = 0,
                    unpublishSum = 0,
                    allNum = this.ctrlAll2.length;

                this.ctrlAll2.forEach((item) => {
                    if (item === 1) {
                        // 全部发布
                        publicSum++;
                    } else if (item === 0) {
                        unpublishSum++;
                    }
                });

                if (publicSum === allNum) {
                    // 一节点全部发布
                    this.ctrlAll1 = 1;
                } else if (unpublishSum === allNum) {
                    // 一节点全部未发布
                    this.ctrlAll1 = 0;
                } else {
                    // 一节点部分发布
                    this.ctrlAll1 = 2;
                }
            },
            switchSectionActive(val, val2) {
                console.log('切换一级', val, val2);
                // 一级菜单
                switch (val) {
                    case 0:
                    case 2:
                        this.ctrlAll1 = 1;
                        val2.forEach((item, i) => {
                            this.$set(this.ctrlAll2, i, 1)
                        });
                        break;
                    case 1:
                        this.ctrlAll1 = 0;
                        val2.forEach((item, i) => {
                            this.$set(this.ctrlAll2, i, 0)
                        });
                        break;
                }

                this.handleOneSelect(this.ctrlAll1 === 1 ? "publish" : "unpublish");

            },
            switchItemActive(val, val2, index) {

                //二级菜单
                console.log('二级切换：', status, index);

                const _status = val2[index];

                let result = '';

                switch (_status) {
                    case 0:
                    case 2:
                        result = 'publish';
                        break;
                    case 1:
                        result = 'unpublish';
                        break;
                }
                // 二级菜单
                this.handleSecondSelect(result, index);
                // 变化 一二节点的状态
                this.initState(_status === 1 ? 0 : 1);
            },
            switchActive(status, parentIndex, index) {
                console.log('三级切换：', status, index);
                // 三级菜单
                this.handleThirdSelect(status === 'publish' ? 'unpublish' : 'publish', parentIndex, index);
                // 变化 一二节点的状态
                this.initState();
            },

            handleOneSelect(status) {
                // 处理 一节点全选、全不选
                const _treedataList = this.treedata && this.treedata.chapter;
                let newData = _treedataList.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        section: item &&
                            item.section &&
                            item.section.map((itemJ) => {
                                return {
                                    id: itemJ.id,
                                    name: itemJ.name,
                                    action: status,
                                    duration: itemJ.duration
                                }
                            })
                    }
                });
                this.$set(this.treedata, 'chapter', newData);
                this.$emit('update-data', this.itemIndex, this.treedata);
            },
            handleSecondSelect(status, index) {
                // 处理 二节点全选、全不选
                // 处理 一节点全选、全不选
                const _treedataList = this.treedata && this.treedata.chapter;
                let newData = _treedataList.map((item, i) => {
                    if (index === i) {
                        return {
                            id: item.id,
                            name: item.name,
                            section: item &&
                                item.section &&
                                item.section.map((itemJ) => {
                                    return {
                                        id: itemJ.id,
                                        name: itemJ.name,
                                        action: status,
                                        duration: itemJ.duration,
                                    }
                                })
                        }
                    } else {
                        return {
                            id: item.id,
                            name: item.name,
                            section: item && item.section
                        }
                    }
                });
                this.$set(this.treedata, 'chapter', newData);
                this.$emit('update-data', this.itemIndex, this.treedata);
            },
            handleThirdSelect(status, parentIndex, index) {
                // 处理 三节点全选、全不选
                const _treedataList = this.treedata && this.treedata.chapter;
                const section = _treedataList[parentIndex] && _treedataList[parentIndex].section;
                section && (section[index].action = status);
                this.$set(this.treedata, 'chapter', _treedataList);
                console.log('修改后的数据：', this.treedata.chapter);

                this.$emit('update-data', this.itemIndex, this.treedata);
            },
        }
    }
</script>

<style scoped lang="scss">
    .tree {
        width: 100%;
        .item {
            padding-left: 20px;
            padding-right: 20px;
            width: 100%;
            margin-top: 10px;
            box-sizing: border-box;
            .title {
                width: 100%;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid rgba(90, 166, 166, 0.26);
                .select {
                    float: left;
                    border: 1px solid #f3c080;
                    width: 20px;
                    height: 10px;
                    border-radius: 4px;
                    margin: 9px 5px 0 -20px;
                    cursor: pointer;
                }
                .name {
                    color: #82E8E8;
                    float: left;
                }
                .num {
                    font-size: 13px;
                    float: right;
                    width: 55px;
                    height: 30px;
                    line-height: 30px;
                    .text {
                        font-size: 13px;
                        float: left;
                        width: 35px;
                    }
                    .down {
                        float: left;
                        cursor: pointer;
                    }
                }

            }
            .list {
                width: 100%;
                overflow: hidden;
                .deviceItem {
                    width: 100%;
                    overflow: hidden;
                    .title {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        position: relative;
                        margin-top: 5px;
                        float: left;
                        .select {
                            float: left;
                            border: 1px solid #f3c080;
                            width: 12px;
                            height: 10px;
                            border-radius: 4px;
                            margin: 9px 5px 0 0;
                            cursor: pointer;
                        }
                        .down {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 20px;
                            height: 30px;
                            text-align: center;
                            line-height: 35px;
                            cursor: pointer;
                        }
                    }
                    .ul {
                        width: 100%;
                        float: left;
                        padding-left: 20px;
                        .li {
                            width: 100%;
                            height: 30px;
                            line-height: 30px;
                            cursor: pointer;
                            padding-left: 5px;
                            .duration {
                                float: right;
                                margin-right: 25px;
                                font-size: 12px;
                            }
                            .select {
                                float: left;
                                border: 1px solid #f3c080;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                margin: 9px 5px 0 0;
                                cursor: pointer;
                            }
                        }
                    }
                }

            }
        }
    }

    .tree > .item > .title > .select,
    .tree > .item > .list > .deviceItem > .title > .select,
    .tree > .item > .list > .deviceItem > .ul > .li > .select {
        &.active {
            background-color: #f60;
        }

        &.active_0 {
            background-color: transparent;
        }

        &.active_1 {
            background-color: #f60;
        }

        &.active_2 {
            background-color: #ef9f26;
        }
    }


</style>
