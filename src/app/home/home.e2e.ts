 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'KL10CH ERP';
    expect(subject).toEqual(result);
  });


});
