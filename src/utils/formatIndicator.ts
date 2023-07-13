export function handleFormatIndicator(indicator: number) {
  if (indicator && indicator <= 10) return 'Pouco recomendado'
  if (indicator > 10 && indicator <= 20) return 'Recomendado'
  if (indicator > 20) return 'Super recomendado'

  return 'Sem recomendações'
}
