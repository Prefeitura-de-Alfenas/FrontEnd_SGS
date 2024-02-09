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

import { Bitcoin, FileEdit,FilePlus2,LayoutList,PackageX,Search, ThumbsDown, ThumbsUp,  UsersRound } from "lucide-react";
import { Button } from "../ui/button";

import {
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import {  GetPessas } from "@/app/api/pessoas/routes";
import { PessoaI } from "@/interfaces/pessoa/interface";
import { useState } from "react";
import DeleteSoftPessoa from "./DialogDelte/DeleteSoft";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


interface TablePessoasProps{
  usuarioLogado:UsuarioLogadoI
}
const TablePessoas = ({usuarioLogado}:TablePessoasProps) => {
  
 
  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries
  const {data,isPending,isError,error, refetch } = useQuery({
    queryKey:['pessoas',skip,search,usuarioLogado],
    queryFn:() => GetPessas(usuarioLogado,skip,search),

    
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
        <div className="flex items-start justify-start">
        <Button className="ms-1 mt-4 mb-4 text-white font-bold"><Link href="/pessoas/novapessoa">Novo Responsavel </Link></Button>
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
            placeholder="Digite o CPF"
          />
         <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          <Search onClick={handelClickSearcher} />
        </span>
        </div>
      </div>

        <Table>
        <TableCaption>Pessoas</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Email</TableHead>
       
            <TableHead>Entregas</TableHead>
            <TableHead>Deferir</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Familiares</TableHead>
            <TableHead>Beneficios</TableHead>
            <TableHead>Arquivos</TableHead>
            {usuarioLogado.user.role.find((row:string) => row === "Admin") && 
               <TableHead>Excluir</TableHead>
             }
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((pessoa:PessoaI) => (
             <TableRow key={pessoa.id}>
                <TableCell className="font-medium">{pessoa.nome}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.email}</TableCell>

                 
                <TableCell><Link href={`/entrega/${pessoa.id}`} ><LayoutList   fill="#1d1797" /></Link></TableCell>
                <TableCell><Link href={`/entrega/create/${pessoa.id}`} ><PackageX  fill="#0d0c22" /></Link></TableCell>
                <TableCell><Link href={`/pessoas/novapessoa/${pessoa.id}`} ><FileEdit fill="#312e81" /></Link></TableCell>
                <TableCell><Link href={`/familiares/${pessoa.id}`} ><UsersRound fill="#ea580c" /></Link></TableCell>
                <TableCell><Link href={`/pessoas/beneficios/${pessoa.id}`} ><Bitcoin  fill="#572002" /></Link></TableCell>
                <TableCell><Link href={`/arquivo/${pessoa.id}`} ><FilePlus2  fill="#1a1817" /></Link></TableCell>
                {usuarioLogado.user.role.find((row:string) => row === "Admin") && 
                <TableCell>
                    <DeleteSoftPessoa id={pessoa.id} refetch={refetch} usuario={usuarioLogado} />
                </TableCell>
               }
                
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
 
export default TablePessoas