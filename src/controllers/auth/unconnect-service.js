const { get } = require('lodash');
const { sendUpdated } = require('../../middleware');
const { MethodNotAllowed, NotAcceptable } = require('rest-api-errors');

const unConnectService = ({ User }) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { service } = req.params;

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    if (!get(user, `services.${service}`)) {
      throw new NotAcceptable(406, `No service [${service}] found.`);
    }
    const services = user.services.toObject();
    delete services[service];
    user.services = services;
    await user.save();
    sendUpdated(res, { user });
  } catch (error) {
    next(error);
  }
};

module.exports = { unConnectService };
