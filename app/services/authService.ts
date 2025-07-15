import axios from "axios";


const logIn = async(email: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REST_URL}/api/v1/auth/authenticate`,
            {
                email,
                password
            }
        );
        if(response.data){
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        }
    } catch (error: any) {
        if(error.code == "ERR_BAD_REQUEST"){
            alert('Invalid email or password');
        }
        throw error;
    }
}

const register = async(email: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REST_URL}/api/v1/auth/register`,
            {
                email,
                password
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    register,
    logIn
}