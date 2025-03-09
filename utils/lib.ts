export function formatListing(data:bigint[]) : bigint[]{
    let newList:bigint[] = [];
    console.log(data)
    data.forEach((i)=>{
        if(i == BigInt(0)){
            
        }else{
            newList.push(i)
        }
    })
    return newList;
}