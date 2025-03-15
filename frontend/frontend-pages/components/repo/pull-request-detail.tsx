import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitMerge, GitPullRequest } from "lucide-react"

interface PullRequestDetailProps {
  repoName: string
  prId: string | number
}

export function PullRequestDetail({ repoName, prId }: PullRequestDetailProps) {
  // This would be fetched from an API in a real app
  const pullRequest = {
    id: prId,
    title: "Add new feature",
    description: "This PR adds a new feature that allows users to customize their profile settings.",
    state: "open",
    author: "user123",
    createdAt: "2 days ago",
    commits: 3,
    comments: 5,
    additions: 120,
    deletions: 45,
    changedFiles: 5,
    sourceBranch: "feature/new-feature",
    targetBranch: "main",
  }

  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        <GitPullRequest className="h-6 w-6 text-green-500 mt-1" />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-1">{pullRequest.title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="text-green-600 bg-green-50">
              Open
            </Badge>
            <span>
              <Link href="/user123" className="font-medium hover:underline">
                {pullRequest.author}
              </Link>{" "}
              wants to merge {pullRequest.commits} commits into {pullRequest.targetBranch} from{" "}
              {pullRequest.sourceBranch}
            </span>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <GitMerge className="h-4 w-4 mr-2" />
          Merge pull request
        </Button>
      </div>
    </div>
  )
}

