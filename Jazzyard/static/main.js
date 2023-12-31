/* Json to hold the list of musical instrument information */
musicalitemslist = [
    {
        "instrumentid": "1",
        "instrumentname": "Digital Piano",
        "instrumentimage": "../static/digital_piano.jpg",
        "instrumentprice": "100€",
        "instrumentdesc": "A versatile digital piano suitable for beginners and professionals alike."
    },

    {
        "instrumentid": "2",
        "instrumentname": "Drum Set",
        "instrumentimage": "../static/drum_set.jpg",
        "instrumentprice": "150€",
        "instrumentdesc": "A complete drum set with high-quality cymbals and accessories."
    },

    {
        "instrumentid": "3",
        "instrumentname": "Electric Drum",
        "instrumentimage": "../static/electric_drum.jpg",
        "instrumentprice": "260€",
        "instrumentdesc": "An electric drum kit with customizable sound options."
    },

    {
        "instrumentid": "4",
        "instrumentname": "Acoustic Guitar",
        "instrumentimage": "../static/Electro-Acoustic-Guitar.jpg",
        "instrumentprice": "280€",
        "instrumentdesc": "A beautiful acoustic guitar with a built-in pickup for stage performances."
    },

    {
        "instrumentid": "5",
        "instrumentname": "Keyboard",
        "instrumentimage": "../static/Keyboard.jpg",
        "instrumentprice": "195€",
        "instrumentdesc": "A versatile keyboard with multiple instrument sounds and features."
    },

    {
        "instrumentid": "6",
        "instrumentname": "Saxophone",
        "instrumentimage": "../static/Saxophone.jpg",
        "instrumentprice": "130€",
        "instrumentdesc": "A classic saxophone with a rich and warm tone."
    },

    {
        "instrumentid": "7",
        "instrumentname": "Sound System",
        "instrumentimage": "../static/Sound_System.jpg",
        "instrumentprice": "120€",
        "instrumentdesc": "A compact and powerful sound system suitable for small events."
    },

    {
        "instrumentid": "8",
        "instrumentname": "Vocal Processor",
        "instrumentimage": "../static/Vocal_Processor.jpg",
        "instrumentprice": "105€",
        "instrumentdesc": "A vocal processor with various effects for studio and live performances."
    }
];

    $("#searchproducts").keyup(function (event) {
        if ($("#searchproducts").val().trim() == "") {
            $(".navLinks>li>a:contains('Home')").parent().click();
            dynamichtml = "";
            musicalitemslist = [];
            musicalitemslist = JSON.parse(localStorage.getItem("json"));
            FetchInstrumentHtml(musicalitemslist);
        }
    
        else {
            musicalitemslist = [];
            $.each(JSON.parse(localStorage.getItem("json")), function (i, j) {
                if (j.instrumentname.toLowerCase().indexOf($("#searchproducts").val().toLowerCase()) != -1) {
                    musicalitemslist.push(j);
                }
            });
            FetchInstrumentHtml(musicalitemslist);
        }
    
        if($(".cards_item").length==1)
        {
            $('.cards_item').css("width","60%");
        }
    });

localStorage.setItem("json", JSON.stringify(musicalitemslist));
musicalitemslist = [];
musicalitemslist = JSON.parse(localStorage.getItem("json"));
FetchInstrumentHtml(musicalitemslist);

category = "";
category = getUrlbyParameter("cat");
if (category != "") {
    $(".navLinks>li>a:contains('" + category + "')").parent().click();
}

if($('.navLinks>li').hasClass('active'))
{
    if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
        musicalitemslist = [];
        musicalitemslist = JSON.parse(localStorage.getItem("json"));
    
        musicalitemslist = musicalitemslist.filter(function (i) {
            return i.category == $('.navLinks>li.active')[0].textContent.trim();
        });
        FetchInstrumentHtml(musicalitemslist);
    }
}

else {
    musicalitemslist = [];
    musicalitemslist = JSON.parse(localStorage.getItem("json"));
    FetchInstrumentHtml(musicalitemslist);
}

    function GoToHome() {
        window.location.href = "/";
    }

    function ToggleMenuItems(){
        $(".navLinks")[0].classList.toggle("responsive");
    }

    function getUrlbyParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    function FetchInstrumentHtml(jsonarr) {
        $("#musicinstrumentscatalog").html("");
        dynamichtml = "";
        $.each(jsonarr, function () {
            ratinghtml = ""; 
            dynamichtml += "<li class='cards_item'><div class='card'><a href='/productdetails?id=" + this.instrumentid + "'><div class='card_image'><img src='" + this.instrumentimage + "'></div></a><div class='card_content'><h1 class='card_title'>" + this.instrumentname + "</h1> <div class='card_price'> <span> Price: " + this.instrumentprice + "</span></div><br/><button onclick='Navigateproductdetails(" + this.instrumentid + ")'' id='instrument_detail' class='btn card_btn btn-grad'>More</button> </div></div></li>";
        });
        $("#musicinstrumentscatalog").append(dynamichtml);
    }

    $(document).ready(function(){
        $('.navLinks>li').on('click', function () {
            $('li').removeClass('active');
            $(this).toggleClass('active');
        });
        
        category = "";
        category = getUrlbyParameter("cat");
    
        if (category != "") {
            $(".navLinks>li>a:contains('" + category + "')").parent().click();
        }
    
        if($('.navLinks>li').hasClass('active'))
        {
            if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
                musicalitemslist = [];
                musicalitemslist = JSON.parse(localStorage.getItem("json"));
        
                musicalitemslist = musicalitemslist.filter(function (i) {
                    return i.category == $('.navLinks>li.active')[0].textContent.trim();
                });
                FetchInstrumentHtml(musicalitemslist);
            }
        }
    
        else {
            musicalitemslist = [];
            musicalitemslist = JSON.parse(localStorage.getItem("json"));
            FetchInstrumentHtml(musicalitemslist);
        }

        $(".cartmsg").hide();
        cartvalue=[];
        cartval=[];
        $("#cart").hide();
        $(".modal").hide();
        musicalitemslist = JSON.parse(localStorage.getItem("json"));
        cartitemshtml = "";
        cartitemexists=false;
        
        if(localStorage.getItem("cartitems")) {
            product_name = "";
            product_price = "";
            totalprice = 0;  
            cartval =  JSON.parse(localStorage.getItem("cartitems"));
            $("#cartcount").text(cartval.length);
      
            for(var i = 0; i < cartval.length; i++){
              product_name = musicalitemslist.filter(function (data) {
                return data.instrumentid  == String(cartval[i].split("-")[0]);
              })[0].instrumentname;
      
              product_price = musicalitemslist.filter(function (data) {
                return data.instrumentid  == String(cartval[i].split("-")[0]);
              })[0].instrumentprice;
      
              cartitemshtml += "<br/><div><span></span><a id='productlink' href='#'>" + product_name + " (" + cartval[i].split("-")[1] + ")</a> <span class='price'> € " + parseInt(product_price.split('€')[0].trim()) + "</span></div><br/>";
              totalprice += parseInt(product_price.split('€')[0].trim());
            }            
            $("#cartitems").append(cartitemshtml);
            $('.totalprice').html("<b>Total: € "+totalprice+"</b>");
        }
      
        else {
            $(".row").hide();
            $(".cartmsg").show();
          }

          if(getUrlbyParameter("checkout") == "true") {
            $("#cart").show();
            $("#productdetail").hide();
            $('li').removeClass('active');
            $("#modal h2").text("Checkout")
            $(".copy span").text("products reserved successfully");
          }

          else {
            FetchInstrumentDetailsHtml()
          }
      
    });

    function MovetoCart() {
        if(localStorage.getItem("cartitems")) {
          cartvalue = JSON.parse(localStorage.getItem("cartitems")) || [];
          cartvalue.push(product_data[0].instrumentid + "-1"); 
                
        }
    
        else {
          cartvalue=[];
          cartvalue[0]=product_data[0].instrumentid + "-1";
          
        }
    
        localStorage.setItem("cartitems", JSON.stringify(cartvalue));
        document.location.href = "./productdetails?checkout=true";
      }

      $(window).on("load", function () {
        $('li').removeClass('active');

        if (window.location.href.indexOf("productdetails") > -1) {
           // $(".breadcrum").hide();
            $(".search-key-box").hide();
            $(".copy").hide();
        }
      });


      function FetchInstrumentDetailsHtml(){
        $("#cart").hide();
        $("#productdetail").show();
        imglist="";
        productimg = "";
        product_data = musicalitemslist.filter(function (i) {
            return i.instrumentid == String(getUrlbyParameter('id'));
        });

        imglist = " <img src='" + product_data[0].instrumentimage + "'></img>";
        productimg = "<li > <div ></div>  <div class='product-colors'>" + imglist + "</div> </li>";
        productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;text-align: left'><b><span>" + product_data[0].instrumentname + "</span></b><br/> </span> <br/> <b><span>" +product_data[0].instrumentdesc+ "</span></b><br/> </span> <br/> <b><span style='color:brown'>" + product_data[0].instrumentprice + "<br/><div style='float:left'> <div style='align-items:center'></div> <br/><button id='product_add_to_cart' onclick='MovetoCart()' class='btn card_btn btn-grad'>Move to Cart</button> </div> </span></b></div></li> ";
        $("#product-card").append(productimg);
        $(".product-pic").css("background-image", "url('" + product_data[0].instrumentimage + "')");
        $(".product-pic").css("background-repeat", "no-repeat");
        $(".product-pic").css("background-position", "left center");
      }

      function Navigateproductdetails(itemid) {
        window.location.href = "/productdetails?id=" + itemid;
    }