import {
  Popover,
  PopoverContent, PopoverTrigger
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { EllipsisVertical } from "lucide-react"

const ClassRowActions = () => {
  return (
    <div>
        <Popover >
  <PopoverTrigger asChild>
    <Button variant="outline">
      <EllipsisVertical />
    </Button>
   
  </PopoverTrigger>
  <PopoverContent>
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