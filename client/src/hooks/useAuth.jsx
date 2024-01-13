import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    //let isManager = false
    let isAdmin = false
    let isUser = false
    let status = ""

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isUser = roles.includes('User')
        isAdmin = roles.includes('Admin')

        if (isUser) status = "User"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isAdmin, isUser }
    }
    return { username: '', roles: [], isAdmin, status, isUser }
}
export default useAuth