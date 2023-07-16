/* Json to hold the list of musical instrument information */
musicalitems =
    [
        {
            "instrumentid": "1",
            "instrumentname": "Digital Piano",
            "instrumentimage": "../html_images/digital_piano.jpg",
            "instrumentprice": "100€"
        },

        {
            "instrumentid": "2",
            "instrumentname": "Drum Set",
            "instrumentimage": "../html_images/drum_set.jpg",
            "instrumentprice": "150€"
        },

        {
            "instrumentid": "3",
            "instrumentname": "Electric Drum",
            "instrumentimage": "../html_images/electric_drum.jpg",
            "instrumentprice": "260€"
        },

        {
            "instrumentid": "4",
            "instrumentname": "Acoustic Guitar",
            "instrumentimage": "../html_images/Electro-Acoustic-Guitar.jpg",
            "instrumentprice": "280€"
        },

        {
            "instrumentid": "5",
            "instrumentname": "Keyboard",
            "instrumentimage": "../html_images/Keyboard.jpg",
            "instrumentprice": "195€"
        },

        {
            "instrumentid": "6",
            "instrumentname": "Saxophone",
            "instrumentimage": "../html_images/Saxophone.jpg",
            "instrumentprice": "130€"
        },

        {
            "instrumentid": "7",
            "instrumentname": "Sound System",
            "instrumentimage": "../html_images/Sound_System.jpg",
            "instrumentprice": "120€"
        },

        {
            "instrumentid": "8",
            "instrumentname": "Vocal Processor",
            "instrumentimage": "../html_images/Vocal_Processor.jpg",
            "instrumentprice": "105€"
        }

    ];


    $("#searchproducts").keyup(function (event) {
        if ($("#searchproducts").val().trim() == "") {
            $(".navLinks>li>a:contains('Home')").parent().click();
            dynamichtml = "";
            musicalitemslist = [];
            musicalitemslist = JSON.parse(localStorage.getItem("json"));
            GetItemsHtml(musicalitemslist);
        }
    
        else {
            musicalitemslist = [];
            $.each(JSON.parse(localStorage.getItem("json")), function (i, j) {
                if (j.name.toLowerCase().indexOf($("#searchproducts").val().toLowerCase()) != -1) {
                    musicalitemslist.push(j);
                }
            });
            GetItemsHtml(musicalitemslist);
        }
    
        if($(".cards_item").length==1)
        {
            $('.cards_item').css("width","60%");
        }
    });

    function GetItemsHtml(jsonarr) {

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
        $.each(jsonarray, function () {
            ratinghtml = "";
           
    
            dynamichtml += "<li class='cards_item'><div class='card'><a href='/productdetails?id=" + this.instrumentid + "'><div class='card_image'><img src='" + this.instrumentimage + "'></div></a><div class='card_content'><h1 class='card_title'>" + this.instrumentname + "</h1> <div class='card_price'> <span> Price: " + this.instrumentprice + "</span></div><br/><button onclick='Navigateproductdetails(" + this.instrumentid + ")'' id='instrument_detail' class='btn card_btn btn-grad'>More</button> </div></div></li>";
    
        });
        $("#musicinstrumentscatalog").append(dynamichtml);
    }

    

    $(document).ready(function(){


    });