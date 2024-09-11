import React, { useReducer, useState } from 'react'

let initialState={
    task:[],
    filter:'all'
}
function reducerFunc(state,action){
    switch(action.type){
        case 'Adding':
            return {...state,task:[...state.task,action.payload]}
        case 'toggle':
            return {
                ...state,
                task:state.task.map(t=>{
                    if(t.id===action.payload){
                        return { ...t ,completed: !t.completed}
                        }
                    else{return t}
                })
            }
        case 'delete':
            return {
                ...state,
                task:state.task.filter(t=> t.id !== action.payload)
            }
        case 'SETTING':
            return {...state,filter:action.payload}
    }
}



const MyTaskManager = () => {
const[text,setText]=useState('')
const[state,dispatch]=useReducer(reducerFunc,initialState)


const addTask=()=>{
    dispatch({type:'Adding',payload:{
        id:Date.now(),
        task:text,
        completed:false
    }})
    setText('')
}


    const filterItem=state.task.filter(t=>{
        if(state.filter==='finish') return t.completed
        if(state.filter==='left') return !t.completed
        return true;
    })

  return (
    <>
    <div>
        <input
        type='text'
        value={text}
        onChange={(e)=>setText(e.target.value)}/>
        <button onClick={addTask}>Add kijiye</button>
    </div>

    <div>
        {
            filterItem.map(task=>(
                <div key={task.id}>
                <span>{task.task}</span>
                <button onClick={()=>{dispatch({type:'toggle',payload:task.id})}}> {task.completed? 'unfinish':'finish'}</button>
                <button onClick={()=>{dispatch({type:'delete',payload:task.id})}}> delete babe</button>
                </div>
            ))
        }

      <button onClick={()=>{
            dispatch({type:'SETTING' , payload:'all'})
         }}>
            ALL the items</button>
      <button onClick={()=>{
            dispatch({type:'SETTING' , payload:'finish'})
         }}>FINISHED items</button>
      <button onClick={()=>{
            dispatch({type:'SETTING' , payload:'left'})
         }}>UNFINISHED items</button>

    </div>


    </>
  )
}

export default MyTaskManager