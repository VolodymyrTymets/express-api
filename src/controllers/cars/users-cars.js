const { sendList } = require('../../middleware/index');

const getList = ({ Car }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cars = await Car.find({ userId });
    return sendList(res, { cars });
  } catch (error) {
    next(error);
  }
};

module.exports = getList;
