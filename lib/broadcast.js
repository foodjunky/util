'use strict';

function fireEvent(topic, action, type, id, version, model, status, extra) {

  var message = Object.assign({
    action: action,
    type: type,
    id: id,
    sent: new Date().toISOString(),
    version: version
  }, extra || {});

  if (model) {
    message.model = model.toObject ? model.toObject() : model;
  }

  if (status) {
    message.status = status;
  }

  return topic.send(message);

}

function modelEvent(topic, action, type, status, includeModel) {

  return function(model, silent) {

    var extra = {};

    if (silent) {
      extra.silent = !!silent;
    }

    return fireEvent(topic, action, type, model._id, model.__v, includeModel ? model : null, status, extra)
      .then(() => model);

  };

}

module.exports = exports =  {
  model: modelEvent,
  fire: fireEvent
};
