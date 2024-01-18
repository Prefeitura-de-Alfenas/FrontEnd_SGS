export function getHeadersPessoas(){
    const header = [
        "id:string",
        "nome: string",
        "cpf:string",
        "sexo: string",
        "telefone: string",
        "email:string",
        "datanascimento: Date",
        "rg :string",
        "parentesco:string",
        "escolaridade :string",
        "estadocivil :string",
        "renda :number",
        "ctpsassinada :number",
        "ppcl:number",
        "observacao: string",
        "observacaorestrita: string",
        "cep: string",
        "logradouro: string",
        "complemento: string",
        "bairro: string",
        "localidade:string",
        "numero:string",
        "uf:string",
        "status:string"
    ];

    const headerArray = header.map(field => {
        const fieldName = field.split(':')[0].trim();
        return fieldName;
        //return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    });
    return headerArray;
}