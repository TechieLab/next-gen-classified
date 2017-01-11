import { NextGenClassifiedPage } from './app.po';

describe('next-gen-classified App', function() {
  let page: NextGenClassifiedPage;

  beforeEach(() => {
    page = new NextGenClassifiedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
