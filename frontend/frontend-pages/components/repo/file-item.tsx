import Link from "next/link"
import { FileText } from "lucide-react"

interface FileItemProps {
  file: {
    name: string
    icon: string
    commitMessage: string
    lastCommit: string
    updatedAt: string
  }
  repoName: string
}

export function FileItem({ file, repoName }: FileItemProps) {
  return (
    <div className="flex items-center p-3 hover:bg-muted/50">
      <div className="flex-1">
        <Link href={`/repo/${repoName}/blob/main/${file.name}`} className="text-blue-600 hover:underline">
          {file.icon === "file-text" ? (
            <FileText className="h-4 w-4 mr-2 inline" />
          ) : (
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
          )}
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
  )
}

