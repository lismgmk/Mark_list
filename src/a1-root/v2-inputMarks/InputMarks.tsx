import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {Box, Button, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {actionsMain, MarksType} from "../v1-Main/mainReduser";
import {AppRootStateType} from "../store";
import {actionsTags} from "../v4-Tag/tagsReduser";


export type addItemFormType = {
    addItem: (title : string) => void
    disabled?: boolean
}

export const getTag = (title: string)=>{

    let valueInput = title.split(/(#[a-z\d-]+)/ig)

    let tag: string[] = []
    valueInput.map((i, index)=>{
        if(index % 2 !== 0){
            tag.push(i.replace('#',''))
        }
    })
    return tag
}
export const InputMarks = React.memo(function (){

    const [title, setTitle] = useState<string>('')
    const dispatch = useDispatch()
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {

        const trimmedTitle = title.trim()
        let tag = getTag(trimmedTitle)
        if (trimmedTitle) {
            dispatch(actionsMain.createMarks(trimmedTitle, tag))
            dispatch(actionsTags.addTags(tag))
        }

        setTitle('')
    }

    const onKeyPressAddItem = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addItem()
        }
    }



    return(
        <Paper
            style={{
                width: 500,
                height: 100,
                backgroundColor: "lightgrey",
                marginBottom: 20
            }}
        >
            <Grid
                container
                alignItems='center'
                justifyContent='space-around'
                style={{ width: 500, height: 100, backgroundColor: 'darkkhaki'}}
            >
                <TextField
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddItem}
                    label="Enter your mark"
                    variant="outlined"
                    style={{width: 350}}
                    helperText="To add press the button or key 'Enter'"
                />
                <Button onClick = {addItem}
                        variant="contained"
                        size="medium"
                        color='primary'
                >
                    Add
                </Button>
            </Grid>
        </Paper>

    )
})













