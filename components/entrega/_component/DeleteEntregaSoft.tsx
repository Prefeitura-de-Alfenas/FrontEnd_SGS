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
import { ChangeStatusEntrega } from "@/app/api/entrega/routes";

interface DeleteSoftEntrega{
    id:string
    refetch:()=>void,
    usuario:UsuarioLogadoI
  

}

function DeleteSoftEntrega({usuario,id,refetch}:DeleteSoftEntrega) {
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: ({id}:{id:string}) => {
          return  ChangeStatusEntrega(usuario,id)
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
                <DialogTitle>Você está abusolutamente certo que quer desativar essa entrega?</DialogTitle>
                <DialogDescription>
                   Se voce desativar essa entrega não contabilizara nos relatorios e anulara a validade do mesmo
                </DialogDescription>
                </DialogHeader>
                <div className="p-2">
                <DialogClose asChild>
                <Button   onClick={() => 
                mutation.mutate({id:id })}className="mt-2 text-white font-bold">Desativar</Button>
                </DialogClose>
                </div>
            </DialogContent>
            </Dialog>
     );
}

export default DeleteSoftEntrega;