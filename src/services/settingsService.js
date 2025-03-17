const settingsRepository = require('../repositories/settingsRepository');

const addSettings = async (data) => {
  const existing = await settingsRepository.getSettings();
  if (existing) {
    throw { status: 400, message: 'Settings already exist. Use update instead.' };
  }
  return settingsRepository.createSettings(data);
};

const updateSettings = async (data) => {
  return settingsRepository.updateSettings(data);
};

const deleteSettings = async () => {
  return settingsRepository.deleteSettings();
};

module.exports = {
  addSettings,
  updateSettings,
  deleteSettings
};