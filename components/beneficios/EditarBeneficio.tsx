"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";


import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";


import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GetBeneficioById, UpdateBeneficio } from "@/app/api/beneficios/routes";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";




const formSchema = z.object({
    nome:z.string().refine((val) => val.length >= 3, {
      message: "Tem que ter no minimo 3 caracteres",
    }),
    descricao:z.string().refine((val) => val.length >= 3, {
      message: "Tem que ter no minimo 3 caracteres",
    }),
    categoria:z.string().refine((val) => val.length >= 3, {
      message: "Tem que ter no minimo 3 caracteres",
    }),
    valor: z.coerce.number().refine((val) => {
      // Adicione sua lógica de validação aqui
      return !isNaN(val) && val >= 0; // Verifica se é um número não negativo
      }, 
      {
       message: "O valor da renda deve ser um número não negativo",
    }),
  
})

type FormData =z.infer<typeof formSchema>;

interface EditBeneficiosProps{
    beneficioId:string,
    usuario:UsuarioLogadoI
}

function EditarBeneficio({usuario,beneficioId}:EditBeneficiosProps ) {

  const router = useRouter();
  const { toast } = useToast()
  const { handleSubmit,register,setValue,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
  
    const {data,isLoading } = useQuery({
      queryKey:['pessoa',beneficioId],
      queryFn:() => GetBeneficioById(usuario,beneficioId as string),
      
    })
    

    useEffect(() => {
         
      setValue("nome", data ? data.nome :'',{ shouldValidate: true });
      setValue("descricao", data ? data.descricao :'',{ shouldValidate: true });
      setValue("categoria", data ? data.categoria :'',{ shouldValidate: true });
      setValue("valor", data ? data.valor :'',{ shouldValidate: true });
     
    }, [data,setValue]);

  
 
   
  const mutation = useMutation({
    mutationFn: (data:FormData) => {
      return     UpdateBeneficio(usuario,beneficioId,data)
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
          
             title: "Atualizado com sucesso",
           })
           
           router.push("/beneficios");
          
      }
    
    }
  })
 


   const onSubmit = async (data:FormData) => {

    mutation.mutate(data)
  }
    return (  
      <>
      { !isLoading ?
        <form onSubmit={handleSubmit(onSubmit)} >
        <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Beneficio</h1>
        <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1  grid md:grid-cols-1 grid-cols-1 gap-4">
          {/* Coluna 1 */}
          <div>
            <div className="mb-4">
              <label htmlFor="nome" className="block text-sm font-medium text-black">Nome:</label>
              <Input type="text" id="nome" {...register('nome')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o nome"/>
              {errors.nome?.message && <p className="text-sm text-red-400">{errors.nome?.message}</p> }
            </div>
      
            <div className="mb-4">
              <label htmlFor="descricao" className="block text-sm font-medium text-black">Descrição:</label>
              <Input type="text" id="descricao" {...register('descricao')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite a descrição" />
              {errors.descricao?.message && <p className="text-sm text-red-400">{errors.descricao?.message}</p> }
            </div>
            
            <div className="mb-4">
              <label htmlFor="descricao" className="block text-sm font-medium text-black">Categoria:</label>
              <Input type="text" multiple id="sobre" {...register('categoria')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite algo categoria o equipamento" />
              {errors.categoria?.message && <p className="text-sm text-red-400">{errors.categoria?.message}</p> }
            </div>
          
          
  
            <div className="mb-4">
              <label htmlFor="valor" className="block text-sm font-medium text-black">valor:</label>
              <Input type="number" id="valor" step="0.001" {...register('valor')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
              {errors.valor?.message && <p className="text-sm text-red-400">{errors.valor?.message}</p> }
            </div>
          
       
          </div>
  
  
         
          
        </div>
  
        <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1  grid grid-cols-1 gap-4 mb-12">
          
       
         <Button className="text-white font-bold">Atualizar</Button>
        </div>
       
       
       </form>
     :
     
     <h1 className="text-center text-4xl font-bold mt-9">Loading</h1>
    }
    </>
    );
}

export default EditarBeneficio;


