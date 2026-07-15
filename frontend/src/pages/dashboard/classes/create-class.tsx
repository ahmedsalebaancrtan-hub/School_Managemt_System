import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ComponentHeader from "@/components/utilits/component-header";
import Spinner from "@/components/utilits/spinner";

import { useClassStore } from "@/store/class-store";
import type { ICreateClassRequest } from "@/types/classes";


const CreateClass = () => {
  const {
    isLoading,
    isCreateSuccess,
    isError,
    errorMsg,
    CreateClass,
    ResetStatus,
  } = useClassStore();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [academicYear, setAcademicYear] = useState("");


  useEffect(() => {
    ResetStatus();
  }, [ResetStatus]);


  useEffect(() => {
    if (isError) {
      toast.error(errorMsg);
    }

    if (isCreateSuccess) {
      toast.success("Class created successfully");

      setTitle("");
      setAcademicYear("");

      navigate("/dashboard/classes");
    }

  }, [
    isError,
    errorMsg,
    isCreateSuccess,
    navigate
  ]);



  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();


    if (!title || !academicYear) {
      toast.error("Please fill all required fields");
      return;
    }


    const data: ICreateClassRequest = {
      title,
      AcademicYear: academicYear,
    };


    CreateClass(data);
  };



  return (
    <div className="space-y-6">

      <ComponentHeader
        title="Create Class"
        description="Add a new class to your school system."
        to="/dashboard/classes"
        btnText="Back to Classes"
      />


      <div className="max-w-2xl rounded-2xl border bg-white shadow-sm">

        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-semibold">
            Class Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter class details below.
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
              placeholder="Example: Grade 10 A"
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
                  Creating...
                </div>
              ) : (
                "Create Class"
              )}
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
};


export default CreateClass;