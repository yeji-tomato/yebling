import { useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../_actions/user_actions'

export function Auth(SpecificComponent, option, adminRoute = null){

    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입이 불가능한 페이지

    function AuthenticationCheck(props){
        
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                console.log('로그인 상태', response.payload)

                // 로그인을 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [props])

        return (
            <SpecificComponent {...props} user={user}/>
        )
    }
    return AuthenticationCheck
}