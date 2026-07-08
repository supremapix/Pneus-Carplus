export function formatWhatsApp(text: string) {
  return `https://api.whatsapp.com/send?phone=554130827282&text=${encodeURIComponent(text)}`;
}
