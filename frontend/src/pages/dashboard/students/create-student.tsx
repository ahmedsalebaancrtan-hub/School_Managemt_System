import ComponentHeader from "@/components/utilits/component-header"


const  CreateSTudent = () => {
  return (
    <div>
      <ComponentHeader
        title="Student Create form"
        description="Manage  and create students"
        to="/dashboard/students"
        btnText="Back to list"
      />
    </div>
  )
}

export default CreateSTudent