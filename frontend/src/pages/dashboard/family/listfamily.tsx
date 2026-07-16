import { useEffect } from "react";
import dayjs from "dayjs";

import ComponentHeader from "@/components/utilits/component-header";
import { AlertDestructive } from "@/components/utilits/errorComponent";
import Spinner from "@/components/utilits/spinner";
import FamilyRowActions from "@/components/utilits/family-actions";

import { useFamilyStore } from "@/store/family-store";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ListFamily = () => {
  const {
    isLoading,
    isError,
    errorMsg,
    ListFamily,
    data,
  } = useFamilyStore();

  useEffect(() => {
    ListFamily();
  }, [ListFamily]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <ComponentHeader
        title="Families"
        description="Manage all families registered in your school."
        to="/dashboard/family/create"
        btnText="Create Family"
      />

      {isError && <AlertDestructive errorTitle={errorMsg} />}

      {!isError && (
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Family Directory
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Total Families:{" "}
                <span className="font-semibold text-primary">
                  {data.length}
                </span>
              </p>
            </div>
          </div>

          <Table>
            <TableCaption className="py-4">
              Registered families in the system.
            </TableCaption>

            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Family</TableHead>
                <TableHead>Parent One</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Parent Two</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((family, index) => (
                  <TableRow
                    key={family.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="font-semibold text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {family.familyName}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID #{family.id}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">
                      {family.Parent_one_Name}
                    </TableCell>

                    <TableCell>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {family.parent_one_phone}
                      </span>
                    </TableCell>

                    <TableCell className="font-medium">
                      {family.Parent_two_name}
                    </TableCell>

                    <TableCell>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        {family.Parent_two_phone}
                      </span>
                    </TableCell>

                    <TableCell className="max-w-220px truncate text-muted-foreground">
                      {family.address}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {dayjs(family.Createdat).format("DD MMM YYYY")}
                      <p className="text-xs">
                        {dayjs(family.Createdat).format("hh:mm A")}
                      </p>
                    </TableCell>

                    <TableCell className="text-right">
                      <FamilyRowActions cls={family} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="rounded-full bg-gray-100 p-5">
                        👨‍👩‍👧‍👦
                      </div>

                      <h3 className="text-lg font-semibold">
                        No Families Found
                      </h3>

                      <p className="text-sm text-muted-foreground max-w-md">
                        There are currently no families in the system.
                        Click <strong>Create Family</strong> to add the
                        first record.
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