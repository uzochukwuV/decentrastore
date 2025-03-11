export function formatListing(data:bigint[]) : bigint[]{
    if(!data) return [];
    let newList:bigint[] = [];
    data.forEach((i)=>{
        if(i == BigInt(0)){
            
        }else{
            newList.push(i)
        }
    })
    return newList;
}