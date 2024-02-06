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
import {  GetPessas, GetPessasPrData } from "@/app/api/pessoas/routes";
import { PessoaCreateI, PessoaI } from "@/interfaces/pessoa/interface";
import { useState } from "react";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { Button } from "@/components/ui/button";
import { convertDataHoraParaPtBr } from "@/utils/converDateParaInput";
import { getHeadersPessoas } from "@/utils/headerexcel/pessoas/getHeaders";
import { generateExcel } from "@/utils/exportExcel";
import { now } from "next-auth/client/_utils";
import { format, sub, subDays } from "date-fns";


interface TablePessoasProps{
  usuarioLogado:UsuarioLogadoI
}
const TablePessoasPorData = ({usuarioLogado}:TablePessoasProps) => {
  
    const todayString = format(new Date(), 'yyyy-MM-dd');

    // Obtém a data dos últimos 30 dias e formata como string
    const last30DaysString = format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd');

  const [dataInicial,setDataInicial] = useState('')
  const [dataFinal,setDataFinal] = useState('')
  const [dataInicialSearch,setDataInicialSearch] = useState(last30DaysString)
  const [dataFinalSearch,setDataFinalSearch] = useState(todayString)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries
  const {data,isPending,isError,error, refetch } = useQuery({
    queryKey:['pessoas',dataInicialSearch,dataFinalSearch,search,usuarioLogado],
    queryFn:() => GetPessasPrData(usuarioLogado,dataInicialSearch,dataFinalSearch,search),

    
  })

 
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  setFilter(value);
  
 }

 const handleFilterincial = (event:React.ChangeEvent<HTMLInputElement>) =>{
    event.preventDefault();
    const value = event.target.value;
    setDataInicial(value);
  
   }
 const handleFiltefinal = (event:React.ChangeEvent<HTMLInputElement>) =>{
    event.preventDefault();
    const value = event.target.value;
    setDataFinal(value);
  
   }

 const handelClickSearcher = () =>{
    console.log(dataInicial)
    setSearch(filter)
    setDataInicialSearch(dataInicial)
    setDataFinalSearch(dataFinalSearch)
 }

 function GerarExel(){
    const headerPessoas = getHeadersPessoas();
    const date = new Date();
    
    const novoFormato = data.map((item:any )=> headerPessoas.map(campo => item[campo]));

    console.log(headerPessoas)
    console.log(novoFormato)

    generateExcel(`pessoas_${convertDataHoraParaPtBr(date)}`,headerPessoas,novoFormato)
    
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
      
        <div className="">
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
        </div>
        <div className="flex flex-row w-1/2 gap-10">
        <div className="w-full">
        <label >Data inicio</label>
         <Input
            type="date"
            id="dataInicial"
            name="dataInicial"
            onChange={handleFilterincial}
            value={dataInicial}
            required
            className="mt-2" // Aumente o padding à direita para acomodar o ícone
           
          />
        </div>
        <div className="w-full">
        <label >Data Fim</label>
          <Input
            type="date"
            id="datafinal"
            name="search"
            onChange={handleFiltefinal}
            value={dataFinal}
            required
            className="mt-2" // Aumente o padding à direita para acomodar o ícone
          
          />
          </div>
        </div>
        
        <div className="flex items-start justify-start">
        <Button onClick={handelClickSearcher} className="ms-1 mt-4 mb-4 text-white font-bold">Buscar</Button>
        </div> 
      </div>

        <Table>
        <TableCaption>Pessoas</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Data Nascimento</TableHead>
            <TableHead>Estadocivil</TableHead>
            <TableHead>Renda</TableHead>

            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((pessoa:PessoaI) => (
             <TableRow key={pessoa.id}>
                <TableCell className="font-medium">{pessoa.nome}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.sexo}</TableCell>
                <TableCell>{convertDataHoraParaPtBr(pessoa.datanascimento)}</TableCell>
                <TableCell>{pessoa.estadocivil}</TableCell>
                <TableCell>{pessoa.renda.toString()}</TableCell>
                
                </TableRow>
            ))}
          
            
        </TableBody>
        </Table>

  
</div>

     );
}
 
export default TablePessoasPorData