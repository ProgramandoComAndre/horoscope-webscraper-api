function convertDateToISO(dateString) {
    // Dividir a string de data em partes
    const parts = dateString.split(' ');
    const day = parts[0];
    const month = getMonthIndex(parts[2]);
    const year = parts[4];
    
    console.log(day, month, year)
    // Criar um objeto Date com as partes da data
    const date = new Date(year, month, day);
    
    // Converter o objeto Date para o formato ISO
    const isoDate = date.toISOString().split('T')[0];
  
    return isoDate;
  }
  
  function getMonthIndex(monthName) {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    return monthNames.indexOf(monthName);
  }

  module.exports = {convertDateToISO}