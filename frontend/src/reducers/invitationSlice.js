import { createSlice } from "@reduxjs/toolkit"


const invitationSlice = createSlice({
    name: 'invitation',
    initialState: {
        invitations: [],
        invitationsЕxist: false,
    },
    reducers: {
        setInvitations(state, action) {
            state.invitations = action.payload
        },
        setInvitationsЕxist(state) {
            state.invitationsЕxist = true
        },
        removeInvitations(state, action) {
            state.invitations = state.invitations.filter(invitation => invitation.id != action.payload)
        }
    }
})

export default invitationSlice.reducer
export const { setInvitations, setInvitationsЕxist, removeInvitations } = invitationSlice.actions