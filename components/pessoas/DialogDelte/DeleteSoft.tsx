"use client";
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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"; // ⬅️ importa o Textarea
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

interface DeleteSoftPessoa {
  id: string;
  refetch: () => void;
  usuario: UsuarioLogadoI;
}

function DeleteSoftPessoa({ usuario, id, refetch }: DeleteSoftPessoa) {
  const { toast } = useToast();
  const [motivo, setMotivo] = useState(""); // ⬅️ estado do textarea

  const mutation = useMutation({
    mutationFn: ({ id, motivo }: { id: string; motivo: string }) => {
      if (motivo.length <= 0) {
        toast({
          title: "Descreva o motivo",
          description: "entrou no on error do mutation",
        });
        throw new Error("Motivo é obrigatório");
      }
      return ChangeStatus(usuario, id, motivo).then((response) => response);
      // ⬅️ certifique-se que o `ChangeStatus` aceite esse segundo parâmetro
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "entrou no on error do mutation",
      });
    },
    onSuccess: (data) => {
      if (data.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      } else {
        refetch(); // atualiza toda o fetch
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 color="red" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Você tem certeza que deseja desativar essa família?
          </DialogTitle>
          <DialogDescription className="mb-4">
            Se você desativar essa família, ela não poderá mais receber
            benefícios ou qualquer outro tipo de atendimento.
          </DialogDescription>

          <Textarea
            placeholder="Descreva o motivo da desativação..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </DialogHeader>
        <div className="p-2">
          <DialogClose asChild>
            <Button
              disabled={!motivo.trim()} // impede clicar se estiver vazio ou só com espaços
              onClick={() => mutation.mutate({ id, motivo })}
              className="mt-2 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Desativar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSoftPessoa;
