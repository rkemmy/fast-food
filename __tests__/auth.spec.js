//Test login form

describe('User signup', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8887/signup.html')
    });
  
    it('should display a signup form', async () => {
      const signupPage = await page.evaluate(() => {
        let username = document.getElementById('username').innerHTML
        let email = document.getElementById('email').innerHTML
        let password = document.getElementById('password').innerHTML
        let login = document.getElementsByTagName('a')[0].innerHTML
        let signup = document.getElementById('signup').innerHTML
  
  
        return {
          "username": username,
          "email": email,
          "password": password,
          "login": login,
          "signup": signup
        }
      })
  
      expect(signupPage.username).toBeDefined()
      expect(signupPage.email).toBeDefined()
      expect(signupPage.password).toBeDefined()
      expect(signupPage.login).toBe('here')
      expect(signupPage.signup).toBe('Sign Up')
    })
  })
  
  //Test signup form
  
  describe('User login', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8887/login.html')
    });
  
    it('should display a login form', async () => {
      const loginPage = await page.evaluate(() => {
        let username = document.getElementById('username').innerHTML
        let password = document.getElementById('password').innerHTML
        let signup = document.getElementsByTagName('a')[0].innerHTML
        let login = document.getElementById('login').innerHTML
  
  
        return {
          "username": username,
          "password": password,
          "signup": signup,
          "login": login
        }
      })
  
      expect(loginPage.username).toBeDefined()
      expect(loginPage.password).toBeDefined()
      expect(loginPage.signup).toBe('Create account')
      expect(loginPage.login).toBe('Login')
    });
  })
  
  
  