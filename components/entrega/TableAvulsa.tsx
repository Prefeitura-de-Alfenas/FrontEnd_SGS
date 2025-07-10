"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import {
  ScrollText,
} from "lucide-react";

import {  useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { Button } from "@/components/ui/button";
import { convertDataHoraParaPtBr } from "@/utils/converDateParaInput";

import { generateExcel } from "@/utils/exportExcel";
import { useForm } from "react-hook-form";
import { format, sub, subDays } from "date-fns";
import { GetEntregaAvulsa } from "@/app/api/entrega/routes";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    EntregaAvuslaByIdI,
  EntregaByIdI,
  RelatorioEntregaFilterData,
} from "@/interfaces/entras/interface";
import { getHeadersEntregas } from "@/utils/headerexcel/entregas/getHeader";
import { Admin } from "@/utils/dataRole";
import DeleteSoftEntrega from "@/components/entrega/_component/DeleteEntregaSoft";
import FixedButtonEntrega from "./addButton";

interface TablePessoasProps {
  usuarioLogado: UsuarioLogadoI;
}

const formSchema = z.object({
  dateinicial: z.string().min(3),
  datefinal: z.string().min(3),
  usuarioId: z.string().optional(),
  equipamentoId: z.string().optional(),
  beneficioId: z.string().optional(),
  statusid: z.enum(["ativo", "inativo", "pendente"]).optional(),
});
type FormData = z.infer<typeof formSchema>;

const TableEntregaAvulsa= ({ usuarioLogado }: TablePessoasProps) => {
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const todayString = format(new Date(), "yyyy-MM-dd");

  // Obtém a data dos últimos 30 dias e formata como string
  const last30DaysString = format(sub(new Date(), { days: 30 }), "yyyy-MM-dd");
  useEffect(() => {
    setValue("dateinicial", last30DaysString, { shouldValidate: true });
    setValue("datefinal", todayString, { shouldValidate: true });
    setValue("statusid", "ativo", { shouldValidate: true });
  }, []);

  // Queries
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["entregasAvulsa", getValues(), usuarioLogado],
    queryFn: () => GetEntregaAvulsa(usuarioLogado, getValues()),
  });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
  };

 

  const onSubmit = async (data: FormData) => {
    setValue("dateinicial", data.dateinicial, { shouldValidate: true });
    setValue("datefinal", data.datefinal, { shouldValidate: true });
  };
  if (isPending) {
    return (
      <div className="flex items-center justify-center mt-5">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
  <div className="flex flex-row items-center justify-center mb-4 mt-2 ">
  <h1 className="px-4 py-2 text-2xl font-semibold">Atendimentos avulsos</h1>
</div>
      <div className="flex flex-col w-2/3   ms-1">
        <div className="flex flex-row w-1/2 gap-10">
          <div className="w-full">
            <label>Data inicio</label>
            <Input
              type="date"
              id="dateinicial"
              {...register("dateinicial")}
              required
              className="mt-2" // Aumente o padding à direita para acomodar o ícone
            />
          </div>
          <div className="w-full">
            <label>Data Fim</label>
            <Input
              type="date"
              id="datefinal"
              {...register("datefinal")}
              required
              className="mt-2" // Aumente o padding à direita para acomodar o ícone
            />
          </div>
          <div className="w-full">
            <label>Status</label>
            <select
              {...register("statusid")}
              className="mt-2 border rounded p-2"
            >
              <option value="">Todos</option>
              <option value="ativo">Deferido</option>
              <option value="inativo">Indeferido</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          <div className="w-full">
            <label>Usuário</label>
            <select
              {...register("usuarioId")}
              className="mt-2 border rounded p-2"
            >
              <option value="">Todos</option>
              {data.usuarios.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label>Equipamentos</label>
            <select
              {...register("equipamentoId")}
              className="mt-2 border rounded p-2"
            >
              <option value="">Todos</option>
              {data.equipamentos.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-start justify-start">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="ms-1 mt-4 mb-4 text-white font-bold"
          >
            Buscar
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Atendimentos Avulso</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cpf</TableHead>
            <TableHead>Beneficio</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Data Cadastro</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Equipamento</TableHead>
            <TableHead>Status</TableHead>
            {usuarioLogado.user.role.find((row: string) => row === Admin) && (
              <TableHead>Alterar</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.entregas.map((entrega: EntregaAvuslaByIdI) => (
            <TableRow key={entrega.id}>
              <TableCell className="font-medium">
                {entrega.nome}
              </TableCell>
              <TableCell className="font-medium">
                {entrega.cpf}
              </TableCell>
              <TableCell>{entrega.beneficio.nome}</TableCell>
              <TableCell>{entrega.quantidade}</TableCell>
              <TableCell>
                {convertDataHoraParaPtBr(entrega.datacadastro)}
              </TableCell>
              <TableCell>{entrega.usuario.nome.toUpperCase()}</TableCell>
              <TableCell>{entrega.equipamento.nome.toUpperCase()}</TableCell>
              <TableCell>
                {entrega.status === "inativo" && (
                  <p className="text-blue-600">Indeferido</p>
                )}
                {entrega.status === "ativo" && (
                  <p className="text-green-600">Deferido</p>
                )}
                {entrega.status === "pendente" && (
                  <p className="text-red-600">Pendente</p>
                )}
              </TableCell>
              {usuarioLogado.user.role.find((row: string) => row === Admin) && (
                <TableCell>
                  <DeleteSoftEntrega
                    id={entrega.id}
                    status={entrega.status}
                    refetch={refetch}
                    usuario={usuarioLogado}
                  />
                </TableCell>
              )}

              <TableCell>
                {entrega.status === "pendente" && (
                  <p className="text-red-500">Esperando aprovação</p>
                )}
                {entrega.status === "inativo" && (
                  <p className="text-red-500">Atendimento Indeferido</p>
                )}
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FixedButtonEntrega link={`/entrega/avulsa/create`}  />
    </div>
  );
};

export default TableEntregaAvulsa;
