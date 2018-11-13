

describe('Create Meal', () => {
    beforeAll(async() => {
        await page.goto('http://127.0.0.1:8887/admin/add.html')
    });

    it('should create a meal given valid input', async() => {

        const mealy = {
            image: 'default',
            name: 'rice',
            description: 'tamu sana',
            price: '1000'

        }

        await page.type('#imageField', mealy.image)
        await page.type('#name', mealy.name)
        await page.type('#description', mealy.description)
        await page.type('#price', mealy.price)
        await page.click('#addmeal')

        await page.waitForSelector('#add-dialogbox')
        const msg = await page.$eval('#add-dialogbox', mesg=> (mesg.innerHTML));

        expect(msg).toBe('Meal successfully created');
       
    })
})