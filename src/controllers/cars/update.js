const _ = require('lodash');
const { sendUpdated } = require('../../middleware/index');

const update = ({ Car }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { _id } = req.params;
    const car = await Car.findOne({ _id, userId });
    _.extend(car, req.body);

    await car.save();
    return sendUpdated(res, { car });

  } catch (error) {
    next(error);
  }
};

module.exports = update;
