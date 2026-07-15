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
  }, [id]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    const data: ICreateClassRequest = {
      title,
      AcademicYear: academicYear,
    };

    UpdateClass(id, data);
  };

  return (
    <div>
      <ComponentHeader
        title="Update Class"
        description="Update class details"
        to="/dashboard/classes"
        btnText="Back to Classes"
      />

      <form onSubmit={handleSubmit} className="space-y-5 mt-6">
        <div>
          <Label>Class Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label>Academic Year</Label>
          <Input
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/classes")}
          >
            Cancel
          </Button>

          <Button disabled={isLoading} type="submit">
            {isLoading ? <Spinner /> : "Update Class"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;