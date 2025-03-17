const Settings = require('../models/Settings');

const getSettings = async () => {
  return Settings.findOne();
};

const createSettings = async (data) => {
  data._id = 'singleton';
  return Settings.create(data);
};

const updateSettings = async (data) => {
  return Settings.findByIdAndUpdate('singleton', data, { new: true, upsert: true });
};

const deleteSettings = async () => {
  return Settings.findByIdAndDelete('singleton');
};

module.exports = {
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings
};