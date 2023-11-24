import React, { useState } from 'react'
import { ButtonProps } from './interface/ButtonInterface'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import AddComponent from '../../UserManagement/conponents/AddComponent'
const CreateBtn : React.FC<any> = () => {
  const navigate = useNavigate()

  
  // const [openDwar , setDwarOpen] = useState<boolean>(false)

  const createUser = () =>{
    // setDwarOpen(true)
    navigate("/bhavin")
  }
  return (
    <div>
      <Button onClick={createUser}>Create</Button>
      {/* <AddComponent open={setDwarOpen} /> */}
    </div>
  )
}

export default CreateBtn