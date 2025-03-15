import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Copy, GitCommit } from "lucide-react"

interface CommitDetailProps {
  repoName: string
  commitHash: string
}

export function CommitDetail({ repoName, commitHash }: CommitDetailProps) {
  // This would be fetched from an API in a real app
  const commit = {
    hash: commitHash,
    shortHash: commitHash.substring(0, 7),
    message: "Add new feature implementation",
    description:
      "This commit adds the core functionality for the new feature, including UI components and business logic.",
    author: "user123",
    authorEmail: "user123@example.com",
    time: "2 days ago",
    additions: 120,
    deletions: 45,
    changedFiles: 5,
    branch: "feature/new-feature",
    parents: ["def456ghi789"],
  }

  return (
    <div className="border rounded-lg mb-6">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold mb-1">{commit.message}</h1>
        {commit.description && <p className="text-sm text-muted-foreground mt-2">{commit.description}</p>}
      </div>
      <div className="p-4 flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-user.jpg" alt={commit.author} />
          <AvatarFallback>{commit.author.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-medium">
            <Link href={`/user/${commit.author}`} className="hover:underline">
              {commit.author}
            </Link>{" "}
            committed {commit.time}
          </div>
          <div className="text-sm text-muted-foreground">
            Commit <span className="font-mono">{commit.shortHash}</span> on branch{" "}
            <Badge variant="outline">{commit.branch}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <GitCommit className="h-4 w-4 mr-1" />
            {commit.parents.length} parent
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            Copy hash
          </Button>
        </div>
      </div>
    </div>
  )
}

