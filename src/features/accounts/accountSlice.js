import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload
        },
        requestLoan: {
            prepare(ammount, purpose) {
                return {
                    payload: {
                        ammount,
                        purpose
                    }
                }
            },
            reducer(state, action) {
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance = state.balance + action.payload.amount;
        }},
        payLoan(state, action) {
            if(state.loan > 0) return;
            state.loanPurpose = "";
            state.balance = state.balance - state.loan;
            state.loan = 0;
        },
        convertingCurrency(state, action) {
            state.isLoading = true;
        }
    }
});

export const deposit = async (amount, currency) => {
    if (currency === "USD") {
        return {
            type: "account/deposit", payload: amount
        }
    } else {
        return async (dispatch, getState) => {
            dispatch({type: "account/convertingCurrency"})
            const res = await fetch(`https://api.frankfurter.app/?latest=${amount}&from=${currency}&to=USD`)
            const data = await res.json()
            const converted = data.rates.USD
            dispatch({
                type: "account/deposit", payload: converted
            })
        }
    }

    
};

export const {
    withdraw,
    requestLoan,
    payLoan,
    convertingCurrency,
} = accountSlice.actions;

export default accountSlice.reducer


/* 
const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false,
            };
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case 'account/requestLoan':
            if(state.loan > 0) return state
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            }
        case 'account/payLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            }
        default:
            return state
    }
}

const deposite = async (amount, currency) => {
    if(currency === "USD") {
        return {
            type: "account/deposit", payload: amount
        }
    } else {
        return async (dispatch, getState) => {
            const res = await fetch(`https://api.frankfurter.app/?latest=${amount}&from=${currency}&to=USD`)
            const data = await res.json()
            const converted = data.rates.USD
            dispatch({
                type: "account/deposit", payload: converted
            })
        }
    }

    
}


const withdraw = (amount) => {
    return {
        type: "account/withdraw", payload: amount
    }
}

const requestLoan = (amount, purpose) => {
    return {
        type: "account/requestLoan", payload: {amount, purpose}
    }
}

const payLoan = () => {
    return {
        type: 'account/payLoan'
    }
}

export default accountReducer */