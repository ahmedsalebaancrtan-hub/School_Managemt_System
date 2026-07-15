import ComponentHeader from "@/components/utilits/component-header"
import { AlertDestructive } from "@/components/utilits/errorComponent"
import Spinner from "@/components/utilits/spinner"
import  { useClassStore } from "@/store/class-store"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import dayjs from "dayjs"


const ViewClass = () => {
    const {id} = useParams()
    const {isLoading, errorMsg,isError, GetClassDetailsById, ClassDetails}  = useClassStore();

    useEffect(() => {
     if(id) {
      GetClassDetailsById(id)
     }

    }, []);
      const colomns = ["ID","Title","Academic_year","CreatedAt",]
  return (
    <div>
      <ComponentHeader title="View class Details" btnText="Back to class" to="/dashboard/classes" />
      {isLoading ?  (<Spinner/> ): isError ? (<AlertDestructive errorTitle="failed to get class by id" errorDescription={errorMsg}/>): (
        <div>
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

      
    <TableRow key={ClassDetails.id} className="hover:bg-gray-100">
      <TableCell >{ClassDetails.id}</TableCell>
      <TableCell>{ClassDetails.title}</TableCell>
      <TableCell>{ClassDetails.AcademicYear}</TableCell>
      <TableCell >{dayjs(ClassDetails.Createdat).format("YYYY-MM-DD : HH:mm ")}</TableCell>
     
    </TableRow>
 


 
  </TableBody>
</Table>
        </div>

      )}
    </div>
  )
}

export default ViewClass