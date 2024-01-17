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

import { ArrowLeftFromLine, Backpack, FileEdit,  Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";



import {
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import {  useState } from "react";

import { BeneficiosI } from "@/interfaces/beneficios/inteface";
import { GetBeneficios } from "@/app/api/beneficios/routes";
import { ChangeBeneficioPessoa, GetPessoaById } from "@/app/api/pessoas/routes";
import { useToast } from "@/components/ui/use-toast"
import { BeneficioOnPessoasI, PessoaI } from "@/interfaces/pessoa/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

interface TablePessoasBeneficiosProps{
    pessoaId:string,
    usuario:UsuarioLogadoI
}
const TablePessoasBeneficios = ({usuario,pessoaId}:TablePessoasBeneficiosProps) => {

  const { toast } = useToast()
  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries
  const {data,isPending,isError,error,refetch} = useQuery({
    queryKey:['beneficios',skip,search],
    queryFn:() => GetBeneficios(usuario,skip,search),
    
  })
  const {data:dataBeneficioario,isPending:isPendingBeneficioario} = useQuery({
    queryKey:['beneficiario',pessoaId],
    queryFn:() => GetPessoaById(usuario,pessoaId),
    
  })
 
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  setFilter(value);

 }

 const handelClickSearcher = () =>{
    setSearch(filter)
 }

 interface ButtonBeneficiosProps{
  beneficiosonpessoa:BeneficioOnPessoasI[]
 }
 const ButtonBeneficios = ({beneficiosonpessoa}:ButtonBeneficiosProps) =>{
  let test=false;

  beneficiosonpessoa.map((st:BeneficioOnPessoasI)=>{
    if(pessoaId == st.pessoaId ){
      test = true;
    }
 })
 

  return (
      <>
      {test &&   <ThumbsUp fill="green" />}
      {!test &&   <ThumbsDown fill="red" />}
      
      </>
    
 
  )
 }


 const mutation = useMutation({
  mutationFn: ({beneficioId,pessoaId}:BeneficioOnPessoasI) => {
    return  ChangeBeneficioPessoa(usuario,beneficioId,pessoaId)
    .then((response) => response);

  },
  onError:(error) => {
    toast({
      title: error.message,
      description:"etnrou no on error do mutation"
     
    })

  },
  onSuccess:(data) =>{
    refetch() // atualiza toda o fetch

  }
})
  if (isPending) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {error.message}</div>
  }

 
  
    return ( 
        <div className="flex flex-col p-8  ">    
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
        <TableCaption>Beneficios</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Beneficiario</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((beneficio:BeneficiosI) => (
             <TableRow key={beneficio.id}>
                <TableCell className="font-medium">{beneficio.nome}</TableCell>
                <TableCell>{beneficio.descricao}</TableCell>
                <TableCell>{beneficio.categoria}</TableCell>
                <TableCell>{beneficio.valor}</TableCell>
                <TableCell>{isPendingBeneficioario ? '' : dataBeneficioario.nome}</TableCell>

                <TableCell className=" flex  items-center justify-end me-48"
                 onClick={() => 
                    mutation.mutate({beneficioId:beneficio.id,pessoaId:pessoaId})}
                 >
                    <ButtonBeneficios  beneficiosonpessoa={beneficio.pessoas} />
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
</div>

     );
}
 
export default TablePessoasBeneficios