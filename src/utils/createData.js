export const createData=function(nodes){
    let map=new Map();
    // const childs=Array.from(nodes.childNodes);
    nodes.forEach(childs=>{
        const child=Array.from(childs.childNodes);
        child.forEach(node=>{
            // console.log(node);
            try{
                map.set(node,node.getBoundingClientRect())
            }catch(error){

                // return null
            }
        })
    })
    return map;
    // console.log(childs);
}