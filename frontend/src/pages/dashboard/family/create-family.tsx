import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ComponentHeader from "@/components/utilits/component-header";
import Spinner from "@/components/utilits/spinner";

import { useFamilyStore } from "@/store/family-store";
import type { ICreateFamilyRequest } from "@/types/family";

const CreateFamily = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    isCreateSuccess,
    isError,
    errorMsg,
    CreateFamily,
    ResetStatus,
  } = useFamilyStore();

  const [familyName, setFamilyName] = useState("");
  const [parentOneName, setParentOneName] = useState("");
  const [parentOnePhone, setParentOnePhone] = useState("");
  const [parentTwoName, setParentTwoName] = useState("");
  const [parentTwoPhone, setParentTwoPhone] = useState("");
  const [address, setAddress] = useState("");

  // Clear previous status when page opens
  useEffect(() => {
    ResetStatus();
  }, [ResetStatus]);

  // Error effect
  useEffect(() => {
    if (!isError) return;

    toast.error(errorMsg);

    ResetStatus();
  }, [isError, errorMsg, ResetStatus]);

  // Success effect
  useEffect(() => {
    if (!isCreateSuccess) return;

    toast.success("Family created successfully");

    setFamilyName("");
    setParentOneName("");
    setParentOnePhone("");
    setParentTwoName("");
    setParentTwoPhone("");
    setAddress("");

    ResetStatus();

    navigate("/dashboard/family");
  }, [isCreateSuccess, navigate, ResetStatus]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !familyName.trim() ||
      !parentOneName.trim() ||
      !parentOnePhone.trim() ||
      !parentTwoName.trim() ||
      !parentTwoPhone.trim() ||
      !address.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const data: ICreateFamilyRequest = {
      familyName,
      Parent_one_Name: parentOneName,
      Parent_one_phone: parentOnePhone,
      Parent_two_name: parentTwoName,
      Parent_two_phone: parentTwoPhone,
      address,
    };

    CreateFamily(data);
  };

  return (
    <div className="space-y-6">
      <ComponentHeader
        title="Create Family"
        description="Add a new family to your school system."
        to="/dashboard/family"
        btnText="Back to Families"
      />

      <div className="max-w-4xl rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-semibold">
            Family Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete all required information below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="familyName">Family Name</Label>
              <Input
                id="familyName"
                placeholder="Ahmed Family"
                value={familyName}
                disabled={isLoading}
                onChange={(e) => setFamilyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentOneName">Parent One Name</Label>
              <Input
                id="parentOneName"
                placeholder="Ahmed Mohamed"
                value={parentOneName}
                disabled={isLoading}
                onChange={(e) => setParentOneName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentOnePhone">Parent One Phone</Label>
              <Input
                id="parentOnePhone"
                placeholder="+25261XXXXXXX"
                value={parentOnePhone}
                disabled={isLoading}
                onChange={(e) => setParentOnePhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentTwoName">Parent Two Name</Label>
              <Input
                id="parentTwoName"
                placeholder="Hodan Ali"
                value={parentTwoName}
                disabled={isLoading}
                onChange={(e) => setParentTwoName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentTwoPhone">Parent Two Phone</Label>
              <Input
                id="parentTwoPhone"
                placeholder="+25263XXXXXXX"
                value={parentTwoPhone}
                disabled={isLoading}
                onChange={(e) => setParentTwoPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Hargeisa, Somalia"
                value={address}
                disabled={isLoading}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => navigate("/dashboard/family")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-160px"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Creating...
                </div>
              ) : (
                "Create Family"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFamily;