<template>
  <div class="hello">
<ky-switch  :value="true"> </ky-switch>
    <div>
      <canvas id="three"></canvas>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { 
  OBJLoader,
   MTLLoader } from 'three-obj-mtl-loader'
   import 'three-orbitcontrols'
  //  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import OrbitControls from "three-orbitcontrols"
  //  import VRViewer from 'three-vr-viewer';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      scene:null,
      camera:null,
      renderer:null,
    }
  },
    mounted(){
    // this.initThree()
    // this.initBox()
    this.initselfBox()
    // this.init();
    
  },
  methods:{
    initThree() {
      // const scene = new THREE.Scene()
      // scene.background = new THREE.Color('#eee')
      // const canvas = document.querySelector('#three')
      // const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      // const camera = new THREE.PerspectiveCamera(
      //   50,
      //   window.innerWidth / window.innerHeight,
      //   0.1,
      //   1000
      // )
      // camera.position.z = 10

      // function animate() {
      //   renderer.render(scene, camera)
      //   requestAnimationFrame(animate)
      // }
      // animate()
      // 创建场景
      var scene = new THREE.Scene();
      // 创建透视摄影器
      var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 10000000 );
      // 创建渲染器
      var renderer = new THREE.WebGLRenderer();
       // .mtl材质文件加载器
      var mtlLoader = new MTLLoader();
      // mtlLoader.setPath("src/assets/")
      // .obj几何体文件加载器
      var objLoader = new OBJLoader();
      //  objLoader.setPath("src/assets/")
			

			
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			// var geometry = new THREE.BoxGeometry( 200, 200, 200 );
			// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			// var cube = new THREE.Mesh( geometry, material );
// console.log(888,mtlLoader.load)
// this.$axios.get(`/static/city.json`).then(res=>{
//   console.log("获取json数据",res)
// })
     var ambiColor = "#eee";
var ambientLight = new THREE.AmbientLight(ambiColor,1);
scene.add(ambientLight);

var hemiLight = new THREE.HemisphereLight(0x0000ff,0x00ff00,1);
hemiLight.position.set(110,500,110);
scene.add(hemiLight,1);

      mtlLoader.load(`/static/lft.mtl`, function (materials) {
        // setMaterials(materials).
        objLoader.setMaterials(materials)
        objLoader.load(`/static/lft.obj`, function (obj) {
            // console.log("obj",obj)
          scene.add(obj);
          // scene.add( cube );
            camera.position.z = 1000;
      var render = function () {
        requestAnimationFrame( render );

        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        // obj.rotation.z += 0.1;

        renderer.render(scene, camera);
      };
        
          render();
    
          });
        console.log(111111,materials)
              // console.log("src/assets/materials",materials)
         
      },

	);

			// scene.add( cube );
      
// console.log(333)
           

			
    },
    initBox(){
      // 场景
      const scene=new THREE.Scene();
      // 透视相机
      const camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
      // 渲染器
      const renderer =new THREE.WebGLRenderer();
      // 渲染器设置宽高
      renderer.setSize(window.innerWidth,window.innerHeight);
      // 添加在body
      document.body.appendChild(renderer.domElement)
      // 创建立方体
      var geometry=new THREE.BoxGeometry(1,1,1);
      // 材质颜色
      var material=new THREE.MeshBasicMaterial({color: 0x00ff00 });
      // 物体和材质结合
      var cube=new THREE.Mesh(geometry,material)
      // 添加在场景中
      scene.add(cube);
      // 设置相机位置高度
      camera.position.z=5;
      // 绘制场景 每秒60次
      function render() {
        // requestAnimationFrame这个函数，它用来替代 setInterval，
        requestAnimationFrame( render );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // 绘制
        renderer.render( scene, camera );
      }
      // 调用
      render();

    },
    initselfBox(){
      /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    /**
     * SphereGeometry球体
     */
    // var geometry = new THREE.BoxGeometry(100, 100, 80); //创建一个立方体几何对象Geometry
    // var material = new THREE.MeshLambertMaterial({
    //   color: "#eee"
    // }); //材质对象Material
    // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // scene.add(mesh); //网格模型添加到场景中

// 立方体网格模型
// var geometry1 = new THREE.BoxGeometry(100, 100, 100);
// var material1 = new THREE.MeshLambertMaterial({
//     color: 0x0000ff,
//     opacity:1,
//     transparent:true
// }); //材质对象Material
// var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
// scene.add(mesh1); //网格模型添加到场景中


// 球体网格模型
// var geometry2 = new THREE.SphereGeometry(60, 40, 40);
// var material2 = new THREE.MeshLambertMaterial({
//   color: 0xff00ff,
//     opacity:0.7,
//     // wireframe:true,
//     transparent:true
// });
// material2.opacity = 0.5 ;
// material2.transparent = true ;
// var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
// mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
// scene.add(mesh2);

// 圆柱网格模型
// var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
// var material3 = new THREE.MeshLambertMaterial({
//   // color:0x0000ff,
//     specular:0x4488ee,
//     shininess:12,
//   color: 0xffff00,
//   //   opacity:1,
//   //   wireframe:true,
//   //   transparent:true
// });
// var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
// // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
// mesh3.position.set(120,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
// scene.add(mesh3); //
    
//     // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
// var axisHelper = new THREE.AxisHelper(250);
// scene.add(axisHelper);

// var geometry = new THREE.SphereGeometry(100, 25, 25); //创建一个球体几何对象
// // 创建一个点材质对象
// var material = new THREE.PointsMaterial({
//   color: 0x0000ff, //颜色
//   size: 2, //点渲染尺寸
// });
// //点模型对象  参数：几何体  点材质
// var point = new THREE.Points(geometry, material);
// scene.add(point); //网格模型添加到场景中

var geometry = new THREE.SphereGeometry(100, 25, 25);//球体
// // 直线基础材质对象
// var material = new THREE.LineBasicMaterial({
//   color: 0x0000ff
// });
// var line = new THREE.Line(geometry, material); //线模型对象
// scene.add(line); //点模型添加到场景中

// 虚线材质对象：产生虚线效果
var material = new THREE.LineDashedMaterial({
  color: 0x0000ff,
  dashSize: 10,//显示线段的大小。默认为3。
  gapSize: 5,//间隙的大小。默认为1
});
var line = new THREE.Line(geometry, material); //线模型对象
//  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
line.computeLineDistances();
 scene.add(line); //点模型添加到场景中

    /**
     * 光源设置
     */
    //点光源
    // var point = new THREE.PointLight(0xffffff);
    // point.position.set(400, 200, 300); //点光源位置
    // scene.add(point); //点光源添加到场景中
    // 环境光
    // var ambient = new THREE.AmbientLight(0x444444);
    // scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    // var k = width / height; //窗口宽高比
    // var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    /**
     * left — 摄像机视锥体左侧面。
      right — 摄像机视锥体右侧面。
      top — 摄像机视锥体上侧面。
      bottom — 摄像机视锥体下侧面。
      near — 摄像机视锥体近端面。
      far — 摄像机视锥体远端面。
     */
    // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    // var camera = new THREE.PerspectiveCamera(-s * k, s * k, s, -s, 1, 1000);
    const camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.set(200,200, 200); //设置相机位置
    // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
   
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);

     
    function render() {
      // controls.update()
      renderer.render(scene,camera);//执行渲染操作
      requestAnimationFrame(render);//请求再次执行渲染函数render
    }
    render();
    var controls =new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
    console.log("controls",controls)
// controls.addEventListener('change', render)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
