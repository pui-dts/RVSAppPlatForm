import { useState } from 'react';

function decodeToken(str) {
    if (str) {
        str = str.split('.')[1]

        str = str.replace('/-/g', '+')
        str = str.replace('/_/g', '/')
        switch (str.length % 4) {
            case 0:
                break
            case 2:
                str += '=='
                break
            case 3:
                str += '='
                break
            default:
                throw new Error('Invalid token')
        }

        str = (str + '===').slice(0, str.length + (str.length % 4))
        str = str.replace(/-/g, '+').replace(/_/g, '/')

        str = decodeURIComponent(
            escape(Buffer.from(str, 'base64').toString('binary'))
        )

        str = JSON.parse(str)
        return str
    }
}


export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        // console.log("userToken", userToken)
        // if (userToken != null) {
        //     if (userToken.msg != "Invalid Username or Password") {
        //         // console.log("userToken.contents[0]", userToken.contents[0]);
        //         // console.log("refreshToken", userToken.contents[0].refreshToken);
        //         // console.log('tokenDecode', decodeToken(userToken.contents[0].refreshToken));
        //         let decode = decodeToken(userToken.contents[0].refreshToken).sub;
        //         console.log('tokenDecode', decode);
        //         return decode;
        //     } else return null;
        // } else return null;
        return userToken;
    };



    const [token, setToken] = useState(getToken());

    const saveToken = tokenString => {

        const userToken = tokenString;
        console.log("userToken", userToken)
        if (userToken != null) {
            if (userToken.msg != "Invalid Username or Password") {
                sessionStorage.setItem('token', JSON.stringify(userToken));
                setToken(userToken);
            } 
        }


    };

    return {
        setToken: saveToken,
        token
    }
}