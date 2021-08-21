/* util.js contains common reusable functions
*/
import log4js from '../log4js/log4jsConfig';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

//Function to capture screenshot
export const takeScreenshot = async (page,screenshotName) => {
    await page.screenshot({ path: `./screenshots/${screenshotName}`, fullPage: false });
}

//Function to remove the directory from the current project repo
export const removeDir = (dirPath) => {
    const path = process.cwd()+dirPath;

    if (fs.existsSync(path)) {
        fs.rmdirSync(path, {recursive: true})
    }else{
        log4js.logging().error(' ***** Directory does not exist*****\n');
    }
}

//Function to create the directory in the current project repo
export const createDir = (dirPath) => {
    const path = process.cwd()+dirPath;

    if (fs.existsSync(path)) {
        fs.rmdirSync(path, {recursive: true})
    }

    fs.mkdirSync(path, {recursive: true}, (error) =>{
        if(error){
            log4js.logging().error('An error occured');
        }else{
            log4js.logging().info(' ***** Directory is created*****\n');

        }
    })
}

//Function to create the text files in the current project repo
export const createFile = (filePath, fileContent) => {
        for(let i=0;i<=2;i++){
        fs.writeFile(filePath+uuidv4()+'.txt', fileContent, (error) =>{
            if(error){
                log4js.logging().error('An error occured');
            }else{
                log4js.logging().info(' ***** File is created*****\n');
    
            }
    
        })
    }
    }

//Function to get the file names from the specified directory
export const getFilename = (path) => {
    const files = fs.readdirSync(path);
    return files;
}



