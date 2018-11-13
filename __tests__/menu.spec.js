// Test place order

describe('Menu items', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8887/index.html')
  });

  it('should display menu items', async () => {
    const menu = await page.evaluate(() => {
      let meal = document.querySelector('.column')

      return {
        "meal": meal
      }
    })
    expect(menu.meal).toBeDefined()
    
  })

  it('should display banner', async () => {
    const banny = await page.evaluate(() => {
      let ban = document.getElementsByClassName('banner')

      return {
        "banner": ban
      }
    })
    expect(banny.banner).toBeDefined()
  })

  it('should display navbar', async () => {
    const navy = await page.evaluate(() => {
      let nav = document.getElementById('navbar')
      let logo = document.getElementById('logo').innerHTML
      
      return {
        "nav" : nav,
        "logo":logo
      }
    })
    expect(navy.nav).toBeDefined()
    expect(navy.logo).toBe('Fast-Food-Fast')
  })
})