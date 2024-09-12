import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAddMarkParam, IClassBookState, IMarks, IStudent, ISubject } from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:3000"
})


export const getAllStudents = createAsyncThunk("classbook/getStudents",async () => {
    const response = await Axios.get("/students")
    return response.data
})

export const getAllSubjets = createAsyncThunk("classbook/getSubjects",async () => {
    const response = await Axios.get("/subjects")
    return response.data
})

export const addStudent = createAsyncThunk("classbook/addStudent",async (param:IStudent) => {
    const response = await Axios.post("/students",param)
    return response.data
})

export const addSubject = createAsyncThunk("classbook/addSubject",async (param:Partial<ISubject>) => {
    const response = await Axios.post("/subjects",param)
    return response.data
})

export const addMark = createAsyncThunk("classbook/addMark",async (param:IAddMarkParam) => {
    const response = await Axios.put(`/subjects/${param.id}`,param.payload)
    return response.data
})



const initialState:IClassBookState = {
    students:[],
    subjects:[]
}

const ClassBookSlice = createSlice({
    name:"classbook",
    initialState,
    reducers:{},

    extraReducers:builder => {
        builder
            .addCase(getAllStudents.fulfilled,(state,action) => {
                state.students = action.payload
            })
            .addCase(getAllSubjets.fulfilled,(state,action) => {
                state.subjects = action.payload
            })
            .addCase(addStudent.fulfilled,(state,action) => {
                state.students.push(action.payload)
            })
            .addCase(addSubject.fulfilled,(state,action) => {
                state.subjects.push(action.payload)
            })
            .addCase(addMark.fulfilled,(state,action) => {
                state.subjects = state.subjects.map(subject => {
                    return subject.id === action.payload.id ? action.payload : subject
                })
            })
    }
})
export const ClassBookReducer = ClassBookSlice.reducer