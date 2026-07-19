import { useEffect } from "react";
import dayjs from "dayjs";

import ComponentHeader from "@/components/utilits/component-header";
import { AlertDestructive } from "@/components/utilits/errorComponent";
import Spinner from "@/components/utilits/spinner";
import { useStudentStore } from "@/store/student-store";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import StudentRowActions from "./student-row-actions";

const ListStudent = () => {
  const {
    data,
    isLoading,
    isError,
    errorMsg,
    ListStudents,
    ResetStatus,
  } = useStudentStore();

  useEffect(() => {
    ResetStatus();
    ListStudents();
  }, []);

  return (
    <div>
      <ComponentHeader
        title="Student Console"
        description="Manage and view all registered students"
        to="/dashboard/students/create-student"
        btnText="Create Student"
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <AlertDestructive
          errorTitle="Failed to load students"
          errorDescription={errorMsg}
        />
      ) : (
        <Table>
          <TableCaption className="py-4">
            All registered students.
          </TableCaption>

          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Student Code</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Family</TableHead>
              <TableHead>Parent One</TableHead>
              <TableHead>Parent One Phone</TableHead>
              <TableHead>Parent Two</TableHead>
              <TableHead>Parent Two Phone</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((student, index) => (
                <TableRow
                  key={student.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="font-medium">
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    {student.student_code}
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="font-semibold">
                        {student.first_name}{" "}
                        {student.middle_name}{" "}
                        {student.last_name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        ID #{student.id}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {student.gender}
                    </span>
                  </TableCell>

                  <TableCell>
                    {student.family?.familyName}
                  </TableCell>

                  <TableCell>
                    {student.family?.Parent_one_Name}
                  </TableCell>

                  <TableCell>
                    {student.family?.parent_one_phone}
                  </TableCell>

                  <TableCell>
                    {student.family?.Parent_two_name || <span className="text-muted-foreground text-xs">—</span>}
                  </TableCell>

                  <TableCell>
                    {student.family?.Parent_two_phone || <span className="text-muted-foreground text-xs">—</span>}
                  </TableCell>

                  <TableCell>
                    <div>
                      {dayjs(student.Createdat).format("DD MMM YYYY")}
                      <p className="text-xs text-muted-foreground">
                        {dayjs(student.Createdat).format("hh:mm A")}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    {/* <StudentRowActions student={student} /> */}
                    Edit | Delete
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="rounded-full bg-muted p-5 text-3xl">
                      🎓
                    </div>

                    <h3 className="text-lg font-semibold">
                      No Students Found
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      There are no students available yet.
                      Click <strong>Create Student</strong> to add your first student.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ListStudent;