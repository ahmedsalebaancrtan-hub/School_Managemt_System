import {
  Popover,
  PopoverContent, PopoverTrigger
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { EllipsisVertical } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { IClass } from "@/types/classes"

const ClassRowActions = ({cls} : {cls : IClass}) => {
  const navigate = useNavigate()
  return (
    <div>
        <Popover >
  <PopoverTrigger asChild>
    <Button variant="outline">
      <EllipsisVertical />
    </Button>
   
  </PopoverTrigger>
  <PopoverContent>
  <Button onClick={ ()=> navigate("/dashboard/classes/"+ cls.id )}  variant="outline" size="sm">
    View 

  </Button>
  <Button variant="outline" size="sm">
    Edit

  </Button>
  <Button variant="destructive" size="sm">
    Delete

  </Button>
  </PopoverContent>
</Popover></div>
  )
}

export default ClassRowActions