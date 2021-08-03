import * as THREE from 'three'

// Smooth scroll
const scrollable = document.querySelector('.scrollable')

let current = 0
let target = 0
let ease = 0.075

// Linear interpolation
const lerp = (start, end, time) => {
    return start * (1 - time) + end * time
}

const init = () => {
    document.body.style.height = `${scrollable.getBoundingClientRect().height}px`
    console.log(document.body.style.height)
}

const smoothScroll = () => {
    target = window.scrollY
    current = lerp(current, target, ease)
    scrollable.style.transform = `translate3d(0, ${-current}px, 0)`
    requestAnimationFrame(smoothScroll)
}

class EffectCanvas {
    constructor () {
        this.container = document.querySelector('main')
        this.images = [...document.querySelectorAll('img')]
        this.meshItems = []
        this.setupCamera()
        this.createMeshItems()
        this.render()
    }

    get viewport () {
        let width = window.innerWidth
        let height = window.innerHeight
        let aspectRatio = width / height
        return {
            width,
            height,
            aspectRatio
        }
    }

    setupCamera () {
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.scene = new THREE.Scene()
        // perspective camera
        let perspective = 1000
        const fov = (180* (2* Math.atan(window.innerHeight / 2 / perspective))) / Math.PI
        this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 1, 1000)
        this.camera.position.set(0,0, perspective) 

        this.renderer = new THREE.WebGL1Renderer({
            antialias: true,
            alpha: true,
        })
        this.renderer.setSize(this.viewport.width, this.viewport.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.container.appendChild(this.renderer.domElement)
    }

    onWindowResize () {
        init()
        this.camera.aspect = this.viewport.aspect
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.viewport.width, this.viewport.height)
    }
}



init()
smoothScroll()
new EffectCanvas()