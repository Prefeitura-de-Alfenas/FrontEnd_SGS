"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { ChangeStatusEntrega } from "@/app/api/entrega/routes";

interface DeleteSoftEntrega {
  id: string;
  refetch: () => void;
  usuario: UsuarioLogadoI;
  status: string;
}

function DeleteSoftEntrega({
  usuario,
  id,
  refetch,
  status,
}: DeleteSoftEntrega) {
  const { toast } = useToast();
  const [motivo, setMotivo] = useState("");
  const [nivel, setNivel] = useState(""); // vermelho, laranja, verde
  const isStatusInativo = status === "pendente" || status === "inativo";
  const mutation = useMutation({
    mutationFn: ({
      id,
      novoStatus,
      motivo,
      nivel,
    }: {
      id: string;
      novoStatus: string;
      motivo: string;
      nivel?: string;
    }) => {
      return ChangeStatusEntrega(usuario, id, motivo, novoStatus, nivel);
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Erro ao mudar status da entrega",
      });
    },
    onSuccess: (data) => {
      refetch();
    },
  });

  const handleAcao = (novoStatus: "ativo" | "inativo") => {
    if (!motivo.trim()) {
      toast({
        title: "Informe o motivo",
        variant: "destructive",
      });
      return;
    }

    if (novoStatus === "ativo" && !nivel) {
      toast({
        title: "Selecione o nível de prioridade (cor)",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({ id, novoStatus, motivo, nivel });
  };

  return (
    <Dialog>
      <DialogTrigger>
        {(() => {
          switch (status.trim()) {
            case "pendente":
              return (
                <div className="flex items-center gap-2 text-green-700">
                  <ArrowDownUp color="green" /> Analisar
                </div>
              );
            case "ativo":
              return (
                <div className="flex items-center gap-2 text-blue-500">
                  <ArrowDown color="blue" /> Indeferir
                </div>
              );
            case "inativo":
              return (
                <div className="flex items-center gap-2 text-red-500">
                  <ArrowUp color="red" /> Deferir
                </div>
              );
            default:
              return null;
          }
        })()}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {status === "pendente" &&
              "Escolha se deseja indeferir ou deferir esta entrega?"}
            {status === "ativo" &&
              "Você tem certeza que deseja indeferir esta entrega?"}
            {status === "inativo" &&
              "Você tem certeza que deseja deferir esta entrega?"}
          </DialogTitle>
          <DialogDescription>
            {status === "pendente" &&
              "Escolha se deseja indeferir ou deferir esta entrega"}
            {status === "ativo" &&
              "Indeferindo, essa entrega será ignorada nos relatórios e considerada inválida."}
            {status === "inativo" &&
              "Deferindo, essa entrega será aprovada e válida para receber atendimento/benefício."}
          </DialogDescription>
        </DialogHeader>
        {/* Select para deferir */}
        {isStatusInativo && (
          <div className="mb-2">
            <label className="text-sm font-medium">Nível (cor):</label>
            <Select onValueChange={setNivel} value={nivel}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vermelho">Vermelho</SelectItem>
                <SelectItem value="laranja">Laranja</SelectItem>
                <SelectItem value="verde">Verde</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {/* Textarea para motivo */}
        <div className="mb-4">
          <label className="text-sm font-medium">Motivo:</label>
          <Textarea
            placeholder="Descreva o motivo da ação..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>
        {/* Botões de ação */}
        <div className="flex justify-end gap-2">
          {status === "pendente" && (
            <>
              <DialogClose asChild>
                <Button
                  onClick={() => handleAcao("inativo")}
                  variant="destructive"
                  disabled={!motivo.trim() ? true : false}
                >
                  Indeferir
                </Button>
              </DialogClose>
            </>
          )}
          {!isStatusInativo && (
            <DialogClose asChild>
              <Button
                onClick={() => handleAcao("inativo")}
                variant="destructive"
                disabled={!motivo.trim() ? true : false}
              >
                Indeferir
              </Button>
            </DialogClose>
          )}
          {isStatusInativo && (
            <DialogClose asChild>
              <Button
                onClick={() => handleAcao("ativo")}
                className="text-white font-bold"
                disabled={!motivo.trim() || !nivel ? true : false}
              >
                Deferir
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSoftEntrega;
