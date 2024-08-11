export default function updateDate(created_at: string) {
  const date = new Date(created_at).toLocaleDateString();
  const time = new Date(created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return [date, time];
}
