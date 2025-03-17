const settingsService = require('../services/settingsService');

const addSettings = async (req, res, next) => {
  try {
    const newSettings = await settingsService.addSettings(req.body);
    res.status(201).json(newSettings);
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const updatedSettings = await settingsService.updateSettings(req.body);
    res.status(200).json(updatedSettings);
  } catch (error) {
    next(error);
  }
};

const deleteSettings = async (req, res, next) => {
  try {
    await settingsService.deleteSettings();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSettings,
  updateSettings,
  deleteSettings
};