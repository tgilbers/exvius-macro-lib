import { MacrosPage } from './app.po';

describe('macros App', () => {
  let page: MacrosPage;

  beforeEach(() => {
    page = new MacrosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
