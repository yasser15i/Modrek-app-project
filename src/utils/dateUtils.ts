// Format a date to "DD/MM/YYYY" in Arabic locale
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ar-SA', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

// Format time to "HH:MM" in Arabic locale
export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Format relative time (like "5 minutes ago") in Arabic
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) {
    return 'الآن';
  } else if (diffInMins < 60) {
    return `منذ ${diffInMins} دقيقة`;
  } else if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  } else if (diffInDays < 30) {
    return `منذ ${diffInDays} يوم`;
  } else {
    return formatDate(d);
  }
};