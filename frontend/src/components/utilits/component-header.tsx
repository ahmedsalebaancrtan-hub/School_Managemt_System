import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface ComponentHeaderProps {
  title: string;
  description?: string;
  to?: string;
  btnText?: string;
}

const ComponentHeader = ({
  title,
  description,
  to,
  btnText,
}: ComponentHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>

        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {btnText && to && (
        <Button onClick={() => navigate(to)}>
          {btnText}
        </Button>
      )}
    </div>
  );
};

export default ComponentHeader;