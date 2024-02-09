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

import {  ArrowLeftFromLine, DownloadCloud, FilePlus2, Loader, ScrollText,  Search, ThumbsDown, ThumbsUp } from "lucide-react";




import {
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import {  useState } from "react";




import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { useToast } from "@/components/ui/use-toast"
import { GetArquivo, GetArquivoPessoa } from "@/app/api/arquivo/route";
import { Arquivo } from "@/interfaces/arquivo/interface";
import { Button } from "../ui/button";
import FixedButton from "./AddButton";
import DeleteSoftArquivo from "./DialogDeleteSoft/DeleteArquivo";

interface TableEntregasProps{
  pessoaId:string;
  usuario:UsuarioLogadoI
}
const TableArquivos = ({usuario,pessoaId}:TableEntregasProps) => {
  const { toast } = useToast()

  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  const [img,setImg] = useState('')


  // Queries
  const {data,isPending,isError,error,refetch} = useQuery({
    queryKey:['entregas',skip,search,pessoaId],
    queryFn:() => GetArquivoPessoa(usuario,pessoaId,skip,search),

    
  })
 
  const mutation = useMutation({
    mutationFn: async (id:string) => {
      let dataResponse = data;
     
    
      return     GetArquivo(usuario,id)
      .then(response => response)
    },
    onError:(error) => {
      console.log(error)
      toast({
        title: error.message,
       
      })
    },
    onSuccess:(data) =>{

      
     
           toast({
          
             title: "Deferido com sucesso",
           })
  
          
          
           window.open(data, '_blank');
      
    
    }
  })

 
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  setFilter(value);

 }

 const handelClickSearcher = () =>{
    setSearch(filter)
 }

 const handelClickImagem = (id:string) =>{
  mutation.mutate(id)
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
        <TableCaption>Arquivos</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Benefíciario</TableHead>
            <TableHead>Arquivo</TableHead>
            <TableHead>Delete</TableHead>
           
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((arquivo:Arquivo) => (
             <TableRow key={arquivo.id}>
                <TableCell className="font-medium">{arquivo.nome}</TableCell>
                <TableCell className="font-medium">{arquivo.pessoa.nome}</TableCell>
             
                <TableCell onClick={() => handelClickImagem(arquivo.id)} className="cursor-pointer">
                <DownloadCloud  fill="#312e81" />
                </TableCell>

                <TableCell>
                    <DeleteSoftArquivo id={arquivo.id} refetch={refetch} usuario={usuario} />
                </TableCell>

                 
                
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
       <FixedButton pessoaId={pessoaId}/>
</div>

     );
}
 
export default TableArquivos