export function validarCPF(cpf: string): boolean {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
  
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  
    // Verificar o primeiro dígito verificador
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  
    // Verificar o segundo dígito verificador
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    // Se passou por todas as verificações, o CPF é válido
    return true;
  }