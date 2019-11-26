<template>
    <div>
        <div class="player">
            <video-player
                ref="videoPlayer"
                class="video-player vjs-custom-skin"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @timeupdate="onPlayerTimeupdate($event)"
            />
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { videoPlayer } from "vue-video-player";
import "../../node_modules/video.js/dist/video-js.css";
import "../../node_modules/vue-video-player/src/custom-theme.css";

export default {
    name: "Player",
    components: {
        videoPlayer
    },
    props: {
        videoUrl: String,
        state: Boolean
    },
    data() {
        return {
            playerOptions: {
                // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false,
                muted: false,
                loop: false,
                preload: "auto",
                language: "zh-CN",
                aspectRatio: "16:9",
                fluid: true,
                sources: [
                    {
                        type: "video/mp4",
                        src: this.videoUrl // 你的m3u8地址（必填）
                        // src: "/file/lessonMaterial/download?id=319"
                    }
                ],
                // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-3.jpg', // 你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: "此视频暂无法播放，请稍后再试"
            }
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        }
    },
    watch: {
        videoUrl(val) {
            if (val !== "") {
                this.$refs.videoPlayer.player.dispose();
                this.$refs.videoPlayer.player.src(val);
            }
        },
        // 弹出框关闭后暂停 否则一直在播放 state从弹出框组件传值
        state(val) {
            if (val) {
                this.$refs.videoPlayer.player.pause();
            }
        }
    },
    mounted() {},
    methods: {
        onPlayerPlay() {
            // console.log('play')
        },
        onPlayerPause() {
            // console.log('pause')
        },
        onPlayerTimeupdate(player) {
            // this.playerCtrl.currentTime = timeUtil.secondToDate(player.currentTime());
            // this.playerCtrl.currentTimeInt = Math.floor(player.currentTime());
            // console.log('当前音量', player.volume());
            // console.log('当前音量', player.currentTime());
        }
    }
};
/* eslint-disable */
</script>

<style type="text/css" scoped>
.player {
    height: 400px;
}

.container {
    background-color: #efefef;
    min-height: 100%;
}

.video-player {
    height: 50px;
}
</style>
