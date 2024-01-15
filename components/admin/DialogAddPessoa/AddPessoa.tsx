"use client"
import { ChangeStatus } from "@/app/api/pessoas/routes";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useMutation } from "@tanstack/react-query";
import {  UserRoundPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

interface DeleteSoftPessoa{
    id:string
    refetch:()=>void,
  

}

function AddPessoa({id,refetch}:DeleteSoftPessoa) {
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: ({id}:{id:string}) => {
          return  ChangeStatus(id)
          .then((response) => response);
  
        },
        onError:(error) => {
          toast({
            title: error.message,
            description:"entrou no on error do mutation"
          
          })
  
        },
        onSuccess:(data) =>{
          refetch() // atualiza toda o fetch
  
        }
      })
    return ( 
        <Dialog>
            <DialogTrigger><UserRoundPlus  fill="blue" /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Você está abusolutamente certo que quer Ativar essa familia?</DialogTitle>
                <DialogDescription>
                   Se voce ativar essa familia ela estára habita há receber beneficios ou qual quer outro tipo de atendimento
                </DialogDescription>
                </DialogHeader>
                <div className="p-2">
                <DialogClose asChild>
                <Button   onClick={() => 
                  mutation.mutate({id:id })}className="mt-2">Ativar</Button>
                </DialogClose>
                </div>
            </DialogContent>
            </Dialog>
     );
}

export default AddPessoa;