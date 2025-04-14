"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { Trash2,Power } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { ChangeStatusEntrega } from "@/app/api/entrega/routes";


interface DeleteSoftEntrega {
  id: string;
  refetch: () => void;
  usuario: UsuarioLogadoI;
  status: string;
}

function DeleteSoftEntrega({ usuario, id, refetch,status }: DeleteSoftEntrega) {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return ChangeStatusEntrega(usuario, id).then((response) => response);
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "etnrou no on error do mutation",
      });
    },
    onSuccess: (data) => {
      refetch(); // atualiza toda o fetch
    },
  });
  return (
    <Dialog>
      <DialogTrigger>
      {status!== "pendente" ? <Trash2 color="red" /> :
             (<div className="flex items-center gap-2 text-blue-700"><Power color="blue" /> Aprovar</div>)}
        
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {status!== "pendente" ? "Você está abusolutamente certo que quer desativar essa entrega?" :
             "Você está abusolutamente certo que quer Aprovar essa entrega?"}
          </DialogTitle>
          <DialogDescription>
          {status!== "pendente" ? 
          "Se voce desativar essa entrega não contabilizara nos relatorios e anulara a validade do mesmo" :
          "Se voce Ativar essa entrega ela estara habito ha receber esse atendimento/beneficio"}
           
          </DialogDescription>
        </DialogHeader>
        <div className="p-2">
          <DialogClose asChild>
            <Button
              onClick={() => mutation.mutate({ id: id })}
              className="mt-2 text-white font-bold"
            >
                   {status!== "pendente" ? 
          "Desativar" :
          "Aprovar"}
             
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSoftEntrega;
