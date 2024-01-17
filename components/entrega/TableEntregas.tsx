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

import {  ArrowLeftFromLine, ScrollText,  Search } from "lucide-react";




import {
  useQuery,
} from '@tanstack/react-query'

import {  useState } from "react";

import { EntregaI } from "@/interfaces/entras/interface";
import { convertDataHoraParaPtBr } from "@/utils/converDateParaInput";
import {GetEntregasPorPessoa } from "@/app/api/entrega/routes";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

interface TableEntregasProps{
  pessoaId:string;
  usuario:UsuarioLogadoI
}
const TableEntregas = ({usuario,pessoaId}:TableEntregasProps) => {


  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries
  const {data,isPending,isError,error} = useQuery({
    queryKey:['entregas',skip,search,pessoaId],
    queryFn:() => GetEntregasPorPessoa(usuario,pessoaId,skip,search),

    
  })

 
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  setFilter(value);

 }

 const handelClickSearcher = () =>{
    setSearch(filter)
 }
  if (isPending) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {error.message}</div>
  }

 
    return ( 
        <div className="flex flex-col ">    
        <div className="flex justify-end items-center me-7 mb-6">
          <Link href="/pessoas"><ArrowLeftFromLine size={48} /></Link>
          </div>
        <div className="flex w-2/3 ms-1">
        <div className="relative w-full">
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
         <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          <Search onClick={handelClickSearcher} />
        </span>
        </div>
      </div>
        <Table>
        <TableCaption>Entregas</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Benefício</TableHead>
            <TableHead>Benefíciario</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Data do Cadastro</TableHead>
            <TableHead>Segunda Via</TableHead> 
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((entrega:EntregaI) => (
             <TableRow key={entrega.id}>
                <TableCell className="font-medium">{entrega.beneficio.nome}</TableCell>
                <TableCell className="font-medium">{entrega.pessoa.nome}</TableCell>
                <TableCell className="font-medium">{entrega.quantidade.toFixed(2)}</TableCell>
                <TableCell>{convertDataHoraParaPtBr(entrega.datacadastro)}</TableCell>

                <TableCell><Link href={`/reciboentrega/${entrega.id}`} target="_blank" ><ScrollText  fill="#312e81" /></Link></TableCell>

                
                </TableRow>
            ))}
          
            
        </TableBody>
        </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem >
            <PaginationPrevious   onClick={() => setSkipped((old) => Math.max(old - 1,0))}  className="cursor-pointer"/>
          </PaginationItem>
          <PaginationItem >
              <PaginationLink>Page</PaginationLink>
            </PaginationItem>
            <PaginationItem >
              <PaginationLink>{skip}</PaginationLink>
            </PaginationItem>
       
       
          <PaginationItem>
            <PaginationNext  onClick={() =>  setSkipped((old) => ((data.length -1)  >= 0 ) ? old+1 : old)} />
          </PaginationItem>
        </PaginationContent>
       </Pagination>
</div>

     );
}
 
export default TableEntregas