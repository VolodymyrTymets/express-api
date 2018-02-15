const _ = require('lodash');
const { sendCreated } = require('../../middleware/index');

const create = ({ Car }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const car = new Car({ userId });
    _.extend(car, req.body);

    await car.save();
    return sendCreated(res, { car });

  } catch (error) {

    next(error);
  }
};

module.exports = create;
