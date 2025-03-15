import { Button } from "@/components/ui/button"
import { GitBranch, GitCommit } from "lucide-react"

export function BranchSelector() {
  return (
    <>
      <Button variant="outline" size="sm">
        <GitBranch className="h-4 w-4 mr-1" />
        main
      </Button>
      <Button variant="outline" size="sm">
        <GitBranch className="h-4 w-4 mr-1" />
        Branches
      </Button>
      <Button variant="outline" size="sm">
        <GitCommit className="h-4 w-4 mr-1" />
        Tags
      </Button>
    </>
  )
}

