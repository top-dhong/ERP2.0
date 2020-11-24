<template>
    <div id="global-uploader">

        <!-- 上传 -->
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
				:fileStatusText="fileStatusText"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader-app">
            <uploader-unsupport></uploader-unsupport>

            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

            <uploader-list v-show="panelShow">
                <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
                    <div class="file-title">
                        <h3>相关附件上传列表</h3>
                        <div class="operate">
                            <el-button @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' ">
								<i class="fa" :class="collapse ? 'fa-expand': 'fa-compress'" aria-hidden="true"></i>
                                <!-- <i class="iconfont" :class="collapse ? 'inuc-fullscreen': 'inuc-minus-round'"></i> -->
                            </el-button>
                            <el-button @click="close" type="text" title="关闭">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </el-button>
                        </div>
                    </div>

                    <ul class="file-list"  style="list-style-type:none;">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                        </li>
                        <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
                    </ul>
                </div>
            </uploader-list>

        </uploader>

    </div>
</template>

<script>
    /**
     *   全局上传插件
     *   调用方法：Bus.$emit('openUploader', {}) 打开文件选择框，参数为需要传递的额外参数
     *   监听函数：Bus.$on('fileAdded', fn); 文件选择后的回调
     *            Bus.$on('fileSuccess', fn); 文件上传成功的回调
     */
	//https://www.cnblogs.com/xiahj/p/vue-simple-uploader.html
	//code   0文件上传成功    2001文件上传中   2002文件上传失败     2003秒传文件（通过文件判断服务端是否已存在从而实现“秒传”）  2004文件上传失败
	import util from "@libs/util.js";
    import {ACCEPT_CONFIG} from './js/config.js';
    import Bus from '@assets/js/bus.js';
    import SparkMD5 from 'spark-md5';
	import $ from 'jquery'
    // 这两个是我自己项目中用的，请忽略
    //import {Ticket} from '@/assets/js/utils';
    //import api from '@/api';
    export default {
		name:"deng-uploader",
        data() {
            return {
                options: {
                    target: '/api/UploadFile',//api.simpleUploadURL,
                    chunkSize:1024 * 1024*2,//'2048000',//2m
					forceChunkSize:true,//是否强制所有的块都是小于等于 chunkSize 的值。默认是 false
                    fileParameterName: 'file',//上传文件时文件的参数名，默认file
                    maxChunkRetries: 2,//最大自动失败重试上传次数
                    testChunks: false,   //是否开启服务器分片校验
					//singleFile: true,//单文件上传
					simultaneousUploads:1,
                    // 服务器分片校验函数，秒传及断点续传基础
                    checkChunkUploadedByResponse: function (chunk, message) {
						console.log('message',message)
                        let objMessage = JSON.parse(message);
						if(2003==objMessage.code){
							console.log('接到秒传命令，',objMessage)
							return true
						}
                        // if (objMessage.skipUpload) {
                        //     return true;
                        // }
                        // return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
                    },
                    headers: {
                        //Authorization: "12121212121",//Ticket.get() && "Bearer " + Ticket.get().access_token
						//AToken:util.cookies.get("Token")
                    },
					query() {}
                },
                attrs: {
                    accept: ACCEPT_CONFIG.getAll()
                },
                panelShow: false,   //选择文件后，展示上传panel
                collapse: true,
				fileStatusText:{
					success: '上传完成',
					error: '上传出错',
					uploading: '上传中...',
					paused: '暂停',
					waiting: '等待...'
				}
            }
        },   
        mounted() {
            Bus.$on('openUploader', query => {
                this.params = query || {};
                if (this.$refs.uploadBtn) {
                    $('#global-uploader-btn').click();
                }
            });
        },
        computed: {
            //Uploader实例
            uploader() {
                return this.$refs.uploader.uploader;
            }
        },
        methods: {
			//选取文件后
            onFileAdded(file) {
				//校验选取的文件类型
				let typeName = file.file.name;
				let pointLast = typeName.lastIndexOf(".");
				let suffix = typeName.substring(pointLast,typeName.length)
				if(ACCEPT_CONFIG.getAll().includes(suffix)){
					this.panelShow = true;
					this.computeMD5(file);
					//this.params['GUID'] = util.newGUID()
					Bus.$emit('fileAdded');
					//Bus.$emit("open",{a:111})
					//this.params['GUID'] = util.newGUID()
				}else{
					this.$message({
					    message: `不支持的文件格式[${suffix}]`,
					    type: 'error'
					})
				}
            },
			//文件上传中
            onFileProgress(rootFile, file, chunk) {
                console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
            },
			//文件上传成功
            onFileSuccess(rootFile, file, response, chunk) {
				console.log('onFileSuccess',response)
                let res = JSON.parse(response);
                // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
                // if (!res.result) {
                //     this.$message({ message: res.message, type: 'error' });
                //     // 文件状态设为“失败”
                //     this.statusSet(file.id, 'failed');
                //     return
                // }
				if(0==res.code){
					Bus.$emit('fileSuccess',res);
					//this.statusSet(file.id, 'success');
					//this.$message({ message: res.msg, type: 'success'})
					console.log('文件上传成功');
				}else{
					this.statusSet(file.id, 'failed');
					this.$message({ message: res.msg, type: 'error'})
				}
                // 如果服务端返回需要合并
                // if (res.needMerge) {
                //     // 文件状态设为“合并中”
                //     this.statusSet(file.id, 'merging');
                //     // api.mergeSimpleUpload({
                //     //     tempName: res.tempName,
                //     //     fileName: file.name,
                //     //     ...this.params,
                //     // }).then(res => {
                //     //     // 文件合并成功
                //     //     Bus.$emit('fileSuccess');
                //     //     this.statusRemove(file.id);
                //     // }).catch(e => {});
                // // 不需要合并
                // } else {
                //     Bus.$emit('fileSuccess',this);
                //     console.log('上传成功');
                // }
            },
            onFileError(rootFile, file, response, chunk) {
                this.$message({
                    message: response,
                    type: 'error'
                })
            },
            /**
             * 计算md5，实现断点续传及秒传
             * @param file
             */
            computeMD5(file) {
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                let currentChunk = 0;
                const chunkSize = 10 * 1024 * 1000;
                let chunks = Math.ceil(file.size / chunkSize);
                let spark = new SparkMD5.ArrayBuffer();
                // 文件状态设为"计算MD5"
                this.statusSet(file.id, 'md5');
                file.pause();
                loadNext();							
                fileReader.onload = (e => {
                    spark.append(e.target.result);
                    if (currentChunk < chunks) {
                        currentChunk++;
                        loadNext();
                        // 实时展示MD5的计算进度
                        this.$nextTick(() => {
                            $(`.myStatus_${file.id}`).text('校验中..'+ ((currentChunk/chunks)*100).toFixed(0)+'%')
                        })
                    } else {
                        let md5 = spark.end();					
                        this.computeMD5Success(md5, file);
                        console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                    }
                });
                fileReader.onerror = function () {
                    this.error(`文件${file.name}读取出错，请检查该文件`)
                    file.cancel();
                };
                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
                }
            },
            computeMD5Success(md5, file) {
                // 将自定义参数直接加载uploader实例的opts上
                Object.assign(this.uploader.opts, {
                    query: {
                        ...this.params
                    }
                })
                file.uniqueIdentifier = md5;
                file.resume();
                this.statusRemove(file.id);
            },
            fileListShow() {
                let $list = $('#global-uploader .file-list');
                if ($list.is(':visible')) {
                    $list.slideUp();
                    this.collapse = true;
                } else {
                    $list.slideDown();
                    this.collapse = false;
                }
            },
            close() {
                this.uploader.cancel();
                this.panelShow = false;
            },
            /**
             * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
             * @param id
             * @param status
             */
            statusSet(id, status) {
                let statusMap = {
                    md5: {
                        text: '校验中..',
                        bgc: '#ffffff'
                    },
                    merging: {
                        text: '合并中',
                        bgc: '#ffffff'
                    },
                    transcoding: {
                        text: '转码中',
                        bgc: '#ffffff'
                    },
                    failed: {
                        text: '上传失败',
                        bgc: '#ffffff'
                    },
                    success: {
                        text: '上传完成',
                        bgc: '#ffffff'
                    }
                }
                this.$nextTick(() => {
					$(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
					    'position': 'absolute',
					    'top': '-12px',
					    'left': '-12px',
					    'right': '0',
					    'bottom': '0',
					    'zIndex': '1',
					    'backgroundColor': statusMap[status].bgc
					}).text(statusMap[status].text);
                })
            },
            statusRemove(id) {
                this.$nextTick(() => {
                    $(`.myStatus_${id}`).remove();
                })
            },
            error(msg) {
                this.$notify({
                    title: '错误',
                    message: msg,
                    type: 'error',
                    duration: 2000
                })
            }
        },
        watch: {},
        destroyed() {
            Bus.$off('openUploader');
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    #global-uploader {
        position: fixed;
        z-index: 20;
        right: 15px;
        bottom: 15px;
        .uploader-app {
            width: 520px;
        }
        .file-panel {
			margin-right: 1.5625rem;
            background-color: #fff;
            border: 1px solid #e2e2e2;
            border-radius: 7px 7px 0 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, .2);
            .file-title {
                display: flex;
                height: 40px;
                line-height: 15px;
                padding: 0 15px;
                border-bottom: 1px solid #ddd;
                .operate {
                    flex: 1;
                    text-align: right;
                }
            }
            .file-list {
                position: relative;
                height: 240px;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: #fff;
                > li {
                    background-color: #fff;
                }
            }
            &.collapse {
                .file-title {
                    background-color: #E7ECF2;
                }
            }
        }
        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }
        /deep/.uploader-file-icon {
            &:before {
                content: '' !important;
            }
            &[icon=image] {
                //background: url(./images/image-icon.png);
            }
            &[icon=video] {
                //background: url(./images/video-icon.png);
            }
            &[icon=document] {
                //background: url(./images/text-icon.png);
            }
        }
        /deep/.uploader-file-actions > span {
            margin-right: 6px;
        }
    }
    /* 隐藏上传按钮 */
    #global-uploader-btn {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
	.uploader-file-size {
	  width: 21%;
	  text-indent: 10px;
	}
</style>