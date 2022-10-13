import { createSlice } from "@reduxjs/toolkit"


const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
    },
    reducers: {
        showLoader(state) {
            state.isLoading = true
        },
        hideLoader(state) {
            state.isLoading = false
        }
    }
})

export default appSlice.reducer
export const { showLoader, hideLoader } = appSlice.actions
