import { LoryPage } from './app.po';

describe('lory App', () => {
  let page: LoryPage;

  beforeEach(() => {
    page = new LoryPage();
  });

  it('should display message saying Hello world!', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hello world!');
  });
});
