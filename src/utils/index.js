import { formatDistanceToNow } from "date-fns";

export const formatTimestamp = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

export const removeAccents =(str) =>{
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

