require("dotenv").config();

import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import { equal } from 'assert';

const port = process.env.PORT;

describe("showing quiz result", function () {
    it("should show results not quiz after solving", async function() {
        this.timeout(20000);
        await driver.get(`http://localhost:${port}/`);
        await driver.sleep(500);
        
        await driver.find("#username-input").sendKeys("user1");
        await driver.find("#passw-input").sendKeys("user1");
        await driver.find("#login-btn").doClick();
    
        await driver.sleep(1000);
        await driver.find("#quiz-list button:first-child").doClick();
        await driver.sleep(1000);
        await driver.find("#ans-input").sendKeys("123");
        await (await driver.find("#next-btn")).doClick();
        await driver.find("#ans-input").sendKeys("123");
        await (await driver.find("#next-btn")).doClick();
        await driver.find("#ans-input").sendKeys("123");
        await (await driver.find("#next-btn")).doClick();
        await driver.find("#ans-input").sendKeys("123");
        await (await driver.find("#timer")).doClick();
        
        await driver.sleep(1000);
        await (await driver.find("#home-btn")).doClick();
        await driver.sleep(1000);
        await driver.find("#quiz-list button:first-child").doClick();
        await driver.sleep(1000);
        expect(await (await driver.find("#answer-list")).isDisplayed()).to.be.equal(true);

        await driver.manage().deleteCookie("user_session");
    });
});

describe("logging out", function () {
    it("should not be logined in", async function() {
        this.timeout(20000);
        await driver.get(`http://localhost:${port}/`);
        await driver.sleep(500);
        
        await driver.find("#username-input").sendKeys("user1");
        await driver.find("#passw-input").sendKeys("user1");
        await driver.find("#login-btn").doClick();

        const oldCookie = await driver.manage().getCookie("user_session");
        await driver.sleep(1000);
        await driver.find("#account-link").doClick();
        await driver.sleep(1000);
        await driver.find("#passw1-input").sendKeys("123");
        await driver.find("#passw2-input").sendKeys("123");
        await (await driver.find("#change-passw-btn")).click();

        await driver.sleep(1000);
        expect(await driver.find("#status-text").getText()).to.include("zmieniono hasło");

        await driver.manage().addCookie({name: "user_session", value: oldCookie.value});
        await driver.get(`http://localhost:${port}/`);
        await driver.sleep(1000);
        const loginBtn = await driver.find("#login-btn");

        expect(await loginBtn.isDisplayed()).to.equal(true);
    });
});