import { Button } from "@/components/ui/button"

export const ListClasses = () => {
  return (
    <div>
      <div className="text">
          <div className="header">
            <h1 className="title text-2xl font-bold">List Classes</h1>
            <p className="description text-sm text-gray-500">Here you can view all the classes in the system.</p>
        </div>
        <div className="btn">
            <Button>Add Class</Button>
        </div>
      </div>
    </div>
  )
}
