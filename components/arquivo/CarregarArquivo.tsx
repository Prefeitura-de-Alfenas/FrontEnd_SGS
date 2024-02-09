"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { ArquivoCreateI } from "@/interfaces/arquivo/interface";
import { CreateArquivo } from "@/app/api/arquivo/route";
import { useEffect, useState } from "react";



const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
 'image/jpeg',
 'image/jpg',
 'image/png',
 'image/webp',
 'application/pdf'
]



const formSchema = z.object({
    file: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: 'Image is required.' })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: '.jpg, .jpeg, .png and .webp files are accepted.',
     })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
     }),
     nome:z.string().refine((val) => val.length >= 3, {
      message: "Tem que ter no minimo 3 caracteres",
    }),


 
 

})

type FormData =z.infer<typeof formSchema>;

interface GerarEntregaProps{
  pessoaId:string,
  userLogado:UsuarioLogadoI,
 
}

function CarregarArquivo({pessoaId,userLogado}:GerarEntregaProps) {

  const router = useRouter();
  const [fileName, setFileName] = useState('')
  const { toast } = useToast()
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
 
  
  
   
  const mutation = useMutation({
    mutationFn: async (data:ArquivoCreateI) => {

      return  CreateArquivo(userLogado,data)
      .then(response => response)
    },
    onError:(error) => {
      toast({
        title: error.message,
       
      })
    },
    onSuccess:(data) =>{

      if(data.error){
             toast({
                 variant: "destructive" ,
                 title: data.error,
              })
      }else{
           toast({
          
             title: "Arquivo salvo com sucesso",
           })
  
           router.push(`/arquivo/${data.pessoId}`)
           
      }
    
    }
  })
 

  
  

   const onSubmit = async (arquivo:FormData) => {
      
      
      const dataEntrega : ArquivoCreateI = {
        ...arquivo,
        pessoId:pessoaId

      }


      mutation.mutate(dataEntrega)
    }


    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Criar Arquivo</h1>
      <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1 shadow-md grid md:grid-cols-1 grid-cols-1 gap-4">
        {/* Coluna 1 */}

      <div>
    
        <div className="mb-4">
        <Label htmlFor="file">Arquivo</Label>
        {fileName}
        <input type="file"  id="file"
        {...register('file')} 
        placeholder="Arquivo" className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent " required  />
        {errors.file?.message && <p className="text-sm text-red-400">{"Arquivo obrigatorio"}</p> }
          </div>
        
        
     
        </div>


      </div>

      <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1 shadow-md grid grid-cols-1 gap-4 mb-12">
        <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Nome</Label>
        <Input  id="nome" {...register('nome')} placeholder="Nome do arquivo" className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
        {errors.nome?.message && <p className="text-sm text-red-400">{errors.nome?.message}</p> }
       </div>

     
       <Button className="text-white font-bold">Cadastrar</Button>
      </div>
     
     
     </form>
    );
}

export default CarregarArquivo;


