<template>
    <!--eslint-disable-->
    <div class="particles-wave-wrap" />
    <!--eslint-disable no-new-->
</template>

<script>
/*eslint-disable*/
import * as THREE from "three";

// refers to https://github.com/timoxley/threejs/blob/master/examples/canvas_particles_waves.html
export default {
    props: {
        separation: {
            type: Number,
            default: 100
        },
        amountX: {
            type: Number,
            default: 50
        },
        amountY: {
            type: Number,
            default: 50
        }
    },
    mounted() {
        this.init();
    },

    destroyed() {
        this.onDestroy();
    },
    methods: {
        init() {
            this.onDestroy();
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.winHalfX = width / 2;
            this.winHalfY = height / 2;
            this.count = 0;
            this.mouseX = 0;
            this.mouseY = 0;

            this.camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                1,
                10000
            );
            this.camera.position.z = 1000;
            this.scene = new THREE.Scene();
            const particles = [];
            const material = new THREE.ParticleCanvasMaterial({
                color: 0xa1a1ff,
                program(context) {
                    context.beginPath();
                    context.arc(0, 0, 1, 0, Math.PI * 2, true);
                    context.fill();
                }
            });
            console.time("points");

            for (let i = 0; i < this.amountX; i++) {
                for (let j = 0; j < this.amountY; j++) {
                    const particle = new THREE.Particle(material);
                    particle.position.x =
                        i * this.separation -
                        (this.amountX * this.separation) / 2;
                    particle.position.z =
                        j * this.separation -
                        (this.amountY * this.separation) / 2;
                    particles.push(particle);
                    this.scene.add(particle);
                }
            }
            console.timeEnd("points");
            const renderer = new THREE.CanvasRenderer();
            renderer.setSize(width, height);
            this.$el.appendChild(renderer.domElement);
            this.particles = particles;
            this.renderer = renderer;

            document.addEventListener("mousemove", this.handleMouseMove, false);
            window.addEventListener("resize", this.handleWindowResize, false);
            this.animate();
        },

        particlesUpdate() {
            const {
                camera,
                particles,
                amountX,
                amountY,
                count,
                mouseX,
                mouseY,
                scene
            } = this;
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y = 364;
            camera.lookAt(scene.position);
            particles.forEach((particle, index) => {
                const i = Math.floor(index / amountX);
                const j = index % amountY;
                particle.position.y =
                    Math.sin((i + count) * 0.3) * 50 +
                    Math.sin((j + count) * 0.5) * 50;
                particle.scale.x =
                    (Math.sin((i + count) * 0.3) + 1) * 2 +
                    (Math.sin((j + count) * 0.5) + 1) * 2;
                particle.scale.y = particle.scale.x;
            });
            this.renderer.render(scene, camera);
            this.count += 0.1;
        },

        handleWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.winHalfX = width / 2;
            this.winHalfY = height / 2;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        },

        handleMouseMove(event) {
            this.mouseX = event.clientX - this.winHalfX;
            this.mouseY = event.clientY - this.winHalfY;
        },

        animate() {
            this.animationId = requestAnimationFrame(this.animate.bind(this));
            this.particlesUpdate();
        },

        onDestroy() {
            window.removeEventListener(
                "resize",
                this.handleWindowResize,
                false
            );
            document.removeEventListener(
                "mousemove",
                this.handleMouseMove,
                false
            );
            this.animationId && window.cancelAnimationFrame(this.animationId);
        }
    }
};
/*eslint-disable no-new*/
</script>
