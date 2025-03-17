const Settings = require('../models/Settings');

const getSettings = async () => {
  const settings = await Settings.findById('singleton');
  return settings;
};

const createSettings = async (data) => {
  data._id = 'singleton';
  return Settings.create(data);
};

const updateSettings = async (data) => {
  return Settings.findByIdAndUpdate('singleton', { $set: data }, { new: true });
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