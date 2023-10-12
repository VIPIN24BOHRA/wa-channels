import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import type { Post } from '@/lib/modules/firebase.types';

export function PostCard({ postDetails }: { postDetails: Post }) {
  return (
    <Card className="relative mr-8 mb-4 h-[200px] max-h-[300px] w-[330px] cursor-pointer overflow-hidden shadow-md">
      <CardHeader className="mt-2">
        <CardDescription>
          Created at : {new Date(postDetails.createdat).toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">{postDetails.postMessage}</CardContent>
      {postDetails.status !== 'created' && (
        <p className="absolute top-2 right-2 flex items-center">
          <span className="relative mr-2 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#000] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#000]"></span>
          </span>
          <span className="text-sm font-semibold">{postDetails.status}</span>
        </p>
      )}
    </Card>
  );
}
