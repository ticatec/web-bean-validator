const en_resource = {
    ticatec: {
        validation: {
            required: `Please enter a value for {{field}}`,
            stringShortage: `{{field}} must be at least {{length}} characters long`,
            earliestDate: "{{field}} cannot be earlier than {{date}}",
            finalDate: "{{field}} cannot be later than {{date}}",
            numberExceed: `{{field}} cannot exceed {{max}}`,
            numberShortage: `{{field}} cannot be less than {{min}}`,
            arrayExceed: `{{field}} cannot contain more than {{length}} records`,
            arrayShortage: `{{field}} must contain at least {{length}} records`
        }
    }
}

export default en_resource;