import React from 'react'
import {Link} from "react-router-dom"
function More() {
  return (
    <div>
        <div>
            more
        </div>
        <Link to={"/student/more/addProfilePicture"}>
            Add profile Picture
        </Link>
    </div>
  )
}

export default More