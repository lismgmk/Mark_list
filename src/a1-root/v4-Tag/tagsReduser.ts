
const initialState = {
    alltags: []
} ;

export const tagsReduser =
    (state: InitialTagsStateType = initialState, action: actionsTagsType): InitialTagsStateType => {
        switch (action.type) {
            case "TAGS/ADD-TAG":
                let newArr = [...state.alltags, ...action.tag].filter((it, index, arr) => index === arr.indexOf(it))
                return {...state,
                    alltags: [...newArr]};
                case "TAGS/DELETE-TAG":
                return {
                    ...state,
                    alltags: state.alltags.filter(i=> i !== action.tag)
                }
            default:
                return state;
        }
    };


// actions
export const actionsTags = {

    addTags: (tag: Array<string>) => ({
        type: "TAGS/ADD-TAG",
        tag
    } as const),
    deleteTag: (tag: string) => ({
        type: "TAGS/DELETE-TAG",
        tag
    } as const),
};

// export const addTitle = (title: string) => (dispatch: Dispatch<any>) => {
//     const trimmedTitle = title.trim()
//     let valueInput = trimmedTitle.split(/(#[a-z\d-]+)/ig)
//
//     let tag: string[] = []
//     valueInput.map((i, index)=>{
//         if(index % 2 !== 0){
//             tag.push(i.replace('#',''))
//         }
//     })
// };



// types
export type InitialTagsStateType = {
    alltags: Array<string>
}
export type actionsTagsType = InferActionType<typeof actionsTags>

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
