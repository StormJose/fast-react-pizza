import { useSelector } from "react-redux"
import store from "../../store"


function Username() {
    const username = useSelector((state) => state.user.username)
  

    return (
        <p className="hidden md:block text-sm font-semibold">{username}</p>
    )
}

export default Username
