/*

Converts db schema to accessible objects based on
a simple naming convention.

select the values as key__propertyName,
this will create an object as
key:{
    propertyName:value
}

*/

export function schemaToObject (schemaObject) {
  const result = {}

  Object.keys(schemaObject).forEach((schemaKey) => {
    const isValid = validateAndSplitKey(schemaKey)
    if (isValid) {
      if (!result[isValid.key]) {
        result[isValid.key] = {}
      }
      result[isValid.key][isValid.prop] = schemaObject[schemaKey]
    } else {
      result[schemaKey] = schemaObject[schemaKey]
    }
  })
  return result
}

function validateAndSplitKey (key) {
  if (key.indexOf('__') > -1) {
    const onSplit = key.split('__')
    return { key: onSplit[0], prop: onSplit[1] }
  }
  return false
}
