import { createSlice } from "@reduxjs/toolkit"


const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        tags: [],
    },
    reducers: {
        setTags(state, action) {
            state.tags = action.payload
        },
    }
})

export default tagSlice.reducer
export const { setTags } = tagSlice.actions