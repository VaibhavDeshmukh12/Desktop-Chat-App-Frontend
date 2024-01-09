import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType"
import {api} from '../../config/api'


export const createPostAction = (postData) => async(dispatch) =>{
    dispatch({type:CREATE_POST_REQUEST})
    try{
        const {data} = await api.post(`/api/posts`,postData);
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
        console.log('created post :>> ', data);
    }
    catch(error){
        dispatch({type:CREATE_POST_FAILURE,payload:error});
        console.log('error :>> ', error);
    }
}

export const getAllPostAction = () => async(dispatch) =>{
    dispatch({type:GET_ALL_POST_REQUEST})
    try{
        const {data} = await api.get(`/api/posts`);
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data})
        console.log('all posts :>> ', data);
    }
    catch(error){
        dispatch({type:GET_ALL_POST_FAILURE,payload:error});
        console.log('error :>> ', error);
    }
}

export const getUsersPostAction = (userid) => async(dispatch) =>{
    dispatch({type:GET_USERS_POST_REQUEST})
    try{
        const {data} = await api.get(`/api/posts/users/${userid}`);
        dispatch({type:GET_USERS_POST_SUCCESS,payload:data})
        console.log('get user posts :>> ', data);
    }
    catch(error){
        dispatch({type:GET_USERS_POST_FAILURE,payload:error});
        console.log('error :>> ', error);
    }
}

export const likePostAction = (postid) => async(dispatch) =>{
    dispatch({type:LIKE_POST_REQUEST})
    try{
        const {data} = await api.put(`/api/posts/like/${postid}`);
        console.log('like posts :>> ', data);
        dispatch({type:LIKE_POST_SUCCESS,payload:data})
    }
    catch(error){
        console.log('error :>> ', error);
        dispatch({type:LIKE_POST_FAILURE,payload:error});
    }
}

export const createCommentAction = (reqData) => async(dispatch) =>{
    dispatch({type:CREATE_COMMENT_REQUEST})
    try{
        const {data} = await api.post(`/api/comments/post/${reqData.pid}`,reqData.data);
        dispatch({type:CREATE_COMMENT_SUCCESS,payload:data})
        console.log('created comments :>> ', data);
    }
    catch(error){
        dispatch({type:CREATE_COMMENT_FAILURE,payload:error});
        console.log('error :>> ', error);
    }
}


export const deletePostAction = (pid) => async(dispatch) =>{
    dispatch({type:DELETE_POST_REQUEST})
    try{
        const {data} = await api.delete(`/api/posts/${pid}/user`);
        dispatch({type:DELETE_POST_SUCCESS,payload:data})
        console.log('DELETE posts :>> ', data);
    }
    catch(error){
        dispatch({type:DELETE_POST_FAILURE,payload:error});
        console.log('error :>> ', error);
    }
}