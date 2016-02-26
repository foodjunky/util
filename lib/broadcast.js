'use strict';

function fireEvent(topic, action, type, id, version, model, status) {

  var message = {
    action: action,
    type: type,
    id: id,
    version: version
  };

  if (model) {
    message.model = model.toObject ? model.toObject() : model;
  }

  if (status) {
    message.status = status;
  }

  return topic.send(message);

}

function modelEvent(topic, action, type, status, includeModel) {
  return function(model) {
    return fireEvent(topic, action, type, model._id, model.__v, includeModel ? model : null, status)
      .then(() => model);
  };
}

module.exports = exports =  {
  model: modelEvent,
  fire: fireEvent
};
