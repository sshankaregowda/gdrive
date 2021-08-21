// gmail.test.js contains test suite for g-drive create folder and upload files
import pkg from "../functions/launchInstance.js";
const { launchInstances } = pkg;
import gmail from '../environments/env.json';
import * as Util from "../functions/util.js";
import * as LoginPage from "../functions/loginPage.js";
import * as HomePage from "../functions/homePage.js";
import * as FolderPage from "../functions/folderPage.js";


const userAgent = "chromium";
const path = '/logs';
const gdriveFolderName = 'TestFolder'+Math.random();

describe("Google drive upload files Automation", function () {
    let browser;
    let context;
    let page;
  
    beforeAll(async () => {
      Util.removeDir(path);
      const instance = await launchInstances(userAgent);
      browser = await instance["browser"];
      context = await instance["context"];
      page = await context.newPage();
  
    });
  
    afterAll(async () => {
      await browser.close();
    });
  
    test(`should open the google login page and check the page title`, async () => {
      await Promise.all([
              page.goto(gmail.url),
              page.waitForNavigation(),
          ]);
      await LoginPage.validateLoginPageTitle(page);
      await Util.takeScreenshot(page,'loginpage.png');
    });

    test(`should login to the gmail drive successfully and create a folder`, async () => {
      await LoginPage.loginToGDrive(page, gmail.username, gmail.password);
      await HomePage.navigateToGdriveAndCreateFolder(page, gdriveFolderName);
      await Util.takeScreenshot(page,'homepage.png');
    });

    test(`should open the folder and upload files`, async () => {
      await FolderPage.openCreatedFolderandUploadFiles(page,gdriveFolderName); 
      await Util.takeScreenshot(page, 'folderpage.png');    
    });

});
