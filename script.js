var Header = document.querySelector('.Header');
var Header__Body = document.querySelector('.Header__Body');
var Header__Nav;
var Menu__Body = document.querySelector('.Menu__Body');

var menu_Titles_options = ['Burgers', 'Drinks', 'Breakfast'];

var BurgerNames = ['Whopper', 'Texas Double Whopper', 'Double Whopper with Bacon', 'Triple Whopper', 'Bacon King', 'Bacon Double Cheeseburger', 'Rodeo Burger'];
var BurgerPrices = [5.89, 8.89, 6.99, 7.89, 8.99, 4.99, 2.99];

var DrinksNames = ['Coca-Cola', 'Diet Coke', 'Sweetened Iced Tea', 'Sprite', 'Sprite Zero', 'Barqs Root Beer', 'Fanta Orange'];
var DrinksPrices = [2.99, 2.99, 1.79, 2.99, 2.99, 2.99, 2.99];

var BreakfastNames = ["Fully Loaded Croissan'wich", 'Double Sausage, Egg, Cheese & Biscuit', 'Sausage Biscuit', 'Pancake Platter', 'Pancake & Sausage Platter', 'Hash Browns', 'Egg-Normous Burrito'];
var BreakfastPrices = [5.49, 4.99, 1.19, 4.99, 5.49, 1.99, 5.29];

var ItemDisplay = null;
var DisplayFilter = null;
var Orders = [];
var CartDisplay = null;

document.addEventListener('DOMContentLoaded', ()=>{
    CreateNavegationBar();

    Generate_Menu();

    window.addEventListener('scroll', (e)=>{
        Change_ScrollbarColor()
    })


    function CreateNavegationBar(){
        Header__Nav = document.createElement('nav');
        Header__Nav.classList.add('Header__Nav')
        Header.appendChild(Header__Nav);
        Header.insertBefore(Header__Nav, Header__Body);

        CreateNavegationBar__Items();
    };

    function CreateNavegationBar__Items(){
        var Header__Nav_Logo = document.createElement('img');
        Header__Nav_Logo.classList.add('Header__Nav-Logo');
        Header__Nav_Logo.src = 'Logo Burgery.png';
        Header__Nav.appendChild(Header__Nav_Logo);

        document.querySelector('.Header__Nav-Logo').addEventListener('mouseenter', (e)=>{Header__Nav_Logo.src = 'Logo Burgery pink.png'})
        document.querySelector('.Header__Nav-Logo').addEventListener('mouseleave', (e)=>{Header__Nav_Logo.src = 'Logo Burgery.png'})


        const CreateNavButtons = function(){
            var Header__Nav_List = document.createElement('ul');
            Header__Nav_List.classList.add('Header__Nav-List');
            Header__Nav.appendChild(Header__Nav_List);
    
            var Header__Nav_List_Cart = document.createElement('li');
            Header__Nav_List_Cart.innerText = 'Cart';
            Header__Nav_List.appendChild(Header__Nav_List_Cart);
    
            Header__Nav_List_Cart.addEventListener('click', (e)=>{
                e.stopPropagation();
                if (Orders.length < 1){
                    alert('The cart is empty!');
                } else{
                    DisplayCart();
                }
            });
            
            var Header__Nav_List_Help = document.createElement('li');
            Header__Nav_List_Help.innerText = 'Help';
            Header__Nav_List.appendChild(Header__Nav_List_Help);

            Header__Nav_List_Help.addEventListener('click', ()=>{alert('Function not avaible for now!')});

        };
        CreateNavButtons();
    };

    function DisplayCart(){
        if (!CartDisplay){
            CartDisplay = document.createElement('div');
            CartDisplay.classList.add('CartDisplay');
            document.body.appendChild(CartDisplay);

            for (let i = 0; i < Orders.length; i++){
                var OrderItem = document.createElement('div');
                OrderItem.classList.add('OrderItem');

                const Create_OrderComponents = function(){
                    var image = document.createElement('img');
                    image.src = Orders[i][0].src;
                    image.classList.add('OrderItem_Image');
                    OrderItem.appendChild(image);

                    var title_and_price = document.createElement('div');
                    title_and_price.classList.add('OrderItem_title_and_price');
                    OrderItem.appendChild(title_and_price);

                    var title = document.createElement('p');
                    title.textContent = Orders[i][1];
                    title.classList.add('OrderItem_Title');
                    title_and_price.appendChild(title);

                    var price = document.createElement('p');
                    price.textContent = Orders[i][2];
                    price.classList.add('OrderItem_Price');
                    title_and_price.appendChild(price);
                };
                Create_OrderComponents();

                CartDisplay.appendChild(OrderItem)
            }

            var BuyButton = document.createElement('div');
            BuyButton.textContent = 'Buy';
            BuyButton.classList.add('BuyButton');
            CartDisplay.appendChild(BuyButton);

            BuyButton.addEventListener('click', ()=>{alert('Function not avaible for now!')})
            
            Remove_DisplayCartIfClicked();
        }
    }
    function Remove_DisplayCartIfClicked(){
        var CartDisplay_LeftBorderOffset = CartDisplay.offsetLeft;
        var CartDisplay_RightBorderOffset = CartDisplay.offsetLeft + CartDisplay.offsetWidth;
        var CartDisplay_TopBorderOffset = CartDisplay.offsetTop;
        var CartDisplay_BottomBorderOffset = CartDisplay.offsetTop + CartDisplay.offsetHeight;


        document.addEventListener('click', (e)=>{
            e.stopPropagation();

            if (e.clientX < CartDisplay_LeftBorderOffset || e.clientX > CartDisplay_RightBorderOffset || e.clientY < CartDisplay_TopBorderOffset || e.clientY > CartDisplay_BottomBorderOffset){
                if (CartDisplay){
                    CartDisplay.remove();
                    CartDisplay = null;
                }
            }
        })
    }





    function Generate_Menu(){
        for (let i = 0; i < menu_Titles_options.length; i++){
            var menu_Title = document.createElement('h2');
            menu_Title.innerText = menu_Titles_options[i];
            menu_Title.classList.add('Menu__Body_Category-Title')
            Menu__Body.appendChild(menu_Title);
            Menu__Body.appendChild(Generate_Category(i, menu_Titles_options))
        }
    };

    function Generate_Category(category_Index, menu_Titles_options){

        var Category = document.createElement('div');
        Category.classList.add(`Menu__Body_Category-${menu_Titles_options[category_Index]}`)


        var Slide_button_left = document.createElement('span');
        Category.appendChild(Slide_button_left)


        var Category_List = document.createElement('ul');
        Category_List.classList.add(`Menu__Body_CategoryOption`);
        Category_List.classList.add(`${menu_Titles_options[category_Index]}`)
        Category.appendChild(Category_List)

        
        var Slide_button_right = document.createElement('span');
        Category.appendChild(Slide_button_right)

        
        Create_Category_Items(Category_List, category_Index, menu_Titles_options)


        return Category;
    }

    function Create_Category_Items(Category_List, category_Index, menu_Titles_options){
        if (menu_Titles_options[category_Index] == 'Burgers'){
            for (let i = 0; i < 7; i++){
                var Category_List_Item = document.createElement('li');
                var option_image = document.createElement('img');
                option_image.src = `Menu/Burgers/Option${i}.png`;
                Category_List.appendChild(Category_List_Item);
                Category_List_Item.appendChild(option_image);

                var option_name = document.createElement('p');
                option_name.textContent = BurgerNames[i];

                var option_price = document.createElement('p');
                option_price.textContent = BurgerPrices[i];

                Category_List_Item.appendChild(option_name);
                Category_List_Item.appendChild(option_price);

                Category_List_Item.addEventListener('click', (e)=>{
                    e.stopPropagation();

                    eT_Image = Classify_WhereTheListItem_WasClicked(e.target)[0];
                    eT_Title = Classify_WhereTheListItem_WasClicked(e.target)[1];
                    eT_Price = Classify_WhereTheListItem_WasClicked(e.target)[2];

                    Create_ItemDisplay(eT_Image, eT_Title, eT_Price, menu_Titles_options[category_Index]);
                })
            }
        }        
        else if (menu_Titles_options[category_Index] == 'Drinks'){
            for (let i = 0; i < 7; i++){
                var Category_List_Item = document.createElement('li');
                var option_image = document.createElement('img');
                option_image.src = `Menu/Drinks/Option${i}.png`;
                Category_List.appendChild(Category_List_Item);
                Category_List_Item.appendChild(option_image);

                var option_name = document.createElement('p');
                option_name.textContent = DrinksNames[i];

                var option_price = document.createElement('p');
                option_price.textContent = DrinksPrices[i];

                Category_List_Item.appendChild(option_name);
                Category_List_Item.appendChild(option_price);

                Category_List_Item.addEventListener('click', (e)=>{
                    e.stopPropagation();

                    eT_Image = Classify_WhereTheListItem_WasClicked(e.target)[0];
                    eT_Title = Classify_WhereTheListItem_WasClicked(e.target)[1];
                    eT_Price = Classify_WhereTheListItem_WasClicked(e.target)[2];

                    Create_ItemDisplay(eT_Image, eT_Title, eT_Price, menu_Titles_options[category_Index]);
                })
            }
        }   
        else if (menu_Titles_options[category_Index] == 'Breakfast'){
            for (let i = 0; i < 7; i++){
                var Category_List_Item = document.createElement('li');
                var option_image = document.createElement('img');
                option_image.src = `Menu/Breakfast/Option${i}.png`;
                Category_List.appendChild(Category_List_Item);
                Category_List_Item.appendChild(option_image);

                var option_name = document.createElement('p');
                option_name.textContent = BreakfastNames[i];

                var option_price = document.createElement('p');
                option_price.textContent = BreakfastPrices[i];

                Category_List_Item.appendChild(option_name);
                Category_List_Item.appendChild(option_price);

                var eT_Image, eT_Title, eT_Price;
                Category_List_Item.addEventListener('click', (e)=>{
                    e.stopPropagation();

                    eT_Image = Classify_WhereTheListItem_WasClicked(e.target)[0];
                    eT_Title = Classify_WhereTheListItem_WasClicked(e.target)[1];
                    eT_Price = Classify_WhereTheListItem_WasClicked(e.target)[2];

                    Create_ItemDisplay(eT_Image, eT_Title, eT_Price, menu_Titles_options[category_Index]);
                })
            }
        }
    }




    function Classify_WhereTheListItem_WasClicked(e){
        var image;
        var title;
        var price;
        if (e.tagName == 'LI'){
            image = e.children[0];
            title = e.children[1];
            price = e.children[2];
        } else if (e.tagName == 'IMG' || e.tagName == 'P'){
            image = e.parentNode.children[0];
            title = e.parentNode.children[1];
            price = e.parentNode.children[2];
        }
        return [image, title, price]
    }




    function Change_ScrollbarColor(){
        if (window.scrollY >= 350){
            document.body.classList.add('ChangeColor');
        } else{
            if (document.body.classList.contains('ChangeColor')){
                document.body.classList.remove('ChangeColor');
            }
        }
    }




    function Create_ItemDisplay(eT_Image, eT_Title, eT_Price, menu_Titles_options){
        if (!ItemDisplay){
            ItemDisplay = document.createElement('div');
            ItemDisplay.classList.add('ItemDisplay');
            document.body.appendChild(ItemDisplay);


            var DisplayFilter = document.createElement('span');
            DisplayFilter.classList.add('DisplayFilter');
            ItemDisplay.parentNode.insertBefore(DisplayFilter, ItemDisplay);

            Add_ItemDisplay_Items(eT_Image, eT_Title, eT_Price, menu_Titles_options);

            Remove_ItemDisplay_IfClickOutside();

        }
    }

    function Add_ItemDisplay_Items(eT_Image, eT_Title, eT_Price, menu_Titles_options){
        var Item_Image = document.createElement('img');
        Item_Image.src = eT_Image.src;
        Item_Image.classList.add('Item_Image');
        ItemDisplay.appendChild(Item_Image);

        var Item_Characteristics = document.createElement('div');
        Item_Characteristics.classList.add('Item_Characteristics');
        ItemDisplay.appendChild(Item_Characteristics);

        var Item_Title = document.createElement('p');
        Item_Title.textContent = eT_Title.textContent;
        Item_Title.classList.add('Item_Title');
        Item_Characteristics.appendChild(Item_Title);

        var Item_ExtrasTag = document.createElement('p');
        Item_ExtrasTag.textContent = 'Extras';
        Item_Characteristics.appendChild(Item_ExtrasTag)

        var Item_Extras;
        
        var Item_Price = document.createElement('p');
        Item_Price.textContent = eT_Price.textContent;
        Item_Price.classList.add('Item_Price');

        Item_Characteristics.appendChild(Create_Item_Extras_Burgers(menu_Titles_options, Item_Price));

        Item_Characteristics.appendChild(Item_Price);

        
        var OrderButton = document.createElement('div');
        OrderButton.textContent = 'Order';
        OrderButton.classList.add('OrderButton');

        Item_Characteristics.appendChild(OrderButton);

        OrderButton_Function(OrderButton, Item_Title, Item_Price, Item_Image);

    }
    
    function Remove_ItemDisplay_IfClickOutside(){
        var ItemDisplay_LeftBorderOffset = ItemDisplay.offsetLeft - (ItemDisplay.offsetWidth/2);
        var ItemDisplay_RightBorderOffset = ItemDisplay.offsetLeft + (ItemDisplay.offsetWidth/2);
        var ItemDisplay_TopBorderOffset = ItemDisplay.offsetTop - (ItemDisplay.offsetHeight/2);
        var ItemDisplay_BottomBorderOffset = ItemDisplay.offsetTop + (ItemDisplay.offsetHeight/2);


        document.addEventListener('click', (e)=>{
            e.stopPropagation();
            if (e.clientX < ItemDisplay_LeftBorderOffset || e.clientX > ItemDisplay_RightBorderOffset || e.clientY < ItemDisplay_TopBorderOffset || e.clientY > ItemDisplay_BottomBorderOffset){
                if(ItemDisplay){
                    ItemDisplay.remove();
                    ItemDisplay = null;
                    document.querySelector('.DisplayFilter').remove();
                    DisplayFilter = null;
                }
            }
        })
    }

    function Create_Item_Extras_Burgers(menu_Titles_options, Item_Price){

        Item_Extras = document.createElement('div');
        Item_Extras.classList.add('Item_Extras');
        
        var Item_Extras_Options;
        var Item_Extras_OptionsPrices;


        if (menu_Titles_options == 'Burgers'){
            Item_Extras_Options = ['Fries', 'Nuggets', 'Cheese', 'Beacon', 'Lettuce', 'Tomato'];
            Item_Extras_OptionsPrices = [1.99, 1.59, 0.40, 0.50, 0.49, 0.70];
        } else if (menu_Titles_options == 'Drinks'){
            Item_Extras_Options = ['Fries', 'Nuggets'];
            Item_Extras_OptionsPrices = [1.99, 1.59];
        } else {
            Item_Extras_Options = ['Fries', 'Nuggets'];
            Item_Extras_OptionsPrices = [1.99, 1.59];
        }


        for (let i = 0; i < Item_Extras_Options.length; i++){
            (function(index) {

                var Item_Extras_Option = document.createElement('div');
                Item_Extras_Option.classList.add(`Item_Extras_Option`);
                Item_Extras.appendChild(Item_Extras_Option);

                var Item_Extras_Option_LeftButton = document.createElement('span');
                Item_Extras_Option_LeftButton.textContent = '-';
                Item_Extras_Option_LeftButton.classList.add('Item_Extras_Option_LeftButton');

                var Item_Extras_Option_Title_Price_Container = document.createElement('div');
                Item_Extras_Option_Title_Price_Container.classList.add('Item_Extras_Option_Title_Price_Container');
        
                var Item_Extras_Option_Title = document.createElement('p');
                Item_Extras_Option_Title.textContent = Item_Extras_Options[index];
                Item_Extras_Option_Title.classList.add('Item_Extras_Option_Title');

                var Item_Extras_Option_Quantity = document.createElement('span');
                Item_Extras_Option_Quantity.textContent = 0;
                Item_Extras_Option_Quantity.classList.add('Item_Extras_Option_Quantity');
                Item_Extras_Option_Title_Price_Container.appendChild(Item_Extras_Option_Title);
                Item_Extras_Option_Title_Price_Container.appendChild(Item_Extras_Option_Quantity);

                var Item_Extras_Option_RightButton = document.createElement('span');
                Item_Extras_Option_RightButton.textContent = '+';
                Item_Extras_Option_RightButton.classList.add('Item_Extras_Option_RightButton');
        
                Item_Extras_Option_RightButton.addEventListener('click', function() {
                    Item_Extras_Option_Quantity.textContent = parseInt(Item_Extras_Option_Quantity.textContent) + 1;
                    Item_Price.textContent = (parseFloat(Item_Price.textContent) + Item_Extras_OptionsPrices[index]).toFixed(2);
                });
        
                Item_Extras_Option_LeftButton.addEventListener('click', function() {
                    if (parseInt(Item_Extras_Option_Quantity.textContent) > 0) {
                        Item_Extras_Option_Quantity.textContent = parseInt(Item_Extras_Option_Quantity.textContent) - 1;
                        Item_Price.textContent = (parseFloat(Item_Price.textContent) - Item_Extras_OptionsPrices[index]).toFixed(2);
                    }
                });
        
                Item_Extras_Option.appendChild(Item_Extras_Option_LeftButton);
                Item_Extras_Option.appendChild(Item_Extras_Option_Title_Price_Container);
                Item_Extras_Option.appendChild(Item_Extras_Option_RightButton);
            })(i);
        }

        return Item_Extras
    }



    function OrderButton_Function(OrderButton, Item_Title, Item_Price, Item_Image){
        
        Item_Extras = document.querySelector('.Item_Extras');
        var Extras_Selected = [];


        OrderButton.addEventListener('click', (e)=>{
            e.stopPropagation();
            var Order_Title = Item_Title.textContent;
            var Order_Price = `$${Item_Price.textContent}`;

            const Extras_SelectedDetect = function(){
                const options = document.querySelectorAll('.Item_Extras_Option');
                options.forEach(option => {
                    var quantity = parseInt(option.querySelector('.Item_Extras_Option_Quantity').textContent);
                    var title = option.querySelector('.Item_Extras_Option_Title_Price_Container').querySelector('.Item_Extras_Option_Title').textContent;

                    if (quantity > 0){
                        Extras_Selected.push(option);
                        Order_Title = Order_Title +  `* ${title} ${quantity}`;
                    }
                });
            }
            Extras_SelectedDetect(Item_Extras)

            var Order = [Item_Image, Order_Title, Order_Price]
            Orders.push(Order)

            alert('Added to the cart!');

            setTimeout(()=>{
                ItemDisplay.remove();
                ItemDisplay = null;
                document.querySelector('.DisplayFilter').remove();
                DisplayFilter = null;
            }, 500)
        })
    }
});


