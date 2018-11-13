// Test that user can create an account

describe('User signup', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8887/signup.html')
  });

  it('should create a user account given valid input', async () => {

    await page.type('#username', 'remmyky')
    await page.type('#email', 'remmry@test.com')
    await page.type('#password', 'remmy123om')
    await page.click('#signup')

    await page.waitForSelector('#signup-dialogbox')
    const msg = await page.$eval('#signup-dialogbox', mesg => (mesg.innerHTML)
    );

    expect(msg).toBe('username already in use');

  });

  it('should check that username is a valid input', async () => {

  //   const mesy = {
  //     username: '',
  //     email: 'ajdffj@gmail.com',
  //     password: '123132425',

  // }

    await page.type('#username', '')
    await page.waitForSelector('#signup-dialogbox')

    const mesy = await page.$eval('#signup-dialogbox', message => (message.innerHTML))
    expect(mesy).toBe('Valid username should be alphabetic, between 6 and 20 characters')
  });

})
