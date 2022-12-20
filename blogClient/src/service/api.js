import axios from "axios";

const URL="http://localhost:4000"

export const registerUser=async(stateVarible)=>{
    try {
        return await axios.post(`${URL}/signup`,stateVarible)
    } catch (error) {
        console.log(error.message)
    }
}

export const loginUser=async(stateVarible)=>{
    try {
        return await axios.post(`${URL}/login`,stateVarible)
    } catch (error) {
        console.log(error.message)
    }
}