const Order = require("./Order");
var Import = require("./index");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    MENU: Symbol("menu"),
    TYPE:   Symbol("type"),
    SIZE: Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    EXTRA: Symbol("extra"),
    PAYMENT: Symbol("payment"),
    FINISH: Symbol("finish")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.orderItem = "";
        this.price = 0;
        this.extra = "";
        this.sItem = "Jason and Mark"
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.MENU;
                aReturn.push("Welcome to Jason's Delicious.");
                aReturn.push("Please take a look of our menu. You may input the number for what you want to order.");
                aReturn.push("1. Pizza ($5.55 - $9.55)");
                aReturn.push("2. Sushi ($3.35 - $7.35)");
                aReturn.push("3. Fried Rice ($5.15 - $8.15)");

            case OrderState.MENU:
                this.stateCur = OrderState.TYPE;
                break;

            case OrderState.TYPE:
                if (sInput == "1") {
                    this.stateCur = OrderState.SIZE
                    this.orderItem = "Pizza";
                    aReturn.push("Which toppings would you like?");
                } else if (sInput == "2") {
                    this.stateCur = OrderState.SIZE
                    this.orderItem = "Sushi";
                    aReturn.push("Which type of sushi you would like to order?");
                } else if (sInput == "3") {
                    this.stateCur = OrderState.SIZE
                    this.orderItem = "Fried Rice";
                    aReturn.push("Which type of Fried Rice you would like to order?");
                } else {
                    aReturn.push("Your input is wrong. Please try again (Enter 1 for Pizza, 2 for Sushi or 3 for Fried Rice)");
                }
                break;

            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sToppings = sInput;
                if (this.orderItem == "Pizza"){
                    aReturn.push("Which size of pizza you want to order? (S: $5.55, M: $7.55, L: $9.55)");
                }else if(this.orderItem == "Sushi"){
                    aReturn.push("Which size of sushi you want to order? (S: $3.35, M: $5.35, L: $7.35)");
                }else if(this.orderItem == "Fried Rice"){
                    aReturn.push("Which size of fried rice you want to order? (S: $5.15, L: $8.15)");
                }
                break;

            case OrderState.TOPPINGS:
                if ((this.orderItem == "Pizza" && sInput.toLowerCase() =="s")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "small";
                    this.price = 5.55;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Pizza" && sInput.toLowerCase() =="m")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "medium";
                    this.price = 7.55;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Pizza" && sInput.toLowerCase() =="l")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "large";
                    this.price = 9.55;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Sushi" && sInput.toLowerCase() =="s")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "small";
                    this.price = 3.35;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Sushi" && sInput.toLowerCase() =="m")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "medium";
                    this.price = 5.35;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Sushi" && sInput.toLowerCase() =="l")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "large";
                    this.price = 7.35;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Fried Rice" && sInput.toLowerCase() =="s")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "small";
                    this.price = 5.15;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Fried Rice" && sInput.toLowerCase() =="l")){
                    this.stateCur = OrderState.DRINKS
                    this.sSize = "large";
                    this.price = 8.15;
                    aReturn.push("Which drinks you want to order? ($2.00) If you don't want it, please type 'n'");
                }else if ((this.orderItem == "Fried Rice" && sInput.toLowerCase() !="s") || (this.orderItem == "Fried Rice" && sInput.toLowerCase() !="l")){
                    aReturn.push("Your input is wrong. Please try again (Enter L for Large Size, S for Small");
                }else {
                    aReturn.push("Your input is wrong. Please try again (Enter L for Large Size, M for Medium or S for Small");
                }
                break;

            case OrderState.DRINKS:
                this.stateCur = OrderState.EXTRA
                this.sDrinks = sInput;
                if(sInput!= "n"){
                    this.price = this.price + 2;
                }
                aReturn.push("Which snacks you want to order? ($3.00) If you don't want it, please type 'n'");
                break;


            case OrderState.EXTRA:
                this.stateCur = OrderState.PAYMENT;
                this.extra = sInput;
                if (this.extra != "n"){
                    this.price = this.price +3;
                }
                //this.isDone(true);

                if(this.extra == 'n' && this.sDrinks == 'n') {
                    aReturn.push(`Thank-you for your order of ${this.sSize} size ${this.sToppings} ${this.orderItem}.`);
                    aReturn.push(` The total price is: $${this.price}.`);
                    aReturn.push(`Please pay for your order by the following link below`);
                }else if (this.extra == 'n' && this.sDrinks != 'n') {
                    aReturn.push(`Thank-you for your order of ${this.sSize} size ${this.sToppings} ${this.orderItem}.`);
                    aReturn.push(` You also add ${this.sDrinks} to the meal.`);
                    aReturn.push(` The total price is: $${this.price}.`);
                    aReturn.push(`Please pay for your order by the following link below`);
                }else if (this.extra != 'n' && this.sDrinks == 'n') {
                    aReturn.push(`Thank-you for your order of ${this.sSize} size ${this.sToppings} ${this.orderItem}.`);
                    aReturn.push(` You also add ${this.extra} to the meal.`);
                    aReturn.push(` The total price is: $${this.price}.`);
                    aReturn.push(`Please pay for your order by the following link below`);
                }else {
                    aReturn.push(`Thank-you for your order of ${this.sSize} size ${this.sToppings} ${this.orderItem}`);
                    aReturn.push(` You also add ${this.sDrinks} and ${this.extra} to the meal.`);
                    aReturn.push(` The total price is: $${this.price}`);
                    aReturn.push(`Please pay for your order by the following link below`);
                }
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                break;

            case OrderState.PAYMENT:
                this.stateCur = OrderState.FINISH;
                aReturn.push(`Thanks for your payment. Your order is processing. Please enter "OK" to confirm your delivery.`);
                //console.log("A");
                break;

            case OrderState.FINISH:
                this.isDone(true);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your order will be delivered at ${d.toTimeString()} to the following address `);
                aReturn.push(`${Import.shipping_addr.address_line_1},${Import.shipping_addr.admin_area_2},${Import.shipping_addr.admin_area_1},${Import.shipping_addr.postal_code},${Import.shipping_addr.country_code}`);
                aReturn.push("Thanks for selecting Jason's Delicious. ;)")
                //console.log("D");
                //console.log(Import.shipping_addr);
                break;
        }
        return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.sItem = sTitle;
      }
      if(sAmount != "-1"){
          this.price = sAmount;
      }
      const sClientID = process.env.SB_CLIENT_ID || 'ATxXFcWUU_P1twpBUrsy9nTzGMLsRuBX0_z0jVpvh4cx5R2yRG19XV3yLFBhypwMUNj26Uu9pULGGwU-'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${this.price}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.price}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}