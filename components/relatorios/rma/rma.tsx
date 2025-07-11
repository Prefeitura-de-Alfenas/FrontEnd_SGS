"use client";

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




import {  useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { Button } from "@/components/ui/button";
import { convertDataHoraParaPtBr, convertDataParaPtBr } from "@/utils/converDateParaInput";


import { useForm } from "react-hook-form";
import { format, sub } from "date-fns";
import {GetRma } from "@/app/api/entrega/routes";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EntregaByRMA,
  RelatorioEntregaFilterData,
} from "@/interfaces/entras/interface";

import { generateExcelRMA } from "@/utils/exportExcelRma";


interface TablePessoasProps {
  usuarioLogado: UsuarioLogadoI;
}

const formSchema = z.object({
  dateinicial: z.string().min(3),
  datefinal: z.string().min(3),
  usuarioId: z.string().optional(),
  equipamentoId: z.string().optional(),
  pessoId: z.string().optional(),
  beneficioId: z.string().optional(),
  statusid: z.enum(["ativo", "inativo", "pendente"]).optional(),
});
type FormData = z.infer<typeof formSchema>;

const TableRelatorioRma = ({ usuarioLogado }: TablePessoasProps) => {
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

  }, []);

 
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["relatorioRMa", getValues(), usuarioLogado],
    queryFn: () => GetRma(usuarioLogado, getValues()),
  });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
  };

  function GerarExel() {
    const header = [
      "NOME DO ATENDENTE",
      "TÉCNICO DE REFERÊNCIA",
      "NOME DO USUARIO",
      "CPF USUARIO",
      "DEMANDA",
      "SITUAÇÃO",
      "DATA ATENDIMENTO",
      "OBSERVAÇÕES",
    ];
  
    const date = new Date();
  
    const arrayDeValores = data.entregas.map((entrega: EntregaByRMA) => [
      entrega.usuario?.nome?.toUpperCase() ?? "-",
      "", // técnico de referência (vazio)
      entrega.tipo === "entrega"
        ? entrega.pessoa?.nome?.toUpperCase()
        : entrega.nome?.toUpperCase() ?? "-",
      entrega.tipo === "entrega"
        ? entrega.pessoa?.cpf ?? "-"
        : entrega.cpf ?? "-",
      entrega.beneficio?.nome?.toUpperCase() ?? "-",
      entrega.status === "inativo"
        ? "INDEFERIDO"
        : entrega.status === "ativo"
        ? "DEFERIDO"
        : "EM ANÁLISE",
      convertDataParaPtBr(entrega.datacadastro),
      entrega.observacao ?? "-",
    ]);
  
    generateExcelRMA(
      `relatorio_rma_${convertDataHoraParaPtBr(date)}`,
      header,
      arrayDeValores
    );
  }

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
        <h1 className="px-4 py-2 text-2xl font-semibold">Relatório  RMA</h1>
      </div>
      <div className="flex items-start justify-start">
        <Button
          onClick={GerarExel}
          className="ms-1 mt-4 mb-4 text-white font-bold"
        >
          Exportar para excel
        </Button>
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
            <label>Atendente</label>
            <select
              {...register("usuarioId")}
              className="mt-2 border rounded p-2"
            >
              <option value="">Todos</option>
              {data.usuarios.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.nome.toString().toUpperCase()}
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
        <TableCaption>RMA</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>NOME DO ATENDENTE</TableHead>
            <TableHead>TÉCNICO DE REFERÊNCIA</TableHead>
            <TableHead>NOME DO USUARIO</TableHead>
            <TableHead>CPF USUARIO</TableHead>
            <TableHead>DEMANDA</TableHead>
            <TableHead>SITUAÇÃO</TableHead>
            <TableHead>DATA ATENDIMENTO</TableHead>
            <TableHead>OBSERVAÇÔES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.entregas.map((entrega: EntregaByRMA) => (
            <TableRow key={entrega.id}>
              <TableCell className="font-medium">
                {entrega.usuario.nome}
              </TableCell>
              <TableCell className="font-medium">
                {" "}
              </TableCell>
              <TableCell>{entrega.tipo === "entrega" ? entrega.pessoa?.nome.toUpperCase() : entrega.nome?.toUpperCase()}</TableCell>
              <TableCell>{entrega.tipo === "entrega" ? entrega.pessoa?.cpf : entrega.cpf}</TableCell>
              <TableCell>{entrega.beneficio.nome.toUpperCase()}</TableCell>
              <TableCell>
                {entrega.status === "inativo" && (
                  <p className="text-blue-600">INDEFERIDO</p>
                )}
                {entrega.status === "ativo" && (
                  <p className="text-green-600">DEFERIDO</p>
                )}
                {entrega.status === "pendente" && (
                  <p className="text-red-600">EM ANÁLISE</p>
                )}
              </TableCell>
              <TableCell>
                {convertDataParaPtBr(entrega.datacadastro)}
              </TableCell>
              <TableCell>{entrega.observacao}</TableCell>
             

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableRelatorioRma;
