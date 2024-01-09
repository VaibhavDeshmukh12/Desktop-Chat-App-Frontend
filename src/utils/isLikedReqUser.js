export const isLikedByReqUSer = (reqUSerId,post) =>{
    for(let user of post.liked ){
        if(reqUSerId===user.id){
            return true;
        }
    }
    return false;
}