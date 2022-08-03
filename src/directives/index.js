// 封装图片加载失败方案
export const imgError={
    inserted: function (el,{value}){
        // 聚焦
        el.onerror=function(){
            el.src=value
        }
    }
}