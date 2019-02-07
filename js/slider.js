

function generateMenu(){
    let ul = document.querySelector('.list-menu');
    for(let key in products){
        if(key == 0){
            ul.innerHTML = `<li class="list-menu-item active"><a href="#" data-no="${key}">${products[key].p_name}</a></li>`;
        } else {
            ul.innerHTML += `<li class="list-menu-item"><a href="#" data-no="${key}">${products[key].p_name}</a></li>`;
        }
    }
}

function generateContent(){
    let productImage = document.getElementById('product-image');
    let productTitle = document.querySelector('.titles-wrap');

    for(let key in products){
        productImage.innerHTML += `<p><img src="${products[key].p_image}" alt="${products[key].p_name}"></p>`;
        productTitle.innerHTML += `
            <div class="titles" id="title${key}">
                <h2 id="product-title">${products[key].p_name}</h2>
                <p id="product-tagline">${products[key].p_tagline}</p>
            </div>
        `;
    }

}

generateMenu();
generateContent();

// $(window).on('load', function(){
//     changeBG(id);
//     loadProductSize(id);
//     updateButton(id);
//     loadProductProperties(id);
// });


$(window).on('load resize', function(){
    var slideH = $('#product-image').innerHeight(),
        slidePH = $('#product-image p').innerHeight(),
        titleH = $('.titles').innerHeight(),
        listMenu = $('.list-menu li'),
        listCount = $('.list-menu li').length - 1,
        next = $('#next'),
        prev = $('#prev'),
        id = 0;

    changeBG(id);
    loadProductSize(id);
    updateButton(id);
    loadProductProperties(id);
    
    $('#product-description .title-s').css('height', titleH);

    // List Menu
    $('.list-menu a').on('click', function(e){
        id = $(this).data('no');
        
        slideLi(id);
        slide(id);
        updateButton(id);
        changeBG(id);
        loadProductSize(id);
        loadProductProperties(id);
    
        e.preventDefault();
    });

    // Next and Previous 
    $('.list-controllers a').on('click', function(e){
        
        if($(this).attr('id') == 'next'){
            ++id;
        } else {
            --id;
        }

        slide(id);
        slideLi(id);
        updateButton(id);
        changeBG(id);
        loadProductSize(id);
        loadProductProperties(id);

        e.preventDefault();
    });

    // Button Show and Hide
    function updateButton(id){
        if(id === 0){
            $(prev).css({'visibility': 'hidden'});
            $(next).css({'visibility' : 'visible'});
        } else {
            $(prev).css({'visibility' : 'visible'});
        }

        if(id === listCount){
            $(next).css({'visibility': 'hidden'});
            $(prev).css({'visibility' : 'visible'});
        } else {
            $(next).css({'visibility' : 'visible'});
        }
    }

    // Update List Menu when active
    function slideLi(id){
        $(listMenu).eq(id).addClass('active').siblings().removeClass('active');
    }

    // Slide to product
    function slide(id){
        $('#product-image').animate({
            'top': '-'+id*slidePH
        }, 300);

        $('.titles-wrap').animate({
            'top': '-'+id*titleH
        }, 300);
    }
    
    // Change background
    function changeBG(id){
        let section = document.querySelector('.section-02');
        section.classList.remove(section.classList[2]);
        section.classList.add(`item${id}`);

    }

    function loadProductSize(id){
        let sizes = document.getElementById('product-size');
        let li = "";
        for(let key in products){
            if(key == id){
                for(let key2 in products[key].p_sizes){
                    li += `
                        <li><span>${products[key].p_sizes[key2]}"</span></li>
                    `;
                }
                sizes.innerHTML = li;
                $('#product-size li').fadeIn();
                $('#product-size li').eq(0).addClass('active');
            }
        }
    }

    function loadProductProperties(id){
        let prop = document.getElementById('product-features');
        let li = "";
        for(let key in products){
            if(key == id){
                for(let key2 in products[key].p_properties){
                    li += `
                        <li><img src="${products[key].p_properties[key2].src}" alt=""><span>${products[key].p_properties[key2].title}</span></li>
                    `;
                }
                prop.innerHTML = li;
                $('#product-features li').fadeIn(1000);
            }
        }
    }
});






