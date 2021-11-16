/*
 * @Author: your name
 * @Date: 2021-10-25 09:48:26
 * @LastEditTime: 2021-11-16 10:19:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \myprojrct\src\package\index.js
 */

import kyswitch from "./switch"
import myDialog from "./dialog";
import myMenus from "./menus";
// import myTable from "./table";
// import myForm from "./form";
import myHeader from "./header";
import myEcharts from "./echarts";
import myBanner from "./banner";

import myForm from "./xForm";
import myInput from "./xInput";
import mySelect from "./xSelect";
import myDatePicker from "./xDatePicker";
import myAutocomplete from "./xAutocomplete";
import myCascader from "./xCascader";
import myCheckbox from "./xCheckbox";
import myColorPicker from "./xColorPicker";
import myInputNumber from "./xInputNumber";
import myRadio from "./xRadio";
import myRate from "./xRate";
import mySlider from "./xSlider";
import mySwitch from "./xSwitch";
import myTimePicker from "./xTimePicker";
import myTimeSelect from "./xTimeSelect";
import myTransfer from "./xTransfer";
import myTree from "./xTree";
import mySelectTree from "./xSelectTree";
import myProgress from "./xProgress";
import myUpload from "./xUpload";
import myButton from "./xButton";
import myTabs from "./xTabs";
import myTable from "./xTable";
import myTablesTree from "./xTableTree";
const components=[
    kyswitch,  
    myDialog,
    myMenus,
    myTable,
    myForm,
    myHeader,
    myEcharts,
    myBanner,
    myInput,
    mySelect,
    myDatePicker,
    myAutocomplete,
    myCascader,
    myCheckbox,
    myColorPicker,
    myInputNumber,
    myRadio,
    myRate,
    mySlider,
    mySwitch,
    myTimePicker,
    myTimeSelect,
    myTransfer,
    myTree,
    mySelectTree,
    myProgress,
    myUpload,
    myButton,
    myTabs,
    myTablesTree
]
const install=function(Vue){
    if(install.installed)return;
    components.map(component=>Vue.component(component.name,component))
}
if(typeof window!=="undefined"&&window.Vue){
    install(window.Vue)
}
export default {
    install,
    kyswitch,  
    myDialog,
    myMenus,
    myTable,
    myForm,
    myHeader,
    myEcharts,
    myBanner,
    myInput,
    mySelect,
    myDatePicker,
    myAutocomplete,
    myCascader,
    myCheckbox,
    myColorPicker,
    myInputNumber,
    myRadio,
    myRate,
    mySlider,
    mySwitch,
    myTimePicker,
    myTimeSelect,
    myTransfer,
    myTree,
    mySelectTree,
    myProgress,
    myUpload,
    myButton,
    myTabs,
    myTablesTree
}