import { createSlice } from "@reduxjs/toolkit";
import { IOpenModalParam } from "../ClassBook/types";

interface IInit {
    isOpen: boolean
    payload: IOpenModalParam | null
}

const initialState: IInit = { isOpen: false, payload: null }
export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
                state.isOpen = !state.isOpen
                state.payload = action.payload
        }
    }
})

export const { toggleModal } = ModalSlice.actions
export const modalReducer = ModalSlice.reducer