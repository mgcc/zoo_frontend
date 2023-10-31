
export default function formatDateString(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
}