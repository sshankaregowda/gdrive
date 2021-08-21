/* homePage.js contains functions for validating successful login and landing to home page.Also, to create folder in g-drive
*/

import home from "../pageObjects/home.json";
import log4js from '../log4js/log4jsConfig';
const assert = require('assert')

//Function to check if user is successfully logged in and to create folder in g-drive
export const navigateToGdriveAndCreateFolder = async (page, folderName) => {
    try{
        await page.waitForSelector(home.newBtn);
    }catch(error){
            assert.fail("Error: user is not logged in to g-drive");
    }

    log4js.logging().info(' ***** Landed on g-drive home page and creating folder *****\n');

    await page.click(home.newBtn);
    try{
        await page.click(home.folderBtn);
    }catch(error){
        assert.fail("Error: create folder button is not loaded");
    }
    
    try{
        await page.waitForSelector(home.folderNameTxtbox);
    }catch(error){
        assert.fail("Error: folder name text box is not present");
    }

    const input = await page.$(home.folderNameTxtbox);
    await input.click({ clickCount: 3 })
    await input.fill(folderName);
    await page.click(home.createBtn);
     
    try{
        await page.waitForSelector(home.folderName);
    }catch(error){
        assert.fail("Error: folder is not created");
    }

    log4js.logging().info(' ***** Folder is created in g-drive*****\n');

    const folderCreatedName = await page.evaluate((locator) => {
        const name = document.querySelector(locator).innerHTML;
        return name;
     },home.folderName);
    
     expect(folderCreatedName).toContain('TestFolder');
}

