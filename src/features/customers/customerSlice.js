import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: "",
    nationalID: "",
    createAt: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID, createAt) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createAt
                    }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createAt = action.payload.createAt;

            }
        },
        updateName(state, action) {
            state.customer.fullName = action.payload
        }
    }
})

export const {
    createCustomer,
    updateName,
} = customerSlice.actions

export default customerSlice.reducer

/* 
const customerReducer = (customerState = initialState, action) => {
    switch(action.type) {
        case "customer/createCustomer":
            return {
                ...customerState,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createAt: action.payload.createAt,
            };
        case "customer/updateName":
            return {
                ...customerState,
                fullName: action.payload.fullName
            }
        default: return customerState
    }
}

export const createCustomer = (fullName, nationalID) => {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalID,
            createAt: new Date().toISOString(),
        }
    }
}

export const updateName = (fullName) => {
    return {
        type: "customer/updateName",
        payload: {
            fullName,
        }
    }
}

export default customerReducer; */