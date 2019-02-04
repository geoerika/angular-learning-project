module.exports = {
  normalizedErrors: function(errors) {
    let normalizedErrors = [];

    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        normalizedErrors.push({title: property, detail: errors[property].message});  //as seen in Postman
      }
    }

    return normalizedErrors;
  }
}
