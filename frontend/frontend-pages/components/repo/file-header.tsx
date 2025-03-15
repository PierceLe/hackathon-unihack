import { Button } from "@/components/ui/button"
import { GitBranch, GitCommit, GitPullRequest, FileText } from "lucide-react"
import Link from "next/link"

interface FileHeaderProps {
  repoName: string
}

export function FileHeader({ repoName }: FileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <GitBranch className="h-4 w-4 mr-1" />
          main
        </Button>
        <span className="text-sm text-muted-foreground">
          <GitCommit className="h-3 w-3 inline mr-1" />
          <Link href={`/repo/${repoName}/commit/abc123`} className="hover:underline">
            abc123
          </Link>{" "}
          · Last commit 3 days ago
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <GitPullRequest className="h-4 w-4 mr-1" />
          Pull request
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          Add file
        </Button>
        <Button variant="outline" size="sm">
          Code
        </Button>
      </div>
    </div>
  )
}

