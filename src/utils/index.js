import { formatDistanceToNow } from 'date-fns';

export const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

