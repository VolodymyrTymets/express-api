const { sendOne } = require('../../middleware/index');

const get = ({ Car }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { _id } = req.params;
    const car = await Car.findOne({ _id, userId });
    return sendOne(res, { car });
  } catch (error) {
    next(error);
  }
};

module.exports = get;
