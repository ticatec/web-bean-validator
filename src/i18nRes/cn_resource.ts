const cn_resource = {
    ticatec: {
        validation: {
            required: `请输入数值`,
            stringShortage: `长度至少{{length}}个字符`,
            earliestDate: "时间不能早于{{date}}",
            finalDate: "最后时间不能晚于{{date}}",
            numberExceed: `数值不能超过{{max}}`,
            numberShortage: `数值不能低于{{min}}`,
            arrayExceed: `内容超过了{{length}}个记录`,
            arrayShortage: `内容不能少于{{length}}个记录`
        }
    }
}

export default cn_resource;