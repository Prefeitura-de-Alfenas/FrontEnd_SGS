"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { validarCPF } from "@/utils/verfyCpf";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  CreatePessoa,
  GetCepViaCep,
  GetPessoaById,
} from "@/app/api/pessoas/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GetEquipamentosAll } from "@/app/api/equipamentos/routes";
import { EquipamentoI } from "@/interfaces/equipamento/interface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { Admin } from "@/utils/dataRole";
import InputMask from "react-input-mask";
import { NumericFormat } from "react-number-format";
import { MultiSelectCheckbox } from "../multipleSelect/multiple";
const formSchema = z.object({
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
  sexo: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  email: z.string().optional(),

  datanascimento: z.coerce
    .date({
      required_error: "Data invalida",
    })
    .min(new Date("1900-01-01"), {
      message: "Data de nascimento invalida",
    })
    .refine(
      (val) => {
        return val >= new Date("1900-01-01");
      },
      {
        message: "Data de nascimento inválida",
      }
    ),
  rg: z.string().optional(),
  parentesco: z.string().optional(),
  escolaridade: z.string(),
  estadocivil: z.string(),
  renda: z.coerce.number().refine(
    (val) => {
      // Adicione sua lógica de validação aqui
      return !isNaN(val) && val >= 0; // Verifica se é um número não negativo
    },
    {
      message: "O valor da renda deve ser um número não negativo",
    }
  ),
  telefone: z.string().optional(),
  whastapp: z.coerce.number(),

  ctpsassinada: z.coerce.number(),

  ppcl: z.coerce.number(),
  gestante: z.coerce.number(),

  cep: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  logradouro: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  complemento: z.string().optional(),
  bairro: z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  localidade: z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  numero: z.string().refine((val) => val.length > 0, {
    message: "Tem que ter no minio 1 numero",
  }),
  uf: z.string().refine((val) => val.length == 2, {
    message: "Tem que ter no minimo 2 caracteres",
  }),

  observacao: z.string().optional(),
  observacaorestrita: z.string().optional(),

  pessoaId: z.string().optional(),
  equipamentoId: z.string(),
  pessoaDeficiencia: z.array(z.string()).optional(), // ✅ múltiplas deficiências
  pessoaFonteRenda: z.array(z.string()).optional(), // ✅ múltiplas fontes de renda
});

type FormData = z.infer<typeof formSchema>;

interface CriarPessoaProps {
  resonposavelId?: string;
  usuario: UsuarioLogadoI;
}

function CriarPessoa({ usuario, resonposavelId }: CriarPessoaProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      pessoaDeficiencia: [],
      pessoaFonteRenda: [],
    },
  });

  const { data: dataEquipamentos, isLoading: isLoadingEquipamentos } = useQuery(
    {
      queryKey: ["equipamentos"],
      queryFn: () => GetEquipamentosAll(usuario),
    }
  );

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      let dataResponse = data;
      if (resonposavelId) {
        dataResponse = {
          ...data,
          pessoaId: resonposavelId,
        };
      }
      return CreatePessoa(usuario, dataResponse).then((response) => response);
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
          title: "Usuario cadastrado com sucesso",
        });
        if (resonposavelId) {
          router.push(`/familiares/${resonposavelId}`);
        } else {
          router.push("/pessoas");
        }
      }
    },
  });

  const fetchData = async (id: string) => {
    const responsavel = await GetPessoaById(usuario, id);
    if (responsavel.error) {
      toast({
        variant: "destructive",
        title: "Responsavel não existe no sistema",
      });
      if (resonposavelId) {
        router.push(`/familiares/${resonposavelId}`);
      } else {
        router.push("/pessoas");
      }
    }

    setValue("cep", responsavel ? responsavel.cep : "", {
      shouldValidate: true,
    });
    setValue("logradouro", responsavel ? responsavel.logradouro : "", {
      shouldValidate: true,
    });
    setValue("complemento", responsavel ? responsavel.complemento : "", {
      shouldValidate: true,
    });
    setValue("localidade", responsavel ? responsavel.localidade : "", {
      shouldValidate: true,
    });
    setValue("numero", responsavel ? responsavel.numero : "", {
      shouldValidate: true,
    });
    setValue("bairro", responsavel ? responsavel.bairro : "", {
      shouldValidate: true,
    });
    setValue("uf", responsavel ? responsavel.uf : "", { shouldValidate: true });
  };

  useEffect(() => {
    if (resonposavelId) {
      fetchData(resonposavelId);
    }
  }, []);
  const handleCepChange = async (event: any) => {
    const cepValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cepValue.length === 8) {
      try {
        const data = await GetCepViaCep(usuario, cepValue);

        setValue("logradouro", data ? data.logradouro : "", {
          shouldValidate: true,
        });
        setValue("complemento", data ? data.complemento : "", {
          shouldValidate: true,
        });
        setValue("localidade", data ? data.localidade : "", {
          shouldValidate: true,
        });
        setValue("numero", data ? data.numero : "", { shouldValidate: true });
        setValue("bairro", data ? data.bairro : "", { shouldValidate: true });
        setValue("uf", data ? data.uf : "", { shouldValidate: true });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true); // Ativa o loading
    try {
      await mutation.mutateAsync(data); // Envia os dados
    } finally {
      setIsSubmitting(false); // Desativa o loading após finalizar
    }
  };
  const isAdmin = usuario.user?.role?.includes(Admin);

  return (
    <>
      {!isLoadingEquipamentos ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center font-bold text-2xl mb-4 mt-10">
            Cadastro do {resonposavelId ? "Familiar" : "Responsável"}
          </h1>
          <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1 grid md:grid-cols-1 grid-cols-1 gap-4">
            {/* Coluna 1 */}
            <div>
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

              <div className="mb-4">
                <label
                  htmlFor="sexo"
                  className="block text-sm font-medium text-black"
                >
                  Sexo:
                </label>
                <select
                  id="sexo"
                  {...register("sexo")}
                  required
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-background"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
                {errors.sexo?.message && (
                  <p className="text-sm text-red-400">{errors.sexo?.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="datanascimento"
                  className="block text-sm font-medium text-black"
                >
                  Data Nascimento:
                </label>
                <input
                  type="date"
                  id="datanascimento"
                  required
                  {...register("datanascimento")}
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent text-black "
                />
                {errors.datanascimento?.message && (
                  <p className="text-sm text-red-400">
                    {errors.datanascimento?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="escolaridade"
                  className="block text-sm font-medium text-black"
                >
                  Escolaridade:
                </label>
                <select
                  id="escolaridade"
                  {...register("escolaridade")}
                  required
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-background"
                >
                  <option value="fundamental">Fundamental</option>
                  <option value="medio">Médio</option>
                  <option value="superior-incompleto">
                    Superior Incompleto
                  </option>
                  <option value="superior-completo">Superior Completo</option>
                  <option value="mestrado">Mestrado</option>
                  <option value="dourado">Doutorado</option>
                </select>
                {errors.escolaridade?.message && (
                  <p className="text-sm text-red-400">
                    {errors.escolaridade?.message}
                  </p>
                )}
              </div>
              {resonposavelId && (
                <div className="mb-4">
                  <label
                    htmlFor="parentesco"
                    className="block text-sm font-medium text-black"
                  >
                    Parentesco:
                  </label>
                  <Input
                    type="text"
                    id="parentesco"
                    {...register("parentesco")}
                    required
                    className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"
                  />
                  {errors.parentesco?.message && (
                    <p className="text-sm text-red-400">
                      {errors.parentesco?.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Coluna 2 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  id="whastapp"
                  {...register("whastapp")}
                />
                <Label htmlFor="whastapp">Numero é WhatsApp</Label>
              </div>
              {errors.whastapp?.message && (
                <p className="text-sm text-red-400">
                  {errors.whastapp?.message}
                </p>
              )}
              <div className="mb-4">
                <Label
                  htmlFor="telefone"
                  className="block text-sm font-medium text-black"
                >
                  Telefone:
                </Label>
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar={null}
                  value={getValues("telefone")}
                  onChange={(e) => {
                    const { value } = e.target;
                    setValue("telefone", value, { shouldValidate: true });
                  }}
                  onBlur={() => trigger("telefone")}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="telefone"
                      className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"
                      placeholder="(00) 00000-0000"
                    />
                  )}
                </InputMask>
                {errors.telefone?.message && (
                  <p className="text-sm text-red-400">
                    {errors.telefone.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  E-mail:
                </label>
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.email?.message && (
                  <p className="text-sm text-red-400">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="rg"
                  className="block text-sm font-medium text-black"
                >
                  RG:
                </label>
                <Input
                  type="text"
                  id="rg"
                  {...register("rg")}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.rg?.message && (
                  <p className="text-sm text-red-400">{errors.rg?.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="renda"
                  className="block text-sm font-medium text-black"
                >
                  Renda:
                </label>
                <NumericFormat
                  id="renda"
                  customInput={Input} // Usa o Input do shadcn/ui
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="R$ "
                  value={getValues("renda")}
                  onValueChange={(values) => {
                    const floatValue = values.floatValue || 0;
                    setValue("renda", floatValue, { shouldValidate: true });
                  }}
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"
                  placeholder="R$ 0,00"
                />
                {errors.renda?.message && (
                  <p className="text-sm text-red-400">
                    {errors.renda?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="estadocivil"
                  className="block text-sm font-medium text-black"
                >
                  Estado Civil:
                </label>
                <select
                  id="estadocivil"
                  {...register("estadocivil")}
                  required
                  className=" p-2 w-full border rounded-md mb-4 mt-2 bg-background"
                >
                  <option value="solteiro">Solteiro</option>
                  <option value="casado">Casado</option>
                  <option value="divorciado">Divorciado</option>
                  <option value="viuvo">Viúvo</option>
                  <option value="uniao-estavel">União Estavel</option>
                  <option value="outros">Outros</option>
                </select>
                {errors.estadocivil?.message && (
                  <p className="text-sm text-red-400">
                    {errors.estadocivil?.message}
                  </p>
                )}
              </div>

              <div className="flex items-center  mb-6 mt-6 gap-14">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ctpsassinada"
                    {...register("ctpsassinada")}
                  />
                  <Label htmlFor="ctpsassinada">Carteira Assinada</Label>
                </div>
                {errors.ctpsassinada?.message && (
                  <p className="text-sm text-red-400">
                    {errors.ctpsassinada?.message}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="ppcl" {...register("ppcl")} />
                  <Label htmlFor="">PPCL</Label>
                </div>
                {errors.ppcl?.message && (
                  <p className="text-sm text-red-400">{errors.ppcl?.message}</p>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="gestante"
                    {...register("gestante")}
                  />
                  <Label htmlFor="">Gestante</Label>
                </div>
                {errors.gestante?.message && (
                  <p className="text-sm text-red-400">
                    {errors.gestante?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cep"
                  className="block text-sm font-medium text-black"
                >
                  CEP:
                </label>
                <Input
                  type="text"
                  id="cep"
                  {...register("cep", { onChange: handleCepChange })}
                  required
                  readOnly={resonposavelId ? true : false}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.cep?.message && (
                  <p className="text-sm text-red-400">{errors.cep?.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="complemento"
                  className="block text-sm font-medium text-black"
                >
                  Complemento:
                </label>
                <Input
                  type="text"
                  id="complemento"
                  {...register("complemento")}
                  readOnly={!(isAdmin && !resonposavelId)}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.complemento?.message && (
                  <p className="text-sm text-red-400">
                    {errors.complemento?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="localidade"
                  className="block text-sm font-medium text-black"
                >
                  Localidade:
                </label>
                <Input
                  type="text"
                  id="localidade"
                  {...register("localidade")}
                  required
                  readOnly={!(isAdmin && !resonposavelId)}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.localidade?.message && (
                  <p className="text-sm text-red-400">
                    {errors.localidade?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="uf"
                  className="block text-sm font-medium text-black"
                >
                  UF:
                </label>
                <Input
                  type="text"
                  id="uf"
                  {...register("uf")}
                  required
                  readOnly={!(isAdmin && !resonposavelId)}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.uf?.message && (
                  <p className="text-sm text-red-400">{errors.uf?.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="logradouro"
                  className="block text-sm font-medium text-black"
                >
                  logradouro:
                </label>
                <Input
                  type="text"
                  id="logradouro"
                  {...register("logradouro")}
                  required
                  readOnly={!(isAdmin && !resonposavelId)}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.logradouro?.message && (
                  <p className="text-sm text-red-400">
                    {errors.logradouro?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="bairro"
                  className="block text-sm font-medium text-black"
                >
                  Bairro:
                </label>
                <Input
                  type="text"
                  id="bairro"
                  {...register("bairro")}
                  required
                  readOnly={!(isAdmin && !resonposavelId)}
                  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
                />
                {errors.bairro?.message && (
                  <p className="text-sm text-red-400">
                    {errors.bairro?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="numero"
                  className="block text-sm font-medium text-black"
                >
                  Numero:
                </label>
                <Input
                  type="text"
                  id="numero"
                  {...register("numero")}
                  required
                  readOnly={resonposavelId ? true : false}
                  className="mt-3 p-2 w-full border rounded-md mb-4  bg-transparent"
                />
                {errors.numero?.message && (
                  <p className="text-sm text-red-400">
                    {errors.numero?.message}
                  </p>
                )}
              </div>
              {/* Fontes de Renda */}
              <MultiSelectCheckbox
                label="Fontes de Renda"
                options={
                  dataEquipamentos.fonteDeRendas?.map((f: any) => ({
                    label: f.nome,
                    value: f.id,
                  })) || []
                }
                selected={watch("pessoaFonteRenda") || []}
                onChange={(val) =>
                  setValue("pessoaFonteRenda", val, { shouldValidate: true })
                }
              />
              {/* deficiencia */}
              <MultiSelectCheckbox
                label="Deficiências"
                options={
                  dataEquipamentos.deficiencias?.map((d: any) => ({
                    label: d.nome,
                    value: d.id,
                  })) || []
                }
                selected={watch("pessoaDeficiencia") || []}
                onChange={(val) =>
                  setValue("pessoaDeficiencia", val, { shouldValidate: true })
                }
              />
              <div className="mb-4">
                <label
                  htmlFor="equipamentoId"
                  className="block text-sm font-medium text-black"
                >
                  Atendido em:
                </label>
                <select
                  id="equipamentoId"
                  {...register("equipamentoId")}
                  required
                  className="mt-1 p-2 w-full border rounded-md mb-2 bg-background"
                >
                  {dataEquipamentos.equipamentos.map(
                    (equipamento: EquipamentoI) => (
                      <option key={equipamento.id} value={equipamento.id}>
                        {" "}
                        {equipamento.nome}{" "}
                      </option>
                    )
                  )}
                </select>
                {errors.equipamentoId?.message && (
                  <p className="text-sm text-red-400">
                    {errors.equipamentoId?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1 shadow-md grid grid-cols-1 gap-4 mb-12">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Obeservação</Label>
              <Textarea
                id="observacao"
                {...register("observacao")}
                placeholder="Observação"
                className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
              />
              {errors.observacao?.message && (
                <p className="text-sm text-red-400">
                  {errors.observacao?.message}
                </p>
              )}
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Obeservação Restrita</Label>
              <Textarea
                id="observacaorestrita"
                {...register("observacaorestrita")}
                placeholder="Observação Restrita"
                className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent"
              />
              {errors.observacaorestrita?.message && (
                <p className="text-sm text-red-400">
                  {errors.observacaorestrita?.message}
                </p>
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
      ) : (
        <h1 className="text-center text-4xl font-bold mt-9">Loading</h1>
      )}
    </>
  );
}

export default CriarPessoa;
