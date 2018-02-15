const { sendDeleted } = require('../../middleware/index');

const remove = ({ Car }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { _id } = req.params;
    const car = await Car.findOne({ _id, userId });
    await Car.remove({ _id, userId });
    return sendDeleted(res, { car });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
