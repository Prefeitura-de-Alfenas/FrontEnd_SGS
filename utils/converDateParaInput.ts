export function converterDataParaFormatoInputDate(dataString: string):any {
    // Extrai a parte da data (ignora o horário e o fuso horário)
    const parteData = dataString.split('T')[0];
  
    // Cria um objeto Date usando a parte extraída da data
    const data = new Date(parteData);
  
    // Obtém a data no formato YYYY-MM-DD
    const formatoInputDate = data.toISOString().split('T')[0];
  
    return formatoInputDate ;
  }
  