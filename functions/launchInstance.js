/* launchInstance.js contains functions for launching the browser context
*/

import { chromium, firefox, webkit, devices } from "playwright";
import log4js from '../log4js/log4jsConfig';

const Pixel2 = devices["Pixel 2 XL"];
const iPhone11 = devices["iPhone 11 Pro"];

//Function to set browser type and launch the browser context
const launchInstances = async (userAgent = "chromium") => {
  let browser;
  let browserType;
  let context;

  if (userAgent === "iOS") {
    browserType = "webkit";
  } else if (userAgent === "Android") {
    browserType = "chromium";
  } else {
    browserType = userAgent;
  }

  browser = await { chromium, webkit, firefox }[browserType].launch({
    headless: false,
    slowMo: 300,
    args: [ '--ignore-certificate-errors', '--no-sandbox','--disable-setuid-sandbox'],
    timeout: 60000,
    channel: 'chrome'
  });

  if (userAgent === "iOS") {
    context = await browser.newContext({ ...iPhone11 });
  } else if (userAgent === "Android") {
    context = await browser.newContext({ ...Pixel2 });
  } else {
    context = await browser.newContext();
  }
  log4js.logging().info(' ***** Launched the browser *****\n');

  return { browser, context };
};

export default { launchInstances };
