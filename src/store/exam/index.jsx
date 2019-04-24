const defaultState ={
    data:[]
 }
 const ExamReducer=(state=defaultState,action)=>{
     const {type,payload}=action;
     switch(type){
        case 'add':
            return {...state,data:[...payload]}
        default:
            return state;
     }
 }
 export default ExamReducer;