import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import s from './Main.module.css'
import {InputMarks} from "../v2-inputMarks/InputMarks";
import {Mark} from "../v3-Mark/Mark";
import {Button, Card, Chip, Container, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {actionsMain, initializeApp, MarksType} from "./mainReduser";
import {nanoid} from "nanoid";
import {actionsTags} from "../v4-Tag/tagsReduser";
import {AddBox, ClearAll} from "@material-ui/icons";
import {Clear} from "@material-ui/icons";

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
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
                        key={nanoid()}
                        name={i.name}
                        id={i.id}
                        tag={i.tag}/>
                })
            }
            {
                tags.map(t => {
                    return <Paper
                        key={nanoid()}
                        style={{
                            background: 'gray',
                            padding: '5px',
                            width: "fit-content",
                            margin: "10px"
                        }}
                    >
                        <Grid
                            container
                            alignItems='center'
                            // style={{ minWidth: 'auto'}}
                            // rowSpacing={1}
                        >
                            <Chip label={t} onClick={() => sortMarks(t)}/>
                            <IconButton
                                size="small"
                                color='secondary'
                                onClick={() => deleteTag(t)}
                                // // label="Delete"
                                // variant="contained"
                            ><Clear/>
                            </IconButton>
                            {/*Delete*/}
                            <Button
                                startIcon={<Clear/>}
                                onClick={() => deleteTagWithMark(t)}
                                variant="contained"
                                size="small"
                                color='secondary'
                            >Delete with mark
                            </Button>

                            {/*<Button onClick={() => sortMarks(t)}*/}
                            {/*        variant="contained"*/}
                            {/*        size="small"*/}
                            {/*        color='primary'*/}
                            {/*>Sort for Tag*/}
                            {/*</Button>*/}
                        </Grid>
                    </Paper>
                })
            }
            {/*<Grid*/}
            {/*    container*/}
            {/*    alignItems='center'*/}
            {/*    justifyContent='space-around'*/}
            {/*    style={{ width: 500, height: 50}}*/}
            {/*>*/}
            {tags.length > 0 && <Button
                onClick={showAllMarks}
                variant="contained"
                size="medium"
                color='primary'
            >Show all Marks</Button>}

            {newTag ?
                <Paper
                    style={{
                        width: 300,
                        backgroundColor: "lightgrey",
                        padding: "5px",
                        margin: "10px"
                    }}

                >
                    <Grid item
                          container
                          alignItems={'center'}
                          justifyContent={'space-between'}
                    >
                        <TextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setValueNewTag(e.currentTarget.value)
                            }
                            }
                            onBlur={addNewTag}
                            onKeyPress={onKeyPressAddItem}
                            label="Enter tag"
                            variant="outlined"
                            style={{width: '110'}}
                            size={'small'}
                        />
                        <Button
                            onClick={() => addNewTag()}
                            color={'primary'}
                            variant="outlined"
                            size="small"
                        >
                            Save
                        </Button>
                    </Grid>

                </Paper>


                :
                <Button
                    onClick={() => setNewTag(true)}
                    color={'primary'}
                    variant="contained"
                    size="medium"
                >
                    Add Tag
                </Button>}
            {/*</Grid>*/}
        </Container>
    )
}

export default Main;
