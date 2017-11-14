import React from 'react';

import * as THREE from 'three';

const stlLoader = require('./STL-Loader')(THREE);
const TrackballControls = require('./TrackballControls');


class STLLoader extends React.Component {

    componentDidMount() {
        this.messageNative = document.getElementById('message');
        this.container = document.getElementById('three');

        loadSTL(this.three.scene, this.props.url, this.messageNative)
        this.container.appendChild(this.three.renderer.domElement);

        // 循环渲染
        this.timerID = setInterval(() => {
            this.three.controls.update();
            this.three.renderer.render(this.three.scene, this.three.camera);
        }, 17);
    }

    componentDidUpdate() {
        clearInterval(this.timerID);
        this.messageNative.style.display = "block";

        loadSTL(this.three.scene, this.props.url, this.messageNative);

        this.container.appendChild(this.three.renderer.domElement);

        // 循环渲染
        this.timerID = setInterval(() => {
            this.three.controls.update();
            this.three.renderer.render(this.three.scene, this.three.camera);
        }, 17);
    }

    constructor(props) {
        super(props);
        this.three = init(this.props.width, this.props.height);
        this.msg = React.createElement('h1', {
            id: "message",
            style: {
                color: "#fff",
                display: "block",
                textAlign: "center",
                position: "absolute",
                zIndex: 100,
                width: this.props.width,
                top: "10px",
            }
        }, '');
    }

    render() {
        return (
            React.createElement('div', {id: "three"}, this.msg)
        );
    }

}

function init(width, height) {
    let camera, controls, scene, renderer;
    // 摄像头
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e10);
    camera.position.z = 500;
    camera.position.y = 0;
    camera.position.x = 0;
    camera.up = new THREE.Vector3(0, 1, 0);

    controls = new TrackballControls(camera);
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 10;
    controls.panSpeed = 2;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    // 场景
    scene = new THREE.Scene();
    scene.add(camera);

    // 灯光
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);
    hemiLight.position.set(300, 300, 1000);
    scene.add(hemiLight);

    let dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.position.set(300, 300, 1000).normalize();
    camera.add(dirLight);
    camera.add(dirLight.target);


    // 渲染器
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setClearColor(0x333333, 1);  // 背景色
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(width, height);

    return {renderer: renderer, controls: controls, camera: camera, scene: scene};
}

function loadSTL(scene, url, msg) {
    let selectedObject = scene.getObjectByName("meshName");
    if (selectedObject !== undefined)
        scene.remove(selectedObject);

    // 加载STL模型
    let loader = new stlLoader();
    loader.load(url, function (geometry) {
        // 给模型贴上材质生成物体
        let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide}));
        // 场景加入物体
        mesh.name = "meshName";
        scene.add(mesh);

        msg.style.display = "none";
    }, function (event) {
        msg.innerText = `已加载: ${(event.loaded / event.total * 100).toFixed(0)} %`;
    });
}

export default STLLoader;
