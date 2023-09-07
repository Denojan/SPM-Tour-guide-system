import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    console.log("userefreshtoken")
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log("userefreshtoken1")
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        console.log("userefreshtoken2")
        console.log(response)
        setAuth(prev => {
            console.log("refreshtok");
            console.log(response.data.user);
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                user:response.data.user,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
