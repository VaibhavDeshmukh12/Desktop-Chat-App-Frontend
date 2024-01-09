import * as actionType from "./Message.actionType"


const intialState={
    messages:[], 
    chats:[],
    loading:false,
    error:null,
    message:null
}

export const messageReducer = (state=intialState,action)=>{
    switch(action.type){
        
        case actionType.CREATE_MESSAGE_SUCCESS:
            return {...state,
                message:action.payload
            }
        
        case actionType.CREATE_CHAT_SUCCESS:
            return {...state,chats:[action.payload,...state.chats]}
        
        case actionType.GET_ALL_CHATS_SUCCESS:
            return {...state,chats: action.payload}
        
        default:
            return state;
    }
}