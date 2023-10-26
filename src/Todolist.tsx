import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from './App';
import {useAutoAnimate} from '@formkit/auto-animate/react';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    children?: React.ReactNode
}

export const Todolist:React.FC<PropsType> = (props) => {

    const {title, children, addTask, tasks, removeTask, changeFilter, ...restProps} = props

    const taskTitleInput = useRef<HTMLInputElement>(null);
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const addTaskHandler = () => {
        if(taskTitleInput.current){
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle);
            taskTitleInput.current.value = '';
        }

    }

    // let [title, setTitle] = useState("")
    //
    // const addTask = () => {
    //     props.addTask(title);
    //     setTitle("");
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    return <div>
        <h3>{title}</h3>
        <div>
            <input ref={taskTitleInput}
                /*value={title}
                   onChange={onChangeHandler}*/
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul ref={listRef}>
            {
                tasks.map(t => {

                    const onClickHandler = () => removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
        {children}
    </div>
}

















//----------------------------------------------------------------------------------
// import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
// import {FilterValuesType} from './App';
// import {useAutoAnimate} from "@formkit/auto-animate/react";
//
// type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: string) => void
//     changeFilter: (value: FilterValuesType) => void
//     addTask: (title: string) => void
//     children?:React.ReactNode
// }
//
// export const Todolist:React.FC<PropsType>=({children, ...props}) =>{
//     const [listRef] = useAutoAnimate<HTMLUListElement>()
//     let onChangeRef = useRef<HTMLInputElement>(null)
//     //let [title, setTitle] = useState("")
//
//     const addTask = () => {
//         // props.addTask(title);
//         // setTitle("");
//         if (onChangeRef.current) {
//             props.addTask(onChangeRef.current.value)
//             onChangeRef.current.value = ''
//         }
//     }
//
//     // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     //     setTitle(e.currentTarget.value)
//     // }
//
//
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             addTask();
//         }
//     }
//
//     const onAllClickHandler = () => props.changeFilter("all");
//     const onActiveClickHandler = () => props.changeFilter("active");
//     const onCompletedClickHandler = () => props.changeFilter("completed");
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input
//                 //value={title}
//                 // onChange={ onChangeHandler }
//                 ref={onChangeRef}
//                 onKeyPress={onKeyPressHandler}
//             />
//             <button onClick={addTask}>+</button>
//         </div>
//         <ul ref={listRef}>
//             {
//                 props.tasks.map(t => {
//
//                     const onClickHandler = () => props.removeTask(t.id)
//
//                     return <li key={t.id} >
//                         <input type="checkbox" checked={t.isDone}/>
//                         <span>{t.title}</span>
//                         <button onClick={onClickHandler}>x</button>
//                     </li>
//                 })
//             }
//         </ul>
//         <div>
//             <button onClick={onAllClickHandler}>All</button>
//             <button onClick={onActiveClickHandler}>Active</button>
//             <button onClick={onCompletedClickHandler}>Completed</button>
//         </div>
//         {children}
//     </div>
// }
