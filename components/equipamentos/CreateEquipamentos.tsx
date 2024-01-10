"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {  GetCepViaCep, GetPessoaById } from "@/app/api/pessoas/routes";
import { useRouter } from "next/navigation";
import { useEffect, } from "react";
import { CreateEquipamento } from "@/app/api/equipamentos/routes";




const formSchema = z.object({
  nome:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  responsavel:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  sobre:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  observacao:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),

  
  cep:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  logradouro:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
   complemento:z.string().optional(),

   bairro:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  localidade:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  numero:z.string().refine((val) => val.length > 0, {
    message: "Tem que ter no minio 1 numero",
  }),
  uf:z.string().refine((val) => val.length == 2, {
    message: "Tem que ter no minimo 2 caracteres",
  }),

})

type FormData =z.infer<typeof formSchema>;



function CriarEquipamento() {

  const router = useRouter();
  const { toast } = useToast()
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
 
 
   
  const mutation = useMutation({
    mutationFn: async (data:FormData) => {
      let dataResponse = data;
     
    
      return     CreateEquipamento(dataResponse)
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
          
             title: "Equipamento cadastrado com sucesso",
           })
          
            router.push("/equipamentos");
           
      }
    
    }
  })
 

  

  const handleCepChange = async (event:any) => {
    
    const cepValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cepValue.length === 8) {
      try {
        const data = await GetCepViaCep(cepValue);
      
        setValue("logradouro", data ? data.logradouro :'',{ shouldValidate: true });
        setValue("complemento", data ? data.complemento :'',{ shouldValidate: true });
        setValue("localidade", data ? data.localidade :'',{ shouldValidate: true });
        setValue("numero", data ? data.numero :'',{ shouldValidate: true });
        setValue("bairro", data ? data.bairro :'',{ shouldValidate: true });
        setValue("uf", data ? data.uf :'',{ shouldValidate: true });
    

        
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };
   const onSubmit = async (data:FormData) => {

    mutation.mutate(data)
   }
    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Equipamentos</h1>
      <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1 shadow-md grid md:grid-cols-1 grid-cols-1 gap-4">
        {/* Coluna 1 */}
        <div>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-white">Nome:</label>
            <Input type="text" id="nome" {...register('nome')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o nome"/>
            {errors.nome?.message && <p className="text-sm text-red-400">{errors.nome?.message}</p> }
          </div>
    
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-white">Responsavel:</label>
            <Input type="text" id="responsavel" {...register('responsavel')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o  nome do responsavel" />
            {errors.responsavel?.message && <p className="text-sm text-red-400">{errors.responsavel?.message}</p> }
          </div>
          
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-white">Sobre:</label>
            <Input type="text" multiple id="sobre" {...register('sobre')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite algo sobre o equipamento" />
            {errors.sobre?.message && <p className="text-sm text-red-400">{errors.sobre?.message}</p> }
          </div>
        
        

        
        
     
        </div>


         {/* Coluna 2 */}
         <div>
        
    
       

    
          <div className="mb-4">
            <label htmlFor="cep" className="block text-sm font-medium text-white">CEP:</label>
            <Input type="text" id="cep" {...register('cep', { onChange: handleCepChange })} required    className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.cep?.message && <p className="text-sm text-red-400">{errors.cep?.message}</p> }
          </div>

          <div className="mb-4">
            <label htmlFor="complemento" className="block text-sm font-medium text-white">Complemento:</label>
            <Input type="text" id="complemento" {...register('complemento')}  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.complemento?.message && <p className="text-sm text-red-400">{errors.complemento?.message}</p> }
          </div>

          <div className="mb-4">
            <label htmlFor="localidade" className="block text-sm font-medium text-white">Localidade:</label>
            <Input type="text" id="localidade"  {...register('localidade')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.localidade?.message && <p className="text-sm text-red-400">{errors.localidade?.message}</p> }
          </div>
          <div className="mb-4">
            <label htmlFor="uf" className="block text-sm font-medium text-white">UF:</label>
            <Input type="text" id="uf" {...register('uf')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.uf?.message && <p className="text-sm text-red-400">{errors.uf?.message}</p> }
          </div>
            
          <div>
            <label htmlFor="logradouro" className="block text-sm font-medium text-white">logradouro:</label>
            <Input type="text" id="logradouro" {...register('logradouro')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.logradouro?.message && <p className="text-sm text-red-400">{errors.logradouro?.message}</p> }
          </div>

          <div>
            <label htmlFor="bairro" className="block text-sm font-medium text-white">Bairro:</label>
            <Input type="text" id="bairro" {...register('bairro')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.bairro?.message && <p className="text-sm text-red-400">{errors.bairro?.message}</p> }
          </div>
   
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-white">Numero:</label>
            <Input type="text" id="numero" {...register('numero')} required  className="mt-3 p-2 w-full border rounded-md mb-4  bg-transparent" />
            {errors.numero?.message && <p className="text-sm text-red-400">{errors.numero?.message}</p> }
          </div>
        
         
         </div>
        
      </div>

      <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1 shadow-md grid grid-cols-1 gap-4 mb-12">
        <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Obeservação</Label>
        <Textarea  id="observacao" {...register('observacao')} placeholder="Observação" className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
        {errors.observacao?.message && <p className="text-sm text-red-400">{errors.observacao?.message}</p> }
       </div>

     
       <Button>Cadastrar</Button>
      </div>
     
     
     </form>
    );
}

export default CriarEquipamento;


