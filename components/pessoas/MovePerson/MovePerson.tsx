"use client";
import {
  BuscarPessoaPorCpf,
  ChangeStatus,
  MoverPessoa,
} from "@/app/api/pessoas/routes";
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
import { ArrowLeftRight, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import InputMask from "react-input-mask";
interface MovePerson {
  pessoaId: string;
  refetch: () => void;
  usuario: UsuarioLogadoI;
}

function MovePersonFunction({ usuario, pessoaId, refetch }: MovePerson) {
  const { toast } = useToast();
  const [cpf, setCpf] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const responsavel = await BuscarPessoaPorCpf(usuario, cpf);

      if (responsavel.pessoaId !== null) {
        throw new Error("CPF informado não é de um responsável principal.");
      }

      return await MoverPessoa(usuario, pessoaId, responsavel.id);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      } else {
        console.log("dataerrior", data.message);
        toast({ title: "Sucesso", description: data.message });
        refetch();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao mover pessoa",
        description: error.message,
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger>
        <ArrowLeftRight color="green" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Digite o cpf do novo responsavel:</DialogTitle>
          <DialogDescription>
            <InputMask
              mask="999.999.999-99"
              maskChar={null}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id="cpf"
                  required
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"
                  placeholder="000.000.000-00"
                />
              )}
            </InputMask>
          </DialogDescription>
        </DialogHeader>
        <div className="p-2">
          <DialogClose asChild>
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || !cpf}
              className="mt-2 text-white font-bold"
            >
              Desativar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MovePersonFunction;
