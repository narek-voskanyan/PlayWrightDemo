import { test, expect } from '@playwright/test';



test.beforeEach(async ({page}) =>{
  await page.goto('/inventory.html')
})

test('Verify that the filter field "Price (low to high)" sorts products by price from low to high', async ({ page }) => {
    
    //Check that corresponding page opened  
    await expect(page).toHaveURL('/inventory.html');

    //The function to retrieve an element and sort it
    const pricesArray = []
    for(let i =0; i < 6; i +=1){
    let priceFromProduct = await page.locator('.inventory_item_price').nth(i).innerText();
    let priceArray = priceFromProduct.split("$");
    let priceInInt = (priceArray[priceArray.length-1])*1;
    pricesArray.push(priceInInt);
    priceArray = []
    }
    pricesArray.sort((a,b) => a - b);
    //End of functon

    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
   
   await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

   //Check that products to sort from low to high
   for(let i =0; i <pricesArray.length; i += 1){
        await expect(page.locator('.inventory_item_price').nth(i)).toHaveText('$'+pricesArray[i] )
      }

  });

  test('Verify that the filter field "Price (high to low)" sorts products by price from high to low', async ({ page }) => {
   
    //Check that corresponding page opened  
    await expect(page).toHaveURL('/inventory.html');

    //The function to retrieve an element and sort it
    const pricesArray = []
    for(let i =0; i < 6; i +=1){
    let priceFromProduct = await page.locator('.inventory_item_price').nth(i).innerText();
    let priceArray = priceFromProduct.split("$");
    let priceInInt = (priceArray[priceArray.length-1])*1;
    pricesArray.push(priceInInt);
    priceArray = []
    }
    pricesArray.sort((a,b) => b - a);
    //End of functon

    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
   
   await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

   //Check that products to sort from high to low
   for(let i =0; i <pricesArray.length; i += 1){
    await expect(page.locator(['[data-test="inventory-item-price"]']).nth(i)).toHaveText('$'+pricesArray[i] )
   }
  });



  test('Verify that the filter field "Name (A to Z)" sorts products from A to Z', async ({ page }) => {
    //Check that corresponding page opened  
    await expect(page).toHaveURL('/inventory.html');

    //The function to retrieve an products titles and sort it from A to Z 
    const titles = []
    for(let i =0; i < 6; i +=1){
    let title = await page.locator('.inventory_item_name').nth(i).innerText();
    titles.push(title);
    }
    titles.sort();
    //End of functon
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();

    await page.locator('[data-test="product-sort-container"]').selectOption('az');

   //Check that products to sort by titles from A to Z
   for(let i =0; i <titles.length; i += 1){
    await expect(page.locator('.inventory_item_name').nth(i)).toHaveText(titles[i]);
   }
  });


  test('Verify that the filter field "Name (Z to A)" sorts products from Z to A', async ({ page }) => {
    
    //Check that corresponding page opened  
    await expect(page).toHaveURL('/inventory.html');

    //The function to retrieve an products titles and sort it from Z to A 
    const titles = []
    for(let i =0; i < 6; i +=1){
    let title = await page.locator('.inventory_item_name').nth(i).innerText();
    titles.push(title);
    }
    
    titles.reverse();
    //End of functon
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();

    await page.locator('[data-test="product-sort-container"]').selectOption('za');

   //Check that products to sort by titles from Z to A
   for(let i =0; i <titles.length; i += 1){
    await expect(page.locator('.inventory_item_name').nth(i)).toHaveText(titles[i]);
   }
  });

 