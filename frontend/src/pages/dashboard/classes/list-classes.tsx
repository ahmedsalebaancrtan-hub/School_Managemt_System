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
import { AlertDestructive } from "@/components/utilits/errorComponent"
import Spinner from "@/components/utilits/spinner"
import { useClassStore } from "@/store/class-store"
import dayjs  from "dayjs"
import { useEffect } from "react"

export const ListClasses = () => {
  const {isLoading,isSucess, isError,errorMsg, ListClasses,data } = useClassStore()


  useEffect(() => {
    ListClasses()
  },[])


  return  isLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className="header flex items-center justify-between mb-6">
          <div className="text">
            <h1 className="title text-2xl font-bold">List Classes</h1>
            <p className="description text-sm text-gray-500 my-1">Here you can view all the classes in the system.</p>
        </div>
        <div className="btn">
            <Button>create class</Button>
        </div>
      </div>

      {isError ? (
        <AlertDestructive errorTitle="errorMsg"/>
      ) : (
         <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-25">ID</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Academic_year</TableHead>
      <TableHead>CreatedAt</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {data.map((cls)=> {
    return (
      
    <TableRow>
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
