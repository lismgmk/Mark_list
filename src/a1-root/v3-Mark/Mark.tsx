import React, {ChangeEvent, useState} from "react";
import {Box, Button, Card, CardActions, Checkbox, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {actionsMain, MarksType} from "../v1-Main/mainReduser";
import {useDispatch} from "react-redux";
import {actionsTags} from "../v4-Tag/tagsReduser";
import {getTag} from "../v2-inputMarks/InputMarks";

type MarkType = {
    name: string
    tag: Array<string>
    id: string
}

export const Mark = React.memo(function (props: MarkType) {

    const dispatch = useDispatch()


    const [title, setTitle] = useState<string>(props.name)
    const [changeInput, setChangeInput] = useState<boolean>(false)


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onChangeSpan = () => setChangeInput(true);
    const onChangeInput = () => {
        setChangeInput(false)

        const trimmedTitle = title.trim()
        let tag = getTag(trimmedTitle)
        if (trimmedTitle) {
            dispatch(actionsMain.updateMark(trimmedTitle, props.id, tag))
            dispatch(actionsTags.addTags(tag))
        }

    }
    return (
        <div
            key={props.id}
            style={{background: 'yellow', margin: '10px'}}>
            {
                changeInput
                    ?
                    <input
                        value={title}
                        onBlur={onChangeInput}
                        onChange={changeTitle}
                    >

                    </input>

                    : <div>
                            <span
                                onDoubleClick={onChangeSpan}
                            >{title}
                            </span>
                        <div>
                            {props.tag.map(i => {
                                return <span
                                    style={{background: 'green', marginTop: '10px'}}
                                > {i}</span>
                            })}
                        </div>
                    <button onClick={()=>{dispatch(actionsMain.deleteMark(props.id))}}>Delele</button>

                    </div>
            }
        </div>

    )
})

