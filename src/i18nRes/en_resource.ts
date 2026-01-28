const en_resource = {
    ticatec: {
        validation: {
            required: `Please enter a value`,
            stringShortage: `The value must be at least {{length}} characters long`,
            earliestDate: "The value cannot be earlier than {{date}}",
            finalDate: "The value cannot be later than {{date}}",
            numberExceed: `The value cannot exceed {{max}}`,
            numberShortage: `The value cannot be less than {{min}}`,
            arrayExceed: `The value cannot contain more than {{length}} records`,
            arrayShortage: `The value must contain at least {{length}} records`
        }
    }
}

export default en_resource;