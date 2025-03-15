import { FileHeader } from "@/components/repo/file-header"
import { FileItem } from "@/components/repo/file-item"

interface FileBrowserProps {
  repoName: string
}

export function FileBrowser({ repoName }: FileBrowserProps) {
  // This would typically come from an API or context
  const files = [
    {
      name: "README.md",
      icon: "file-text",
      commitMessage: "Update documentation",
      lastCommit: "abc123",
      updatedAt: "3 days ago",
    },
    {
      name: "package.json",
      icon: "file-text",
      commitMessage: "Update dependencies",
      lastCommit: "def456",
      updatedAt: "1 week ago",
    },
    {
      name: "src",
      icon: "folder",
      commitMessage: "Refactor components",
      lastCommit: "ghi789",
      updatedAt: "2 weeks ago",
    },
    {
      name: "public",
      icon: "folder",
      commitMessage: "Add new assets",
      lastCommit: "jkl012",
      updatedAt: "3 weeks ago",
    },
  ]

  return (
    <div className="border rounded-lg">
      <FileHeader repoName={repoName} />
      <div className="divide-y">
        {files.map((file) => (
          <FileItem key={file.name} file={file} repoName={repoName} />
        ))}
      </div>
    </div>
  )
}

