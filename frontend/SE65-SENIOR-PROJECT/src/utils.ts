export function getUserData() {
    const userData = {
      token: localStorage.getItem('user_token'),
      id: localStorage.getItem('user_id'),
      name: localStorage.getItem('user_name'),
      email: localStorage.getItem('user_email'),
      role: localStorage.getItem('user_role'),
    }
    
    // You can check if you want to return the data only if there's a token (indicating the user is logged in)
    if (userData.token) {
      return userData
    }
    
    return {}  // return an empty object if no token is found (i.e., not logged in)
} 
export function isLoggedIn() {
    // !! converts it into boolean
    return !!localStorage.getItem('user_token')
}