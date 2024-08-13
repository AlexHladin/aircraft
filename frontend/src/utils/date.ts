export const formatDate = (date: string) => {
    const dateObj = new Date(date);

    return [dateObj.getFullYear(), (dateObj.getMonth() + 1), dateObj.getDate()].map(el => el.toString().padStart(2, '0')).join('-');
};