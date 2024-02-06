"use client"

import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { Bitcoin, FileEdit,LayoutList,PackageX,Search, ThumbsDown, ThumbsUp,  UsersRound } from "lucide-react";


import {
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import { useEffect, useState } from "react";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { Button } from "@/components/ui/button";
import { convertDataHoraParaPtBr } from "@/utils/converDateParaInput";

import { generateExcel } from "@/utils/exportExcel";
import { useForm } from 'react-hook-form';
import { format, sub, subDays } from "date-fns";
import { GetEntregaPorData } from "@/app/api/entrega/routes";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { EntregaByIdI, RelatorioEntregaFilterData } from "@/interfaces/entras/interface";
import { getHeadersEntregas } from "@/utils/headerexcel/entregas/getHeader";


interface TablePessoasProps{
  usuarioLogado:UsuarioLogadoI
}

const formSchema = z.object({
  dateinicial:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  datefinal:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
 
   usuarioId:z.string().optional(),
   equipamentoId:z.string().optional(),
   pessoId:z.string().optional(),
   beneficioId:z.string().optional(),
})
type FormData =z.infer<typeof formSchema>;

const TableRelatorioPorData = ({usuarioLogado}:TablePessoasProps) => {
  const { toast } = useToast()
 
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })

   const todayString = format(new Date(), 'yyyy-MM-dd');

    // Obtém a data dos últimos 30 dias e formata como string
  const last30DaysString = format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd');
  useEffect(() => {
    setValue("dateinicial", last30DaysString,{ shouldValidate: true });
    setValue("datefinal", todayString,{ shouldValidate: true });
  },[])

  // Queries
  const {data,isPending,isError,error, refetch } = useQuery({
    queryKey:['entregas',getValues(),usuarioLogado],
    queryFn:() => GetEntregaPorData(usuarioLogado,getValues()),

    
  })

  
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  
  
 }


 function GerarExel(){
    const headerEntregas = getHeadersEntregas();
    const date = new Date();


    const arrayDeValores: RelatorioEntregaFilterData[][] = data.map((objeto:RelatorioEntregaFilterData) =>
      [objeto.id, objeto.pessoa.id, objeto.pessoa.cpf,objeto.beneficio.nome,
      objeto.quantidade,objeto.observacao,objeto.equipamento.nome,objeto.usuario.nome,objeto.datacadastro,objeto.status]
    );



    generateExcel(`entregas_${convertDataHoraParaPtBr(date)}`,headerEntregas,arrayDeValores)
    
}




const onSubmit = async (data:FormData) => {

   setValue("dateinicial", data.dateinicial,{ shouldValidate: true });
   setValue("datefinal", data.datefinal,{ shouldValidate: true });

 }
  if (isPending) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {error.message}</div>
  }


    return ( 
        <div className="flex flex-col ">    
        <div className="flex items-start justify-start">
        <Button onClick={GerarExel} className="ms-1 mt-4 mb-4 text-white font-bold">Exportar para excel</Button>
        </div> 
        <div className="flex flex-col w-2/3   ms-1">
      
        {/* <div className="">
          <Input
            type="text"
            id="search"
            name="search"
            onChange={handleFilter}
            value={filter}
            required
            className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent pr-10" // Aumente o padding à direita para acomodar o ícone
            placeholder="Digite o Nome"
          />
        </div> */}
        <div className="flex flex-row w-1/2 gap-10">
        <div className="w-full">
        <label >Data inicio</label>
         <Input
            type="date"
            id="dateinicial"
            {...register('dateinicial')}
            required
            className="mt-2" // Aumente o padding à direita para acomodar o ícone
           
          />
        </div>
        <div className="w-full">
        <label >Data Fim</label>
          <Input
            type="date"
            id="datefinal"
            {...register('datefinal')}
            required
            className="mt-2" // Aumente o padding à direita para acomodar o ícone
          
          />
          </div>
        </div>
        
        <div className="flex items-start justify-start">
        <Button onClick={handleSubmit(onSubmit)} className="ms-1 mt-4 mb-4 text-white font-bold">Buscar</Button>
        </div> 
      </div>

        <Table>
        <TableCaption>Entregas</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Beneficiario</TableHead>
            <TableHead>Beneficio</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Data Cadastro</TableHead>
            <TableHead>Status</TableHead>
    

            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((entrega:EntregaByIdI) => (
             <TableRow key={entrega.id}>
                <TableCell className="font-medium">{entrega.pessoa.nome}</TableCell>
                <TableCell>{entrega.beneficio.nome}</TableCell>
                <TableCell>{entrega.quantidade}</TableCell>
                <TableCell>{convertDataHoraParaPtBr(entrega.datacadastro)}</TableCell>
                <TableCell>{entrega.status}</TableCell>

                
                </TableRow>
            ))}
          
            
        </TableBody>
        </Table>

  
</div>

     );
}
 
export default TableRelatorioPorData