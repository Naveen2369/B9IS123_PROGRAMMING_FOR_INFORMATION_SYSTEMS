/* Json to hold the list of musical instrument information */
musicalitems =
    [
        {
            "instrumentid": "",
            "instrumentname": "",
            "instrumentimage": "",
            "instrumentprice": ""
        },
        {

        }
    ]


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