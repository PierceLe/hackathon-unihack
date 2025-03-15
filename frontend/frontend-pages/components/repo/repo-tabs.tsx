"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, AlertCircle, GitPullRequest, Play, Shield } from "lucide-react"
import { FileBrowser } from "@/components/repo/file-browser"
import { PullRequestList } from "@/components/repo/pull-request-list"

interface RepoTabsProps {
  repoName: string
}

export function RepoTabs({ repoName }: RepoTabsProps) {
  return (
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
        <FileBrowser repoName={repoName} />
      </TabsContent>
      <TabsContent value="pull-requests" className="pt-6">
        <PullRequestList repoName={repoName} />
      </TabsContent>
    </Tabs>
  )
}

