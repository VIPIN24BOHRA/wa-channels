/* eslint-disable @typescript-eslint/no-shadow */
import puppeteer from 'puppeteer';
import qrcode from 'qrcode-terminal';

import type { QueuedChannel } from '../firebase/firebase.types';
// import { delay } from "../../utils/helper";

export class PuppeteerConfig {
  page: any;

  async init() {
    try {
      const browser = await puppeteer.launch({
        headless: false,
      });
      this.page = await browser.newPage();

      await this.page.goto('https://web.whatsapp.com/');
      await this.page.setDefaultTimeout(0);
      await this.page.waitForSelector('div[data-ref]');

      const qrContainer = await this.page.$('div[data-ref]');
      const qr = await this.page.evaluate(
        (qrContainer: any) => qrContainer.dataset.ref,
        qrContainer
      );
      console.log('QR received', qr);
      qrcode.generate(qr, { small: true });
      await this.page.waitForSelector('._1jJ70');
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async sendMessage(channelName: string, message: string) {
    try {
      await this.page.click("div[title='Channels']");
      await this.page.click(`span[title='${channelName}']`);
      await this.page.type('._3Uu1_', message);
      await this.page.keyboard.press('Enter');
    } catch (err) {
      console.log(err);
    }
  }

  async createChannel(channelDetails: QueuedChannel) {
    try {
      await this.page.click("div[title='Channels']");
      await this.page.click("span[data-icon='plus-large']");
      await this.page.click("div[aria-label='Create channel']");

      const continueBtn = await this.page.waitForXPath(
        "//div[contains(text(), 'Continue')]"
      );

      await continueBtn.click();
      const channelInput = await this.page.waitForSelector(
        "div[title='Channel name']"
      );
      await channelInput.type(channelDetails.channelName);

      const channelDesc = await this.page.waitForSelector(
        "div[title*='Describe your channel.']"
      );
      await channelDesc.type(channelDetails.channelDescription);

      const createBtn = await this.page.waitForXPath(
        "//div[contains(text(), 'Create channel')]"
      );
      await createBtn.click();
      await this.page.click("span[data-icon='back']");
    } catch (err) {
      console.log(err);
      throw new Error('error from create channel');
    }
  }
}
