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

import { FileEdit,  Search } from "lucide-react";
import { Button } from "../ui/button";



import {
  useQuery,
} from '@tanstack/react-query'

import {  useState } from "react";
import { GetEquipamentos } from "@/app/api/equipamentos/routes";
import { EquipamentoI } from "@/interfaces/equipamento/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

interface TableEquipamentosProps{
  usuario:UsuarioLogadoI
}

const TableEquipamentos = ({usuario}:TableEquipamentosProps) => {


  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries
  const {data,isPending,isError,error} = useQuery({
    queryKey:['equipamentos',skip,search],
    queryFn:() => GetEquipamentos(usuario,skip,search),

    
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
        <Button className="ms-1 mt-4 mb-4 text-white font-bold"><Link href="/equipamentos/create">Novo Equipamento</Link></Button>
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
        <TableCaption>Equipamentos</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Responsavel</TableHead>
            <TableHead>Bairro</TableHead>
            <TableHead>Editar</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((equipamento:EquipamentoI) => (
             <TableRow key={equipamento.id}>
                <TableCell className="font-medium">{equipamento.nome}</TableCell>
                <TableCell>{equipamento.responsavel}</TableCell>
                <TableCell>{equipamento.bairro}</TableCell>

                <TableCell><Link href={`/equipamentos/edit/${equipamento.id}`} ><FileEdit fill="#312e81" /></Link></TableCell>

                
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
 
export default TableEquipamentos