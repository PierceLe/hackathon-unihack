import { Button } from "@/components/ui/button"
import { GitFork, Star, Eye } from "lucide-react"

export function RepoStats() {
  return (
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
  )
}

