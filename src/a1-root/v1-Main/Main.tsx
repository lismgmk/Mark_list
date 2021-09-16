import React from 'react'
import s from './Main.module.css'
import {InputMarks} from "../v2-inputMarks/InputMarks";
import {Mark} from "../v3-Mark/Mark";
import {Card, Container, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {actionsMain, MarksType} from "./mainReduser";
import {nanoid} from "nanoid";
import {actionsTags} from "../v4-Tag/tagsReduser";

function Main() {

    const dispatch = useDispatch()
    const marks = useSelector<AppRootStateType, Array<MarksType>>(state => state.main.marks);
    const tags = useSelector<AppRootStateType, Array<string>>(state => state.tag.alltags);



    return (
        <Container>

            <h1>Marks list</h1>
            <InputMarks/>

            {
                marks.map(i => {
                    return <Mark
                        key={i.id}
                        name={i.name}
                        id={i.id}
                        tag={i.tag}/>
                })
            }
            {
                tags.map(t=>{
                    return <div
                    key={nanoid()}
                    style={{background: 'gray', padding: '5px'}}
                    >
                        {t}
                        <button onClick={()=>{
                            // dispatch(actionsMain.deleteMarkTag(t))
                            dispatch(actionsTags.deleteTag(t))
                        }
                        }
                        >Delele</button>
                        <button onClick={()=>{
                            // dispatch(actionsMain.sortMark(t))
                        }
                        }
                        >Sort</button>

                    </div>
                })
            }

        </Container>
    )
}

export default Main
