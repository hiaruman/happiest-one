import image01 from "@/assets/img/optimized/01-min.jpg";
import image02 from "@/assets/img/optimized/02-min.jpg";
import image03 from "@/assets/img/optimized/03-min.jpg";
import image04 from "@/assets/img/optimized/04-min.jpg";
import image05 from "@/assets/img/optimized/05-min.jpg";
import image06 from "@/assets/img/optimized/06-min.jpg";
import image07 from "@/assets/img/optimized/07-min.jpg";
import image08 from "@/assets/img/optimized/08-min.jpg";
import image09 from "@/assets/img/optimized/09-min.jpg";
import image10 from "@/assets/img/optimized/10-min.jpg";
import image11 from "@/assets/img/optimized/11-min.jpg";
import image12 from "@/assets/img/optimized/12-min.jpg";
import image13 from "@/assets/img/optimized/13-min.jpg";
import image14 from "@/assets/img/optimized/14-min.jpg";
import image15 from "@/assets/img/optimized/15-min.jpg";
import image16 from "@/assets/img/optimized/16-min.jpg";
import image17 from "@/assets/img/optimized/17-min.jpg";
import image18 from "@/assets/img/optimized/18-min.jpg";
import image19 from "@/assets/img/optimized/19-min.jpg";
import image20 from "@/assets/img/optimized/20-min.jpg";
import image21 from "@/assets/img/optimized/21-min.jpg";
import image22 from "@/assets/img/optimized/22-min.jpg";
import image23 from "@/assets/img/optimized/23-min.jpg";
import image24 from "@/assets/img/optimized/24-min.jpg";
import image25 from "@/assets/img/optimized/25-min.jpg";
import image26 from "@/assets/img/optimized/26-min.jpg";
import image27 from "@/assets/img/optimized/27-min.jpg";
import image28 from "@/assets/img/optimized/28-min.jpg";
import image29 from "@/assets/img/optimized/29-min.jpg";
import image30 from "@/assets/img/optimized/30-min.jpg";
import image31 from "@/assets/img/optimized/31-min.jpg";
import image32 from "@/assets/img/optimized/32-min.jpg";
import image33 from "@/assets/img/optimized/33-min.jpg";
import image34 from "@/assets/img/optimized/34-min.jpg";
import image35 from "@/assets/img/optimized/35-min.jpg";
import image36 from "@/assets/img/optimized/36-min.jpg";
import image37 from "@/assets/img/optimized/37-min.jpg";
import image38 from "@/assets/img/optimized/38-min.jpg";
import image39 from "@/assets/img/optimized/39-min.jpg";
import image40 from "@/assets/img/optimized/40-min.jpg";
import image41 from "@/assets/img/optimized/41-min.jpg";
import image42 from "@/assets/img/optimized/42-min.jpg";
import image43 from "@/assets/img/optimized/43-min.jpg";
import image44 from "@/assets/img/optimized/44-min.jpg";
import image45 from "@/assets/img/optimized/45-min.jpg";
import image46 from "@/assets/img/optimized/46-min.jpg";
import image47 from "@/assets/img/optimized/47-min.jpg";
import image48 from "@/assets/img/optimized/48-min.jpg";
import image49 from "@/assets/img/optimized/49-min.jpg";
import image50 from "@/assets/img/optimized/50-min.jpg";
import {StaticImageData} from "next/image";


export const galleries = [
    { order:0, path: image01.src, module: image01},
    { order:1, path: image02.src, module: image02},
    { order:2, path: image03.src, module: image03},
    { order:3, path: image04.src, module: image04},
    { order:4, path: image05.src, module: image05},
    { order:5, path: image06.src, module: image06},
    { order:6, path: image07.src, module: image07},
    { order:7, path: image08.src, module: image08},
    { order:8, path: image09.src, module: image09},
    { order:9, path: image10.src, module: image10},
    { order:10, path: image11.src, module: image11},
    { order:11, path: image12.src, module: image12},
    { order:12, path: image13.src, module: image13},
    { order:13, path: image14.src, module: image14},
    { order:14, path: image15.src, module: image15},
    { order:15, path: image16.src, module: image16},
    { order:16, path: image17.src, module: image17},
    { order:17, path: image18.src, module: image18},
    { order:18, path: image23.src, module: image23},
    { order:19, path: image20.src, module: image20},
    { order:20, path: image21.src, module: image21},
    { order:21, path: image22.src, module: image22},
    { order:22, path: image19.src, module: image19},
    { order:23, path: image34.src, module: image34},
    { order:24, path: image25.src, module: image25},
    { order:25, path: image26.src, module: image26},
    { order:26, path: image27.src, module: image27},
    { order:27, path: image28.src, module: image28},
    { order:28, path: image29.src, module: image29},
    { order:29, path: image30.src, module: image30},
    { order:30, path: image31.src, module: image31},
    { order:31, path: image32.src, module: image32},
    { order:32, path: image33.src, module: image33},
    { order:33, path: image24.src, module: image24},
    { order:34, path: image35.src, module: image35},
    { order:35, path: image36.src, module: image36},
    { order:36, path: image37.src, module: image37},
    { order:37, path: image38.src, module: image38},
    { order:38, path: image39.src, module: image39},
    { order:39, path: image40.src, module: image40},
    { order:40, path: image41.src, module: image41},
    { order:41, path: image42.src, module: image42},
    { order:42, path: image49.src, module: image49},
    { order:43, path: image43.src, module: image43},
    { order:44, path: image44.src, module: image44},
    { order:45, path: image45.src, module: image45},
    { order:46, path: image47.src, module: image47},
    { order:47, path: image46.src, module: image46},
    { order:48, path: image48.src, module: image48},
    { order:49, path: image50.src, module: image50},
]


interface Gallery {
    order: number,
    path: string,
    module: StaticImageData
}

export const groupIntoPairs = (array: Gallery[]) => {
    const groupedArray = [];
    for (let i = 0; i < array.length; i += 2) {
        groupedArray.push(array.slice(i, i + 2));
    }
    return groupedArray;
};

export default {groupIntoPairs, galleries}