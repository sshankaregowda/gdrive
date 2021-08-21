/**
 * log4jsConfig.js is used to load the log4js.json settings file and store the logs in a log file.
 */

 'use strict';

 const log4js = require('log4js');
 
 module.exports = {
   /**
    * Stores the logs in a log file.
    */
   logging: function () {
     log4js.configure('./log4js/log4js.json');
     const log = log4js.getLogger('file');
     return log;
   }
 };