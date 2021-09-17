import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {Box, Button, Card, CardActions, Checkbox, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";
import {actionsMain, MarksType} from "../v1-Main/mainReduser";
import {useDispatch, useSelector} from "react-redux";
import {actionsTags} from "../v4-Tag/tagsReduser";
import {getTag} from "../v2-inputMarks/InputMarks";
import {AppRootStateType} from "../store";
import style from "./Mark.module.css"

type MarkType = {
    name: string
    tag: Array<string>
    id: string
}

export const Mark = React.memo(function (props: MarkType) {

    const dispatch = useDispatch()
    const tags = useSelector<AppRootStateType, Array<string>>(state => state.tag.alltags);


    const [title, setTitle] = useState<string>(props.name)
    const [titleKey, setTitleKey] = useState<string>(props.name)
    const [changeInput, setChangeInput] = useState<boolean>(false)


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleKey(e.currentTarget.value)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeInput()
        }
    }

    const getColorTitle = (title: string) => {

        let valueInput = title.split(/(#[a-z\d-]+)/ig)

        return  valueInput.map((i, index) => {
            if(index % 2 ===0){
                return  <span style={{color:'black'}}>{i}</span>
            } else{
                return <span style={{color:'red'}}>{i}</span>
            }
        })
    }


    const onChangeSpan = () => setChangeInput(true);
    const onChangeInput = () => {
        setChangeInput(false)

        const trimmedTitle = title.trim()
        // setTitleKey(getColorTitle(trimmedTitle))
        let tag = getTag(trimmedTitle)
        if (trimmedTitle) {
            dispatch(actionsMain.updateMark(trimmedTitle, props.id, tag))
            dispatch(actionsTags.addTags(tag))
        }

    }
    return (
        <div
            key={props.id}
            className={style.containerCustom}>
            {
                changeInput
                    ?
                    <div
                        style={{
                            position: "relative",
                            width: '550px',
                            height: '15px',
                        }}
                    >
                        <input
                            className={style.customInput}
                            value={title}
                            onBlur={onChangeInput}
                            onChange={changeTitle}
                            onKeyPress={onKeyPressAddItem}
                            onKeyPressCapture={(e) => setTitleKey(e.currentTarget.value)}
                        />

                        <div className={style.customDiv}>{getColorTitle(titleKey)}</div>
                        <button onClick={() => {
                            onChangeInput()
                        }}>Save
                        </button>
                    </div>


                    : <div>
                            <span className={style.customDiv}
                                onDoubleClick={onChangeSpan}
                            >{title}
                            </span>
                        <div>
                            {props.tag.map(i => {
                                return <span
                                    style={{background: 'green', marginTop: '10px'}}
                                    onDoubleClick={() => dispatch(actionsTags.addTags([i]))}
                                > {i}</span>
                            })}
                        </div>
                        <button onClick={() => {
                            dispatch(actionsMain.deleteMark(props.id))
                        }}>Delete
                        </button>
                        <button onClick={() => {
                            setChangeInput(true)
                        }}>Edit
                        </button>


                    </div>
            }
        </div>

    )
});
