import Drawer from './Drawer.vue';
// export default {
//     install(V){
//         V.component(Drawer.name,Drawer);
//     }
// }

Drawer.install = function(V){
    V.component(this.name,this)
}
export default Drawer;