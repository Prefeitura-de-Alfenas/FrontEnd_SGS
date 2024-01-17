"use client"
import { useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetUsuarioById, UpUsuario } from "@/app/api/usuarios/route";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetEquipamentosAll } from "@/app/api/equipamentos/routes";
import { EquipamentoI } from "@/interfaces/equipamento/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const formSchema = z.object({
  nome:z.string().refine((val) => val.length >= 3, {
      message: "Tem que ter no minimo 3 caracteres",
    }),
  email:z.string().refine((val) => val.length >= 5, {
      message: "Term no minimo 5 caracteres",
    }),
  senha:z.string().refine((val) => val.length >= 3, {
      message: "Term no minimo 3 caracteres",
    }),
  telefone:z.string().optional(),
  status:z.string().default('ativo'),
  equipamentoId:z.string(),

})

type FormData =z.infer<typeof formSchema>;

interface EditarUsuarioProps{
    userid:string,
    usuario:UsuarioLogadoI
  }
function EditarUsuario({usuario,userid}:EditarUsuarioProps) {
  const { toast } = useToast()
  const router = useRouter();
  
  const {data,isPending,isError,isSuccess } = useQuery({
    queryKey:['usuario',userid],
    queryFn:() => GetUsuarioById(usuario,userid)
  })
  const {data: dataEquipamentos,isLoading:isLoadingEquipamentos } = useQuery({
    queryKey:['equipamentos'],
    queryFn:() => GetEquipamentosAll(usuario),
    
  })
  const { handleSubmit,register, setValue,formState:{errors}} = useForm<FormData>({
      mode:"onBlur",
      resolver:zodResolver(formSchema),
       
  })
  const mutation = useMutation({
    mutationFn: (dataMuation:FormData) => {
      return     UpUsuario(usuario,userid,dataMuation)
      .then(response => response)
    },
    onError:(error) => {
      toast({
        title: error.message,
      
      })
    },
    onSuccess:(dataMuation) =>{

      if(dataMuation.error){
            toast({
                variant: "destructive" ,
                title: dataMuation.error,
              })
      }else{
          toast({
          
            title: "Usuario Atualizado com sucesso",
          })
          router.push("/usuarios");
      }
    
    }
  })
  useEffect(() => {
 
    setValue("nome", data ? data.nome :'',{ shouldValidate: true });
    setValue("email",data ? data.email :'',{ shouldValidate: true });
    setValue("telefone", data  ? data.telefone :'',{ shouldValidate: true });
    setValue("equipamentoId", data  ? data.equipamento.id :'',{ shouldValidate: true });
   
  }, [isSuccess,data,setValue]);


  if (isPending) {

    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {"Usuario não existe"}</div>
  }



  
  
  const onSubmit = async (dataSubmit:FormData) => {

    mutation.mutate(dataSubmit)
      
  }

    return ( 
      <>
      {!isLoadingEquipamentos ?
        <>
        <h1 className="text-center text-2xl font-bold mt-6 mb-8">Atualizar Usuario</h1>
        <div className="flex  items-center justify-center  p-4 w-full">
          
              <form onSubmit={handleSubmit(onSubmit)} className=" w-5/6">
              <div className="">
                <div className="mb-7 "  >
                  <p className="font-bold mb-2 ">Nome</p>
                  <Input type="text"     {...register('nome')} placeholder="Nome"/>
                  {errors.nome?.message && <p>{errors.nome?.message}</p> }
                  </div>
                  <div className="mb-7" >
                  <p className="font-bold mb-2 ">Email</p>
                  <Input type="email"  {...register('email')} placeholder="Email"/>
                  {errors.email?.message && <p>{errors.email?.message}</p> }
                  </div>
                  <div className="mb-7">
                  <p className="font-bold mb-2 ">Senha</p>
                  <Input type="password"   {...register('senha')} placeholder="Senha"/>
                  {errors.senha?.message && <p>{errors.senha?.message}</p> }
                  </div>
                  <div className="mb-7">
                  <p className="font-bold mb-2 ">Telefone</p>
                  <Input type="text"     {...register('telefone')}  placeholder="telefone"/>
                  {errors.telefone?.message && <p>{errors.telefone?.message}</p> }
                  </div>

                  <div className="mb-4">
                  <label htmlFor="equipamentoId" className="block text-sm font-medium text-white">Trabalha em:</label>
                  <select id="equipamentoId"   {...register('equipamentoId')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
                    {dataEquipamentos.map((equipamento:EquipamentoI) => (
                      <option key={equipamento.id} value={equipamento.id}> {equipamento.nome} </option>
                    ))}
                  </select>
                {errors.equipamentoId?.message && <p className="text-sm text-red-400">{errors.equipamentoId?.message}</p> }
              </div>

                  </div>

                  <Button className="text-white font-bold">Atualizar</Button>
              </form>
            
              
        </div>
        </>
        :
        <h1 className="text-center text-4xl font-bold mt-9">Loading</h1>
      }
      </>
    );
}

export default EditarUsuario;

