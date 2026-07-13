import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ComponentHeader from "@/components/utilits/component-header"
import Spinner from "@/components/utilits/spinner"
import { useClassStore } from "@/store/class-store"
import type { ICreateClassRequest } from "@/types/classes"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const CreateClass = () => {
    const {isLoading,isSucess, isError, CreateClass,errorMsg} = useClassStore();
    const [Title, setTitle] = useState("");
const [AcademicYear, setAcademicYear] = useState("");
const navigate = useNavigate()

useEffect(() => {
    if(isError) {
        toast.error("Error creating class: " + errorMsg)
    }
    if(isSucess) {
        toast.success("Class created successfully")
        setTitle("")
        setAcademicYear("")
        navigate("/dashboard/classes")
    }
},[isSucess, isError])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(Title && AcademicYear) {
            const data : ICreateClassRequest = {
                title: Title,
                AcademicYear: AcademicYear
            }
            CreateClass(data)
            return 
        }

        toast.error("Please fill in all required fields")
    }

return (
    <>
    <div>
        <ComponentHeader
       title="Create Class" description="Fill in the details to create a new class" to="/dashboard/classes" btnText="Back to Classes"/>
    </div>
    
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Class Title */}
        <div>
          <Label className="block text-sm font-medium mb-2">
            Class Title
          </Label>

          <Input
            type="text"
            name="title"
            placeholder="e.g. Grade 10 A"
            value={Title }
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Academic Year
          </label>

          <Input
            type="text"
            name="academicYear"
            placeholder="e.g. 2025-2026"
            value={AcademicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>

          <Button disabled={isLoading} type="submit">
           {isLoading ? <Spinner /> : "Create Class"}
          </Button>
        </div>
      </form>

    
</>
  )
}

export default CreateClass