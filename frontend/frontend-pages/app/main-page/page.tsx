"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Code,
  Eye,
  FileText,
  GitBranch,
  GitCommit,
  GitFork,
  GitPullRequest,
  Play,
  Shield,
  Star,
} from "lucide-react"

import RepoPage from "@/components/repo/repo-page"

interface RepoPageProps {
  params: {
    name: string
  }
}

export default function Page({ params }: RepoPageProps) {
  return <RepoPage repoName={params.name} />
}

function RepoPageContent({ repoName }: { repoName: string }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background pb-8">
        <div className="container flex items-center h-16 px-4">{/* Header content from home page would go here */}</div>
      </header>
      <div className="flex flex-col min-h-screen pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <Link href="/" className="hover:underline">
            username
          </Link>
          <span>/</span>
          <Link href={`/repo/${repoName}`} className="font-semibold hover:underline">
            {repoName}
          </Link>
          <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs bg-muted">Public</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2">
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
          </div>
          <div className="flex items-center gap-2 md:ml-auto">
            <Button variant="outline" size="sm">
              <GitFork className="h-4 w-4 mr-1" />
              Fork
              <span className="ml-1 text-xs text-muted-foreground">12</span>
            </Button>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-1" />
              Star
              <span className="ml-1 text-xs text-muted-foreground">78</span>
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Watch
              <span className="ml-1 text-xs text-muted-foreground">5</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="code">
          <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger
              value="code"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
            >
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger
              value="issues"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Issues
              <span className="ml-1 rounded-full bg-muted px-1.5 text-xs">5</span>
            </TabsTrigger>
            <TabsTrigger
              value="pull-requests"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
            >
              <GitPullRequest className="h-4 w-4 mr-2" />
              Pull requests
              <span className="ml-1 rounded-full bg-muted px-1.5 text-xs">2</span>
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
            >
              <Play className="h-4 w-4 mr-2" />
              Actions
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="pt-6">
            <div className="border rounded-lg">
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
              <div className="divide-y">
                {files.map((file) => (
                  <div key={file.name} className="flex items-center p-3 hover:bg-muted/50">
                    <div className="flex-1">
                      <Link href={`/repo/${repoName}/blob/main/${file.name}`} className="text-blue-600 hover:underline">
                        {file.icon}
                        {file.name}
                      </Link>
                    </div>
                    <Link
                      href={`/repo/${repoName}/commit/${file.lastCommit}`}
                      className="text-xs text-muted-foreground hover:underline"
                    >
                      {file.commitMessage}
                    </Link>
                    <span className="text-xs text-muted-foreground ml-4 w-24 text-right">{file.updatedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pull-requests" className="pt-6">
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
                          <Link
                            href={`/repo/${repoName}/pull/${pr.id}`}
                            className="font-semibold text-lg hover:underline"
                          >
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const files = [
  {
    name: "README.md",
    icon: <FileText className="h-4 w-4 mr-2 inline" />,
    commitMessage: "Update documentation",
    lastCommit: "abc123",
    updatedAt: "3 days ago",
  },
  {
    name: "package.json",
    icon: <FileText className="h-4 w-4 mr-2 inline" />,
    commitMessage: "Update dependencies",
    lastCommit: "def456",
    updatedAt: "1 week ago",
  },
  {
    name: "src",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 mr-2 inline"
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    commitMessage: "Refactor components",
    lastCommit: "ghi789",
    updatedAt: "2 weeks ago",
  },
  {
    name: "public",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 mr-2 inline"
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    commitMessage: "Add new assets",
    lastCommit: "jkl012",
    updatedAt: "3 weeks ago",
  },
]

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

