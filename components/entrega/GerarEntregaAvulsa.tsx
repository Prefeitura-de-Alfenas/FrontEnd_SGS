"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { GetPessoaEntregaById } from "@/app/api/pessoas/routes";
import { useRouter } from "next/navigation";

import { BeneficiosEntregaI } from "@/interfaces/beneficios/inteface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { CreateEntrega, CreateEntregaAvulso } from "@/app/api/entrega/routes";
import {
  EntregaCreateAvulsaI,
  EntregaCreateI,
} from "@/interfaces/entras/interface";
import { GetUsuarioById } from "@/app/api/usuarios/route";
import { ArrowLeftFromLine, Target } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { validarCPF } from "@/utils/verfyCpf";
import { GetBeneficiosAll } from "@/app/api/beneficios/routes";
import InputMask from "react-input-mask";

const formSchema = z.object({
  quantidade: z.coerce.number().refine(
    (val) => {
      // Adicione sua lógica de validação aqui
      return !isNaN(val) && val >= 0; // Verifica se é um número não negativo
    },
    {
      message: "O valor da renda deve ser um número não negativo",
    }
  ),
  observacao: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),

  nome: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  cpf: z.string().refine(
    (val) => {
      return validarCPF(val);
    },
    {
      message: "CPF inválido",
    }
  ),
  equipamentoId: z.string().optional(),
  beneficioId: z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1caracteres",
  }),
  usuarioId: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface GerarEntregaProps {
  userLogado: UsuarioLogadoI;
}

function GerarEntregaAvulsa({ userLogado }: GerarEntregaProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });
  const { data: dataBeneficio, isLoading: isLoadingBeneficio } = useQuery({
    queryKey: ["entregaAvulsaBeneficio", userLogado.user.id],
    queryFn: () => GetBeneficiosAll(userLogado),
  });

  const { data: dataUsuario, isLoading: isLoadingUsuario } = useQuery({
    queryKey: ["usuario", userLogado.user.id],
    queryFn: () => GetUsuarioById(userLogado, userLogado.user.id),
  });

  const mutation = useMutation({
    mutationFn: async (data: EntregaCreateAvulsaI) => {
      let dataResponse = data;

      return CreateEntregaAvulso(userLogado, dataResponse).then(
        (response) => response
      );
    },
    onError: (error) => {

        toast({
          title: error.message,
        });
    },
    onSuccess: (data) => {
      if (data.error) {

          toast({
            variant: "destructive",
            title: data.error,
          });
      } else {

          toast({
            title: "Deferido com sucesso",
          });

        router.push(`/entrega/avulsa`);

        //window.open(`/reciboentrega/${data.id}`)
      }
    },
  });

  const onSubmit = async (entrega: FormData) => {
    setIsSubmitting(true); // Ativa o loading
    try {
     const dataEntrega: EntregaCreateAvulsaI = {
      usuarioId: dataUsuario.id,
      equipamentoId: dataUsuario.equipamento.id,
      ...entrega,
    };

    mutation.mutate(dataEntrega);
    } finally {
      setIsSubmitting(false); // Desativa o loading após finalizar
    }
  
    
  };

  if (isLoadingUsuario || isLoadingBeneficio) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end items-center me-7 mb-2">
        <Link href="/entrega/avulsa">
          <ArrowLeftFromLine size={48} />
        </Link>
      </div>
      <h1 className="text-center font-bold text-2xl ">
        Gerar Atendimento Avulso
      </h1>
      <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1  grid md:grid-cols-1 grid-cols-1 gap-4">
        {/* Coluna 1 */}
        <div>
          <div className="mb-4">
            <label
              htmlFor="beneficioId"
              className="block text-sm font-medium text-black"
            >
              Tipo de Atendimento:
            </label>
            <select
              id="beneficioId"
              {...register("beneficioId")}
              required
              className="mt-1 p-2 w-full border rounded-md mb-2 bg-background"
            >
              {dataBeneficio.map((beneficio: BeneficiosEntregaI) => (
                <option key={beneficio.id} value={beneficio.id}>
                  {" "}
                  {beneficio.nome}{" "}
                </option>
              ))}
            </select>
            {errors.beneficioId?.message && (
              <p className="text-sm text-red-400">
                {errors.beneficioId?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantidade"
              className="block text-sm font-medium text-black"
            >
              Quantidade:
            </label>
            <Input
              type="number"
              id="quantidade"
              step="1"
              {...register("quantidade")}
              required
              className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
            />
            {errors.quantidade?.message && (
              <p className="text-sm text-red-400">
                {errors.quantidade?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-black"
            >
              Nome:
            </label>
            <Input
              type="text"
              id="nome"
              {...register("nome")}
              required
              className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"
              placeholder="Digite o nome"
            />
            {errors.nome?.message && (
              <p className="text-sm text-red-400">{errors.nome?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-black"
            >
              CPF:
            </label>
            <InputMask
              mask="999.999.999-99"
              maskChar={null}
              value={getValues("cpf")}
              onChange={(e) => {
                const { value } = e.target;
                setValue("cpf", value, { shouldValidate: true });
              }}
              onBlur={() => trigger("cpf")}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id="cpf"
                  required
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"
                  placeholder="000.000.000-00"
                />
              )}
            </InputMask>
            {errors.cpf?.message && (
              <p className="text-sm text-red-400">{errors.cpf?.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1  grid grid-cols-1 gap-4 mb-12">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Obeservação</Label>
          <Textarea
            id="observacao"
            {...register("observacao")}
            placeholder="Observação"
            className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
          />
          {errors.observacao?.message && (
            <p className="text-sm text-red-400">{errors.observacao?.message}</p>
          )}
        </div>

        
           <Button
              type="submit"
              className="text-white font-bold w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Cadastrar"
              )}
            </Button>
    
      </div>
    </form>
  );
}

export default GerarEntregaAvulsa;
