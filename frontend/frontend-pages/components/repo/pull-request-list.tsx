import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GitPullRequest, GitCommit } from "lucide-react"

interface PullRequestListProps {
  repoName: string
}

export function PullRequestList({ repoName }: PullRequestListProps) {
  // This would typically come from an API or context
  const pullRequests = [
    {
      id: 42,
      title: "Add new feature",
      state: "open",
      author: "user123",
      createdAt: "2 days ago",
      commits: 3,
      comments: 5,
    },
    {
      id: 41,
      title: "Fix bug in authentication",
      state: "merged",
      author: "user456",
      createdAt: "1 week ago",
      commits: 2,
      comments: 3,
    },
  ]

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="text-lg font-semibold">2 Pull Requests</div>
        <Button>New pull request</Button>
      </div>
      <div className="divide-y">
        {pullRequests.map((pr) => (
          <div key={pr.id} className="p-4">
            <div className="flex items-start">
              <GitPullRequest
                className={`h-5 w-5 mr-3 mt-1 ${pr.state === "open" ? "text-green-500" : "text-purple-500"}`}
              />
              <div className="flex-1">
                <div className="flex items-baseline">
                  <Link href={`/repo/${repoName}/pull/${pr.id}`} className="font-semibold text-lg hover:underline">
                    {pr.title}
                  </Link>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted">#{pr.id}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {pr.state === "open" ? "Opened" : "Merged"} {pr.createdAt} by {pr.author}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  <GitCommit className="h-4 w-4 mr-1" />
                  {pr.commits}
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {pr.comments}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

