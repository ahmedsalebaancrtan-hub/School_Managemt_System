import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ClassRowActions from "@/components/utilits/class-actions"
import ComponentHeader from "@/components/utilits/component-header"
import { AlertDestructive } from "@/components/utilits/errorComponent"
import Spinner from "@/components/utilits/spinner"
import { useClassStore } from "@/store/class-store"
import dayjs  from "dayjs"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ListClasses = () => {
  const {isLoading, isError, ListClasses,data } = useClassStore()
  const navigate = useNavigate()
  const colomns = ["ID","Title","Academic_year","CreatedAt","Actions"]


  useEffect(() => {
    ListClasses()
  },[])


  return  isLoading ? (
    <Spinner />
  ) : (
    <div>
      <ComponentHeader
       title="Classes" description="A list of all classes" to="/dashboard/classes/create" btnText="Create Class"/>
      {isError ? (
        <AlertDestructive errorTitle="errorMsg"/>
      ) : (
         <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
   {colomns.map((col) => (
    <TableHead key={col}>{col}</TableHead>
   ))}
    </TableRow >
  </TableHeader>
  <TableBody>
  {data.map((cls)=> {
    return (
      
    <TableRow key={cls.id} className="hover:bg-gray-100">
      <TableCell className="font-medium">{cls.id}</TableCell>
      <TableCell>{cls.title}</TableCell>
      <TableCell>{cls.AcademicYear}</TableCell>
      <TableCell >{dayjs(cls.Createdat).format("YYYY-MM-DD : HH:mm ")}</TableCell>
      <TableCell><ClassRowActions /></TableCell>
    </TableRow>
 
    )
  })}

 
  </TableBody>
</Table>

      )}
     
    </div>
  )
}
