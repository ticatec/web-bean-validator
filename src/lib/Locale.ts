
const locale = {
    message: {
        REQUIRED: `请输入数值`,
        STRING_LENGTH_SHORTAGE: `长度至少%1$d个字符`,
        EARLIEST_DATE: "时间不能早于%1$s",
        FINAL_DATE: "最后时间不能晚于%1$s",
        NUMBER_EXCEED: `数值不能超过%1$d`,
        NUMBER_SHORTAGE: `数值不能低于%1$d`,
        ARRAY_EXCEED: `内容超过了%1$d个记录`,
        ARRAY_SHORTAGE: `内容不能少于%$d个记录`
    }
}

const setLocaleMessage = (message) => {
    locale.message = message;
}

const getMessage = () => {
    return locale.message;
}

export {setLocaleMessage, getMessage}