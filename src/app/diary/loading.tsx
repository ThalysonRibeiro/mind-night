import { Spinner } from "@/components/ui/kibo-ui/spinner";


export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <Spinner className="text-indigo-500" size={100} variant='infinite' />
      </div>
    </div>
  )
}