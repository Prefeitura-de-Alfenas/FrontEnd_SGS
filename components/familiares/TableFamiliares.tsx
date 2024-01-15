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

  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { FileEdit, Search, UserRoundCog } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";


import {
  keepPreviousData,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import { PessoaI } from "@/interfaces/pessoa/interface";
import { GetFamiliares, changeReponsavelFamiliar } from "@/app/api/familiares/routes";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";


interface TableFamiliaresProps{
  responsavelId:string
}

const TableFamiliares = ({responsavelId}:TableFamiliaresProps) => {

  const { toast } = useToast()
  const router = useRouter();
  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')


  // Queries
  const {data,isPending,isError,error,refetch } = useQuery({
    queryKey:['familiares',responsavelId,skip,search],
    queryFn:() => GetFamiliares(responsavelId,skip,search)
  })

  const mutation =  useMutation({
    mutationFn:(id:string) =>{
      return  changeReponsavelFamiliar(id)
      .then(response => response)
    },
    onError:(error) => {
      toast({
        variant: "destructive" ,
        title: error.message,
       
      })
    },
    onSuccess:(data) => {
      if(data.error){
        toast({
          variant: "destructive" ,
          title: data.error,
       })
      }else{
        toast({
          title: data.menssage,
       })
       router.push("/pessoas");
      }
    }
  })

  const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const value = event.target.value;
    setFilter(value);
    
    console.log(filter)
   }

  const handleChangeResponsavel = async (id:string) =>{
    mutation.mutate(id)
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
        <Button className="m-4"><Link href={`/familiares/novofamiliar/${responsavelId}`}>Novo Familiar </Link></Button>
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
        <TableCaption>Familiares</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Chefe</TableHead>

            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((pessoa:PessoaI) => (
             <TableRow key={pessoa.id}>
                <TableCell className="font-medium">{pessoa.nome}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.email}</TableCell>

                <TableCell><Link href={`/familiares/editarfamiliar/${pessoa.id}/responsavel/${responsavelId}`} ><FileEdit  /></Link></TableCell>
                <TableCell className="cursor-pointer" onClick={() => handleChangeResponsavel(pessoa.id)}><UserRoundCog   /></TableCell>
          
              
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
            <PaginationNext  onClick={() =>   setSkipped((old) => ((data.length -1)  >= 0 ) ? old+1 : old)} />
          </PaginationItem>
        </PaginationContent>
       </Pagination>
</div>

     );
}
 
export default TableFamiliares