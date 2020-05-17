import {Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';

describe('Test selenium', () => {
    it('Wyświetla się popup', async function() {
        this.timeout(20000);
        await driver.get('http://students.mimuw.edu.pl/~rl394414/aplikacje_www/zad3/flight.html');

        expect(await driver.find('.city-desc p:nth-child(2)').getText()).to.include('Wrocław');
        await driver.find('input[type=text]').sendKeys('Jan Woreczko');
        await driver.find('button[type=submit]').doClick();
    });
})