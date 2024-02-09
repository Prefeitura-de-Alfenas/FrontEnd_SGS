"use client"
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
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { DeleteArquivo } from "@/app/api/arquivo/route";

interface DeleteSoftArquivo{
    id:string
    refetch:()=>void,
    usuario:UsuarioLogadoI
  

}

function DeleteSoftArquivo({usuario,id,refetch}:DeleteSoftArquivo) {
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: ({id}:{id:string}) => {
          return  DeleteArquivo(usuario,id)
          .then((response) => response);
  
        },
        onError:(error) => {
          toast({
            title: error.message,
            description:"etnrou no on error do mutation"
          
          })
  
        },
        onSuccess:(data) =>{
          refetch() // atualiza toda o fetch
  
        }
      })
    return ( 
        <Dialog>
            <DialogTrigger><Trash2 fill="red" /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Você está abusolutamente certo que quer deleter esse documento?</DialogTitle>
                <DialogDescription>
                   Se voce deletar esse documento vai ter que cadastrar novamente
                </DialogDescription>
                </DialogHeader>
                <div className="p-2">
                <DialogClose asChild>
                <Button   onClick={() => 
                mutation.mutate({id:id })}className="mt-2 text-white font-bold">Apagar</Button>
                </DialogClose>
                </div>
            </DialogContent>
            </Dialog>
     );
}

export default DeleteSoftArquivo;