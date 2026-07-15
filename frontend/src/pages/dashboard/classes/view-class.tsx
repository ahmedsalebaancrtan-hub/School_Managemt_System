import { useEffect } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import ComponentHeader from "@/components/utilits/component-header";
import { AlertDestructive } from "@/components/utilits/errorComponent";
import Spinner from "@/components/utilits/spinner";

import { useClassStore } from "@/store/class-store";

const ViewClass = () => {
  const { id } = useParams();

  const {
    isLoading,
    errorMsg,
    isError,
    GetClassDetailsById,
    ClassDetails,
  } = useClassStore();

  useEffect(() => {
    if (id) {
      GetClassDetailsById(id);
    }
  }, [id, GetClassDetailsById]);

  return (
    <div className="space-y-6">
      <ComponentHeader
        title="Class Details"
        description="View detailed information about this class."
        btnText="Back to Classes"
        to="/dashboard/classes"
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <AlertDestructive
          errorTitle="Failed to load class"
          errorDescription={errorMsg}
        />
      ) : (
        <div className="rounded-2xl border bg-white shadow-sm">
          {/* Header */}
          <div className="border-b px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {ClassDetails?.title}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Class ID #{ClassDetails?.id}
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                {ClassDetails?.AcademicYear}
              </span>
            </div>
          </div>


          {/* Details */}
          <div className="grid gap-6 p-6 md:grid-cols-2">

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Class Name
              </p>

              <p className="text-lg font-semibold">
                {ClassDetails?.title}
              </p>
            </div>


            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Academic Year
              </p>

              <p className="text-lg font-semibold">
                {ClassDetails?.AcademicYear}
              </p>
            </div>


            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Created At
              </p>

              <p className="font-medium">
                {dayjs(ClassDetails?.Createdat).format(
                  "DD MMM YYYY"
                )}
              </p>

              <p className="text-sm text-muted-foreground">
                {dayjs(ClassDetails?.Createdat).format(
                  "hh:mm A"
                )}
              </p>
            </div>


            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Last Updated
              </p>

              <p className="font-medium">
                {dayjs(ClassDetails?.UpdatedAt).format(
                  "DD MMM YYYY"
                )}
              </p>

              <p className="text-sm text-muted-foreground">
                {dayjs(ClassDetails?.UpdatedAt).format(
                  "hh:mm A"
                )}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ViewClass;