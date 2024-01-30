import React from 'react'
import AlumniDash from '../../Components/AlumniComponent/AlumniDash/AlumniDash'
import AlunmniHomeBoxes from '../../Components/AlumniComponent/AlumniHomeBoxes/AlunmniHomeBoxes'

function AlumniHome() {
  return (
    <div>
        <AlumniDash>
            <AlunmniHomeBoxes/>
        </AlumniDash>
    </div>
  )
}

export default AlumniHome