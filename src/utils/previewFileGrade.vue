<template>
    <div>
        <div v-if="isPdf">
            <iframe
                :src="curFileUrl"
                type="application/x-google-chrome-pdf"
                width="100%"
                height="624"
            />
        </div>

        <!-- height:400px -->
        <div v-if="isPic" style="text-align:center;height:300px">
            <img
                :src="curImgUrl"
                style="display:inline-block; max-width: 100%"
            />
        </div>
        <div v-if="isPlayer">
            <player :video-url="videoUrl" :state="state" />
        </div>
        <!--<div-->
        <!--v-if="isUnsupport"-->
        <!--class="promptText"-->
        <!--&gt;-->
        <!--{{ $t("message.file_not_view") }}-->
        <!--</div>-->
    </div>
</template>
<script>
/* eslint no-param-reassign: ["error", { "props": false }] */
import PDFJS from "pdfjs-dist";
import utilMethods from "@/utils/utilMethods";
import player from "@/utils/player.vue";
// import pdf from 'vue-pdf'
// import pdfjs from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";

export default {
    name: "PrevieFile",
    components: {
        player
        // pdf,
        // pdfjs
    },
    props: {
        // 带有默认值的对象
        propObj: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            baseUrl: process.env.FILE_PRE_SERVER,
            fileTypeData: utilMethods.fileTypeData,
            isPdf: false,
            isPic: false,
            isPlayer: false,
            isUnsupport: false,
            state: false,
            curImgUrl: "",
            curFileUrl: "",
            videoUrl: "",
            currentPage: 0,
            pageCount: 0
        };
    },
    computed: {
        fileType() {
            return this.propObj.testType;
        },
        fileUrl() {
            return this.propObj.testUrl;
        }
    },
    watch: {
        propObj: {
            handler(newName, oldName) {
                console.log((newName, oldName));
                this.initView();
            },
            deep: true
        }
    },
    created() {
        this.initView();
    },

    mounted() {},
    methods: {
        dakai() {},
        initView() {
            if (
                this.fileTypeData.pdfList.indexOf(this.fileType) > -1 ||
                this.fileTypeData.pptList.indexOf(this.fileType) > -1 ||
                this.fileTypeData.excelList.indexOf(this.fileType) > -1 ||
                this.fileTypeData.docList.indexOf(this.fileType) > -1
            ) {
                this.isPic = false;
                this.isPlayer = false;
                this.isPdf = true;
                this.state = false;
                this.isUnsupport = false;
                const tempUrl = `${process.env.NODE_ENV}/docPreview?fileId=${this.fileUrl}`;
                console.log("tempUrl", tempUrl);
                this.curFileUrl = tempUrl;
            } else if (this.fileTypeData.imgList.indexOf(this.fileType) > -1) {
                this.isPdf = false;
                this.isPlayer = false;
                this.isPic = true;
                this.state = false;
                this.isUnsupport = false;
                this.curImgUrl = this.baseUrl + this.fileUrl;
            } else if (this.fileTypeData.mp4List.indexOf(this.fileType) > -1) {
                this.isPdf = false;
                this.isPic = false;
                this.isPlayer = true;
                this.isUnsupport = false;
                const tempUrl = `${process.env.NODE_ENV}/docPreview?fileId=${this.fileUrl}`;
                this.videoUrl = tempUrl;
                this.state = true;
            } else {
                this.isPdf = false;
                this.isPic = false;
                this.isPlayer = false;
                this.isUnsupport = true;
            }
        },
        linkDownload() {
            const tempUrl = `${process.env.NODE_ENV}/docPreview?fileId=${this.fileUrl}`;
            console.log("tempUrl", tempUrl);
            this.curFileUrl = tempUrl;
            window.open(tempUrl, "_blank"); // 新窗口打开外链接
        }
        // 切换页码时
        // changePdfPage(val) {
        //     if (val === 0 && this.currentPage > 1) {
        //         this.currentPage--;
        //     }
        //     if (val === 1 && this.currentPage < this.pageCount) {
        //         this.currentPage++;
        //     }
        // },
        // // pdf加载时
        // loadPdfHandler(e) {
        //     this.currentPage = 1; // 加载的时候先加载第一页
        // },
    }
};
</script>

<style type="text/css" scoped>
.promptText {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #f17e26;
}
</style>
