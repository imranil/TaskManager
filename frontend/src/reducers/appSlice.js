import { createSlice } from "@reduxjs/toolkit"


const appSlice = createSlice({
    name: 'app',
    initialState: {
        loader: false
    },
    reducers: {
        showLoader(state) {
            state.loader = true
        },
        hideLoader(state) {
            state.loader = false
        }
    }
})

export default appSlice.reducer
export const { showLoader, hideLoader } = appSlice.actions
