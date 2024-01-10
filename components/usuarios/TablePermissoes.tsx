"use client"
import {  GetPersmisoes, GetUsuerPermission, PermissionChange } from "@/app/api/usuarios/route";
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

import { FileEdit, FileLock, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";

import { PermissaoI, PermissionChangeProps, UsuarioI } from "@/interfaces/usuario/interface";
import { useToast } from "@/components/ui/use-toast"

import {
  useMutation,
  useQuery,
  useQueryClient,

} from '@tanstack/react-query'

interface TablePermissoesProps {
    userId:string
}



const TablePermissoes = ({userId}:TablePermissoesProps) => {
  const queryClient  =  useQueryClient();
  const { toast } = useToast()



  // Queries
  const {data,isPending,isError,error,refetch } = useQuery({
    queryKey:['permissoes'],
    queryFn:GetPersmisoes
  })

  const {data:dataUsuario,isPending:isPendingUsuario,isError:isErrorUsuario,refetch:refatchUsuario } = useQuery({
    queryKey:['usuariosPermissoes'],
    queryFn:() => GetUsuerPermission(userId)
  })

  

  interface ButtonPermissoesProps{
    id:string
  }
  const ButtonPermissoes = ({id}:ButtonPermissoesProps) =>{
    let test=false;
    dataUsuario.permissoes &&   dataUsuario.permissoes.map((st:any)=>{
      if(id == st.permissaoId){
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
    mutationFn: ({userId,permissionId}:PermissionChangeProps) => {
      return  PermissionChange({userId,permissionId})
      .then((response) => response);

    },
    onError:(error) => {
      toast({
        title: error.message,
        description:"etnrou no on error do mutation"
       
      })

    },
    onSuccess:(data) =>{
      refatchUsuario() //
      refetch() // atualiza toda o fetch
 
    }
  })
  if (isPending || isPendingUsuario) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError || isErrorUsuario) {
    return <div className="flex items-center justify-center">Error: {'Algo aconteceu'}</div>
  }

 
  
    return ( 
        <div className="flex flex-col ">    
       
        <h1 className="text-center mt-5 mb-5 text-2xl font-bold">Usuario {dataUsuario.nome}</h1>

        <Table>
        <TableCaption>Usuarios</TableCaption>
        <TableHeader >
            <TableRow>
            <TableHead >Nome</TableHead>
            <TableHead  className=" flex  items-center justify-end me-36">Permissoes</TableHead>

            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((permissao:PermissaoI) => (
             <TableRow key={permissao.id}>
                <TableCell className="font-medium">{permissao.nome}</TableCell>
                <TableCell className=" flex  items-center justify-end me-48"
                 onClick={() => 
                    mutation.mutate({userId:dataUsuario.id,permissionId:permissao.id })}
                 >
                    <ButtonPermissoes id={permissao.id} />
                </TableCell>
               
                </TableRow>
            ))}
          
            
        </TableBody>
        </Table>
</div>

     );
}
 
export default TablePermissoes