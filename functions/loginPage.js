/* loginPage.js contains functions for launching g-drive and login to g-drive
*/

import login from "../pageObjects/login.json";
import log4js from '../log4js/log4jsConfig';
const assert = require('assert')


//Function to check page title is appropriate
export const validateLoginPageTitle = async (page) => {
  log4js.logging().info(' ***** Welcome to the G-drive*****\n');

    const title = await page.title();
      expect(title).toBe('Google Drive: Sign-in');
  };

  //Function to login to G-drive
  export const loginToGDrive = async (page, username, password) => {
    log4js.logging().info(' ***** Login to G-drive *****\n');
    try{
        await page.waitForSelector(login.usernameTxtbox);
    }catch(error){
            assert.fail("Error: username text box is not present in login page");
    }

    await page.fill(login.usernameTxtbox, username);
    await page.click(login.nextBtn);

    try{
      await page.waitForSelector(login.passwordTxtbox);
  }catch(error){
          assert.fail("Error: password text box is not present in login page");
  }
    await page.fill(login.passwordTxtbox, password); 
    await page.click(login.nextBtn);
 
  log4js.logging().info(' ***** Entered the sign-on credentials and submit *****\n');

  };