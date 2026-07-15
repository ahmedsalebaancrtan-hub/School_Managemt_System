import { useEffect } from "react";
import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ClassRowActions from "@/components/utilits/class-actions";
import ComponentHeader from "@/components/utilits/component-header";
import { AlertDestructive } from "@/components/utilits/errorComponent";
import Spinner from "@/components/utilits/spinner";

import { useClassStore } from "@/store/class-store";

export const ListClasses = () => {
  const {
    isLoading,
    isError,
    errorMsg,
    ListClasses,
    data,
  } = useClassStore();

  useEffect(() => {
    ListClasses();
  }, [ListClasses]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <ComponentHeader
        title="Classes"
        description="Manage all classes in your school."
        to="/dashboard/classes/create"
        btnText="Create Class"
      />

      {isError && <AlertDestructive errorTitle={errorMsg} />}

      {!isError && (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold">
                Class Directory
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Total Classes{" "}
                <span className="font-semibold text-primary">
                  ({data.length})
                </span>
              </p>
            </div>
          </div>

          <Table>
            <TableCaption className="py-4">
              All registered classes.
            </TableCaption>

            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Class Name</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((cls, index) => (
                  <TableRow
                    key={cls.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="font-semibold text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-semibold">
                          {cls.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          ID #{cls.id}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {cls.AcademicYear}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {dayjs(cls.Createdat).format("DD MMM YYYY")}

                      <p className="text-xs">
                        {dayjs(cls.Createdat).format("hh:mm A")}
                      </p>
                    </TableCell>

                    <TableCell className="text-right">
                      <ClassRowActions cls={cls} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-muted p-5 text-3xl">
                        📚
                      </div>

                      <h3 className="text-lg font-semibold">
                        No Classes Found
                      </h3>

                      <p className="max-w-md text-sm text-muted-foreground">
                        There are no classes available yet.
                        Click <strong>Create Class</strong> to add
                        your first class.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};