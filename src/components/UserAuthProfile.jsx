
import { Logo } from './Logo'
import { Logout } from '../pages/Logout'
import { LinkButton } from './Buttons'
import { useAuth } from '../utils/AuthProvider'

export const UserAuthProfile = () => {
    const { isLoggedIn} = useAuth();
  return (
    <div className='wrapper'>
                <Logo/>
                <div className='userAuthReg'>
                    {isLoggedIn ? (
                        <>
                            <Logout />
                            <LinkButton to='/profile'>Profile</LinkButton>
                        </>
                    ) : (
                        <LinkButton to='/login'>Log-In</LinkButton>
                    )}
                </div>
            </div>
  )
}
