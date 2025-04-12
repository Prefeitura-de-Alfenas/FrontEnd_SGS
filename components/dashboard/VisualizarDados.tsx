"use client";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetPessoaById, GetPessoaFamiliaresById } from "@/app/api/pessoas/routes";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import Link from "next/link";
import { Button } from "../ui/button";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

interface GerarEntregaProps {
  pessoaId: string;
  userLogado: UsuarioLogadoI;
}

function VisualizarDados({ pessoaId, userLogado }: GerarEntregaProps) {
  const router = useRouter();

  // Fetch data da pessoa e familiares
  const { data, isLoading } = useQuery({
    queryKey: ["pessoaView"],
    queryFn: () => GetPessoaFamiliaresById(userLogado, pessoaId as string),
  });

  if (isLoading) {
    return <h1 className="text-center text-xl font-bold mt-10">Carregando...</h1>;
  }

  if (!data) {
    return <h1 className="text-center text-xl font-bold mt-10">Dados não encontrados.</h1>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-bold text-3xl mb-6">Consulta de Informações da Família de {data.nome}</h1>

      {/* Dados do Responsável */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dados do Responsável</CardTitle>
          <CardDescription>Informações pessoais do responsável pela família.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="font-semibold">Nome:</Label>
              <span>{data.nome}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">CPF:</Label>
              <span>{data.cpf}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Sexo:</Label>
              <span>{data.sexo.charAt(0).toUpperCase() + data.sexo.slice(1)}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Data de Nascimento:</Label>
              <span>{formatDate(data.datanascimento)}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Telefone:</Label>
              <span>{data.telefone}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">E-mail:</Label>
              <span>{data.email}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Escolaridade:</Label>
              <span>{data.escolaridade.charAt(0).toUpperCase() + data.escolaridade.slice(1)}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Estado Civil:</Label>
              <span>{data.estadocivil.charAt(0).toUpperCase() + data.estadocivil.slice(1)}</span>
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2">
              <Label className="font-semibold">Renda:</Label>
              <span>{data.renda === "0" ? "Nenhuma" : `R$ ${parseFloat(data.renda).toFixed(2)}`}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
          <CardDescription>Informações de localização do responsável.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="font-semibold">CEP:</Label>
              <span>{data.cep}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Logradouro:</Label>
              <span>{data.logradouro}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Número:</Label>
              <span>{data.numero}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Bairro:</Label>
              <span>{data.bairro}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Cidade:</Label>
              <span>{data.localidade}</span>
            </div>
            <div className="flex flex-col">
              <Label className="font-semibold">Estado:</Label>
              <span>{data.uf}</span>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Button>
            <Link href={`/pessoas/novapessoa/${data.id}`}>Editar Responsável</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Familiares */}
      <Card>
        <CardHeader>
          <CardTitle>Familiares</CardTitle>
          <CardDescription>Lista de familiares associados ao responsável.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.familiares && data.familiares.length > 0 ? (
            <div className="space-y-4">
              {data.familiares.map((familiar: { id:string; nome: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; datanascimento: string; escolaridade: string; cpf: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; renda: string; }, index: Key | null | undefined) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <Label className="font-semibold">Nome:</Label>
                      <span>{familiar.nome}</span>
                    </div>
                    <div className="flex flex-col">
                      <Label className="font-semibold">Data de Nascimento:</Label>
                      <span>{formatDate(familiar.datanascimento)}</span>
                    </div>
                    <div className="flex flex-col">
                      <Label className="font-semibold">Escolaridade:</Label>
                      <span>{familiar.escolaridade.charAt(0).toUpperCase() + familiar.escolaridade.slice(1)}</span>
                    </div>
                    <div className="flex flex-col">
                      <Label className="font-semibold">CPF:</Label>
                      <span>{familiar.cpf}</span>
                    </div>
                    <div className="flex flex-col">
                    <Label className="font-semibold">Renda:</Label>
                    <span>{familiar.renda === "0" ? "Nenhuma" : `R$ ${parseFloat(familiar.renda).toFixed(2)}`}</span>
                    </div>
                    <div className="flex flex-col">
                  
                        <Link href={`/familiares/editarfamiliar/${familiar.id}/responsavel/${data.id}`} className="cursor-pointer text-blue-600 font-semibold hover:underline">Editar Familiar</Link>
                     
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum familiar cadastrado.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default VisualizarDados;