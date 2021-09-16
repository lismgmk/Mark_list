import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Dispatch} from "react";
import { nanoid } from 'nanoid'
import {actionsTags} from "../v4-Tag/tagsReduser";

const initialState = {
    marks: []
} ;

export const mainReduser =
    (state: InitialMainStateType = initialState, action: actionsMainType): InitialMainStateType => {
        switch (action.type) {

            case "MAIN/CREATE-MARKS":
                return {...state,
                    marks: [
                        ...state.marks,
                        {
                            id: nanoid(),
                            name: action.name,
                            tag: action.tag
                        }
                    ]};
            case "MAIN/RENAME-MARK":
                return {...state,
                    marks:
                        state.marks.map(m => m.id === action.id ? {
                        ...m,
                        name: action.nameMark,
                        tag: action.tag
                    } : m)
                };
            case "MAIN/DELETE-MARK":
                return {...state,
                    marks: state.marks.filter(m => m.id !== action.id)
                };
            case "MAIN/DELETE-MARK-TAG":
                debugger
                let current = state.marks.map(i=> {if (i.tag[0] === action.tag){
                    return i.tag
            }})
                if(current.length === 1){
                    return {...state,
                        marks: state.marks.filter(m => m.tag[0] !== action.tag)
                    }
                }
               return state;


            default:
                return state;
        }
    };


// actions
export const actionsMain = {

    createMarks: (name: string, tag: Array<string>, ) => ({
        type: "MAIN/CREATE-MARKS",
        name, tag
    } as const),
    deleteMark: (id: string ) => ({
        type: "MAIN/DELETE-MARK",
        id
    } as const),
    deleteMarkTag: (tag: string ) => ({
        type: "MAIN/DELETE-MARK-TAG",
        tag
    } as const),
    updateMark: (nameMark: string, id: string, tag: Array<string>) => ({
        type: "MAIN/RENAME-MARK",
        nameMark, id, tag
    } as const)
};




// types
export type InitialMainStateType = {
    marks: Array<MarksType>
};
export type MarksType = {
    id: string,
    name: string,
    tag: Array<string>
};
export type actionsMainType = InferActionType<typeof actionsMain>

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
