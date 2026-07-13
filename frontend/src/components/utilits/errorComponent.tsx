import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive({errorTitle , errorDescription}: {errorTitle : string, errorDescription? : string}) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>{errorTitle}</AlertTitle>
      {errorDescription ? <AlertDescription>{errorDescription}</AlertDescription> : null}
    </Alert>
  )
}
