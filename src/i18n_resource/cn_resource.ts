const cn_resource = {
    ticatec: {
        validation: {
            required: `请输入{{field}}的数值`,
            stringShortage: `{{field}}长度至少{{length}}个字符`,
            earliestDate: "{{field}}时间不能早于{{date}}",
            finalDate: "{{field}}最后时间不能晚于{{date}}",
            numberExceed: `{{field}}数值不能超过{{max}}`,
            numberShortage: `{{field}}数值不能低于{{min}}`,
            arrayExceed: `{{field}}内容超过了{{length}}个记录`,
            arrayShortage: `{{field}}内容不能少于{{length}}个记录`
        }
    }
}

export default cn_resource;