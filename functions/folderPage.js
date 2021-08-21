/* folderPage.js contains functions for uploading files to folder created in g-drive
*/

import folder from "../pageObjects/folder.json";
import home from "../pageObjects/home.json";
import log4js from '../log4js/log4jsConfig';
import * as Util from "../functions/util.js";
const assert = require('assert')

//Function to open the folder created in g-drive and upload files to the folder
export const openCreatedFolderandUploadFiles = async (page, folderName) => {
    const path = '/'+'testData'+'/';
    const fullPath = process.cwd()+path;
    let fileArray = [];

    try{
    await page.waitForSelector(home.folder);
    }catch(error){
        assert.fail("Error: folder is present");
    }

    log4js.logging().info(' ***** Opening the folder created in g-drive*****\n');


    await page.dblclick('//div[@aria-label="'+folderName+'"]')
    await page.waitForTimeout(2000);
    await page.click(home.newBtn);
    
    //Creates testData folder in the current project repository
    await Util.createDir(path);
    
    //Creates files and adds to testData folder in the current project repository
    await Util.createFile(fullPath,'create new file');
    await page.waitForTimeout(3000);
    
    const fileNames = await Util.getFilename(fullPath);

    fileNames.forEach(function (file) {
        fileArray.push('./'+'testData'+'/'+file);
      });

    page.on("filechooser", async(fileChooser) => {
        fileChooser.setFiles(fileArray);
   })
    
   log4js.logging().info(' ***** Uploading the files to the folder created in g-drive*****\n');

    await page.click(folder.fileUploadBtn);
    await page.waitForTimeout(5000);


    const fileUploadSuccessMsg = await page.evaluate((locator) => {
        const successMsg = document.querySelector(locator).innerHTML;
        return successMsg;
     },folder.uploadSuccessMsg);

     expect(fileUploadSuccessMsg).toContain('uploads complete');

     log4js.logging().info(' ***** Files are uploaded successfully to the folder created in g-drive*****\n');

}

 
