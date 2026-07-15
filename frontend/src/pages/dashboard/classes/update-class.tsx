import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ComponentHeader from "@/components/utilits/component-header";
import Spinner from "@/components/utilits/spinner";

import { useClassStore } from "@/store/class-store";
import type { ICreateClassRequest } from "@/types/classes";

const UpdateClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isUpdateSuccess,
    isError,
    errorMsg,
    ClassDetails,
    GetClassDetailsById,
    UpdateClass,
    ResetStatus,
  } = useClassStore();

  const [title, setTitle] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  useEffect(() => {
    ResetStatus();

    if (id) {
      GetClassDetailsById(id);
    }
  }, [id, ResetStatus, GetClassDetailsById]);


  useEffect(() => {
    if (ClassDetails?.id) {
      setTitle(ClassDetails.title);
      setAcademicYear(ClassDetails.AcademicYear);
    }
  }, [ClassDetails]);


  useEffect(() => {
    if (isError) {
      toast.error(errorMsg);
    }
  }, [isError, errorMsg]);


  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Class updated successfully");
      navigate("/dashboard/classes");
    }
  }, [isUpdateSuccess, navigate]);


  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) return;

    if (!title || !academicYear) {
      toast.error("Please fill all fields");
      return;
    }

    const data: ICreateClassRequest = {
      title,
      AcademicYear: academicYear,
    };

    UpdateClass(id, data);
  };


  return (
    <div className="space-y-6">

      <ComponentHeader
        title="Update Class"
        description="Edit class information and save changes."
        to="/dashboard/classes"
        btnText="Back to Classes"
      />


      <div className="max-w-2xl rounded-2xl border bg-white shadow-sm">

        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-semibold">
            Class Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update the details below.
          </p>
        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          <div className="space-y-2">
            <Label htmlFor="title">
              Class Title
            </Label>

            <Input
              id="title"
              placeholder="Example: Grade 10"
              value={title}
              disabled={isLoading}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="academicYear">
              Academic Year
            </Label>

            <Input
              id="academicYear"
              placeholder="Example: 2026-2027"
              value={academicYear}
              disabled={isLoading}
              onChange={(e) =>
                setAcademicYear(e.target.value)
              }
            />
          </div>


          <div className="flex justify-end gap-3 border-t pt-5">

            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() =>
                navigate("/dashboard/classes")
              }
            >
              Cancel
            </Button>


            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[140px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Updating...
                </div>
              ) : (
                "Update Class"
              )}
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UpdateClass;