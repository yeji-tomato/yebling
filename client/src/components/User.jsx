
function User(){
    return(
        <>
        <ul className={click ? "active" : "nav-menu"}>   
            <li></li>
            <li>
                <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
            </li>
            <li>
                <NavLink to="/register" activeStyle={activeStyle}>Register</NavLink>
            </li>
        </ul>
        </>
    )
}