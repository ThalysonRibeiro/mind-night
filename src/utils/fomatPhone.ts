export const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length > 11) {
    return value.slice(0, 15);
  }
  const formattedValue = cleanedValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');

  return formattedValue;
}


export const extractPhoneNumber = (phone: string) => {
  const phoneValue = phone.replace(/[\(\)\s-]/g, '');
  return phoneValue;
}