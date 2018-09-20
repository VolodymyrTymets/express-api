const { isString } = require('lodash');

const get = ({ Image }) => async (req, res, next) => {
  const { _id } = req.params;
  
  if (isString(_id)) {
    res.send(null);
    return
  }
  
  try {
    const image = await Image.findOne({ _id });
    res.contentType(image.mimetype);
    res.end(image.data, 'binary');
  } catch (error) {
    next(error);
  }
};

module.exports = get;
