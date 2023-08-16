import { Link } from 'react-router-dom'
import { StyledIcon } from './Style/Icons'

export const Logo = () => {
    return (
        <Link to={'/'}>
            <StyledIcon src='/icons/logo.png' alt='logo' />
        </Link>
    )
}
