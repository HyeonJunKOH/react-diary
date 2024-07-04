export const getStringedDate = (targetDate:Date):string => {
    // 날짜 -> YYYY-MM-DD
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    // 월과 일이 한 자리 수일 경우 앞에 0을 붙여줌
    let monthStr = month < 10 ? `0${month}` : `${month}`;
    let dateStr = date < 10 ? `0${date}` : `${date}`;

    return `${year}-${monthStr}-${dateStr}`;
};

