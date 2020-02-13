/**
 * validates a form against a given schema and returns the
 * related document including all form data.
 * See: https://github.com/aldeed/meteor-autoform#sticky-validation-errors
 **/
export const formIsValid = function formIsValid (formId, schema, options) {
  const values = AutoForm.getFormValues(formId)
  const { insertDoc } = values

  // create validation context
  const context = schema.newContext()
  context.validate(insertDoc, options)

  // get possible validation errors
  // and attach them directly to the form
  const errors = context.validationErrors()
  if (errors && errors.length > 0) {
    errors.forEach(err => AutoForm.addStickyValidationError(formId, err.key, err.type, err.value))
    return null
  } else {
    return values
  }
}