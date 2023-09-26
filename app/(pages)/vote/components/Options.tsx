import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { Badge } from "@/components/ui/badge"
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'


type Props = {
    votes: any
    selectedNumber: any | null
    handleNumberSelect:(number: any) => void,
    setVotes: React.Dispatch<React.SetStateAction<[] | votesData[]>>
}

const Options = (props: Props) => {

    const [isLoading,setIsLoading] = useState(false);
    async function handleFetchVotes(){
        if(!props?.selectedNumber?.id){
            return toast({ title: "Please select a candidate", variant: "destructive", duration: 2000 });
        }
        setIsLoading(true);
         try {

            let API : any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidate/${props.selectedNumber.id}`,{method:"PUT"});
            if(!API.ok){
               return toast({ title: "Something went wrong while fetching", variant: "destructive", duration: 2000 });
            }

            API = await API.json();
        
            if(API.message==="Votes incremented successfully"){
               props.setVotes(props.votes.map((v:any) => {
                  if(v.id == props.selectedNumber.id){
                     return {...v, votes: v.votes + 1}
                  }
                  return v
               }))

               toast({ title: "Vote Successful", duration: 2000,className:"bg-green-500 text-white" });
            }
            
         } catch (error:any) {
            toast({ title: error.message, variant: "destructive", duration: 2000 });
         }
         finally{
            setIsLoading(false);
         }
    }

    const { theme } = useTheme();

    return (
        <div className='grid grid-cols-1 gap-4 lg:place-items-stretch place-items-center' style={{ marginTop: "100px" }}>
            <div className='lg:col-span-3 space-x-3 space-y-3 '>
                {/* {Array.from({ length: props.votes }, (_, index) => (
                   <Badge onClick={() => props.handleNumberSelect(index+1)} key={index+1} className='cursor-pointer' variant={props.selectedNumber == index+1 ? "default" : "secondary"}>{index + 1}</Badge>

                ))} */}
                   {props?.votes?.map((e:any, index:number) => {
                     return <Badge onClick={() => props.handleNumberSelect(e)} key={index} className='cursor-pointer' variant={e.id===props?.selectedNumber?.id ? "default" : "secondary"}>{e?.name} : {e?.votes}</Badge>
                   })} 
            </div>
            <Button onClick={handleFetchVotes} disabled={isLoading} className={cn("flex-[0.3] w-[30%] mx-auto mt-10", theme == "light" && "bg-[#F1F0E8] text-black hover:opacity-20 hover:bg-[#F1F0E8] transition hover:text-black px-3")} size={"sm"}>
                {
                    isLoading ? <Loader2 className='animate-spin'/> : "Fetch Votes"
                }
            </Button>
        </div>
    )
}

export default Options