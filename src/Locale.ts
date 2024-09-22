
const locale = {
    message: {
        REQUIRED: `%1$s:不能为空`,
        INVALID_BOOLEAN: '%1$s:不是一个有效的逻辑值',
        INVALID_STRING: `%1$s:不是一个有效的字符串`,
        INVALID_NUMBER: `%1$s:不是一个有效的数字`,
        INVALID_DATE: `%1$s:不是一个有效的日期`,
        INVALID_ENUM: `%1$s:不是一个有效的数值`,
        STRING_LENGTH_EXCEED: `%1$s:长度超过了%2$d个字符`,
        STRING_LENGTH_SHORTAGE: `%1$s:长度至少%2$d个字符`,
        EARLIEST_DATE: "%1$s:时间不能早于%2$s",
        FINAL_DATE: "%1$s:最后时间不能超过%2$s",
        NUMBER_EXCEED: `%1$s:超过了最大值%2$d`,
        NUMBER_SHORTAGE: `%1$s:不能低于最低数值%2$d`,
        ARRAY_EXCEED: `%1$s:数组超过了%2$d个记录`,
        ARRAY_SHORTAGE: `%1$s:数组不能低于%2$d个记录`,
        INVALID_ARRAY: '%1$s:不是有效的数组[%2$s]',
        IS_NOT_ARRAY: '%1$s:不是数组',
        INVALID_OBJECT: '%1$s包含错误[%2$s]',
        INVALID_ARRAY_ITEM: '数组的第[%1$d]行包含错误[%2$s]'
    }
}

const setLocaleMessage = (message) => {
    locale.message = message;
}

const getMessage = () => {
    return locale.message;
}

export {setLocaleMessage, getMessage}