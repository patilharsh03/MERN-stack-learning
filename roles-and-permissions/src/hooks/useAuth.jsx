import { useSelector } from "react-redux";
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManger = false
  let isAdmin = false
  let status = "Employee"

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    isManger = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if (isManger) status = 'Manager'
    if (isAdmin) status = 'Admin'

    return { username, roles, status, isManger, isAdmin }
  }

  return { username: '', roles: [], isManger, isAdmin, status }
}

export default useAuth