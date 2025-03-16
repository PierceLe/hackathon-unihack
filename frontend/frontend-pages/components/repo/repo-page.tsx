import { RepoHeader } from "@/components/repo/repo-header"
import { RepoTabs } from "@/components/repo/repo-tabs"
import { BranchSelector } from "@/components/repo/branch-selector"

import { Background } from "@/components/ui/background"

interface RepoPageProps {
  repoName: string
}

export default function RepoPage({ repoName }: RepoPageProps) {
  return (
    <main>
      <div className="absolute inset-0 -z-10">
        <Background imagePath="/bg.jpg" />
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="container py-4 ml-4">
          <RepoHeader repoName={repoName} />

          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
            <div className="flex items-center gap-4">
              <BranchSelector />
            </div>

          </div>

          <div className="gap-8">
            <RepoTabs repoName={repoName} />
          </div>
          
        </div>
      </div>
    </main>
    
  )
}

