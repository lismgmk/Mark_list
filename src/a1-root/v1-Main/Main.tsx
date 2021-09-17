import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import s from './Main.module.css'
import {InputMarks} from "../v2-inputMarks/InputMarks";
import {Mark} from "../v3-Mark/Mark";
import {Card, Container, Grid, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {actionsMain, initializeApp, MarksType} from "./mainReduser";
import {nanoid} from "nanoid";
import {actionsTags} from "../v4-Tag/tagsReduser";
import {AddBox} from "@material-ui/icons";

import data from "./data.json";

function Main() {

    const dispatch = useDispatch()
    const marks = useSelector<AppRootStateType, Array<MarksType>>(state => state.main.marks);
    const tags = useSelector<AppRootStateType, Array<string>>(state => state.tag.alltags);
    const [currentmarks, setCurrentmarks] = useState<Array<MarksType>>(marks)
    const [newTag, setNewTag] = useState<boolean>(false)
    const [valueNewTag, setValueNewTag] = useState<string>('')



    useEffect(() => {
        setCurrentmarks(marks)
        dispatch(initializeApp())
    }, [marks])

    const deleteTagWithMark = (t: string) => {
        dispatch(actionsMain.deleteMarkTag(t))
        dispatch(actionsTags.deleteTag(t))
    }
    const deleteTag = (t: string) => {
        dispatch(actionsTags.deleteTag(t))
    }

    const sortMarks = (t: string) => {
        let newMarks = marks.filter(m => m.tag.includes(t))
        setCurrentmarks(newMarks)
    }

    const showAllMarks = () => {
        setCurrentmarks(marks)
    }

    const addNewTag = () => {
        dispatch(actionsTags.addTags([valueNewTag]))
        setNewTag(false)
    }
    const onKeyPressAddItem = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addNewTag()
        }
    }

    return (
        <Container>

            <h1>Marks list</h1>
            <InputMarks/>

            {
                currentmarks.map(i => {
                    return <Mark
                        key={i.id}
                        name={i.name}
                        id={i.id}
                        tag={i.tag}/>
                })
            }
            {
                tags.map(t => {
                    return <div
                        key={nanoid()}
                        style={{background: 'gray', padding: '5px'}}
                    >
                        {t}
                        <button onClick={() => deleteTag(t)}
                        >Delete tag
                        </button>
                        <button onClick={() => deleteTagWithMark(t)}
                        >Delete tag with mark
                        </button>

                        <button onClick={() => {
                            sortMarks(t)
                        }
                        }
                        >Sort for Tag
                        </button>

                    </div>
                })
            }
            {tags.length > 0 && <button
                onClick={showAllMarks}
            >Show all Marks</button>}

            {newTag ?
                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setValueNewTag(e.currentTarget.value)
                    }
                    }
                    onBlur={addNewTag}
                    onKeyPress={onKeyPressAddItem}
                />
                :
                < IconButton onClick={() => setNewTag(true)} color={'primary'}>
                    <AddBox/>
                </IconButton>}

        </Container>
    )
}

export default Main;
